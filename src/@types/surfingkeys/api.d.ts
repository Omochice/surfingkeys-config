type Front = {
  /**
   * open the omnibar.
   *
   * @param args `type` the sub type for the omnibar, which can be `bookmarks`, `addbookmark`, `history`, `urls`, `recentlyclosed`, `taburls`, `tabs`, `windows`, `vimarks`, `searchengine`, `commands`, `omniquery` and `userurls`.
   * @examples
   * ```javascript
   * mapkey('ou', '#8open aws services', function() {
   *     var services = array.from(top.document.queryselectorall('#awsc-services-container li[data-service-href]')).map(function(li) {
   *         return {
   *             title: li.queryselector("span.service-label").textcontent,
   *             url: li.getattribute('data-service-href')
   *         };
   *     });
   *     if (services.length === 0) {
   *         services = array.from(top.document.queryselectorall('div[data-testid="awsc-nav-service-list"] li[data-testid]>a')).map(function(a) {
   *             return {
   *                 title: a.innertext,
   *                 url: a.href
   *             };
   *         });
   *     }
   *     front.openomnibar({type: "userurls", extra: services});
   * }, {domain: /console.amazonaws|console.aws.amazon.com/i});
   * ```
   */
  openOmnibar(args: { type: string; extra?: unknown; tabbed?: boolean }): void;

  /**
   * Show message in banner.
   *
   * @param `msg` the message to be displayed in banner.
   * @param `timeout` milliseconds after which the banner will disappear. (optional, default `1600`)
   * @examples
   * ```javascript
   * Front.showBanner(window.location.href);
   * ```
   */
  showBanner(msg: string, timeout?: number): void;
};

type Hints = {
  /**
   * Set styles for hints.
   *
   * @param css styles for hints.
   * @param mode sub mode for hints, use `text` for hints mode to enter visual mode. (optional, default `null`)
   * @example
   * ```javascript
   * Hints.style('border: solid 3px #552a48; color:#efe1eb; background: none; background-color: #552a48;');
   * Hints.style("div{border: solid 3px #707070; color:#efe1eb; background: none; background-color: #707070;} div.begin{color:red;}", "text");
   * ```
   */
  style(css: string, mode?: string): void;
};

type Clipboard_ = {
  /**
   * Write text to clipboard.
   *
   * @param text the text to be written to clipboard.
   * @examples
   * ```javascript
   * Clipboard.write(window.location.href);
   * ```
   */
  write(text: string): void;
};

