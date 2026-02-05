# Variable: messageService

> `const` **messageService**: `object`

Defined in: [services/messageService.ts:87](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/services/messageService.ts#L87)

## Type Declaration

### onMessage()

> **onMessage**: \<`T`\>(`type`, `handler`) => () => `void`

#### Type Parameters

##### T

`T` *extends* keyof [`MessageMap`](../../types/type-aliases/MessageMap.md)

#### Parameters

##### type

`T`

##### handler

(`payload`, `sender`) => `void` \| [`ResponseMap`](../../types/type-aliases/ResponseMap.md)\[`T`\] \| `Promise`\<[`ResponseMap`](../../types/type-aliases/ResponseMap.md)\[`T`\]\>

#### Returns

> (): `void`

##### Returns

`void`

### sendMessage()

> **sendMessage**: \<`T`\>(`type`, `payload?`) => `Promise`\<[`ResponseMap`](../../types/type-aliases/ResponseMap.md)\[`T`\]\>

#### Type Parameters

##### T

`T` *extends* keyof [`MessageMap`](../../types/type-aliases/MessageMap.md)

#### Parameters

##### type

`T`

##### payload?

[`MessageMap`](../../types/type-aliases/MessageMap.md)\[`T`\]

#### Returns

`Promise`\<[`ResponseMap`](../../types/type-aliases/ResponseMap.md)\[`T`\]\>

### sendTabMessage()

> **sendTabMessage**: \<`T`\>(`tabId`, `type`, `payload`) => `Promise`\<[`ResponseMap`](../../types/type-aliases/ResponseMap.md)\[`T`\]\>

#### Type Parameters

##### T

`T` *extends* keyof [`MessageMap`](../../types/type-aliases/MessageMap.md)

#### Parameters

##### tabId

`number`

##### type

`T`

##### payload

[`MessageMap`](../../types/type-aliases/MessageMap.md)\[`T`\]

#### Returns

`Promise`\<[`ResponseMap`](../../types/type-aliases/ResponseMap.md)\[`T`\]\>
