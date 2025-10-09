---
title: googleCalendarService
---
[**ClubPoker**](../../README.md)

***

# Variable: googleCalendarService

> `const` **googleCalendarService**: `object`

Defined in: [services/googleCalendarService.ts:64](https://github.com/jcook3701/ClubPoker/blob/dcb8d48db34f662502d0fb9788282480a8689eed/src/services/googleCalendarService.ts#L64)

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
