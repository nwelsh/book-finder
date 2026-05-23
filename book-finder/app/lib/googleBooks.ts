import axios from "axios";
import { checkKindleUnlimited } from "./kindle";

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

  const kindleUnlimited =
    await checkKindleUnlimited(title);

  return [
    {
      id: item.id,
      title,
      authors: item.volumeInfo.authors || [],
      thumbnail:
        item.volumeInfo.imageLinks?.thumbnail,
      description:
        item.volumeInfo.description,
      kindleUnlimited,
    },
  ];
}