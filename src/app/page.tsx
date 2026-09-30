'use client';
import Button from "@/components/common/Button";
import { GAME_CONFIG, GAME_ROUTES } from "@/constants/game";

export default function HomePage() {
  return (
    <main className="home">
      <div className="home__background" />

      <section className="home__content">
        <div className="home__badge">
          BADLAB MINIGAME
        </div>

        <h1 className="home__title">
          RÚT MỘT LÁ
          <span>KHÁM PHÁ ĐIỀU BẤT NGỜ</span>
        </h1>

        <p className="home__description">
          Bộ bài gồm {GAME_CONFIG.TOTAL_CARDS} lá.
          Hãy bắt đầu trò chơi và khám phá lá bài
          dành cho bạn.
        </p>

        <Button
          href={GAME_ROUTES.GAME}
          className="home__start-button"
          ariaLabel="Bắt đầu chơi minigame"
        >
          Bắt đầu chơi
        </Button>

        <p className="home__hint">
          Nhấn nút để bắt đầu
        </p>
      </section>

      <div
        className="home__cards"
        aria-hidden="true"
      >
        <div className="home-card home-card--left" />

        <div className="home-card home-card--center">
          <span>?</span>
        </div>

        <div className="home-card home-card--right" />
      </div>
    </main>
  );
}