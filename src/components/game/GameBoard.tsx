"use client";

import CardDeck from "@/components/game/CardDeck";
import DrawnCard from "@/components/game/DrawnCard";
import GameControls from "@/components/game/GameControls";

import {
  GAME_CONFIG,
} from "@/constants/game";

import {
  useCardGame,
} from "@/hooks/useCardGame";

export default function GameBoard() {
  const {
    deck,

    selectedCard,

    drawnCard,

    phase,

    remainingCards,

    isDrawing,

    canDraw,

    canShuffle,

    drawCard,

    shuffleCards,
  } = useCardGame();

  return (
    <main className="game-page">
      <div className="game-page__container">
        <header className="game-header">
          <span className="game-header__badge">
            BADLAB MINIGAME
          </span>

          <h1>
            Rút một lá bài
          </h1>

          <p>
            Hãy thử vận may và
            khám phá lá bài dành
            cho bạn.
          </p>
        </header>

        <div className="game-status">
          <span>
            Số bài còn lại
          </span>

          <strong>
            {remainingCards}

            <small>
              /
              {
                GAME_CONFIG
                  .TOTAL_CARDS
              }
            </small>
          </strong>
        </div>

        <DrawnCard
          selectedCard={
            selectedCard
          }
          drawnCard={
            drawnCard
          }
          phase={phase}
          animationDuration={
            GAME_CONFIG
              .DRAW_ANIMATION_MS
          }
        />

        <GameControls
          onDraw={drawCard}
          onShuffle={
            shuffleCards
          }
          canDraw={canDraw}
          canShuffle={
            canShuffle
          }
          isDrawing={
            isDrawing
          }
        />

        <div className="game-deck-section">
          <div className="game-deck-section__header">
            <h2>
              Bộ bài còn lại
            </h2>

            <span>
              {remainingCards}/
              {
                GAME_CONFIG
                  .TOTAL_CARDS
              }
            </span>
          </div>

          <CardDeck
            cards={deck}
            drawingCardId={
              selectedCard?.id ??
              null
            }
          />
        </div>
      </div>
    </main>
  );
}