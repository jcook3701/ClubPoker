import ViewMode from "../../types/ViewMode";

/*
 * Used to tell if lobby.clubwpt.com dom is in row or column mode.
 */
const getViewMode = (): ViewMode => {
  const toggle = document.querySelector("toggle-view");
  if (!toggle) {
    console.warn("No toggle-view found");
    return { isGrid: false, isRow: false };
  }

  // Find icons inside toggle
  const listIcon = toggle.querySelector('ion-icon[name="list"]');
  const gridIcon = toggle.querySelector('ion-icon[name="grid"]');

  if (!listIcon || !gridIcon) {
    console.warn("Icons not found inside toggle-view");
    return { isGrid: false, isRow: false };
  }

  // The active icon has the "toggle-hover" class
  const isGrid = gridIcon.classList.contains("toggle-hover");
  const isRow = listIcon.classList.contains("toggle-hover");

  return { isGrid, isRow };
};

export default getViewMode;
