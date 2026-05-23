import { NextRequest, NextResponse } from "next/server";
import { searchBooks } from "../../lib/googleBooks";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const books = await searchBooks(query);

    return NextResponse.json(books);
  } catch (error) {
    console.error(error);

    return NextResponse.json([]);
  }
}