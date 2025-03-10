type Settings = {
  /** Whether always to show mode status. (default: `false`) */
  showModeStatus: boolean;

  /** Whether to show proxy info in status bar. (default: `false`) */
  showProxyInStatusBar: boolean;

  /**
   * Timeout(ms) to show rich hints for keystroke,
   * 0 will disable rich hints. (default: `500`)
   */
  richHintsForKeystroke: number;

  /**
   * Whether to use [chjj/marked](https://github.com/chjj/marked) to parse markdown,
   * otherwise use github markdown API. (default: `true`)
   */
  useLocalMarkdownAPI: boolean;

  /** Whether to focus text input after quitting from vim editor. (default: `true`) */
  focusOnSaved: boolean;

  /** The maximum of items fetched from browser history. (default: `10`) */
  omnibarMaxResults: number;

  /** How many results will be listed out each page for Omnibar. (default: `100`) */
  omnibarHistoryCacheSize: number;

  /** Where to position Omnibar. ["middle", "bottom"] (default: `"middle"`) */
  omnibarPosition: "middle" | "bottom";

  /** Show suggestion URLs(default: `false`) */
  omnibarSuggestion: boolean;

  /**
   * Timeout duration before Omnibar suggestion URLs are queried, in milliseconds.
   * Helps prevent unnecessary HTTP requests and API rate-limiting. (default: `200`)
   */
  omnibarSuggestionTimeout: number;

  /** Whether to focus first candidate of matched result in Omnibar. (default: `false`) */
  focusFirstCandidate: boolean;

  /**
   * When total of opened tabs exceeds the number,
   * Omnibar will be used for choosing tabs. (default: `100`)
   * */
  tabsThreshold: number;

  /** Whether to show tab pickers vertically aligned. (default: `true`) */
  verticalTabs: boolean;

  /**
   * Extra CSS selector to pick elements for hints mode,
   * such as "\*.jfk-button, \*.goog-flat-menu-button". (default: `""`) */
  clickableSelector: string;

  /**
   * A regex to detect clickable links from text,
   * you could use `O` to open them.
   * (default: `/(https?|thunder|magnet):\/\/S+/ig`) */
  clickablePat: RegExp;

  /**
   * CSS selector for additional editable elements.
   * (default: `div.CodeMirror-scroll,div.ace_content`) */
  editableSelector: string;

  /**
   * Whether to use smooth scrolling when pressing keys like `j`/`k`/`e`/`d` to scroll page or elements.
   * (default: `true`)
   */
  smoothScroll: boolean;

  /**
   * Which mode to fall back after yanking text in visual mode.
   * Value could be one of ["", "Caret", "Normal"], default is "",
   * which means no action after yank.(default: `""`)
   * */
  modeAfterYank: string;

  /** A step size for each move by `j`/`k` (default: `70`) */
  scrollStepSize: number;

  /**
   * A force that is needed to start continuous scrolling after initial scroll step.
   * A bigger number will cause a flicker after initial step, but help to keep the first step precise.
   * (default: `0`)
   * */
  scrollFriction: number;

  /** A regex to match links that indicate next page. (default: `/((>>|next)+)/i`) */
  nextLinkRegex: RegExp;

  /** A regex to match links that indicate previous page. (default: `/((<<|prev(ious)?)+)/i`) */
  prevLinkRegex: RegExp;

  /** Alignment of hints on their target elements. ["left", "center", "right"] (default: `"center"`) */
  hintAlign: "left" | "center" | "right";

  /** Whether to wait for explicit input when there is only a single hint available (default: `false`) */
  hintExplicit: boolean;

  /** Whether new tab is active after entering hint while holding shift (default: `false`) */
  hintShiftNonActive: boolean;

  /** The default search engine used in Omnibar. (default: `"g"`) */
  defaultSearchEngine: string;

  /** A regex to match the sites that will have Surfingkeys disabled. (default: `undefined`) */
  blocklistPattern: RegExp | unedfined;

  /** Which tab will be focused after the current tab is closed. ["left", "right", "last"] (default: `"right"`) */
  focusAfterClosed: "left" | "right" | "last";

  /** The maximum of actions to be repeated. (default: `99`) */
  repeatThreshold: number;

  /** Whether to list opened tabs in order of most recently used beneath Omnibar. (default: `true`) */
  tabsMRUOrder: boolean;

  /** Whether to list history in order of most used beneath Omnibar. (default: `true`) */
  historyMUOrder: boolean;

  /** Where to new tab. ["left", "right", "first", "last", "default"] (default: `'default'`) */
  newTabPosition: "left" | "right" | "first" | "last" | "default";

  /**
   * Indicates for which errors Surfingkeys will show error page,
   * so that you could use Surfingkeys on those error pages.
   * For example, ["*"] to show error page for all errors,
   * or ["net::ERR_NAME_NOT_RESOLVED"] to show error page only for ERR_NAME_NOT_RESOLVED,
   * please refer to [net_error_list.h](https://github.com/adobe/chromium/blob/master/net/base/net_error_list.h)
   * for complete error list. (default: `[]`)
   */
  interceptedErrors: string[];

  /** Whether to turn on Emoji completion in Insert mode. (default: `false`) */
  enableEmojiInsertion: boolean;

  /** How many characters are needed after colon to show emoji suggestion. (default: `2`) */
  startToShowEmoji: number;

  /**
   * The language of the usage popover, only "zh-CN" is added for now,
   * PR for any other language is welcomed,
   * please see [l10n.json](https://github.com/brookhong/Surfingkeys/blob/master/pages/l108.json).
   * (default: `undefined`)
   */
  language: string | undefined;

  /**
   * Whether to prevent focus on input on page loaded,
   * set to true by default so that we could use Surfingkeys directly after page loaded,
   * otherwise we need press `Esc` to quit input. (default: `true`)
   * */
  stealFocusOnLoad: boolean;

  /**
   * Whether to enable auto focus after mouse click on some widget.
   * This is different with `stealFocusOnLoad`,
   * which is only for the time of page loaded.
   * For example, there is a hidden input box on a page,
   * it is turned to visible after user clicks on some other link.
   * If you don't like the input to be focused when it's turned to visible, you could set this to false.
   * (default: `true`)
   * */
  enableAutoFocus: boolean;

  /** To change css of the Surfingkeys UI elements. (default: `undefined`) */
  theme: string | undefined;

  /** Whether finding in page/Omnibar is case sensitive. (default: `false`) */
  caseSensitive: boolean;

  /** Whether to make caseSensitive true if the search pattern contains upper case characters. (default: `true`) */
  smartCase: boolean;

  /**
   * Whether to put cursor at end of input when entering an input box,
   * by false to put the cursor where it was when focus was removed from the input.
   * (default: `true`)
   */
  cursorAtEndOfInput: boolean;

  /**
   * Whether digits are reserved for repeats,
   * by false to enable mapping of numeric keys. (default: `true`)
   */
  digitForRepeat: boolean;

  /**
   * Insert mode is activated automatically when an editable element is focused,
   * so if document.body is editable for some window/iframe (such as docs.google.com),
   * Insert mode is always activated on the window/iframe,
   * which means all shortcuts from Normal mode will not be available.
   * With `editableBodyCare` as `true`,
   * Insert mode will not be activated automatically in this case. (default: `true`)
   */
  editableBodyCare: boolean;

  /**
   * When using `w` to loop through frames,
   * you could use this settings to exclude some of them,
   * such as those for advertisements.
   * (default: `["https://tpc.googlesyndication.com"]`)
   */
  ignoredFrameHosts: string[];

  /** Set it "emacs" to use emacs keybindings in the ACE editor. (default: `"vim"`) */
  aceKeybindings: "vim" | "emacs";

  /** Set it in format `[top, left, bottom, right]` to limit hints generation on `v` for entering visual mode,
   * such as `[window.innerHeight / 2 - 10, 0, window.innerHeight / 2 + 10, window.innerWidth]`
   * will make Surfingkeys generate Hints only for text that display on vertically middle of window.
   * (default: `null`)
   */
  caretViewport: string | null;

  /** All hosts that have enable feature -- mouse selection to query. (default: `[]`) */
  mouseSelectToQuery: string[];

  /** Whether to automatically speak the query string with TTS on inline query. (default: `false`) */
  autoSpeakOnInlineQuery: boolean;
};

declare const settings: Settings;
