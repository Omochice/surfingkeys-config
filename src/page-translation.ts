import { restore, serialize } from "./inline-markup";
import { translateIntoJapanese } from "./ollama";

const BLOCK_SELECTOR =
  "p, li, h1, h2, h3, h4, h5, h6, td, th, blockquote, dt, dd, figcaption, caption, summary";
const EXCLUDED_ANCESTOR_SELECTOR =
  "pre, code, script, style, textarea, input, select, [contenteditable]";
const JAPANESE = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
const LETTER = /\p{L}/u;
// Kept low because the local model shares the machine with the browser, and
// a long page would otherwise flood it with requests at once.
const CONCURRENCY = 2;

type Original = { block: Element; children: Node[]; title: string | null };

type Session = {
  generation: number;
  observer: IntersectionObserver;
  queue: Element[];
  running: number;
  originals: Original[];
  failureReported: boolean;
};

let generation = 0;
let session: Session | undefined;

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();

const isCandidate = (block: Element) => {
  const text = normalize(block.textContent ?? "");
  return (
    LETTER.test(text) &&
    !JAPANESE.test(text) &&
    block.closest(EXCLUDED_ANCESTOR_SELECTOR) === null &&
    serialize(block) !== undefined
  );
};

const reportFailure = (current: Session, error: unknown) => {
  if (current.failureReported) {
    return;
  }
  current.failureReported = true;
  api.Front.showBanner(
    `Failed to translate: ${error instanceof Error ? error.message : String(error)}`,
  );
};

const translateBlock = async (current: Session, block: Element) => {
  const serialized = serialize(block);
  if (serialized === undefined) {
    return;
  }
  const source = block.textContent;
  const translated = await translateIntoJapanese(serialized.text);
  // The page may have rewritten the block while the model was running, and
  // the slots would then point at nodes that are no longer there.
  if (current.generation !== generation || block.textContent !== source) {
    return;
  }
  const nodes = restore(translated, serialized.slots);
  if (nodes === undefined) {
    throw new Error("inline markup was lost in translation");
  }
  current.originals.push({
    block,
    children: Array.from(block.childNodes),
    title: block.getAttribute("title"),
  });
  block.setAttribute("title", normalize(source ?? ""));
  block.replaceChildren(...nodes);
};

const drain = (current: Session) => {
  while (current.generation === generation && current.running < CONCURRENCY) {
    const block = current.queue.shift();
    if (block === undefined) {
      return;
    }
    current.running += 1;
    translateBlock(current, block)
      .catch((error: unknown) => {
        if (current.generation === generation) {
          reportFailure(current, error);
        }
      })
      .finally(() => {
        current.running -= 1;
        drain(current);
      });
  }
};

const start = (): Session => {
  generation += 1;
  const current: Session = {
    generation,
    observer: new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          current.observer.unobserve(entry.target);
          current.queue.push(entry.target);
        }
      }
      drain(current);
    }),
    queue: [],
    running: 0,
    originals: [],
    failureReported: false,
  };
  for (const block of Array.from(
    document.body.querySelectorAll(BLOCK_SELECTOR),
  )) {
    if (isCandidate(block)) {
      current.observer.observe(block);
    }
  }
  return current;
};

const stop = (current: Session) => {
  generation += 1;
  current.observer.disconnect();
  current.queue.length = 0;
  for (const { block, children, title } of current.originals) {
    block.replaceChildren(...children);
    if (title === null) {
      block.removeAttribute("title");
    } else {
      block.setAttribute("title", title);
    }
  }
};

/**
 * Translates the blocks of the current page into Japanese as they scroll into view,
 * or puts the original text back when the page is already translated.
 */
export const togglePageTranslation = () => {
  if (session === undefined) {
    session = start();
  } else {
    stop(session);
    session = undefined;
  }
};
