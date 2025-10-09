---
title: googleCalendarService
nav_order: 4
parent: services
---
[**ClubPoker**](../../..)

***

# Variable: googleCalendarService

> `const` **googleCalendarService**: `object`

Defined in: [services/googleCalendarService.ts:64](https://github.com/jcook3701/ClubPoker/blob/12cb2bc63eafa0b05c75059627365b9d3f9284a5/src/services/googleCalendarService.ts#L64)

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
