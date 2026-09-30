import type {
    CSSProperties,
} from "react";

import Card from "@/components/game/Card";

import type {
    Card as CardType,
} from "@/types/card";

interface CardDeckProps {
    cards: CardType[];

    drawingCardId?: number | null;

    isShuffling?: boolean;

    shuffleDuration?: number;
}

type CardStackStyle =
    CSSProperties & {
        "--stack-x": string;
        "--stack-y": string;
        "--stack-rotation": string;

        "--shuffle-x-1": string;
        "--shuffle-y-1": string;
        "--shuffle-r-1": string;

        "--shuffle-x-2": string;
        "--shuffle-y-2": string;
        "--shuffle-r-2": string;

        "--shuffle-x-3": string;
        "--shuffle-y-3": string;
        "--shuffle-r-3": string;
    };

type StackStyle =
    CSSProperties & {
        "--shuffle-duration": string;
    };

export default function CardDeck({
    cards,
    drawingCardId,
    isShuffling = false,
    shuffleDuration = 1800,
}: CardDeckProps) {
    if (cards.length === 0) {
        return (
            <div className="card-deck card-deck--empty">
                <div className="card-deck__empty-icon">
                    ✓
                </div>

                <h2>
                    Bạn đã rút hết bài
                </h2>

                <p>
                    Hãy xào bài lại để bắt đầu
                    một lượt chơi mới.
                </p>
            </div>
        );
    }

    const stackStyle: StackStyle = {
        "--shuffle-duration":
            `${shuffleDuration}ms`,
    };

    return (
        <section
            className="card-deck"
            aria-label={`Bộ bài còn ${cards.length} lá`}
        >
            <div
                className="card-stack"
                style={stackStyle}
            >
                {cards.map(
                    (card, index) => {
                        const isDrawingCard =
                            card.id ===
                            drawingCardId;

                        /**
                         * Vị trí stack bình thường.
                         */
                        const stackX =
                            index * 0.55;

                        const stackY =
                            index * 0.35;

                        const stackRotation =
                            ((index % 5) - 2) *
                            0.3;

                        /**
                         * Chia card luân phiên:
                         *
                         * chẵn → trái
                         * lẻ → phải
                         */
                        const direction =
                            index % 2 === 0
                                ? -1
                                : 1;

                        /**
                         * Mỗi card tỏa ra
                         * khoảng cách hơi khác nhau.
                         */
                        const spread =
                            45 +
                            (index % 5) * 11;

                        /**
                         * Phase 1:
                         * tỏa sang hai bên.
                         */
                        const shuffleX1 =
                            direction * spread;

                        const shuffleY1 =
                            ((index % 4) - 1.5) *
                            9;

                        const shuffleR1 =
                            direction *
                            (5 + (index % 5) * 2);

                        /**
                         * Phase 2:
                         * các lá đi ngược qua nhau.
                         */
                        const shuffleX2 =
                            -direction *
                            spread *
                            0.7;

                        const shuffleY2 =
                            ((index % 3) - 1) *
                            12;

                        const shuffleR2 =
                            -direction *
                            (4 + (index % 4) * 2);

                        /**
                         * Phase 3:
                         * tiến dần trở lại stack.
                         */
                        const shuffleX3 =
                            direction *
                            spread *
                            0.3;

                        const shuffleY3 =
                            ((index % 3) - 1) *
                            5;

                        const shuffleR3 =
                            direction * 3;

                        const cardStyle:
                            CardStackStyle = {
                            "--stack-x":
                                `${stackX}px`,

                            "--stack-y":
                                `${stackY}px`,

                            "--stack-rotation":
                                `${stackRotation}deg`,

                            "--shuffle-x-1":
                                `${shuffleX1}px`,

                            "--shuffle-y-1":
                                `${shuffleY1}px`,

                            "--shuffle-r-1":
                                `${shuffleR1}deg`,

                            "--shuffle-x-2":
                                `${shuffleX2}px`,

                            "--shuffle-y-2":
                                `${shuffleY2}px`,

                            "--shuffle-r-2":
                                `${shuffleR2}deg`,

                            "--shuffle-x-3":
                                `${shuffleX3}px`,

                            "--shuffle-y-3":
                                `${shuffleY3}px`,

                            "--shuffle-r-3":
                                `${shuffleR3}deg`,

                            zIndex:
                                isDrawingCard
                                    ? cards.length +
                                    20
                                    : index + 1,
                        };

                        const classNames = [
                            "card-stack__item",

                            isDrawingCard
                                ? "card-stack__item--drawing"
                                : "",

                            isShuffling
                                ? "card-stack__item--shuffling"
                                : "",
                        ]
                            .filter(Boolean)
                            .join(" ");

                        return (
                            <div
                                key={card.id}
                                className={
                                    classNames
                                }
                                style={
                                    cardStyle
                                }
                            >
                                <Card
                                    card={card}
                                    variant="back"
                                />
                            </div>
                        );
                    }
                )}
            </div>

            <p className="card-stack__count">
                {isShuffling ? (
                    <>
                        Đang xào{" "}
                        <strong>
                            {cards.length}
                        </strong>{" "}
                        lá bài...
                    </>
                ) : (
                    <>
                        Còn{" "}
                        <strong>
                            {cards.length}
                        </strong>{" "}
                        lá bài
                    </>
                )}
            </p>
        </section>
    );
}