"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type Note = {
    id: number;
    title: string;
    content: string;
    date: string;
};

export default function EditNote() {
    const { id } = useParams<{ id: string }>();
    const [note, setNote] = useState<Note | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter () ;

    useEffect(()=>{
        async function loadNote() {
            const res = await fetch(`/api/notes/${id}`);
            if (!res.ok) return;
      
            const data = await res.json();
            setNote(data);
            setTitle(data.title);
            setContent(data.content);
          }
      
          loadNote();
        }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        await fetch(`/api/notes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                content,
              }),
            });
        
        router.push("/home");
    };
        
    return (  
        <div className="container py-4">
            <h1>Edit Note</h1>
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={note?.title}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={note?.content}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-success">
                        Publish
                    </button>
                </form>
            </div>
        );
    }