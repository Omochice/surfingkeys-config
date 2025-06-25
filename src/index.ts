api.unmap("H");
api.unmap("L");
api.unmap("O");
api.unmap("o");
api.unmap("Y");
api.unmap("M");
api.unmap("m");
api.unmap("B");
api.unmap("b");

api.cmap("<Ctrl-j>", "");

api.map("H", "S");
api.map("L", "D");

api.unmap("ZZ");

api.removeSearchAlias("d");

api.addSearchAlias("hd", "html.duckduckgo", "https://duckduckgo.com?q=", "s");

settings.defaultSearchEngine = "hd";
api.Hints.style("font-size: 16px;");

api.mapkey("o", "search word in current tab", () => {
  api.Front.openOmnibar({
    type: "URLs",
    extra: "hd",
    tabbed: false,
  });
});

api.mapkey("O", "search word in other tab", () => {
  api.Front.openOmnibar({
    type: "URLs",
    extra: "hd",
    tabbed: true,
  });
});

api.mapkey("gy", "Yank current page as typst link", () => {
  const text = `link("${window.location.href}")[${document.title}]`;
  api.Clipboard.write(text);
  api.Front.showBanner(`Yank this page as ${text}`);
});

api.mapkey("Y", "yank current page as markdown link", () => {
  const text = `[${document.title}](${window.location.href})`;
  api.Clipboard.write(text);
  api.Front.showBanner(`Yank this page as ${text}`);
});

api.addSearchAlias(
  ">perplexity",
  "Perplexity",
  "https://www.perplexity.ai/?q=",
  "p",
);

api.mapkey("P", "search word on perplexity in other tab", () => {
  api.Front.openOmnibar({
    type: "SearchEngine",
    extra: ">perplexity",
    tabbed: true,
  });
});

api.mapkey("b", "open bookmark in current tab", () => {
  api.Front.openOmnibar({
    type: "Bookmarks",
    tabbed: false,
  });
});

api.mapkey("B", "open bookmark in current tab", () => {
  api.Front.openOmnibar({
    type: "Bookmarks",
    tabbed: true,
  });
});

api.mapkey("t", "open tab search", () => {
  api.Front.openOmnibar({
    type: "Tabs",
    tabbed: false,
  });
});

api.mapkey("T", "open tab search", () => {
  api.Front.openOmnibar({
    type: "Tabs",
    tabbed: false,
  });
});
