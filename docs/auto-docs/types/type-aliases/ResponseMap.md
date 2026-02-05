# Type Alias: ResponseMap

> **ResponseMap** = `object`

Defined in: [constants/responses.ts:32](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L32)

## Properties

### CREATE\_EVENT

> **CREATE\_EVENT**: `object`

Defined in: [constants/responses.ts:77](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L77)

#### calendarData?

> `optional` **calendarData**: [`CalendarEvents`](../interfaces/CalendarEvents.md)

#### success

> **success**: `boolean`

***

### ERROR

> **ERROR**: `object`

Defined in: [constants/responses.ts:38](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L38)

#### success

> **success**: `boolean`

***

### FETCH\_CALENDAR\_EVENTS

> **FETCH\_CALENDAR\_EVENTS**: `object`

Defined in: [constants/responses.ts:73](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L73)

#### calendarData

> **calendarData**: [`CalendarEvents`](../interfaces/CalendarEvents.md)

#### success

> **success**: `boolean`

***

### GET\_CALENDAR

> **GET\_CALENDAR**: `object`

Defined in: [constants/responses.ts:40](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L40)

#### calendar?

> `optional` **calendar**: [`Calendar`](../interfaces/Calendar.md)

#### success

> **success**: `boolean`

***

### GET\_CALENDAR\_EVENTS

> **GET\_CALENDAR\_EVENTS**: `object`

Defined in: [constants/responses.ts:61](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L61)

#### calendarData

> **calendarData**: [`CalendarEvents`](../interfaces/CalendarEvents.md) \| `null`

#### success

> **success**: `boolean`

***

### GET\_FILTERS

> **GET\_FILTERS**: `object`

Defined in: [constants/responses.ts:44](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L44)

#### filters

> **filters**: [`FiltersState`](FiltersState.md)

#### success

> **success**: `boolean`

***

### GET\_SETTINGS

> **GET\_SETTINGS**: `object`

Defined in: [constants/responses.ts:48](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L48)

#### settings

> **settings**: [`AppSettings`](../interfaces/AppSettings.md)

#### success

> **success**: `boolean`

***

### GET\_TIMEZONE

> **GET\_TIMEZONE**: `object`

Defined in: [constants/responses.ts:52](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L52)

#### success

> **success**: `boolean`

#### timezone

> **timezone**: [`Timezone`](../interfaces/Timezone.md)

***

### GET\_TOURNAMENTS

> **GET\_TOURNAMENTS**: `object`

Defined in: [constants/responses.ts:65](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L65)

#### success

> **success**: `boolean`

#### tournamentData

> **tournamentData**: [`Tournaments`](../interfaces/Tournaments.md) \| `null`

***

### LIST\_CALENDARS

> **LIST\_CALENDARS**: `object`

Defined in: [constants/responses.ts:72](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L72)

#### calendars

> **calendars**: [`Calendar`](../interfaces/Calendar.md)[]

#### success

> **success**: `boolean`

***

### PAGE\_RELOADED

> **PAGE\_RELOADED**: `object`

Defined in: [constants/responses.ts:34](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L34)

#### success

> **success**: `boolean`

***

### SAVE\_CALENDAR

> **SAVE\_CALENDAR**: `object`

Defined in: [constants/responses.ts:56](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L56)

#### success

> **success**: `boolean`

***

### SAVE\_CALENDAR\_EVENTS

> **SAVE\_CALENDAR\_EVENTS**: `object`

Defined in: [constants/responses.ts:69](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L69)

#### success

> **success**: `boolean`

***

### SAVE\_FILTERS

> **SAVE\_FILTERS**: `object`

Defined in: [constants/responses.ts:57](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L57)

#### success

> **success**: `boolean`

***

### SAVE\_SETTINGS

> **SAVE\_SETTINGS**: `object`

Defined in: [constants/responses.ts:58](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L58)

#### success

> **success**: `boolean`

***

### SAVE\_TIMEZONE

> **SAVE\_TIMEZONE**: `object`

Defined in: [constants/responses.ts:59](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L59)

#### success

> **success**: `boolean`

***

### SAVE\_TOURNAMENTS

> **SAVE\_TOURNAMENTS**: `object`

Defined in: [constants/responses.ts:70](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L70)

#### success

> **success**: `boolean`

***

### SETTINGS\_CHANGE

> **SETTINGS\_CHANGE**: `object`

Defined in: [constants/responses.ts:35](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L35)

#### success

> **success**: `boolean`

***

### TIMEZONE\_CHANGE

> **TIMEZONE\_CHANGE**: `object`

Defined in: [constants/responses.ts:36](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L36)

#### success

> **success**: `boolean`

***

### WARNING

> **WARNING**: `object`

Defined in: [constants/responses.ts:37](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/constants/responses.ts#L37)

#### success

> **success**: `boolean`
