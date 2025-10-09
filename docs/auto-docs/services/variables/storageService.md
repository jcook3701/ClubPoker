---
title: storageService
nav_order: 6
parent: services
---
[**ClubPoker**](../../..)

***

# Variable: storageService

> `const` **storageService**: `object`

Defined in: [services/storageService.ts:156](https://github.com/jcook3701/ClubPoker/blob/12cb2bc63eafa0b05c75059627365b9d3f9284a5/src/services/storageService.ts#L156)

## Type Declaration

### getLocalStorageItem()

> **getLocalStorageItem**: \<`T`\>(`key`) => `Promise`\<`null` \| `T`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`null` \| `T`\>

### getSessionStorageItem()

> **getSessionStorageItem**: \<`T`\>(`key`) => `Promise`\<`null` \| `T`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`null` \| `T`\>

### getSyncStorageItem()

> **getSyncStorageItem**: \<`T`\>(`key`) => `Promise`\<`null` \| `T`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`null` \| `T`\>

### removeLocalStorageItem()

> **removeLocalStorageItem**: (`key`) => `Promise`\<`void`\>

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

### removeSessionStorageItem()

> **removeSessionStorageItem**: (`key`) => `Promise`\<`void`\>

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

### removeSyncStorageItem()

> **removeSyncStorageItem**: (`key`) => `Promise`\<`void`\>

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

### setLocalStorageItem()

> **setLocalStorageItem**: \<`T`\>(`key`, `value`) => `Promise`\<`void`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`Promise`\<`void`\>

### setSessionStorageItem()

> **setSessionStorageItem**: \<`T`\>(`key`, `value`) => `Promise`\<`void`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`Promise`\<`void`\>

### setSyncStorageItem()

> **setSyncStorageItem**: \<`T`\>(`key`, `value`) => `Promise`\<`void`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`Promise`\<`void`\>
