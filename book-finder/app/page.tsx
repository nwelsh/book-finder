"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);

  async function handleSearch() {
    console.log("SEARCH CLICKED");

    try {
      const res = await fetch(`/api/books?q=${query}`);

      const data = await res.json();

      console.log(data);

      setBooks(data);
    } catch (error) {
      console.error(error);
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
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

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
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
