// AnkiConnect API integration
// Documentation: https://foosoft.net/projects/anki-connect/

export interface AnkiReview {
  cardId: number
  reviewTime: number // Unix timestamp in milliseconds
  ease: number
  timeTaken: number // milliseconds
}

export interface AnkiStudySession {
  startTime: Date
  endTime: Date
  cards: number
  deck?: string
}

export class AnkiConnectService {
  private readonly ankiUrl = 'http://localhost:8765'

  /**
   * Test connection to AnkiConnect
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.invoke('version', 6)
      return response !== null
    } catch (error) {
      console.error('AnkiConnect connection failed:', error)
      return false
    }
  }

  /**
   * Get Anki version
   */
  async getVersion(): Promise<number | null> {
    try {
      return await this.invoke('version', 6)
    } catch (error) {
      console.error('Failed to get Anki version:', error)
      return null
    }
  }

  /**
   * Try to get actual review timestamps from Anki's review log
   */
  async getReviewLog(cardIds: number[]): Promise<any[]> {
    try {
      // Try to get reviews using getReviewsOfCards if it exists
      const reviews = await this.invoke('getReviewsOfCards', 6, { cards: cardIds })
      console.log('🔍 Got review log:', reviews)
      return reviews || []
    } catch (error) {
      console.log('⚠️ getReviewsOfCards not available:', error)
      return []
    }
  }

