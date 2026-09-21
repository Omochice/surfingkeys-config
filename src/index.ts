const openOmnibar = (args: Record<string, unknown>) => () => {
  api.Front.openOmnibar(args);
};

const yankPageAs = (format: (title: string, url: string) => string) => () => {
  const text = format(document.title, window.location.href);
  api.Clipboard.write(text);
  api.Front.showBanner(`Yank this page as ${text}`);
};

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const parseTranslation = (body: string): string | undefined => {
  try {
    const sentences: unknown = JSON.parse(body)?.[0];
    if (!Array.isArray(sentences)) {
      return undefined;
    }
    const translated = sentences
      .map((sentence: unknown) =>
        Array.isArray(sentence) && typeof sentence[0] === "string"
          ? sentence[0]
          : "",
      )
      .join("");
    return translated === "" ? undefined : translated;
  } catch {
    return undefined;
  }
};

const translateSelectionTo = (targetLanguage: string) => () => {
  const text = window.getSelection()?.toString().trim();
  if (!text) {
    return;
  }
  const params = new URLSearchParams({
    client: "gtx",
    sl: "auto",
    tl: targetLanguage,
    dt: "t",
    q: text,
  });
  // The request goes through the background page because a fetch from the
  // page itself is subject to the CSP of whatever site is open.
  api.RUNTIME<{ text?: string; error?: string }>(
    "request",
    { url: `https://translate.googleapis.com/translate_a/single?${params}` },
    (response) => {
      const translated = parseTranslation(response.text ?? "");
      if (translated === undefined) {
        api.Front.showBanner(
          `Failed to translate: ${response.error ?? "unexpected response"}`,
        );
        return;
      }
      api.Front.showPopup(
        `<div style="white-space: pre-wrap;">${escapeHtml(translated)}</div>`,
      );
    },
  );
};

api.unmap("O");
api.unmap("o");
api.unmap("Y");
api.unmap("M");
api.unmap("m");
api.unmap("B");
api.unmap("b");
api.cunmap("<Ctrl-j>");

api.map("H", "S");
api.map("L", "D");

api.unmap("ZZ");
api.unmap(";t");
api.vunmap("t");
api.vunmap("q");

api.removeSearchAlias("d");

api.addSearchAlias("hd", "html.duckduckgo", "https://duckduckgo.com?q=", "s");

settings.defaultSearchEngine = "hd";
api.Hints.style("font-size: 16px;");
api.Hints.style("font-size: 16px;", "text");

api.mapkey(
  "o",
  "search word in current tab",
  openOmnibar({ type: "URLs", tabbed: false }),
);

api.mapkey(
  "O",
  "search word in other tab",
  openOmnibar({ type: "URLs", tabbed: true }),
);

api.mapkey(
  "gy",
  "Yank current page as typst link",
  yankPageAs((title, url) => `link("${url}")[${title}]`),
);

api.mapkey(
  "Y",
  "yank current page as markdown link",
  yankPageAs((title, url) => `[${title}](${url})`),
);

api.addSearchAlias(
  ">perplexity",
  "Perplexity",
  "https://www.perplexity.ai/?q=",
  "p",
);

api.mapkey(
  "P",
  "search word on perplexity in other tab",
  openOmnibar({ type: "SearchEngine", extra: ">perplexity", tabbed: true }),
);

api.mapkey(
  "b",
  "open bookmark in current tab",
  openOmnibar({ type: "Bookmarks", tabbed: false }),
);

api.mapkey(
  "B",
  "open bookmark in other tab",
  openOmnibar({ type: "Bookmarks", tabbed: true }),
);

api.mapkey(
  "t",
  "open tab search",
  openOmnibar({ type: "Tabs", tabbed: false }),
);

api.mapkey(
  "T",
  "open tab search",
  openOmnibar({ type: "Tabs", tabbed: false }),
);

api.vmapkey(
  "tr",
  "translate selection into Japanese",
  translateSelectionTo("ja"),
);
