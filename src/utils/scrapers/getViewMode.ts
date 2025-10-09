import {
  DomToggleGridIcon,
  DomToggleListIcon,
  DomToggleSwitch,
  DomToggleView,
} from "../../constants/tournaments";
import { ViewMode } from "@types";

/*
 * Used to tell if lobby.clubwpt.com dom is in row or column mode.
 */
const getViewMode = (): ViewMode => {
  const toggle = document.querySelector(DomToggleView);
  if (!toggle) {
    console.warn("No toggle-view found");
    return { isGrid: false, isRow: false };
  }

  // Find icons inside toggle
  const listIcon = toggle.querySelector(DomToggleListIcon);
  const gridIcon = toggle.querySelector(DomToggleGridIcon);

  if (!listIcon || !gridIcon) {
    console.warn("Icons not found inside toggle-view");
    return { isGrid: false, isRow: false };
  }

  // The active icon has the "toggle-hover" class
  const isGrid = gridIcon.classList.contains(DomToggleSwitch);
  const isRow = listIcon.classList.contains(DomToggleSwitch);

  return { isGrid, isRow };
};

export default getViewMode;
