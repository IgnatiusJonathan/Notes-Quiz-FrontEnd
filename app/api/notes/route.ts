import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notes = await prisma.notes.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(notes);
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const newNote = await prisma.notes.create({
      data: { title, content },
    });
    return NextResponse.json(newNote, { status: 201 });
  } catch (err) {
    console.error("Failed to create note:", err);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
