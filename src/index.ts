const openOmnibar = (args: Record<string, unknown>) => () => {
  api.Front.openOmnibar(args);
};

const yankPageAs = (format: (title: string, url: string) => string) => () => {
  const text = format(document.title, window.location.href);
  api.Clipboard.write(text);
  api.Front.showBanner(`Yank this page as ${text}`);
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
