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
    <section
      className="card-deck"
      aria-label={`Bộ bài còn ${cards.length} lá`}
    >
      <div className="card-stack">
        {cards.map((card, index) => {
          const offsetX = index * 0.55;
          const offsetY = index * 0.35;

          const rotation =
            ((index % 5) - 2) * 0.3;

          return (
            <div
              key={card.id}
              className="card-stack__item"
              style={{
                zIndex: index + 1,
                transform: `
                  translate(
                    ${offsetX}px,
                    ${offsetY}px
                  )
                  rotate(${rotation}deg)
                `,
              }}
            >
              <Card
                card={card}
                variant="back"
              />
            </div>
          );
        })}
      </div>

      <p className="card-stack__count">
        Còn{" "}
        <strong>{cards.length}</strong>{" "}
        lá bài
      </p>
    </section>
  );
}