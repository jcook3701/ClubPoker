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
