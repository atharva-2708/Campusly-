import { ExamType, AnnouncementCategory, ResourceType, OfficeTimings } from '../types';

export const getGreeting = (name: string): string => {
  const hour = new Date().getHours();
  const greetings = {
    morning: ['Good morning', 'Ready to make today count', 'Rise and shine'],
    afternoon: ['Good afternoon', 'Hope your semester is rolling smooth', 'Keep the momentum going'],
    evening: ['Good evening', 'Wrapping up another productive day', 'Time to unwind and review']
  };

  let timeOfDay: 'morning' | 'afternoon' | 'evening';
  if (hour < 12) timeOfDay = 'morning';
  else if (hour < 17) timeOfDay = 'afternoon';
  else timeOfDay = 'evening';

  const selectedGreetings = greetings[timeOfDay];
  const randomGreeting = selectedGreetings[Math.floor(Math.random() * selectedGreetings.length)];
  
  return `${randomGreeting}, ${name}!`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const getRelativeTime = (dateString: string): string => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const daysDifference = Math.round(
    (new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  if (Math.abs(daysDifference) < 1) {
    const hoursDifference = Math.round(
      (new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60)
    );
    if (Math.abs(hoursDifference) < 1) return 'Just now';
    return rtf.format(hoursDifference, 'hour');
  }

  if (Math.abs(daysDifference) < 30) {
    return rtf.format(daysDifference, 'day');
  }

  return formatDate(dateString);
};

export const getExamTypeLabel = (type: ExamType): string => {
  const labels: Record<ExamType, string> = {
    'end-semester': 'End Semester Exam',
    'mid-semester': 'Mid Semester Exam',
    'unit-test': 'Unit Test',
    'class-test': 'Class Test',
    'practical': 'Practical Exam',
    'supplementary': 'Supplementary Exam'
  };
  return labels[type] || type;
};

export const getCategoryLabel = (category: AnnouncementCategory): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export const getResourceTypeLabel = (type: ResourceType): string => {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Parses any time string ("09:00 AM", "5:00 PM", "14:30") into minutes from midnight (0..1439).
 */
export const parseTimeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const cleaned = timeStr.trim().toUpperCase();
  const isPM = cleaned.includes('PM');
  const isAM = cleaned.includes('AM');
  const match = cleaned.match(/(\d{1,2}):(\d{2})/);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

/**
 * Determines whether a college office is open at the given date/time.
 */
export const isOfficeOpen = (office: OfficeTimings, customDate?: Date): boolean => {
  const now = customDate || new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (day === 0) {
    if (office.sundayClosed) return false;
  }

  let openStr: string | undefined;
  let closeStr: string | undefined;

  if (day === 6) {
    if (!office.saturdayOpen || !office.saturdayClose) return false;
    openStr = office.saturdayOpen;
    closeStr = office.saturdayClose;
  } else if (day === 0) {
    return false;
  } else {
    openStr = office.weekdayOpen;
    closeStr = office.weekdayClose;
  }

  if (!openStr || !closeStr) return false;

  const openMinutes = parseTimeToMinutes(openStr);
  const closeMinutes = parseTimeToMinutes(closeStr);

  if (currentMinutes < openMinutes || currentMinutes > closeMinutes) {
    return false;
  }

  if (office.lunchBreak && office.lunchBreak.includes('-')) {
    const [lStart, lEnd] = office.lunchBreak.split('-');
    const lunchStartMinutes = parseTimeToMinutes(lStart);
    const lunchEndMinutes = parseTimeToMinutes(lEnd);
    if (currentMinutes >= lunchStartMinutes && currentMinutes <= lunchEndMinutes) {
      return false;
    }
  }

  return true;
};
