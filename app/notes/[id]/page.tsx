"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

type Note = {
    id: number;
    title: string;
    content: string;
    date: string;
};

export default function NoteDetail() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [note, setNote] = useState<Note | null>(null);
    
    useEffect(()=>{
        fetch(`/api/notes/${id}`).then(async (res) => {
            if (res.status === 404) router.push('/not-found');
            else setNote(await res.json());
        });
    }, [id, router]);

    const handleDelete = async () => {
        await fetch(`/api/notes/${id}`, { method: 'DELETE' });
        router.push("/home");
    };
        
    if (!note) return <div className="container py-4">Note not found .</div>;
        
    return (
        <div className="container py-4">
            <h1>{note.title}</h1>
            <p className="text-muted">{note.date}</p>
            <p>{note.content}</p>
            <div className="mt-4">
                <button className="btn btn-danger me-2" onClick={handleDelete}>
                    Delete
                </button>
            <Link href="/home" className="btn btn-secondary">
                Back to Home
            </Link>
            <Link href="../edit/${id}" className="btn btn-secondary">
                Edit
            </Link>
        </div>
    </div>
    );
}