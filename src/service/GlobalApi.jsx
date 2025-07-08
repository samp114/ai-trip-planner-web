// api/places.js
import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

export const GetPlaceDetails = async (query) => {
  const payload = {
    textQuery: query,
  };

  try {
    const response = await axios.post(BASE_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        "X-Goog-FieldMask": "places.displayName,places.photos,places.formattedAddress",
      },
    });
    return response;
  } catch (error) {
    console.error("GetPlaceDetails API error:", error.response?.data || error.message);
    throw error;
  }
};
export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;