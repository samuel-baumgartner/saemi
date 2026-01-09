import { SleepData, WorkoutData, TimeSession } from '@/types/task'
import { getLocalDateString } from './dateUtils'

// Google Fit API integration
// Documentation: https://developers.google.com/fit

export class GoogleFitService {
  private accessToken: string | null = null
  private readonly baseUrl = 'https://www.googleapis.com/fitness/v1/users/me'

  constructor(accessToken?: string) {
    this.accessToken = accessToken || null
  }

  /**
   * Check if user has connected Google Fit
   */
  isConnected(): boolean {
    return !!this.accessToken
  }

  /**
   * Fetch sleep data for a specific date range
   */
  async getSleepData(startDate: Date, endDate: Date): Promise<SleepData[]> {
    if (!this.accessToken) {
      throw new Error('Google Fit not connected')
    }

    try {
      const url = `${this.baseUrl}/sessions?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}&activityType=72`
      console.log('🔍 Fetching sleep from Google Fit:', { url, startDate: startDate.toISOString(), endDate: endDate.toISOString() })
      
      // Fetch sleep sessions from Google Fit
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Google Fit API error:', response.status, errorText)
        throw new Error(`Google Fit API error: ${response.status}`)
      }

      const data = await response.json()
      console.log('📦 Raw Google Fit sleep response:', {
        totalSessions: data.session?.length || 0,
        hasSession: !!data.session,
        firstSession: data.session?.[0]
      })
      
      // Convert Google Fit sessions to our SleepData format
      const sleepSessions = (data.session || [])
        .filter((session: any) => session.activityType === 72) // Sleep activity
        .map((session: any) => {
          const startTime = new Date(parseInt(session.startTimeMillis))
          const endTime = new Date(parseInt(session.endTimeMillis))
          const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 60000) // minutes

          return {
            id: session.id,
            startTime,
            endTime,
            duration,
            quality: session.description || undefined,
            // Note: Sleep stages require additional API call to dataset
          }
        })
      
