export interface ActivityLog {
  id: string;
  title: string;
  type: string; // 'Document' | 'PDF' | 'Text' | 'URL'
  date: string; // Dynamic relative date string
  status: string;
  color: string;
  bg: string;
  timestamp: number;
}

export const getRecentActivities = (): ActivityLog[] => {
  try {
    const raw = localStorage.getItem('veriscribe_activity');
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ActivityLog[];
    
    // Update dates dynamically based on timestamps
    return parsed.map(activity => {
      const diff = Date.now() - activity.timestamp;
      let dateStr = 'Just now';
      if (diff > 24 * 60 * 60 * 1000) {
        dateStr = 'Yesterday';
      } else if (diff > 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        dateStr = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (diff > 60 * 1000) {
        const mins = Math.floor(diff / (60 * 1000));
        dateStr = `${mins} min${mins > 1 ? 's' : ''} ago`;
      }
      return { ...activity, date: dateStr };
    });
  } catch (e) {
    console.error('Failed to parse activity logs:', e);
    return [];
  }
};

export const addRecentActivity = (
  title: string,
  type: 'Document' | 'PDF' | 'Text' | 'URL',
  status: string,
  style: 'emerald' | 'orange' | 'blue' | 'purple' = 'blue'
) => {
  try {
    const current = getRecentActivities();
    
    const colorMap = {
      emerald: 'text-emerald-400',
      orange: 'text-orange-400',
      blue: 'text-blue-400',
      purple: 'text-purple-400'
    };

    const bgMap = {
      emerald: 'bg-emerald-400/10',
      orange: 'bg-orange-400/10',
      blue: 'bg-blue-400/10',
      purple: 'bg-purple-400/10'
    };

    const newLog: ActivityLog = {
      id: Math.random().toString(36).substring(7),
      title: title.length > 30 ? title.substring(0, 30) + '...' : title,
      type,
      date: 'Just now',
      status,
      color: colorMap[style] || colorMap.blue,
      bg: bgMap[style] || bgMap.blue,
      timestamp: Date.now()
    };

    // Keep only the most recent 12 entries
    const updated = [newLog, ...current].slice(0, 12);
    localStorage.setItem('veriscribe_activity', JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save activity log:', e);
  }
};
