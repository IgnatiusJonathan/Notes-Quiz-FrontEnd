import Link from 'next/link';

export default function NotFound(){
    return (
        <main className="container mt-5 text-center">
            <h1>404 - Page Not Found</h1>
            <p>Said note does not exist</p>
            <Link href="/home" className="btn btn-primary mt-3">
            Back to Home
            </Link>
        </main> 
    );
}