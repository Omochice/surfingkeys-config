/** Tells the user that a translation failed and why. */
export const showTranslationFailure = (error: unknown) => {
  api.Front.showBanner(
    `Failed to translate: ${error instanceof Error ? error.message : String(error)}`,
  );
};
