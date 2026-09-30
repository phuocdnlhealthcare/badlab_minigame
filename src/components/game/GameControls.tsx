import Button from "@/components/common/Button";

interface GameControlsProps {
  onDraw: () => void;

  onShuffle: () => void;

  canDraw: boolean;

  canShuffle: boolean;

  isDrawing: boolean;

  isShuffling: boolean;
}

export default function GameControls({
  onDraw,
  onShuffle,
  canDraw,
  canShuffle,
  isDrawing,
  isShuffling,
}: GameControlsProps) {
  const getDrawButtonText =
    () => {
      if (isDrawing) {
        return "Đang rút...";
      }

      if (isShuffling) {
        return "Đang xào...";
      }

      if (!canDraw) {
        return "Đã hết bài";
      }

      return "Rút bài";
    };

  return (
    <div className="game-controls">
      <Button
        onClick={onDraw}
        disabled={!canDraw}
        className="
          game-controls__button
          game-controls__button--draw
        "
      >
        {getDrawButtonText()}
      </Button>

      <Button
        onClick={onShuffle}
        disabled={!canShuffle}
        className="
          game-controls__button
          game-controls__button--shuffle
        "
      >
        {isShuffling
          ? "Đang xào..."
          : "Xào bài lại"}
      </Button>
    </div>
  );
}