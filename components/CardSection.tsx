'use client';

import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";

type CardItem = {
    id: number;
    title: string;
    description: string;
};

type CardSectionProps = {
    cards: CardItem[];
};

export default function CardSection({ cards }: CardSectionProps) {
    return (
        <Container className="my-5">
            <Row className="g-4">
                {cards.map((card) => (
                    <Col key={card.id} md={4}>
                        <div className="sticky-note-card p-3 shadow-sm d-flex flex-column justify-content-between">
                            <Link 
                                href={`/notes/${card.id}`} 
                                className="text-decoration-none text-dark mb-3 flex-grow-1"
                            >
                                <h4 className="fw-bold mb-2">{card.title}</h4>
                                <p className="mb-0">{card.description}</p>
                            </Link>
                            
                            <Link href={`/edit/${card.id}`} className="mt-3">
                                <Button variant="outline-primary" size="sm" className="w-100">
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>

            <style jsx>{`
                .sticky-note-card {
                    background: #fff8a6;
                    border: 1px solid #e6db81;
                    border-radius: 8px;
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                    min-height: 220px;
                    display: flex;
                    flex-direction: column;
                }
                .sticky-note-card:hover {
                    transform: translateY(-6px) scale(1.03);
                    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </Container>
    );
}
