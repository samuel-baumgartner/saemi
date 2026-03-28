'use client';

import { useState } from 'react';
import { TimeSession } from '@/types/task';
import { Clock, TrendingUp, Calendar } from 'lucide-react';

interface SummaryViewProps {
  sessions: TimeSession[];
}

interface SubjectSummary {
  subject: string;
  totalMinutes: number;
  sessionCount: number;
  source: string;
}

type TimePeriod = 'all' | 'today' | 'week' | 'month';

export default function SummaryView({ sessions }: SummaryViewProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');

  // Filter sessions based on selected time period
  const getFilteredSessions = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (timePeriod) {
      case 'today': {
        const todayStr = today.toISOString().split('T')[0];
        return sessions.filter(s => s.date === todayStr);
      }
      case 'week': {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return sessions.filter(s => {
          const sessionDate = new Date(s.date);
          return sessionDate >= weekAgo;
        });
      }
      case 'month': {
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return sessions.filter(s => {
          const sessionDate = new Date(s.date);
          return sessionDate >= monthAgo;
        });
      }
      case 'all':
      default:
        return sessions;
    }
  };

  const filteredSessions = getFilteredSessions();
  
  // Filter out Google Fit data (only show work/study activities)
  const workSessions = filteredSessions.filter(session => session.source !== 'google-fit');
  
  // Aggregate sessions by subject
  const summaryMap = new Map<string, SubjectSummary>();

  workSessions.forEach((session) => {
    const subject = session.activity || 'Untitled';
    const duration = session.endTime
      ? new Date(session.endTime).getTime() - new Date(session.startTime).getTime()
      : 0;
    const minutes = Math.floor(duration / 60000);

    if (summaryMap.has(subject)) {
      const existing = summaryMap.get(subject)!;
      existing.totalMinutes += minutes;
      existing.sessionCount += 1;
    } else {
      summaryMap.set(subject, {
        subject,
        totalMinutes: minutes,
        sessionCount: 1,
        source: session.source || 'manual',
      });
    }
  });

  // Convert to array and sort by total time (descending)
  const summaries = Array.from(summaryMap.values()).sort(
    (a, b) => b.totalMinutes - a.totalMinutes
  );

  // Calculate total time across all subjects
  const totalMinutes = summaries.reduce((sum, s) => sum + s.totalMinutes, 0);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const formatHours = (minutes: number) => {
    return (minutes / 60).toFixed(1);
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'google-fit':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'anki':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'timechecker':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'tracked':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'google-fit':
        return 'Google Fit';
      case 'anki':
        return 'Anki';
      case 'timechecker':
        return 'Focus (desktop)';
      case 'tracked':
        return 'Tracked';
      default:
        return 'Manual';
    }
  };

  if (summaries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Calendar className="w-16 h-16 mb-4 opacity-50" />
        <p>No sessions tracked yet</p>
        <p className="text-sm text-gray-500 mt-2">Start tracking to see your summary</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Period Filter */}
      <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg p-1">
        <button
          onClick={() => setTimePeriod('all')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all font-medium ${
            timePeriod === 'all'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          All Time
        </button>
        <button
          onClick={() => setTimePeriod('month')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all font-medium ${
            timePeriod === 'month'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => setTimePeriod('week')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all font-medium ${
            timePeriod === 'week'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setTimePeriod('today')}
          className={`flex-1 px-4 py-2 rounded-lg transition-all font-medium ${
            timePeriod === 'today'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          Today
        </button>
      </div>

      {/* Total Overview */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Total Time Tracked</h2>
        </div>
        <p className="text-4xl font-bold text-blue-400">
          {formatHours(totalMinutes)} hours
        </p>
        <p className="text-gray-400 mt-1">
          Across {summaries.length} {summaries.length === 1 ? 'subject' : 'subjects'} • {workSessions.length}{' '}
          {workSessions.length === 1 ? 'session' : 'sessions'}
        </p>
      </div>

      {/* Subject Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Time by Subject
        </h3>
        <div className="space-y-3">
          {summaries.map((summary, index) => {
            const percentage = totalMinutes > 0 ? (summary.totalMinutes / totalMinutes) * 100 : 0;
            return (
              <div
                key={summary.subject + index}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-lg">{summary.subject}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${getSourceColor(
                          summary.source
                        )}`}
                      >
                        {getSourceLabel(summary.source)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {summary.sessionCount} {summary.sessionCount === 1 ? 'session' : 'sessions'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">
                      {formatHours(summary.totalMinutes)}h
                    </p>
                    <p className="text-sm text-gray-400">{formatTime(summary.totalMinutes)}</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{percentage.toFixed(1)}% of total time</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

