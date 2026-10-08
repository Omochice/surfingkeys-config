import { translateIntoJapanese } from "./ollama";

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

/**
 * Translates the current selection into Japanese and shows the result in a popup.
 * Failures are reported through a banner instead of being thrown.
 */
export const translateSelectionIntoJapanese = async () => {
  const text = window.getSelection()?.toString().trim();
  if (!text) {
    return;
  }
  api.Front.showBanner("Translating...");
  try {
    const translated = await translateIntoJapanese(text);
    api.Front.showPopup(
      `<div style="white-space: pre-wrap;">${escapeHtml(translated)}</div>`,
    );
  } catch (error: unknown) {
    api.Front.showBanner(
      `Failed to translate: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
