import Button from "@/components/common/Button";

interface GameControlsProps {
  onDraw: () => void;
  onShuffle: () => void;
  canDraw: boolean;
}

export default function GameControls({
  onDraw,
  onShuffle,
  canDraw,
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
        {canDraw
          ? "Rút bài"
          : "Đã hết bài"}
      </Button>

      <Button
        onClick={onShuffle}
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