[**ClubPoker**](../../README.md)

***

# Variable: googleCalendarApi

> `const` **googleCalendarApi**: `object`

Defined in: [api/googleCalendarApi.ts:103](https://github.com/jcook3701/ClubPoker/blob/2a58122796b9af788ff085b79c7f9364706df585/src/api/googleCalendarApi.ts#L103)

## Type Declaration

### createEvent()

> **createEvent**: (`calendarId`, `event`) => `Promise`\<[`CalendarEvent`](../../types/interfaces/CalendarEvent.md)\>

Creates an event in the selected calendar.

#### Parameters

##### calendarId

`string`

##### event

[`CalendarEvent`](../../types/interfaces/CalendarEvent.md)

#### Returns

`Promise`\<[`CalendarEvent`](../../types/interfaces/CalendarEvent.md)\>

### fetchCalendarEvents()

> **fetchCalendarEvents**: (`calendarId`) => `Promise`\<`null` \| [`CalendarEvent`](../../types/interfaces/CalendarEvent.md)[]\>

Fetches events from a specific calendar.

#### Parameters

##### calendarId

`string`

#### Returns

`Promise`\<`null` \| [`CalendarEvent`](../../types/interfaces/CalendarEvent.md)[]\>

### getRedirectUri()

> **getRedirectUri**: () => `string`

Returns the full redirect URI based on extension ID + "oauth2" path.

#### Returns

`string`

### getToken()

> **getToken**: () => `Promise`\<`null` \| `string`\>

Retrieves a valid Google Calendar OAuth token for the extension.

#### Returns

`Promise`\<`null` \| `string`\>

### listCalendars()

> **listCalendars**: () => `Promise`\<[`Calendar`](../../types/interfaces/Calendar.md)[]\>

Fetches the list of user calendars.

#### Returns

`Promise`\<[`Calendar`](../../types/interfaces/Calendar.md)[]\>
