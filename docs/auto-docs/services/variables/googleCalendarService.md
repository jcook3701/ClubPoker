# Variable: googleCalendarService

> `const` **googleCalendarService**: `object`

Defined in: [services/googleCalendarService.ts:84](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/services/googleCalendarService.ts#L84)

## Type Declaration

### tournamentsToCalendarEvents()

> **tournamentsToCalendarEvents**: (`tournaments`) => [`CalendarEvents`](../../types/interfaces/CalendarEvents.md)

#### Parameters

##### tournaments

[`Tournaments`](../../types/interfaces/Tournaments.md)

#### Returns

[`CalendarEvents`](../../types/interfaces/CalendarEvents.md)

### tournamentToCalendarEvent()

> **tournamentToCalendarEvent**: (`tournament`, `timeZone`) => [`CalendarEvent`](../../types/interfaces/CalendarEvent.md)

#### Parameters

##### tournament

[`Tournament`](../../types/interfaces/Tournament.md)

##### timeZone

[`Timezone`](../../types/interfaces/Timezone.md)

#### Returns

[`CalendarEvent`](../../types/interfaces/CalendarEvent.md)
