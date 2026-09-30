"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import { GAME_CONFIG } from "@/constants/game";
import { CARDS } from "@/data/cards";
import type { Card } from "@/types/card";
import { shuffleArray } from "@/utils/shuffle";

export type GamePhase =
    | "idle"
    | "drawing"
    | "revealed"
    | "shuffling";

interface CardGameState {
    deck: Card[];

    // Lá đang chạy animation rút
    selectedCard: Card | null;

    // Lá đã reveal hoàn chỉnh
    drawnCard: Card | null;

    phase: GamePhase;
}

const initialGameState: CardGameState = {
    deck: [...CARDS],
    selectedCard: null,
    drawnCard: null,
    phase: "idle",
};

export function useCardGame() {
    const [gameState, setGameState] =
        useState<CardGameState>(
            initialGameState
        );

    /**
     * Lock dùng để chặn double click / spam button.
     */
    const interactionLockRef =
        useRef(false);

    /**
     * Timer của animation rút bài.
     */
    const drawTimerRef =
        useRef<ReturnType<
            typeof setTimeout
        > | null>(null);

    /**
     * Timer của animation xào bài.
     */
    const shuffleTimerRef =
        useRef<ReturnType<
            typeof setTimeout
        > | null>(null);

    /**
     * Cleanup timer khi rời khỏi trang.
     */
    useEffect(() => {
        return () => {
            if (drawTimerRef.current) {
                clearTimeout(
                    drawTimerRef.current
                );
            }

            if (shuffleTimerRef.current) {
                clearTimeout(
                    shuffleTimerRef.current
                );
            }
        };
    }, []);

    /**
     * ================================
     * DRAW CARD
     * ================================
     */
    const drawCard = () => {
        if (interactionLockRef.current) {
            return;
        }

        if (gameState.deck.length === 0) {
            return;
        }

        interactionLockRef.current = true;

        /**
         * Random một lá trong deck.
         */
        const randomIndex = Math.floor(
            Math.random() *
            gameState.deck.length
        );

        const selectedCard =
            gameState.deck[randomIndex];

        /**
         * Bắt đầu animation.
         *
         * Chưa remove card khỏi deck.
         */
        setGameState(
            (currentState) => ({
                ...currentState,

                selectedCard,

                drawnCard: null,

                phase: "drawing",
            })
        );

        /**
         * Animation kết thúc.
         */
        drawTimerRef.current =
            setTimeout(() => {
                setGameState(
                    (currentState) => ({
                        deck:
                            currentState.deck.filter(
                                (card) =>
                                    card.id !==
                                    selectedCard.id
                            ),

                        selectedCard: null,

                        drawnCard:
                            selectedCard,

                        phase: "revealed",
                    })
                );

                interactionLockRef.current =
                    false;

                drawTimerRef.current =
                    null;
            }, GAME_CONFIG.DRAW_ANIMATION_MS);
    };

    /**
     * ================================
     * SHUFFLE CARDS
     * ================================
     */
    const shuffleCards = () => {
        if (interactionLockRef.current) {
            return;
        }

        interactionLockRef.current = true;

        /**
         * Khi user bấm xào bài:
         *
         * 1. Gom đủ lại 20 lá
         * 2. Clear card đang reveal
         * 3. Chuyển phase thành shuffling
         *
         * Lúc này UI sẽ render đủ 20 card
         * và chạy animation.
         */
        setGameState({
            deck: [...CARDS],

            selectedCard: null,

            drawnCard: null,

            phase: "shuffling",
        });

        /**
         * Sau khi animation xào kết thúc,
         * mới thật sự đổi thứ tự deck.
         */
        shuffleTimerRef.current =
            setTimeout(() => {
                setGameState({
                    deck: shuffleArray(
                        CARDS
                    ),

                    selectedCard: null,

                    drawnCard: null,

                    phase: "idle",
                });

                interactionLockRef.current =
                    false;

                shuffleTimerRef.current =
                    null;
            }, GAME_CONFIG.SHUFFLE_ANIMATION_MS);
    };

    /**
     * ================================
     * DERIVED STATE
     * ================================
     */

    const remainingCards =
        gameState.deck.length;

    const isDrawing =
        gameState.phase === "drawing";

    const isShuffling =
        gameState.phase === "shuffling";

    const isBusy =
        isDrawing || isShuffling;

    const isGameOver =
        remainingCards === 0;

    const canDraw =
        !isBusy &&
        remainingCards > 0;

    const canShuffle =
        !isBusy;

    return {
        deck:
            gameState.deck,

        selectedCard:
            gameState.selectedCard,

        drawnCard:
            gameState.drawnCard,

        phase:
            gameState.phase,

        remainingCards,

        isDrawing,

        isShuffling,

        isBusy,

        isGameOver,

        canDraw,

        canShuffle,

        drawCard,

        shuffleCards,
    };
}