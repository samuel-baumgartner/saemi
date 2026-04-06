export interface TimeSession {
  id: string
  activity: string
  description?: string
  startTime: Date
  endTime?: Date  // null if currently active
  date: string    // YYYY-MM-DD format for grouping by day
  source?: 'manual' | 'tracked' | 'google-fit' | 'anki' | 'timechecker' | 'phone'  // where the data came from
  healthData?: {
    type: 'sleep' | 'workout' | 'activity' | 'study'
    /** Arbitrary JSON-compatible metrics (e.g. study timers). */
    details?: Record<string, unknown>
  }
}

export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface SamsungHealthData {
  sleep?: SleepData[]
  workouts?: WorkoutData[]
}

export interface SleepData {
  id: string
  startTime: Date
  endTime: Date
  duration: number  // minutes
  quality?: string
  stages?: {
    deep?: number
    light?: number
    rem?: number
    awake?: number
  }
}

export interface WorkoutData {
  id: string
  type: string  // running, cycling, strength, etc.
  startTime: Date
  endTime: Date
  duration: number  // minutes
  calories?: number
  distance?: number  // meters
  heartRate?: {
    avg?: number
    max?: number
  }
}

