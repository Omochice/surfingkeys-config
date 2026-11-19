type RequestResponse = { text?: string; error?: string };

const buildPrompt = (text: string) =>
  [
    "<|plamo:op|>dataset",
    "translation",
    "<|plamo:op|>input lang=English",
    text,
    "<|plamo:op|>output lang=Japanese",
    "",
  ].join("\n");

const parseResponse = (body: string): string | undefined => {
  try {
    const response: unknown = JSON.parse(body)?.response;
    return typeof response === "string" ? response.trim() : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Translates English text into Japanese with PLaMo 2 Translate served by a local Ollama.
 * @returns The translated text.
 * @throws When the request fails or the response carries no translation.
 */
export const translateIntoJapanese = async (text: string): Promise<string> => {
  // The request goes through the background page because a fetch from the
  // page itself is subject to the CSP of whatever site is open.
  const response = await api.request<RequestResponse>("request", {
    url: "http://ollama.localhost/api/generate",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      model: "plamo-2-translate",
      prompt: buildPrompt(text),
      // The model expects its own control tokens rather than a chat
      // template, so Ollama must not wrap the prompt.
      raw: true,
      stream: false,
      options: { temperature: 0, stop: ["<|plamo:op|>"] },
    }),
  });
  const translated = parseResponse(response.text ?? "");
  if (!translated) {
    throw new Error(response.error ?? "unexpected response");
  }
  return translated;
};
