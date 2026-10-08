const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const parseTranslation = (body: string): string | undefined => {
  try {
    const sentences: unknown = JSON.parse(body)?.[0];
    if (!Array.isArray(sentences)) {
      return undefined;
    }
    return sentences
      .map((sentence: unknown) =>
        Array.isArray(sentence) && typeof sentence[0] === "string"
          ? sentence[0]
          : "",
      )
      .join("");
  } catch {
    return undefined;
  }
};

type RequestResponse = { text?: string; error?: string };

/**
 * Translates the current selection into Japanese and shows the result in a popup.
 * Failures are reported through a banner instead of being thrown.
 */
export const translateSelectionIntoJapanese = async () => {
  const text = window.getSelection()?.toString().trim();
  if (!text) {
    return;
  }
  const params = new URLSearchParams({
    client: "gtx",
    sl: "auto",
    tl: "ja",
    dt: "t",
    q: text,
  });
  // The request goes through the background page because a fetch from the
  // page itself is subject to the CSP of whatever site is open.
  const response = await api
    .request<RequestResponse>("request", {
      url: `https://translate.googleapis.com/translate_a/single?${params}`,
    })
    .catch((error: unknown): RequestResponse => ({ error: String(error) }));
  const translated = parseTranslation(response.text ?? "");
  if (!translated) {
    api.Front.showBanner(
      `Failed to translate: ${response.error ?? "unexpected response"}`,
    );
    return;
  }
  api.Front.showPopup(
    `<div style="white-space: pre-wrap;">${escapeHtml(translated)}</div>`,
  );
};
