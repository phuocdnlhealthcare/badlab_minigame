import Card from "@/components/game/Card";
import type { Card as CardType } from "@/types/card";

interface CardDeckProps {
  cards: CardType[];
}

export default function CardDeck({
  cards,
}: CardDeckProps) {
  if (cards.length === 0) {
    return (
      <div className="card-deck card-deck--empty">
        <div className="card-deck__empty-icon">
          ✓
        </div>

        <h2>Bạn đã rút hết bài</h2>

        <p>
          Hãy xào bài lại để bắt đầu một lượt chơi mới.
        </p>
      </div>
    );
  }

  return (
    <section className="card-deck">
      <div className="card-deck__grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            variant="back"
          />
        ))}
      </div>
    </section>
  );
}