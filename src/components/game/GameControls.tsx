import Button from "@/components/common/Button";

interface GameControlsProps {
  onDraw: () => void;

  onShuffle: () => void;

  canDraw: boolean;

  canShuffle: boolean;

  isDrawing: boolean;
}

export default function GameControls({
  onDraw,
  onShuffle,
  canDraw,
  canShuffle,
  isDrawing,
}: GameControlsProps) {
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
        {isDrawing
          ? "Đang rút..."
          : canDraw
            ? "Rút bài"
            : "Đã hết bài"}
      </Button>

      <Button
        onClick={onShuffle}
        disabled={!canShuffle}
        className="
          game-controls__button
          game-controls__button--shuffle
        "
      >
        Xào bài lại
      </Button>
    </div>
  );
}