import axios from "axios";

export async function checkChicagoLibrary(
  title: string
): Promise<boolean> {
  try {
    const response = await axios.get(
      `https://thunder.api.overdrive.com/v2/libraries/chicago/media`,
      {
        params: {
          query: title,
          maxItems: 1,
        },
      }
    );

    return response.data.items?.length > 0;
  } catch (error) {
    console.error("LIBRARY ERROR:", error);

    return false;
  }
}