"use client";

import {
  useCallback,
  useRef,
  useState,
} from "react";

import CardDeck from "@/components/game/CardDeck";
import DrawnCard from "@/components/game/DrawnCard";
import GameControls from "@/components/game/GameControls";

import {
  GAME_CONFIG,
} from "@/constants/game";

import {
  useCardGame,
} from "@/hooks/useCardGame";

import {
  getElementMotion,
} from "@/utils/getElementMotion";

import type {
  ElementMotion,
} from "@/utils/getElementMotion";

export default function GameBoard() {
  const {
    deck,

    selectedCard,

    drawnCard,

    phase,

    isDrawing,

    isShuffling,

    canDraw,

    canShuffle,

    drawCard,

    shuffleCards,
  } = useCardGame();

  /**
   * Lưu DOM element của từng card.
   */
  const cardElementsRef =
    useRef<
      Map<number, HTMLDivElement>
    >(new Map());

  /**
   * DOM của vị trí reveal.
   */
  const revealStageRef =
    useRef<HTMLDivElement>(null);

  /**
   * Vector từ card trong deck
   * đến reveal stage.
   */
  const [
    drawMotion,
    setDrawMotion,
  ] =
    useState<ElementMotion | null>(
      null
    );

  /**
   * CardDeck gọi callback này
   * để đăng ký HTMLElement.
   */
  const registerCardRef =
    useCallback(
      (
        cardId: number,
        element:
          HTMLDivElement | null
      ) => {
        if (element) {
          cardElementsRef.current.set(
            cardId,
            element
          );

          return;
        }

        cardElementsRef.current.delete(
          cardId
        );
      },
      []
    );

  /**
   * DRAW
   */
  const handleDraw = () => {
    if (!canDraw) {
      return;
    }

    /**
     * Hook random card và trả về
     * chính card vừa được chọn.
     */
    const card =
      drawCard();

    if (!card) {
      return;
    }

    /**
     * HTMLElement thật của card
     * trong stack.
     */
    const sourceElement =
      cardElementsRef.current.get(
        card.id
      );

    /**
     * HTMLElement của vùng reveal.
     */
    const targetElement =
      revealStageRef.current;

    if (
      sourceElement &&
      targetElement
    ) {
      const motion =
        getElementMotion(
          sourceElement,
          targetElement
        );

      setDrawMotion(
        motion
      );

      return;
    }

    /**
     * Fallback hiếm khi xảy ra.
     */
    setDrawMotion({
      x: 0,
      y: 180,
      scale: 0.8,
    });
  };

  /**
   * SHUFFLE
   */
  const handleShuffle = () => {
    if (!canShuffle) {
      return;
    }

    setDrawMotion(null);

    shuffleCards();
  };

  return (
    <main className="game-page">
      <div className="game-page__container">
        {/* DECK — góc trên bên trái */}

        <section className="game-stage__deck">
          <div className="game-stage__deck-header">
            <span>
              BỘ BÀI
            </span>

            <strong>
              {deck.length}/
              {
                GAME_CONFIG
                  .TOTAL_CARDS
              }
            </strong>
          </div>

          <CardDeck
            cards={deck}
            drawingCardId={
              selectedCard?.id ??
              null
            }
            isShuffling={
              isShuffling
            }
            shuffleDuration={
              GAME_CONFIG
                .SHUFFLE_ANIMATION_MS
            }
            registerCardRef={
              registerCardRef
            }
          />
        </section>

        {/* REVEAL — lá bài rút được ở giữa */}

        <div className="game-stage__reveal">
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
            stageRef={
              revealStageRef
            }
            drawMotion={
              drawMotion
            }
          />
        </div>

        {/* CONTROLS — dưới cùng */}

        <div className="game-stage__controls">
          <GameControls
            onDraw={
              handleDraw
            }
            onShuffle={
              handleShuffle
            }
            canDraw={
              canDraw
            }
            canShuffle={
              canShuffle
            }
            isDrawing={
              isDrawing
            }
            isShuffling={
              isShuffling
            }
          />
        </div>
      </div>
    </main>
  );
}