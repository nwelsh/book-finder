"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    try {
      setLoading(true);

      const res = await fetch(`/api/books?q=${query}`);

      const data = await res.json();

      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Read Free Finder</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
        />

        <button
          type="button"
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading && (
        <div className="text-center py-8">
          <p className="text-lg font-medium">Loading</p>
        </div>
      )}

      <div className="grid gap-4">
        {books.map((book) => (
          <div key={book.id} className="border rounded-lg p-4 flex gap-4">
            {book.thumbnail && (
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-24 h-auto rounded"
              />
            )}

            <div>
              <h2 className="text-xl font-bold">{book.title}</h2>

              <p className="text-gray-600">{book.authors.join(", ")}</p>

              <p className="mt-2">
                {book.kindleUnlimited
                  ? "✅ Kindle Unlimited"
                  : "❌ Not on Kindle Unlimited"}
              </p>
              <p className="mt-2">
                {book.libby
                  ? "✅ Chicago public libby"
                  : "❌ Not on Chicago public libby"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
