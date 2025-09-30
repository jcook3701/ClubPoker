import { listCalendars } from "../api/googleCalendarApi";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns Calendars List object from  Google Calendar API
 */
const listCalendarsListener = (): void => {
  const messageType = MessageTypes.LIST_CALENDARS;
  const warningCode = WarningCodeMap.LIST_CALENDARS;
  onMessage(messageType, async () => {
    const calendars = await listCalendars();
    if (!calendars) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }

    const resolvedCalendars = calendars;
    // console.log("Resolved Calendars: ", resolvedCalendars);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      calendars: resolvedCalendars,
    };
    return response;
  });
};

export default listCalendarsListener;
