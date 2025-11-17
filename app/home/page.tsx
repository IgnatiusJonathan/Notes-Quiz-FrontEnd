"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CardSection from "../../components/CardSection";

type Note = {
    id: number;
    title: string;
    content: string;
    date: string;
};

export default function Home() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const loadNotes = async () => {
        try {
            const res = await fetch("/api/notes");
            if (!res.ok) {
              console.error("Failed to fetch notes, status:", res.status);
              setNotes([]);
              return;
            }
            const data = await res.json();
      
            if (Array.isArray(data)) {
              setNotes(data);
            } else {
              console.error("Unexpected data format:", data);
              setNotes([]);
            }
          } catch (error) {
            console.error("Failed to load notes:", error);
            setNotes([]);
          }
        };

    useEffect(() => {
        loadNotes();
    }, []);

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cardData = filteredNotes.map((note) => ({
      id: note.id,
      title: note.title,
      description: note.content
    }));
        
    return (
        <div className="container py-4">
            <h1 className="mb-4">Note lists</h1>

            <div className="d-flex justify-content-between align-items-center mb-3">
            <Link href="../create" className="btn btn-primary">
              + Write a new Note
            </Link>

            <input
              type="text"
              className="form-control w-50"
              placeholder="Search notes by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
        
            {notes.length === 0 && <p>Go make some notes!</p>}
        
            <CardSection cards={cardData} />
        </div>
    );
}