import type {
    CSSProperties,
} from "react";

import Card from "@/components/game/Card";

import type {
    Card as CardType,
} from "@/types/card";

import type {
    GamePhase,
} from "@/hooks/useCardGame";

interface DrawnCardProps {
    selectedCard: CardType | null;

    drawnCard: CardType | null;

    phase: GamePhase;

    animationDuration: number;
}

export default function DrawnCard({
    selectedCard,
    drawnCard,
    phase,
    animationDuration,
}: DrawnCardProps) {
    /**
     * Truyền duration từ TS sang CSS
     * thông qua CSS custom property.
     */
    const animationStyle = {
        "--draw-duration":
            `${animationDuration}ms`,
    } as CSSProperties;

    const getTitle = () => {
        if (phase === "drawing") {
            return "Đang rút bài...";
        }

        if (
            phase === "revealed" &&
            drawnCard
        ) {
            return "Bạn vừa rút được";
        }

        return "Hãy rút một lá bài";
    };

    return (
        <section
            className="drawn-card"
            aria-live="polite"
        >
            <div className="drawn-card__header">
                <span>
                    LÁ BÀI CỦA BẠN
                </span>

                <h2>{getTitle()}</h2>
            </div>

            <div
                className="drawn-card__stage"
                style={animationStyle}
            >
                {/* IDLE */}

                {phase === "idle" && (
                    <div className="drawn-card__placeholder">
                        <span>?</span>
                    </div>
                )}

                {/* DRAWING */}

                {phase === "drawing" &&
                    selectedCard && (
                        <div className="drawn-card__motion">
                            <div className="drawn-card__flip">
                                {/* BACK FACE */}

                                <div
                                    className="
                    drawn-card__face
                    drawn-card__face--back
                  "
                                >
                                    <Card
                                        card={
                                            selectedCard
                                        }
                                        variant="back"
                                    />
                                </div>

                                {/* FRONT FACE */}

                                <div
                                    className="
                    drawn-card__face
                    drawn-card__face--front
                  "
                                >
                                    <Card
                                        card={
                                            selectedCard
                                        }
                                        variant="front"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                {/* REVEALED */}

                {phase === "revealed" &&
                    drawnCard && (
                        <div className="drawn-card__revealed">
                            <Card
                                card={drawnCard}
                                variant="front"
                            />
                        </div>
                    )}
            </div>
        </section>
    );
}