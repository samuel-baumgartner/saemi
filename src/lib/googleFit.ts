import { SleepData, WorkoutData, TimeSession } from '@/types/task'

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
      // Fetch sleep sessions from Google Fit
      const response = await fetch(
        `${this.baseUrl}/sessions?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}&activityType=72`, // 72 = Sleep
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Google Fit API error: ${response.status}`)
      }

      const data = await response.json()
      
      // Convert Google Fit sessions to our SleepData format
      return (data.session || [])
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
    } catch (error) {
      console.error('Failed to fetch sleep data:', error)
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
      // Fetch activity sessions from Google Fit
      const response = await fetch(
        `${this.baseUrl}/sessions?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Google Fit API error: ${response.status}`)
      }

      const data = await response.json()

      // Convert Google Fit sessions to our WorkoutData format
      return (data.session || [])
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
    } catch (error) {
      console.error('Failed to fetch workout data:', error)
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
   * Convert health data to timeline sessions
   */
  static convertToSessions(
    sleepData: SleepData[],
    workoutData: WorkoutData[]
  ): TimeSession[] {
    const sessions: TimeSession[] = []

    // Convert sleep data
    sleepData.forEach((sleep) => {
      sessions.push({
        id: `sleep-${sleep.id}`,
        activity: '💤 Sleep',
        description: this.formatSleepDescription(sleep),
        startTime: sleep.startTime,
        endTime: sleep.endTime,
        date: sleep.startTime.toISOString().split('T')[0],
        source: 'google-fit',
        healthData: {
          type: 'sleep',
          details: sleep,
        },
      })
    })

    // Convert workout data
    workoutData.forEach((workout) => {
      sessions.push({
        id: `workout-${workout.id}`,
        activity: `${this.getWorkoutEmoji(workout.type)} ${workout.type}`,
        description: this.formatWorkoutDescription(workout),
        startTime: workout.startTime,
        endTime: workout.endTime,
        date: workout.startTime.toISOString().split('T')[0],
        source: 'google-fit',
        healthData: {
          type: 'workout',
          details: workout,
        },
      })
    })

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

