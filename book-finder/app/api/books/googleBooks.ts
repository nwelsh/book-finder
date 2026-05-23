export async function searchBooks(query: string) {
  console.log("SEARCHING GOOGLE");

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}`,
    {
      cache: "no-store",
    }
  );

  console.log("STATUS:", res.status);

  const data = await res.json();

  console.log("GOOGLE DATA:", data);

  if (!data.items) {
    return [];
  }

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors || [],
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    kindleUnlimited: Math.random() > 0.5,
  }));
}