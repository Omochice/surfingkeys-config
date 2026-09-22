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

const translateSelectionIntoJapanese = async () => {
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

api.addSearchAlias("hd", "https://duckduckgo.com?q=", {
  prompt: "html.duckduckgo",
  searchLeaderKey: "s",
});

settings.defaultSearchEngine = "hd";
api.Hints.style("font-size: 16px;");
api.Hints.style("font-size: 16px;", "text");

api.mapkey("o", openOmnibar({ type: "URLs", tabbed: false }), {
  annotation: "search word in current tab",
});

api.mapkey("O", openOmnibar({ type: "URLs", tabbed: true }), {
  annotation: "search word in other tab",
});

api.mapkey(
  "gy",
  yankPageAs((title, url) => `link("${url}")[${title}]`),
  {
    annotation: "Yank current page as typst link",
  },
);

api.mapkey(
  "Y",
  yankPageAs((title, url) => `[${title}](${url})`),
  {
    annotation: "yank current page as markdown link",
  },
);

api.addSearchAlias(">perplexity", "https://www.perplexity.ai/?q=", {
  prompt: "Perplexity",
  searchLeaderKey: "p",
});

api.mapkey(
  "P",
  openOmnibar({ type: "SearchEngine", extra: ">perplexity", tabbed: true }),
  {
    annotation: "search word on perplexity in other tab",
  },
);

api.mapkey("b", openOmnibar({ type: "Bookmarks", tabbed: false }), {
  annotation: "open bookmark in current tab",
});

api.mapkey("B", openOmnibar({ type: "Bookmarks", tabbed: true }), {
  annotation: "open bookmark in other tab",
});

api.mapkey("t", openOmnibar({ type: "Tabs", tabbed: false }), {
  annotation: "open tab search",
});

api.mapkey("T", openOmnibar({ type: "Tabs", tabbed: false }), {
  annotation: "open tab search",
});

api.vmapkey("tr", translateSelectionIntoJapanese, {
  annotation: "translate selection into Japanese",
});
