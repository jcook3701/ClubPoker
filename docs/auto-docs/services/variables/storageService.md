# Variable: storageService

> `const` **storageService**: `object`

Defined in: [services/storageService.ts:176](https://github.com/jcook3701/ClubPoker/blob/4c5cbe98f5a9cdd2499f92e91b30048583a495e3/src/services/storageService.ts#L176)

## Type Declaration

### getLocalStorageItem()

> **getLocalStorageItem**: \<`T`\>(`key`) => `Promise`\<`T` \| `null`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`T` \| `null`\>

### getSessionStorageItem()

> **getSessionStorageItem**: \<`T`\>(`key`) => `Promise`\<`T` \| `null`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`T` \| `null`\>

### getSyncStorageItem()

> **getSyncStorageItem**: \<`T`\>(`key`) => `Promise`\<`T` \| `null`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`T` \| `null`\>

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
