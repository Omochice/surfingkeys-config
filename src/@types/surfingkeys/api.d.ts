type Front = {
  /**
   * open the omnibar.
   *
   * @param args `type` the sub type for the omnibar, which can be `bookmarks`, `addbookmark`, `history`, `urls`, `recentlyclosed`, `taburls`, `tabs`, `windows`, `vimarks`, `searchengine`, `commands`, `omniquery` and `userurls`.
   * @example
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
   * Register an inline query.
   *
   * @see [example][110].
   *
   * @param args `url`: string or function, `parseResult`: function, a function to parse result from dictionary service and return a HTML string to render explanation, `headers`: object\[optional], in case your dictionary service needs authentication.
   */
  // FIXME
  registerInlineQuery(args: {
    url: string | ((...args: unknown[]) => unknown);
    parseResult: (args: unknown[]) => string;
    headers?: Record<string, string>;
  }): void;

  /**
   * Show message in banner.
   *
   * @param `msg` the message to be displayed in banner.
   * @param `timeout` milliseconds after which the banner will disappear. (optional, default `1600`)
   * @example
   * ```javascript
   * Front.showBanner(window.location.href);
   * ```
   */
  showBanner(msg: string, timeout?: number): void;

  /**
   * Show message in popup.
   *
   * @param msg the message to be displayed in popup.
   *
   * @example
   * ```javascript
   * Front.showPopup(window.location.href);
   * ```
   */
  showPopup(msg: string): void;
};

type Hints = {
  /**
   * Set characters for generating hints, this API is to replace original setting like `Hints.characters = "asdgqwertzxcvb";`.
   *
   * @param characters the characters for generating hints.
   * @example
   * ```javascript
   * Hints.setCharacters("asdgqwertzxcvb");
   * ```
   */
  setCharacters(characters: string): void;

  /**
   * Use digits as hint label, with it set you could type text to filter links, this API is to replace original setting like `Hints.numericHints = true;`.
   *
   * @example
   * ```javascript
   * Hints.setNumeric();
   * ```
   */
  setNumeric(): void;

  /**
   * The default `onHintKey` implementation.
   * @see {@link Hints.create}
   *
   * @param element **[HTMLElement][108]** the element for which the pressed hint is targeted.
   * ```javascript
   * mapkey('q', 'click on images', function() {
   *     Hints.create("div.media_box img", Hints.dispatchMouseClick);
   * }, {domain: /weibo.com/i});
   * ```
   */
  dispatchMouseClick(element: HTMLElement): void;

  /**
   * Click element or create hints for elements to click.
   *
   * @param links click on it if there is only one in the array or `force` parameter is true, otherwise hints will be generated for them. If `links` is a string, it will be used as css selector for `getClickableElements`.
   * @param force force to click the first input element whether there are more than one elements in `links` or not. (optional, default `false`)
   *
   * @example
   * ```javascript
   * mapkey('zz', 'Hide replies', function() {
   *     Hints.click(document.querySelectorAll("#less-replies:not([hidden])"), true);
   * });
   * ```
   */
  click(links: string | HTMLElement[], force = false): void;

  /**
   * Create hints for elements to click.
   * @see {@link Hints.dispatchMouseClick}
   *
   * @param cssSelector if `links` is a string, it will be used as css selector.
   * @param onHintKey a callback function on hint keys pressed.
   * @param attrs `active`: whether to activate the new tab when a link is opened, `tabbed`: whether to open a link in a new tab, `multipleHits`: whether to stay in hints mode after one hint is triggered. (optional, default `null`)
   *
   * @example
   *
   * ```javascript
   * mapkey('yA', '#7Copy a link URL to the clipboard', function() {
   *     Hints.create('*[href]', function(element) {
   *         Clipboard.write('[' + element.innerText + '](' + element.href + ')');
   *     });
   * });
   * ```
   *
   * @Returns whether any hint is created for target elements.
   */
  create(
    cssSelector: string | HTMLElement[],
    onHintKey: (element: Element) => void,
    attrs: "active" | "tabbed" | "multipleHits" | null = null,
  ): boolean;

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
   * Read from clipboard.
   *
   * @param onReady a callback function to handle text read from clipboard.
   * @example
   * ```javascript
   * Clipboard.read(function(response) {
   *   console.log(response.data);
   * });
   * ```
   */
  read(onReady: (response: unknown) => void): void;

  /**
   * Write text to clipboard.
   *
   * @param text the text to be written to clipboard.
   * @example
   * ```javascript
   * Clipboard.write(window.location.href);
   * ```
   */
  write(text: string): void;
};

