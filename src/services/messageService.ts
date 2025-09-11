import { Message, MessageMap } from "../constants/messages";

/* Strongly-typed chrome.runtime.sendMessage wrapper */
export const sendMessage = <T extends keyof MessageMap>(
  type: T,
  payload: MessageMap[T]
): Promise<unknown> => {
  return chrome.runtime.sendMessage({ type, payload } as Message<T>);
};

/* Strongly-typed chrome.tab.sendMessage wrapper */
export const sendTabMessage = <T extends keyof MessageMap>(
  tabId: number,
  type: T,
  payload: MessageMap[T]
): Promise<unknown> => {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, { type, payload }, resolve);
  });
};

/* Strongly-typed onMessage wrapper */
export const onMessage = <T extends keyof MessageMap>(
  type: T,
  handler: (
    payload: MessageMap[T],
    sender: chrome.runtime.MessageSender
  ) => void | boolean | Promise<void | boolean>
): (() => void) => {
  const listener = (
    message: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ) => {
    if (message.type === type) {
      const result = handler(message.payload as MessageMap[T], sender);

      // Support async handlers (returning Promise)
      if (result instanceof Promise) {
        result.then(sendResponse);
        return true; // keep channel open for async responses
      }
      return result;
    }
  };

  chrome.runtime.onMessage.addListener(listener);

  // Return unsubscribe so you can remove listener later if needed
  return () => chrome.runtime.onMessage.removeListener(listener);
};
