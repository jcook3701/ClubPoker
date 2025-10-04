export interface CalendarEvents {
  calendar?: Calendar;
  calendarEvents: CalendarEvent[];
  timestamp: Date;
}

export interface Calendar {
  id: string;
  summary: string;
}

export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime: string; // ISO 8601
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    date?: string;
    timeZone?: string;
  };
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{ method: "popup" | "email"; minutes: number }>;
  };
}