type Normal = {
  /**
   * Enter PassThrough mode.
   *
   * @param timeout how many milliseconds to linger in PassThrough mode, to ignore it will stay in PassThrough mode until an Escape key is pressed.
   */
  passThrough(timeout?: number): void;

  /**
   * Scroll within current target.
   *
   * @param type down | up | pageDown | fullPageDown | pageUp | fullPageUp | top | bottom | left | right | leftmost | rightmost | byRatio
   */
  scroll(
    type:
      | "down"
      | "up"
      | "pageDown"
      | "fullPageDown"
      | "pageUp"
      | "fullPageUp"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "leftmost"
      | "rightmost"
      | "byRatio",
  ): void;

  /**
   * Feed keys into Normal mode.
   *
   * @param keys the keys to be fed into Normal mode.
   */
  feedkeys(keys: string): void;

  /**
   * Jump to a vim-like mark.
   *
   * @param   mark a vim-like mark.
   */
  jumpViMark(mark: string): void;
};

type Visual = {
  /**
   * Set styles for visual mode.
   *
   * @param element element in visual mode, which can be `marks` and `cursor`.
   * @param style css style
   *
   * @sxample
   *
   * ```javascript
   * Visual.style('marks', 'background-color: #89a1e2;');
   * Visual.style('cursor', 'background-color: #9065b7;');
   * ```
   */
  style(element: "marks" | "cursor", style: string);
};

