export async function searchBooks(query: string) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}`
  );

  const data = await res.json();

  if (!data.items) {
    return [];
  }

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors || [],
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,

    // TEMPORARY
    kindleUnlimited: Math.random() > 0.5,
  }));
}