type Api = {
  /**
   * Unmap a key sequence in normal mode.
   *
   * @param keystroke a key sequence to be removed.
   * @param domain a Javascript regex pattern to identify the domains that this mapping will be removed. (optional, default `null`)
   * @example
   * ```javascript
   * unmap("<<", /youtube.com/);
   * ```
   */
  unmap(keystroke: string, domain?: RegExp): void;

  /**
   * Map a key sequence to another in normal mode.
   *
   * @param new_keystroke a key sequence to replace
   * @param old_keystroke a key sequence to be replaced
   * @param domain a Javascript regex pattern to identify the domains that this mapping works. (optional, default `null`)
   * @param new_annotation use it instead of the annotation from old_keystroke if provided. (optional, default `null`)
   * @example
   * ```javascript
   * map(';d', '<Ctrl-Alt-d>');
   * ```
   */
  map(
    new_keystroke: string,
    old_keystroke: string,
    domain?: RegExp,
    new_annotation?: string,
  ): void;

  /**
   * Map a key sequence to another in omnibar.
   * @see {@link map}
   *
   * @param new_keystroke - The new_keystroke param
   * @param old_keystroke - The old_keystroke param
   * @param domain a Javascript regex pattern to identify the domains that this mapping works. (optional, default `null`)
   * @param new_annotation use it instead of the annotation from old_keystroke if provided. (optional, default `null`)
   */
  cmap(
    new_keystroke: string,
    old_keystroke: string,
    domain?: RegExp,
    new_annotation?: string,
  ): void;

  /**
   * Create a shortcut in normal mode to execute your own action.
   *
   * @param keys the key sequence for the shortcut.
   * @param annotation a help message to describe the action, which will displayed in help opened by `?`.
   * @param jscode a Javascript function to be bound. If the function needs an argument, next pressed key will be fed to the function.
   * @param options `domain`: regex, a Javascript regex pattern to identify the domains that this mapping works, for example, `/github\.com/i` says that this mapping works only for github.com, `repeatIgnore`: boolean, whether this action can be repeated by dot command. (optional, default `null`)
   * @example
   * ```javascript
   * mapkey("<Space>", "pause/resume on youtube", function() {
   *     var btn = document.querySelector("button.ytp-ad-overlay-close-button") || document.querySelector("button.ytp-ad-skip-button") || document.querySelector('ytd-watch-flexy button.ytp-play-button');
   *     btn.click();
   * }, {domain: /youtube.com/i});
   * ```
   */
  mapkey(
    keys: string,
    annotation: string,
    jscode: () => void,
    options?: { domain?: RegExp; repeatIgnore?: boolean },
  ): void;

  /**
   * Remove a search engine alias from Omnibar.
   *
   * @param alias the alias of the search engine to be removed.
   * @param search_leader_key `<search_leader_key><alias>` in normal mode will search selected text with this search engine directly without opening the omnibar, for example `sd`. (optional, default `s`)
   * @param only_this_site_key `<search_leader_key><only_this_site_key><alias>` in normal mode will search selected text within current site with this search engine directly without opening the omnibar, for example `sod`. (optional, default `o`)
   * @example
   * ```javascript
   * removeSearchAlias('d');
   * ```
   */
  removeSearchAlias(
    alias: string,
    search_leader_key?: string,
    only_this_site_key?: string,
  ): void;

  /**
   * Add a search engine alias into Omnibar.
   *
   * @param alias the key to trigger this search engine, one or several chars, used as search alias, when you input the string and press `space` in omnibar, the search engine will be triggered.
   * @param prompt a caption to be placed in front of the omnibar.
   * @param search_url the URL of the search engine, for example, `https://www.s.com/search.html?query=`, if there are extra parameters for the search engine, you can use it as `https://www.s.com/search.html?query={0}&type=cs` or `https://www.s.com/search.html?type=cs&query=`(since order of URL parameters usually does not matter).
   * @param search_leader_key `<search_leader_key><alias>` in normal mode will search selected text with this search engine directly without opening the omnibar, for example `sd`. (optional, default `s`)
   * @param suggestion_url the URL to fetch suggestions in omnibar when this search engine is triggered. (optional, default `null`)
   * @param callback_to_parse_suggestion a function to parse the response from `suggestion_url` and return a list of strings as suggestions. Receives two arguments: `response`, the first argument, is an object containing a property `text` which holds the text of the response; and `request`, the second argument, is an object containing the properties `query` which is the text of the query and `url` which is the formatted URL for the request. (optional, default `null`)
   * @param only_this_site_key `<search_leader_key><only_this_site_key><alias>` in normal mode will search selected text within current site with this search engine directly without opening the omnibar, for example `sod`. (optional, default `o`)
   * @param options `favicon_url` URL for favicon for this search engine, `skipMaps` if `true` disable creating key mappings for this search engine (optional, default `null`)
   * @example
   * ```javascript
   * addSearchAlias('d', 'duckduckgo', 'https://duckduckgo.com/?q=', 's', 'https://duckduckgo.com/ac/?q=', function(response) {
   *     var res = JSON.parse(response.text);
   *     return res.map(function(r){
   *         return r.phrase;
   *     });
   * });
   * ```
   */
  addSearchAlias(
    alias: string,
    prompt: string,
    search_url: string,
    search_leader_key?: string,
    suggestion_url?: string,
    callback_to_parse_suggestion?: (
      response: { text: string },
      request: { query: string; url: string },
    ) => string[],
    only_this_site_key?: string,
    options?: { favicon_url?: string; skipMaps?: boolean },
  ): void;

  Front: Front;
  Hints: Hints;
  Clipboard: Clipboard_;
};

declare const api: Api;
