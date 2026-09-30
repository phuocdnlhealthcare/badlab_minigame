import Image from "next/image";

import type { Card as CardType } from "@/types/card";

interface CardProps {
  card: CardType;
  variant?: "front" | "back";
}

export default function Card({
  card,
  variant = "back",
}: CardProps) {
  const isFront = variant === "front";

  return (
    <div
      className={`playing-card ${
        isFront
          ? "playing-card--front"
          : "playing-card--back"
      }`}
    >
      <Image
        src={
          isFront
            ? card.frontImage
            : card.backImage
        }
        alt={
          isFront
            ? `Mặt trước thẻ ${card.id}`
            : `Mặt sau thẻ ${card.id}`
        }
        fill
        sizes={
          isFront
            ? "(max-width: 768px) 180px, 220px"
            : "(max-width: 768px) 20vw, 120px"
        }
        className="playing-card__image"
        priority={false}
      />

      {isFront && (
        <div className="playing-card__content">
          <p>{card.content}</p>
        </div>
      )}
    </div>
  );
}