type Api = {
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
   * Create a shortcut in visual mode to execute your own action.
   * @see {@link Api.mapkey}
   *
   * @param keys the key sequence for the shortcut.
   * @param annotation a help message to describe the action, which will displayed in help opened by `?`.
   * @param jscode a Javascript function to be bound. If the function needs an argument, next pressed key will be fed to the function.
   * @param options `domain`: regex, a Javascript regex pattern to identify the domains that this mapping works, for example, `/github\.com/i` says that this mapping works only for github.com, `repeatIgnore`: boolean, whether this action can be repeated by dot command. (optional, default `null`)
   */
  vmapkey(
    keys: string,
    annotation: string,
    jscode: () => void,
    options?: { domain?: RegExp; repeatIgnore?: boolean },
  ): void;

  /**
   * Create a shortcut in insert mode to execute your own action.
   * @see {@link Api.mapkey}
   *
   * @param keys the key sequence for the shortcut.
   * @param annotation a help message to describe the action, which will displayed in help opened by `?`.
   * @param jscode a Javascript function to be bound. If the function needs an argument, next pressed key will be fed to the function.
   * @param options `domain`: regex, a Javascript regex pattern to identify the domains that this mapping works, for example, `/github\.com/i` says that this mapping works only for github.com, `repeatIgnore`: boolean, whether this action can be repeated by dot command. (optional, default `null`)
   */
  imapkey(
    keys: string,
    annotation: string,
    jscode: () => void,
    options?: { domain?: RegExp; repeatIgnore?: boolean },
  ): void;

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
   * Unmap all keybindings except those specified.
   *
   * @param keystrokes **[array][106]** the keybindings you want to keep.
   * @param domain **regex** a Javascript regex pattern to identify the domains that this mapping will be removed. (optional, default `null`)
   *
   * @example
   * ```javascript
   * unmapAllExcept(['E','R','T'], /google.com|twitter.com/);
   * ```
   */
  unmapAllExcept(keystroke: string, domain?: RegExp): void;

  /**
   * Map a key sequence to another in insert mode.
   * @see {@link Api.map}
   *
   * @param new_keystroke - The new_keystroke param
   * @param old_keystroke - The old_keystroke param
   * @param domain a Javascript regex pattern to identify the domains that this mapping works. (optional, default `null`)
   * @param new_annotation use it instead of the annotation from old_keystroke if provided. (optional, default `null`)
   */
  imap(
    new_keystroke: string,
    old_keystroke: string,
    domain?: RegExp,
    new_annotation?: string,
  ): void;

  /**
   * Unmap a key sequence in insert mode.
   * @see {Api.unmap}
   *
   * @param keystroke a key sequence to be removed.
   * @param domain a Javascript regex pattern to identify the domains that this mapping will be removed. (optional, default `null`)
   */
  iunmap(keystroke: string, domain?: RegExp): void;

  /**
   * Map a key sequence to another in omnibar.
   * @see {@link Api.map}
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
   * Map a key sequence to another in visual mode.
   * @see {@link Api.map}
   *
   * @param new_keystroke - The new_keystroke param
   * @param old_keystroke - The old_keystroke param
   * @param domain a Javascript regex pattern to identify the domains that this mapping works. (optional, default `null`)
   * @param new_annotation use it instead of the annotation from old_keystroke if provided. (optional, default `null`)
   */
  vmap(
    new_keystroke: string,
    old_keystroke: string,
    domain?: RegExp,
    new_annotation?: string,
  ): void;

  /**
   * Unmap a key sequence in visual mode.
   * @see {Api.unmap}
   *
   * @param keystroke a key sequence to be removed.
   * @param domain a Javascript regex pattern to identify the domains that this mapping will be removed. (optional, default `null`)
   */
  vunmap(keystroke: string, domain?: RegExp): void;

  /**
   * Map a key sequence to another in lurk mode.
   * @see {@link Api.map}
   *
   * @param new_keystroke - The new_keystroke param
   * @param old_keystroke - The old_keystroke param
   * @param domain a Javascript regex pattern to identify the domains that this mapping works. (optional, default `null`)
   * @param new_annotation use it instead of the annotation from old_keystroke if provided. (optional, default `null`)
   */
  lmap(
    new_keystroke: string,
    old_keystroke: string,
    domain?: RegExp,
    new_annotation?: string,
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

  /**
   * Remove a search engine alias from Omnibar.
   *
   * @param `alias` the alias of the search engine to be removed.
   * @param `search_leader_key` `<search_leader_key><alias>` in normal mode will search selected text with this search engine directly without opening the omnibar, for example `sd`. (optional, default `s`)
   * @param `only_this_site_key` `<search_leader_key><only_this_site_key><alias>` in normal mode will search selected text within current site with this search engine directly without opening the omnibar, for example `sod`. (optional, default `o`)
   * @example
   * ```javascript
   * removeSearchAlias('d');
   * ```
   */
  removeSearchAlias(
    alias: string,
    search_leader_key = "s",
    only_this_site_key = "o",
  ): void;

  /**
   * Search selected with.
   *
   * @param se **[string][103]** a search engine's search URL
   * @param onlyThisSite **[boolean][107]** whether to search only within current site, need support from the provided search engine. (optional, default `false`)
   * @param interactive **[boolean][107]** whether to search in interactive mode, in case that you need some small modification on the selected content. (optional, default `false`)
   * @param alias **[string][103]** only used with interactive mode, in such case the url from `se` is ignored, SurfingKeys will construct search URL from the alias registered by `addSearchAlias`. (optional, default `""`)
   * @example
   * ```javascript
   * searchSelectedWith('https://translate.google.com/?hl=en#auto/en/');
   * ```
   */
  searchSelectedWith(
    se: string,
    onlyThisSite = false,
    interactive = false,
    alias = "",
  ): void;

  /**
   * Get current browser name
   *
   * Returns "Chrome" | "Firefox" | "Safari"
   */
  getBrowserName(): "Chrome" | "Firefox" | "Safari";

  /**
   * Check whether an element is in viewport.
   * @param `el` the element to be checked.
   * @param `ignoreSize` whether to ignore size of the element, otherwise the element must be with size 4\*4. (optional, default `false`)
   *
   * @return whether an element is in viewport.
   */
  isElementPartiallyInViewport(el: Element, ignoreSize = false): boolean;

  /**
   * Get all clickable elements. SurfingKeys has its own logic to identify clickable elements, such as a `HTMLAnchorElement` or elements with cursor as pointer. This function provides two parameters to identify those clickable elements that SurfingKeys failed to identify.
   *
   * @param selectorString **[string][103]** extra css selector of those clickable elements.
   * @param pattern **regex** a regular expression that matches text of the clickable elements.
   * @return array of clickable elements.
   * @example
   * ```javascript
   * var elms = getClickableElements("[rel=link]", /click this/);
   * ```
   */
  getClickableElements(selectorString: string, pattern: RegExp): Element[];

  /**
   * Open links in new tabs.
   *
   * @param str **[string][103]** links to be opened, the links should be split by `\n` if there are more than one.
   * @param simultaneousness **[number][109]** how many tabs will be opened simultaneously, the rest will be queued and opened later whenever a tab is closed. (optional, default `5`)
   * @example
   * ```javascript
   * mapkey("<Space>", "pause/resume on youtube", function() {
   *     var btn = document.querySelector("button.ytp-ad-overlay-close-button") || document.querySelector("button.ytp-ad-skip-button") || document.querySelector('ytd-watch-flexy button.ytp-play-button');
   *     btn.click();
   * }, {domain: /youtube.com/i});
   * ```
   */
  tabOpenLink(str: string, simultaneousness = 5): void;

  /**
   * Insert javascript code into main world context.
   *
   * @params code a javascript function to be executed in main world context, or an URL of js file.
   * @params onload a callback function after requested code executed.
   */
  insertJS(
    code: string | ((...args: unknown[]) => unknown),
    onload?: (...args: unknown[]) => unknown,
  ): void;

  /**
   * Map the key sequence `lhs` to `rhs` for mode `ctx` in ACE editor.
   *
   * @param `lhs` **[string][103]** a key sequence to replace
   * @param `rhs` **[string][103]** a key sequence to be replaced
   * @param `ctx` **[string][103]** a mode such as `insert`, `normal`.
   * @example
   * ```javascript
   * aceVimMap('J', ':bn', 'normal');
   * ```
   */
  aceVimMap(lhs: string, rhs: string, ctx: "insert" | "normal"): void;

  /**
   * Add map key in ACE editor.
   *
   * @param `objects` multiple objects to define key map in ACE, see more from [ace/keyboard/vim.js][112]
   * @example
   * ```javascript
   * addVimMapKey(
   *     {
   *         keys: 'n',
   *         type: 'motion',
   *         motion: 'moveByCharacters',
   *         motionArgs: {
   *             forward: false
   *         }
   *     },
   *
   *     {
   *         keys: 'e',
   *         type: 'motion',
   *         motion: 'moveByLines',
   *         motionArgs: {
   *             forward: true,
   *             linewise: true
   *         }
   *     }
   * );
   * ```
   */
  addVimMapKey(
    ...objects: {
      keys: string;
      type: string;
      motion: string;
      motionArgs: { forward: false } | { forward: true; linewise: boolean };
    }[]
  ): void;

  /**
   * Call background `action` with `args`, the `callback` will be executed with response from background.
   *
   * Parameters
   *
   * @param action a background action to be called.
   * @param args the parameters to be passed to the background action.
   * @param callback a function to be executed with the result from the background action.
   *
   * @example
   * ```javascript
   * RUNTIME('getTabs', {queryInfo: {currentWindow: true}}, response => {
   *   console.log(response);
   * });
   * ```
   */
  RUNTIME(
    action: string,
    args?: object,
    callback?: (response: unknown) => void,
  ): void;
  Front: Front;
  Hints: Hints;
  Clipboard: Clipboard_;
  Normal: Normal;
  Visual: Viaual;
};

declare const api: Api;
