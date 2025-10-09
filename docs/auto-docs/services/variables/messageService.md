---
title: messageService
nav_order: 5
parent: services
---
[**ClubPoker**](../../..)

***

# Variable: messageService

> `const` **messageService**: `object`

Defined in: [services/messageService.ts:67](https://github.com/jcook3701/ClubPoker/blob/12cb2bc63eafa0b05c75059627365b9d3f9284a5/src/services/messageService.ts#L67)

## Type Declaration

### onMessage()

> **onMessage**: \<`T`\>(`type`, `handler`) => () => `void`

#### Type Parameters

##### T

`T` *extends* keyof `MessageMap`

#### Parameters

##### type

`T`

##### handler

(`payload`, `sender`) => `void` \| `ResponseMap`\[`T`\] \| `Promise`\<`ResponseMap`\[`T`\]\>

#### Returns

> (): `void`

##### Returns

`void`

### sendMessage()

> **sendMessage**: \<`T`\>(`type`, `payload?`) => `Promise`\<`ResponseMap`\[`T`\]\>

#### Type Parameters

##### T

`T` *extends* keyof `MessageMap`

#### Parameters

##### type

`T`

##### payload?

`MessageMap`\[`T`\]

#### Returns

`Promise`\<`ResponseMap`\[`T`\]\>

### sendTabMessage()

> **sendTabMessage**: \<`T`\>(`tabId`, `type`, `payload`) => `Promise`\<`ResponseMap`\[`T`\]\>

#### Type Parameters

##### T

`T` *extends* keyof `MessageMap`

#### Parameters

##### tabId

`number`

##### type

`T`

##### payload

`MessageMap`\[`T`\]

#### Returns

`Promise`\<`ResponseMap`\[`T`\]\>
