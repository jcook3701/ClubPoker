# Variable: googleCalendarApi

> `const` **googleCalendarApi**: `object`

Defined in: [api/googleCalendarApi.ts:123](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/api/googleCalendarApi.ts#L123)

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

> **fetchCalendarEvents**: (`calendarId`) => `Promise`\<[`CalendarEvent`](../../types/interfaces/CalendarEvent.md)[] \| `null`\>

Fetches events from a specific calendar.

#### Parameters

##### calendarId

`string`

#### Returns

`Promise`\<[`CalendarEvent`](../../types/interfaces/CalendarEvent.md)[] \| `null`\>

### getRedirectUri()

> **getRedirectUri**: () => `string`

Returns the full redirect URI based on extension ID + "oauth2" path.

#### Returns

`string`

### getToken()

> **getToken**: () => `Promise`\<`string` \| `null`\>

Retrieves a valid Google Calendar OAuth token for the extension.

#### Returns

`Promise`\<`string` \| `null`\>

### listCalendars()

> **listCalendars**: () => `Promise`\<[`Calendar`](../../types/interfaces/Calendar.md)[]\>

Fetches the list of user calendars.

#### Returns

`Promise`\<[`Calendar`](../../types/interfaces/Calendar.md)[]\>
