import Card from "@/components/game/Card";
import type { Card as CardType } from "@/types/card";

interface DrawnCardProps {
  card: CardType | null;
}

export default function DrawnCard({
  card,
}: DrawnCardProps) {
  return (
    <section className="drawn-card">
      <div className="drawn-card__header">
        <span>LÁ BÀI CỦA BẠN</span>

        <h2>
          {card
            ? "Bạn vừa rút được"
            : "Hãy rút một lá bài"}
        </h2>
      </div>

      <div className="drawn-card__content">
        {card ? (
          <Card
            card={card}
            variant="front"
          />
        ) : (
          <div className="drawn-card__placeholder">
            <span>?</span>
          </div>
        )}
      </div>
    </section>
  );
}