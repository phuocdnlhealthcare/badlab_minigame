"use client";

import { useState } from "react";

import { CARDS } from "@/data/cards";
import { shuffleArray } from "@/utils/shuffle";
import type { Card } from "@/types/card";

interface CardGameState {
    deck: Card[];
    drawnCard: Card | null;
}

const initialGameState: CardGameState = {
    deck: [...CARDS],
    drawnCard: null,
};

export function useCardGame() {
    const [gameState, setGameState] =
        useState<CardGameState>(initialGameState);

    /**
     * Rút ngẫu nhiên 1 lá bài
     */
    const drawCard = () => {
        setGameState((currentState) => {
            const currentDeck = currentState.deck;

            // Không còn bài thì không xử lý
            if (currentDeck.length === 0) {
                return currentState;
            }

            // Random vị trí một lá bài
            const randomIndex = Math.floor(
                Math.random() * currentDeck.length
            );

            // Lá bài được chọn
            const selectedCard =
                currentDeck[randomIndex];

            // Xóa lá vừa rút khỏi bộ bài
            const newDeck = currentDeck.filter(
                (_, index) => index !== randomIndex
            );

            return {
                deck: newDeck,
                drawnCard: selectedCard,
            };
        });
    };

    /**
     * Gom đủ 20 lá và xào lại
     */
    const shuffleCards = () => {
        setGameState({
            deck: shuffleArray(CARDS),
            drawnCard: null,
        });
    };

    return {
        deck: gameState.deck,

        drawnCard: gameState.drawnCard,

        remainingCards:
            gameState.deck.length,

        isGameOver:
            gameState.deck.length === 0,

        drawCard,

        shuffleCards,
    };
}