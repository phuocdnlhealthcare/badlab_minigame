import type {
    CSSProperties,
    RefObject,
} from "react";

import Card from "@/components/game/Card";

import type {
    Card as CardType,
} from "@/types/card";

import type {
    GamePhase,
} from "@/hooks/useCardGame";

import type {
    ElementMotion,
} from "@/utils/getElementMotion";

interface DrawnCardProps {
    selectedCard: CardType | null;

    drawnCard: CardType | null;

    phase: GamePhase;

    animationDuration: number;

    stageRef:
    RefObject<HTMLDivElement | null>;

    drawMotion:
    ElementMotion | null;
}

type DrawAnimationStyle =
    CSSProperties & {
        "--draw-duration": string;

        "--draw-from-x": string;

        "--draw-from-y": string;

        "--draw-from-scale": number;
    };

export default function DrawnCard({
    selectedCard,
    drawnCard,
    phase,
    animationDuration,
    stageRef,
    drawMotion,
}: DrawnCardProps) {
    const motion =
        drawMotion ?? {
            x: 0,
            y: 180,
            scale: 0.8,
        };

    const animationStyle:
        DrawAnimationStyle = {
        "--draw-duration":
            `${animationDuration}ms`,

        "--draw-from-x":
            `${motion.x}px`,

        "--draw-from-y":
            `${motion.y}px`,

        "--draw-from-scale":
            motion.scale,
    };

    const getTitle = () => {
        if (phase === "shuffling") {
            return "Đang xào bộ bài...";
        }

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

                <h2>
                    {getTitle()}
                </h2>
            </div>

            <div
                ref={stageRef}
                className="drawn-card__stage"
                style={animationStyle}
            >
                {(phase === "idle" ||
                    phase ===
                    "shuffling") && (
                        <div
                            className={[
                                "drawn-card__placeholder",

                                phase === "shuffling"
                                    ? "drawn-card__placeholder--shuffling"
                                    : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <span>
                                {phase === "shuffling"
                                    ? "↻"
                                    : "?"}
                            </span>
                        </div>
                    )}

                {phase === "drawing" &&
                    selectedCard && (
                        <div className="drawn-card__motion">
                            <div className="drawn-card__flip">
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