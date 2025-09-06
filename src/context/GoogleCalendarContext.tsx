import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { listCalendars } from "../api/googleCalendarApi";
import { Calendar } from "../types/calendar";

interface CalendarContextValue {
  calendars: Calendar[];
  selectedCalendar: Calendar | null;
  setSelectedCalendar: (cal: Calendar | null) => void;
  loading: boolean;
  error: string | null;
}

const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined
);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCalendars = async () => {
      setLoading(true);
      try {
        const cals = await listCalendars();
        setCalendars(cals);
        if (cals.length > 0) setSelectedCalendar(cals[0]);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    loadCalendars();
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        calendars,
        selectedCalendar,
        setSelectedCalendar,
        loading,
        error,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = (): CalendarContextValue => {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within a CalendarProvider");
  return context;
};
