// utils/generatePrompt.js

import { AI_PROMPT } from "../constants/options";

export function generateFinalPrompt(formData) {
  if (
    !formData?.location?.label ||
    !formData?.noofdays ||
    !formData?.budget ||
    !formData?.traveller
  ) {
    return null;
  }

  return AI_PROMPT
    .replace("{location}", formData.location.label)
    .replace("{noofdays}", formData.noofdays)
    .replace("{budget}", formData.budget)
    .replace("{traveller}", formData.traveller)
    .replace("{noofdays}", formData.noofdays); // replace again if needed
}