import axios from "axios";

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function searchBooks(query: string) {
  const response = await axios.get(
    "https://www.googleapis.com/books/v1/volumes",
    {
      params: {
        q: query,
        maxResults: 10,
        key: API_KEY,
      },
    }
  );

  return response.data.items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors || [],
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
  }));
}