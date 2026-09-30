"use client";

import CardDeck from "@/components/game/CardDeck";
import DrawnCard from "@/components/game/DrawnCard";
import GameControls from "@/components/game/GameControls";

import { GAME_CONFIG } from "@/constants/game";
import { useCardGame } from "@/hooks/useCardGame";

export default function GameBoard() {
    const {
        deck,
        drawnCard,
        remainingCards,
        isGameOver,
        drawCard,
        shuffleCards,
    } = useCardGame();

    return (
        <main className="game-page">
            <div className="game-page__container">
                {/* Header */}
                <header className="game-header">
                    <span className="game-header__badge">
                        BADLAB MINIGAME
                    </span>

                    <h1>Rút một lá bài</h1>

                    <p>
                        Hãy thử vận may và khám phá lá bài
                        dành cho bạn.
                    </p>
                </header>

                {/* Game status */}
                <div className="game-status">
                    <span>Số bài còn lại</span>

                    <strong>
                        {remainingCards}
                        <small>
                            /{GAME_CONFIG.TOTAL_CARDS}
                        </small>
                    </strong>
                </div>

                {/* Card vừa rút */}
                <DrawnCard card={drawnCard} />

                {/* Controls */}
                <GameControls
                    onDraw={drawCard}
                    onShuffle={shuffleCards}
                    canDraw={!isGameOver}
                />

                {/* Bộ bài */}
                <div className="game-deck-section">
                    <div className="game-deck-section__header">
                        <h2>Bộ bài còn lại</h2>

                        <span>
                            {remainingCards}/
                            {GAME_CONFIG.TOTAL_CARDS}
                        </span>
                    </div>

                    <CardDeck cards={deck} />
                </div>
            </div>
        </main>
    );
}