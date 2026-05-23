import { NextRequest, NextResponse } from "next/server";
import { searchBooks } from "./googleBooks";

export async function GET(req: NextRequest) {
  console.log("API HIT t");

  const query = req.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const books = await searchBooks(query);

    console.log("BOOKS:", books);

    return NextResponse.json(books);
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}