      console.log('💤 Converted sleep sessions:', sleepSessions.length, 'sessions')
      return sleepSessions
    } catch (error) {
      console.error('❌ Failed to fetch sleep data:', error)
      return []
    }
  }

  /**
   * Fetch workout data for a specific date range
   */
  async getWorkoutData(startDate: Date, endDate: Date): Promise<WorkoutData[]> {
    if (!this.accessToken) {
      throw new Error('Google Fit not connected')
    }

    try {
      const url = `${this.baseUrl}/sessions?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}`
      console.log('🔍 Fetching workouts from Google Fit:', { url, startDate: startDate.toISOString(), endDate: endDate.toISOString() })
      
      // Fetch activity sessions from Google Fit
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Google Fit API error:', response.status, errorText)
        throw new Error(`Google Fit API error: ${response.status}`)
      }

      const data = await response.json()
      console.log('📦 Raw Google Fit workout response:', {
        totalSessions: data.session?.length || 0,
        hasSession: !!data.session,
        activityTypes: data.session?.map((s: any) => s.activityType).join(', ') || 'none',
        firstSession: data.session?.[0]
      })

      // Convert Google Fit sessions to our WorkoutData format
      const workoutSessions = (data.session || [])
        .filter((session: any) => session.activityType !== 72) // Exclude sleep
        .map((session: any) => {
          const startTime = new Date(parseInt(session.startTimeMillis))
          const endTime = new Date(parseInt(session.endTimeMillis))
          const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 60000)

          return {
            id: session.id,
            type: this.getActivityName(session.activityType),
            startTime,
            endTime,
            duration,
            calories: undefined, // Would need additional dataset query
            distance: undefined, // Would need additional dataset query
          }
        })
      
      console.log('🏋️ Converted workout sessions:', workoutSessions.length, 'sessions')
      return workoutSessions
    } catch (error) {
      console.error('❌ Failed to fetch workout data:', error)
      return []
    }
  }

  /**
   * Get activity name from Google Fit activity type code
   */
  private getActivityName(activityType: number): string {
    const activityMap: Record<number, string> = {
      1: 'Biking',
      7: 'Walking',
      8: 'Running',
      9: 'Strength Training',
      10: 'Aerobics',
      82: 'Swimming',
      93: 'Hiking',
      108: 'Yoga',
      // Add more as needed
    }
    return activityMap[activityType] || 'Exercise'
  }

  /**
   * Check if a session spans midnight (starts on one day, ends on another)
   */
  private static spansMidnight(startTime: Date, endTime: Date): boolean {
    return getLocalDateString(startTime) !== getLocalDateString(endTime)
  }

  /**
   * Split a session that spans midnight into multiple sessions (one per day)
   */
  private static splitSessionAcrossDays(
    id: string,
    activity: string,
    description: string,
    startTime: Date,
    endTime: Date,
    source: 'manual' | 'tracked' | 'google-fit' | 'anki',
    healthData: any
  ): TimeSession[] {
    const sessions: TimeSession[] = []
    const currentStart = new Date(startTime)
    const finalEnd = new Date(endTime)

    let dayIndex = 0
    while (currentStart < finalEnd) {
      // Get end of current day (23:59:59.999)
      const endOfDay = new Date(currentStart)
      endOfDay.setHours(23, 59, 59, 999)

      // Determine the end time for this segment
      const segmentEnd = finalEnd <= endOfDay ? finalEnd : endOfDay

      sessions.push({
        id: `${id}-day${dayIndex}`,
        activity,
        description,
        startTime: new Date(currentStart),
        endTime: new Date(segmentEnd),
        date: getLocalDateString(currentStart),
        source,
        healthData,
      })

      // Move to start of next day
      currentStart.setDate(currentStart.getDate() + 1)
      currentStart.setHours(0, 0, 0, 0)
      dayIndex++
    }

    return sessions
  }

  /**
   * Convert health data to timeline sessions
   */
  static convertToSessions(
    sleepData: SleepData[],
    workoutData: WorkoutData[]
  ): TimeSession[] {
    console.log('🔄 Converting to sessions:', { sleepCount: sleepData.length, workoutCount: workoutData.length })
    const sessions: TimeSession[] = []

    // Convert sleep data
    sleepData.forEach((sleep) => {
      // Check if sleep spans multiple days (crosses midnight)
      if (this.spansMidnight(sleep.startTime, sleep.endTime)) {
        // Split into multiple sessions (one per day)
        const splitSessions = this.splitSessionAcrossDays(
          `sleep-${sleep.id}`,
          '💤 Sleep',
          this.formatSleepDescription(sleep),
          sleep.startTime,
          sleep.endTime,
          'google-fit',
          {
            type: 'sleep',
            details: sleep,
          }
        )
        sessions.push(...splitSessions)
      } else {
        // Single day session
        sessions.push({
          id: `sleep-${sleep.id}`,
          activity: '💤 Sleep',
          description: this.formatSleepDescription(sleep),
          startTime: sleep.startTime,
          endTime: sleep.endTime,
          date: getLocalDateString(sleep.startTime),
          source: 'google-fit',
          healthData: {
            type: 'sleep',
            details: sleep,
          },
        })
      }
    })

    // Convert workout data
    workoutData.forEach((workout) => {
      // Check if workout spans multiple days
      if (this.spansMidnight(workout.startTime, workout.endTime)) {
        const splitSessions = this.splitSessionAcrossDays(
          `workout-${workout.id}`,
          `${this.getWorkoutEmoji(workout.type)} ${workout.type}`,
          this.formatWorkoutDescription(workout),
          workout.startTime,
          workout.endTime,
          'google-fit',
          {
            type: 'workout',
            details: workout,
          }
        )
        sessions.push(...splitSessions)
      } else {
        sessions.push({
          id: `workout-${workout.id}`,
          activity: `${this.getWorkoutEmoji(workout.type)} ${workout.type}`,
          description: this.formatWorkoutDescription(workout),
          startTime: workout.startTime,
          endTime: workout.endTime,
          date: getLocalDateString(workout.startTime),
          source: 'google-fit',
          healthData: {
            type: 'workout',
            details: workout,
          },
        })
      }
    })

    console.log('✅ Total sessions after conversion:', sessions.length)
    return sessions
  }

  private static formatSleepDescription(sleep: SleepData): string {
    const hours = Math.floor(sleep.duration / 60)
    const minutes = sleep.duration % 60
    let desc = `${hours}h ${minutes}m`

    if (sleep.stages) {
      desc += ` • Deep: ${sleep.stages.deep || 0}m, Light: ${sleep.stages.light || 0}m, REM: ${sleep.stages.rem || 0}m`
    }

    if (sleep.quality) {
      desc += ` • Quality: ${sleep.quality}`
    }

    return desc
  }

  private static formatWorkoutDescription(workout: WorkoutData): string {
    const parts: string[] = []

    const hours = Math.floor(workout.duration / 60)
    const minutes = workout.duration % 60
    if (hours > 0) {
      parts.push(`${hours}h ${minutes}m`)
    } else {
      parts.push(`${minutes}m`)
    }

    if (workout.distance) {
      const km = (workout.distance / 1000).toFixed(2)
      parts.push(`${km} km`)
    }

    if (workout.calories) {
      parts.push(`${workout.calories} cal`)
    }

    if (workout.heartRate?.avg) {
      parts.push(`❤️ ${workout.heartRate.avg} bpm`)
    }

    return parts.join(' • ')
  }

  private static getWorkoutEmoji(type: string): string {
    const emojiMap: Record<string, string> = {
      running: '🏃',
      cycling: '🚴',
      swimming: '🏊',
      walking: '🚶',
      strength: '💪',
      yoga: '🧘',
      hiking: '🥾',
      default: '🏋️',
    }

    return emojiMap[type.toLowerCase()] || emojiMap.default
  }
}

/**
 * Store/retrieve Google Fit token for the current user
 */
export function storeGoogleFitToken(userId: string, token: string) {
  localStorage.setItem(`google_fit_token_${userId}`, token)
}

export function getGoogleFitToken(userId: string): string | null {
  return localStorage.getItem(`google_fit_token_${userId}`)
}

export function removeGoogleFitToken(userId: string) {
  localStorage.removeItem(`google_fit_token_${userId}`)
}

