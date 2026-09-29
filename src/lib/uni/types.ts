export type UniKind = 'exercise' | 'quiz'

export const UNI_WEEKS = 14

export interface UniDueRule {
  /** 0 = Sunday ... 6 = Saturday */
  weekday: number
  /** "HH:MM" local time */
  time: string
  /** "YYYY-MM-DD": week 1 is due on the first matching weekday on or after this date */
  start: string
}

export interface UniCourse {
  id: string
  name: string
  color: string
  hasQuiz: boolean
  position: number
  notes: string
  exerciseRule: UniDueRule | null
  quizRule: UniDueRule | null
}

export interface UniItem {
  id: string
  courseId: string
  week: number
  kind: UniKind
  done: boolean
  skipped: boolean
  notes: string
  dueAt: string | null
  dueManual: boolean
  points: string
}

export type UniStatus = 'done' | 'skipped' | 'overdue' | 'soon' | 'open'
