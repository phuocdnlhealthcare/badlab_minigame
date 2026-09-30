"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import { CARDS } from "@/data/cards";
import { GAME_CONFIG } from "@/constants/game";
import { shuffleArray } from "@/utils/shuffle";

import type { Card } from "@/types/card";

export type GamePhase =
    | "idle"
    | "drawing"
    | "revealed";

interface CardGameState {
    deck: Card[];

    // Card đang chạy animation
    selectedCard: Card | null;

    // Card đã hoàn thành animation
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
     * Khóa thao tác trong lúc animation chạy.
     *
     * Dùng ref để chặn ngay cả trường hợp
     * user double click quá nhanh trước khi React render lại.
     */
    const drawingLockRef =
        useRef(false);

    /**
     * Lưu timer để cleanup khi component unmount.
     */
    const drawTimerRef =
        useRef<ReturnType<
            typeof setTimeout
        > | null>(null);

    /**
     * Cleanup timer khi rời trang.
     */
    useEffect(() => {
        return () => {
            if (drawTimerRef.current) {
                clearTimeout(
                    drawTimerRef.current
                );
            }
        };
    }, []);

    /**
     * Bắt đầu rút bài.
     */
    const drawCard = () => {
        // Đang rút thì không cho rút tiếp
        if (drawingLockRef.current) {
            return;
        }

        // Không còn bài
        if (gameState.deck.length === 0) {
            return;
        }

        drawingLockRef.current = true;

        /**
         * Random một vị trí trong deck.
         */
        const randomIndex = Math.floor(
            Math.random() *
            gameState.deck.length
        );

        const selectedCard =
            gameState.deck[randomIndex];

        /**
         * Chuyển state sang drawing.
         *
         * Lưu ý:
         * chưa remove card khỏi deck ở đây.
         */
        setGameState(
            (currentState) => ({
                ...currentState,

                selectedCard,

                // Xóa card reveal trước đó
                drawnCard: null,

                phase: "drawing",
            })
        );

        /**
         * Chờ animation hoàn thành.
         */
        drawTimerRef.current =
            setTimeout(() => {
                setGameState(
                    (currentState) => ({
                        /**
                         * Lúc này mới thật sự
                         * remove card khỏi deck.
                         */
                        deck:
                            currentState.deck.filter(
                                (card) =>
                                    card.id !==
                                    selectedCard.id
                            ),

                        selectedCard: null,

                        /**
                         * Card chính thức
                         * được reveal.
                         */
                        drawnCard: selectedCard,

                        phase: "revealed",
                    })
                );

                drawingLockRef.current =
                    false;

                drawTimerRef.current =
                    null;
            }, GAME_CONFIG.DRAW_ANIMATION_MS);
    };

    /**
     * Gom đủ 20 lá và reset game.
     */
    const shuffleCards = () => {
        /**
         * Không cho reset trong khi
         * đang animation.
         */
        if (drawingLockRef.current) {
            return;
        }

        setGameState({
            deck: shuffleArray(CARDS),

            selectedCard: null,

            drawnCard: null,

            phase: "idle",
        });
    };

    const remainingCards =
        gameState.deck.length;

    const isDrawing =
        gameState.phase === "drawing";

    const isGameOver =
        remainingCards === 0;

    const canDraw =
        !isDrawing &&
        remainingCards > 0;

    const canShuffle =
        !isDrawing;

    return {
        deck: gameState.deck,

        selectedCard:
            gameState.selectedCard,

        drawnCard:
            gameState.drawnCard,

        phase: gameState.phase,

        remainingCards,

        isDrawing,

        isGameOver,

        canDraw,

        canShuffle,

        drawCard,

        shuffleCards,
    };
}