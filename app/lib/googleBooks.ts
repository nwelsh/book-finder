import axios from "axios";
import { checkKindleUnlimited } from "./kindle";
import { checkChicagoLibrary } from "./libby";

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function searchBooks(query: string) {
  const response = await axios.get(
    "https://www.googleapis.com/books/v1/volumes",
    {
      params: {
        q: query,
        maxResults: 1,
        key: API_KEY,
      },
    }
  );

  const item = response.data.items?.[0];

  if (!item) {
    return [];
  }

  const title = item.volumeInfo.title;

  // Run BOTH checks in parallel
  const [kindleUnlimited, library] =
    await Promise.all([
      checkKindleUnlimited(title),
      checkChicagoLibrary(title),
    ]);

  return [
    {
      id: item.id,
      title,
      authors: item.volumeInfo.authors || [],
      description:
        item.volumeInfo.description || "",
      thumbnail:
        item.volumeInfo.imageLinks?.thumbnail ||
        "",

      publishedDate:
        item.volumeInfo.publishedDate || "",

      pageCount:
        item.volumeInfo.pageCount || 0,

      kindleUnlimited,

      library,
    },
  ];
}