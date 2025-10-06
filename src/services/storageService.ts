/*
 * Save key value pair to google chrome app sync storage.
 */
export async function setSyncStorageItem<T>(
  key: string,
  value: T
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}

/*
 * Load value from a key within the google chrome app sync storage.
 */
export async function getSyncStorageItem<T>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(result[key] ?? null);
      }
    });
  });
}

/*
 * Remove key, value pair within the google chrome app sync storage.
 */
export async function removeSyncStorageItem(key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove(key, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}

/*
 * Save key value pair to google chrome app local storage.
 */
export async function setLocalStorageItem<T>(
  key: string,
  value: T
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}

/*
 * Load value from a key within the google chrome app local storage.
 */
export async function getLocalStorageItem<T>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(result[key] ?? null);
      }
    });
  });
}

/*
 * Remove key, value pair within the google chrome app local storage.
 */
export async function removeLocalStorageItem(key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(key, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}

/*
 * Try to read from local storage; if empty, fall back to DOM parser,
 * then persist the DOM result to local storage.
 */
export async function getOrInitLocal<T>(key: string, value: T): Promise<T> {
  const storedValue = await getLocalStorageItem<T>(key);

  if (storedValue !== null) {
    return storedValue;
  }
  await setLocalStorageItem(key, value);
  return value;
}

/*
 * Save key value pair to session storage (cleared on page reload).
 */
export async function setSessionStorageItem<T>(
  key: string,
  value: T
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

/*
 * Load value from a key within session storage (cleared on page reload).
 */
export async function getSessionStorageItem<T>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    try {
      const item = sessionStorage.getItem(key);
      resolve(item ? (JSON.parse(item) as T) : null);
    } catch (err) {
      reject(err);
    }
  });
}

/*
 * Remove key, value pair within session storage (cleared on page reload).
 */
export async function removeSessionStorageItem(key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      sessionStorage.removeItem(key);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
