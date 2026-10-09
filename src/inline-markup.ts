const VERBATIM_TAGS = new Set(["CODE", "KBD", "SAMP", "VAR"]);
const WRAPPER_TAGS = new Set(["A", "EM", "STRONG", "B", "I"]);
const TOKEN = /\{\{(\d+)\}\}|<t(\d+)>|<\/t(\d+)>/;

/** Collapses whitespace the way a browser renders it, so equal-looking text compares equal. */
export const normalizeWhitespace = (text: string) =>
  text.replace(/\s+/g, " ").trim();

/** Inline markup of a block flattened into text that a translator can carry through. */
export type Serialized = {
  /** Plain text in which each slot appears as `{{n}}` or `<tn>…</tn>`. */
  text: string;
  /** Elements referenced from `text`, indexed by slot number. */
  slots: Element[];
};

const serializeChildren = (
  parent: Element,
  slots: Element[],
): string | undefined => {
  let text = "";
  for (const child of parent.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      const data = child.textContent ?? "";
      // Text that already looks like a slot would be indistinguishable from
      // the real ones once translated.
      if (TOKEN.test(data)) {
        return undefined;
      }
      text += data;
    } else if (child instanceof Element) {
      const index = slots.push(child) - 1;
      if (VERBATIM_TAGS.has(child.tagName)) {
        text += `{{${index}}}`;
      } else if (WRAPPER_TAGS.has(child.tagName)) {
        const inner = serializeChildren(child, slots);
        if (inner === undefined) {
          return undefined;
        }
        text += `<t${index}>${inner}</t${index}>`;
      } else {
        return undefined;
      }
    }
  }
  return text;
};

/**
 * Flattens the content of a block into translatable text.
 * @returns The text and its slots, or undefined when the block holds markup that cannot survive translation.
 */
export const serialize = (block: Element): Serialized | undefined => {
  const slots: Element[] = [];
  const text = serializeChildren(block, slots);
  if (text === undefined) {
    return undefined;
  }
  return { text: normalizeWhitespace(text), slots };
};

type Frame = { index: number; element: Element | undefined; children: Node[] };

/**
 * Rebuilds nodes from translated text, cloning the slots it references so that the originals stay untouched.
 * @returns The rebuilt nodes, or undefined when the slots in the text do not match `slots` exactly.
 */
export const restore = (
  text: string,
  slots: readonly Element[],
): Node[] | undefined => {
  const used = new Set<number>();
  const claim = (index: number, verbatim: boolean) => {
    const slot = slots[index];
    if (
      slot === undefined ||
      used.has(index) ||
      VERBATIM_TAGS.has(slot.tagName) !== verbatim
    ) {
      return undefined;
    }
    used.add(index);
    return slot;
  };

  const parents: Frame[] = [];
  let current: Frame = { index: -1, element: undefined, children: [] };
  let cursor = 0;
  const appendText = (end: number) => {
    if (end > cursor) {
      current.children.push(document.createTextNode(text.slice(cursor, end)));
    }
  };

  for (const match of text.matchAll(new RegExp(TOKEN, "g"))) {
    appendText(match.index);
    cursor = match.index + match[0].length;
    const [, verbatim, open, close] = match;
    if (verbatim !== undefined) {
      const slot = claim(Number(verbatim), true);
      if (slot === undefined) {
        return undefined;
      }
      current.children.push(slot.cloneNode(true));
    } else if (open !== undefined) {
      const index = Number(open);
      const slot = claim(index, false);
      if (slot === undefined) {
        return undefined;
      }
      parents.push(current);
      current = { index, element: slot, children: [] };
    } else {
      const parent = parents.pop();
      if (
        parent === undefined ||
        current.element === undefined ||
        current.index !== Number(close)
      ) {
        return undefined;
      }
      const wrapper = current.element.cloneNode(false);
      for (const child of current.children) {
        wrapper.appendChild(child);
      }
      parent.children.push(wrapper);
      current = parent;
    }
  }
  appendText(text.length);

  if (parents.length > 0 || used.size !== slots.length) {
    return undefined;
  }
  return current.children;
};
