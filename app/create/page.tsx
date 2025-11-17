"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Note = {
    id: number;
    title: string;
    content: string;
    date: string;
};

export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter () ;

    const handleSubmit = async (e: React. FormEvent) => {
        e.preventDefault();
        await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
        router.push('/home');
    };
        
    return (  
        <div className="container py-4">
            <h1>Write a new note</h1>
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your title"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your content here ... "
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-success">
                        Publish
                    </button>
                </form>
            </div>
        );
    }