  /**
   * Fetch review statistics for each day in the date range
   */
  async getReviews(startDate: Date, endDate: Date): Promise<AnkiReview[]> {
    try {
      console.log('📊 Attempting to fetch review statistics...')
      
      const reviews: AnkiReview[] = []
      const currentDate = new Date(startDate)

      // Iterate through each day
      while (currentDate <= endDate) {
        const daysAgo = Math.floor((Date.now() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
        
        // Query cards reviewed on this specific day
        const query = `rated:${daysAgo}:1`
        const cardIds = await this.invoke('findCards', 6, { query })

        if (cardIds && cardIds.length > 0) {
          console.log(`📅 ${currentDate.toDateString()}: ${cardIds.length} cards reviewed`)
          
          // Try to get actual review timestamps
          const reviewLog = await this.getReviewLog(cardIds)
          
          // reviewLog is an object where keys are card IDs and values are arrays of reviews
          if (reviewLog && typeof reviewLog === 'object' && Object.keys(reviewLog).length > 0) {
            console.log('✅ Got review log, filtering by date...')
            
            // Calculate start and end of current day
            const dayStart = new Date(currentDate)
            dayStart.setHours(0, 0, 0, 0)
            const dayEnd = new Date(currentDate)
            dayEnd.setHours(23, 59, 59, 999)
            
            // Iterate through each card's reviews
            for (const [cardId, cardReviews] of Object.entries(reviewLog)) {
              if (Array.isArray(cardReviews)) {
                for (const review of cardReviews) {
                  // Filter reviews to only include those in our date range
                  const reviewTimestamp = review.id || 0
                  
                  // Only include reviews from the current day we're processing
                  if (reviewTimestamp >= dayStart.getTime() && reviewTimestamp <= dayEnd.getTime()) {
                    reviews.push({
                      cardId: parseInt(cardId),
                      reviewTime: reviewTimestamp,
                      ease: review.ease || 0,
                      timeTaken: review.time || 0,
                    })
                  }
                }
              }
            }
            
            console.log(`  Filtered to ${reviews.length} reviews for ${currentDate.toDateString()}`)
          }
          
          // If we didn't get any reviews from the log for this day, use estimates
          const reviewsForDay = reviews.filter(r => {
            const d = new Date(r.reviewTime)
            return d.toDateString() === currentDate.toDateString()
          })
          
          if (reviewsForDay.length === 0) {
            // Fallback: Estimate session time
            console.log('⚠️ No review log available for this day, using estimates')
            const sessionStart = new Date(currentDate)
            sessionStart.setHours(20, 0, 0, 0) // 8 PM - more realistic study time
            
            for (let i = 0; i < cardIds.length; i++) {
              const reviewTime = sessionStart.getTime() + (i * 30 * 1000) // 30 seconds per card
              reviews.push({
                cardId: cardIds[i],
                reviewTime: reviewTime,
                ease: 0,
                timeTaken: 30000, // 30 seconds estimated
              })
            }
          }
        }

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1)
      }

      // Sort all reviews by timestamp before returning
      reviews.sort((a, b) => a.reviewTime - b.reviewTime)

      console.log('✅ Anki Reviews Collected:', {
        totalReviews: reviews.length,
        dateRange: {
          start: startDate.toDateString(),
          end: endDate.toDateString(),
        },
        firstReview: reviews[0] ? new Date(reviews[0].reviewTime).toLocaleString() : null,
        lastReview: reviews[reviews.length - 1] ? new Date(reviews[reviews.length - 1].reviewTime).toLocaleString() : null,
      })

      return reviews
    } catch (error) {
      console.error('Failed to fetch Anki reviews:', error)
      return []
    }
  }

  /**
   * Convert reviews to study sessions
   * Groups reviews that are close together into sessions
   * @param reviews - Array of Anki reviews
   * @param sessionGapMinutes - Minutes of inactivity to create a new session (default: 10)
   */
  static convertToStudySessions(reviews: AnkiReview[], sessionGapMinutes: number = 10): AnkiStudySession[] {
    if (reviews.length === 0) return []

    const sessions: AnkiStudySession[] = []
    const sessionGapMs = sessionGapMinutes * 60 * 1000 // Convert minutes to milliseconds

    let currentSession: AnkiStudySession | null = null

    console.log('🔄 Grouping reviews into sessions...', {
      totalReviews: reviews.length,
      sessionGapMinutes,
      firstReview: new Date(reviews[0].reviewTime).toLocaleString(),
      lastReview: new Date(reviews[reviews.length - 1].reviewTime).toLocaleString(),
    })

    for (const review of reviews) {
      const reviewDate = new Date(review.reviewTime)

      if (!currentSession) {
        // Start first session
        currentSession = {
          startTime: reviewDate,
          endTime: reviewDate,
          cards: 1,
        }
      } else {
        const timeSinceLastReview = review.reviewTime - currentSession.endTime.getTime()

        if (timeSinceLastReview <= sessionGapMs && timeSinceLastReview >= 0) {
          // Continue current session
          currentSession.endTime = reviewDate
          currentSession.cards++
        } else {
          // Save current session and start new one
          sessions.push(currentSession)
          currentSession = {
            startTime: reviewDate,
            endTime: reviewDate,
            cards: 1,
          }
        }
      }
    }

    // Don't forget the last session
    if (currentSession) {
      sessions.push(currentSession)
    }

    console.log('📚 Anki Study Sessions Created:', {
      totalSessions: sessions.length,
      totalReviews: reviews.length,
      sessions: sessions.map(s => ({
        start: s.startTime.toLocaleString(),
        end: s.endTime.toLocaleString(),
        cards: s.cards,
        duration: `${Math.round((s.endTime.getTime() - s.startTime.getTime()) / 60000)}min`,
      })),
    })
    
    return sessions
  }

  /**
   * Invoke AnkiConnect API
   */
  private async invoke(action: string, version: number, params?: any): Promise<any> {
    const response = await fetch(this.ankiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        version,
        params: params || {},
      }),
    })

    if (!response.ok) {
      throw new Error(`AnkiConnect request failed: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(`AnkiConnect error: ${data.error}`)
    }

    return data.result
  }
}

/**
 * Store/retrieve Anki connection status
 */
export function storeAnkiConnected(userId: string, connected: boolean) {
  localStorage.setItem(`anki_connected_${userId}`, connected.toString())
}

export function getAnkiConnected(userId: string): boolean {
  return localStorage.getItem(`anki_connected_${userId}`) === 'true'
}

