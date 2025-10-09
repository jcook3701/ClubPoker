[**ClubPoker**](../../README.md)

***

# Variable: messageService

> `const` **messageService**: `object`

Defined in: [services/messageService.ts:67](https://github.com/jcook3701/ClubPoker/blob/2a58122796b9af788ff085b79c7f9364706df585/src/services/messageService.ts#L67)

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
