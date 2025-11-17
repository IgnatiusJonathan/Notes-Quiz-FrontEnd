import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const note = await prisma.notes.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(note);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();
  
    const updated = await prisma.notes.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        content: body.content,
      },
    });
  
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await prisma.notes.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ message: "Deleted" }, { status: 204 });
}