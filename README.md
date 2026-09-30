# 🃏 BadLab Minigame — Rút Một Lá

Một minigame **"Rút một lá bài"** được xây dựng bằng **Next.js (App Router)**, **React 19** và **TypeScript**. Người chơi rút ngẫu nhiên một lá bài từ bộ bài 20 lá, xem lá bài được lật lên với hiệu ứng animation mượt mà, và có thể xào bài lại để chơi tiếp.

---

## ✨ Tính năng

- 🎲 **Rút bài ngẫu nhiên** — mỗi lần rút chọn ngẫu nhiên 1 trong số các lá bài còn lại.
- 🎬 **Animation rút bài** — lá bài bay từ vị trí trong bộ bài đến vùng reveal rồi lật mặt, dựa trên vị trí thực tế của DOM (`getBoundingClientRect`).
- 🔀 **Xào bài lại** — gom đủ 20 lá, chạy animation xào bài, sau đó trộn thứ tự bằng thuật toán **Fisher–Yates**.
- 🛡️ **Chống spam** — khóa tương tác (`interactionLock`) ngăn người chơi bấm liên tục trong lúc animation đang chạy.
- 📱 **Responsive** — giao diện tối giản, tối màu, hiển thị tốt trên nhiều kích thước màn hình.
- ♿ **Accessibility** — sử dụng `aria-label`, `aria-live` và các nút có thể điều hướng bằng bàn phím.

---

## 🧱 Công nghệ sử dụng

| Công nghệ | Phiên bản |
| --------- | --------- |
| Next.js (App Router) | 16.3.7 |
| React | 19.2.8 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| ESLint | ^9 |

---

## 🚀 Chạy dự án

```bash
# Cài đặt dependencies
npm install

# Chạy môi trường phát triển
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

### Các script khác

```bash
npm run build   # Build production
npm run start   # Chạy bản production
npm run lint    # Kiểm tra lint
```

---

## 🗂️ Cấu trúc dự án

```
badlab_minigame/
├── public/
│   └── images/
│       ├── backgrounds/   # Ảnh nền
│       ├── cards/         # Ảnh lá bài (front/back × basic/medium/rare)
│       ├── icons/         # Icon
│       └── logo/          # Logo
└── src/
    ├── app/
    │   ├── globals.css    # Reset + toàn bộ style (CSS thuần + Tailwind)
    │   ├── layout.tsx     # Root layout (font Geist)
    │   ├── page.tsx       # Trang chủ — màn hình giới thiệu
    │   └── game/
    │       └── page.tsx   # Trang game — render <GameBoard />
    ├── components/
    │   ├── common/
    │   │   └── Button.tsx # Nút tái sử dụng (hỗ trợ <Link> hoặc <button>)
    │   └── game/
    │       ├── Card.tsx        # Lá bài đơn lẻ (mặt trước / mặt sau)
    │       ├── CardDeck.tsx    # Bộ bài dạng stack + animation xào
    │       ├── DrawnCard.tsx   # Vùng reveal lá bài được rút
    │       ├── GameBoard.tsx   # Bố cục chính của game
    │       └── GameControls.tsx# Nút "Rút bài" / "Xào bài lại"
    ├── constants/
    │   └── game.ts        # Cấu hình: số lá, thời gian animation, routes
    ├── data/
    │   └── cards.ts       # Dữ liệu 20 lá bài
    ├── hooks/
    │   └── useCardGame.ts # Hook quản lý toàn bộ state game
    ├── types/
    │   └── card.ts        # Type Card
    └── utils/
        ├── getElementMotion.ts # Tính vector di chuyển giữa 2 DOM element
        └── shuffle.ts          # Thuật toán Fisher–Yates
```

---

## 🎮 Cách chơi

1. **Trang chủ** — nhấn nút **"Bắt đầu chơi"** để vào game.
2. **Rút bài** — nhấn **"Rút bài"**, một lá bài ngẫu nhiên sẽ bay từ bộ bài lên vùng reveal và lật mặt.
3. **Xem kết quả** — nội dung lá bài được hiển thị trên mặt trước.
4. **Xào bài lại** — khi hết bài (hoặc bất kỳ lúc nào), nhấn **"Xào bài lại"** để gom đủ 20 lá và trộn lại thứ tự.

---

## 🧠 Luồng hoạt động

### State game (`useCardGame`)

Hook `useCardGame` quản lý toàn bộ trạng thái:

- **`deck`** — danh sách lá bài còn lại.
- **`selectedCard`** — lá đang chạy animation rút.
- **`drawnCard`** — lá đã được reveal hoàn chỉnh.
- **`phase`** — trạng thái hiện tại: `idle` → `drawing` → `revealed` → `shuffling`.

```
idle ──Rút bài──▶ drawing ──hết animation──▶ revealed
  ▲                                              │
  └──────────────Xào bài lại─────────────────────┘
```

### Các phase

| Phase       | Mô tả                                                                 |
| ----------- | --------------------------------------------------------------------- |
| `idle`      | Sẵn sàng rút bài, hiển thị placeholder `?`.                           |
| `drawing`   | Lá bài đang bay + lật (dùng `selectedCard`), hiển thị "Đang rút bài...". |
| `revealed`  | Lá bài đã lật xong, hiển thị nội dung (dùng `drawnCard`).             |
| `shuffling` | Đang xào bài, hiển thị icon `↻` và animation xào.                     |

### Animation rút bài

1. `GameBoard.handleDraw` gọi `drawCard()` từ hook — hook chọn ngẫu nhiên một lá và trả về lá đó.
2. `GameBoard` tìm DOM element thật của lá trong bộ bài (`cardElementsRef`) và DOM của vùng reveal (`revealStageRef`).
3. `getElementMotion()` tính vector `{ x, y, scale }` dựa trên `getBoundingClientRect()` của 2 element.
4. Vector này được truyền vào `DrawnCard` dưới dạng CSS variables (`--draw-from-x`, `--draw-from-y`, `--draw-from-scale`) để chạy animation bay + lật.
5. Sau `DRAW_ANIMATION_MS` (1400ms), hook xóa lá khỏi deck và chuyển sang phase `revealed`.

### Animation xào bài

1. `shuffleCards()` gom đủ 20 lá, chuyển phase thành `shuffling`.
2. `CardDeck` render đủ 20 lá và chạy animation xào (3 giai đoạn di chuyển qua CSS variables `--shuffle-x/y/r-1..3`).
3. Sau `SHUFFLE_ANIMATION_MS` (1800ms), hook thật sự trộn deck bằng `shuffleArray()` (Fisher–Yates) và chuyển về phase `idle`.

---

## 🃏 Dữ liệu lá bài

20 lá bài được định nghĩa trong `src/data/cards.ts`, chia làm 3 nhóm theo độ hiếm:

| Nhóm   | ID        | Ảnh mặt trước / mặt sau        |
| ------ | --------- | ------------------------------ |
| Basic  | 1 – 7     | `front_card_basic.jpg` / `back_card_basic.jpg` |
| Medium | 8 – 14    | `front_card_medium.jpg` / `back_card_medium.jpg` |
| Rare   | 15 – 20   | `front_card_rare.jpg` / `back_card_rare.jpg` |

Mỗi lá bài có cấu trúc:

```ts
interface Card {
  id: number;          // ID duy nhất
  content: string;     // Nội dung hiển thị trên mặt trước
  frontImage: string;  // Ảnh mặt trước
  backImage: string;   // Ảnh mặt sau
}
```

> 💡 Muốn thay đổi nội dung lá bài, chỉ cần sửa mảng `CARDS` trong `src/data/cards.ts`.

---

## ⚙️ Cấu hình

Tất cả cấu hình tập trung trong `src/constants/game.ts`:

```ts
export const GAME_CONFIG = {
  TOTAL_CARDS: 20,          // Tổng số lá bài
  DRAW_ANIMATION_MS: 1400,  // Thời gian animation rút bài (ms)
  SHUFFLE_ANIMATION_MS: 1800, // Thời gian animation xào bài (ms)
};
```

---

## 📁 Tài nguyên hình ảnh

- **Lá bài**: `public/images/cards/` — 3 bộ ảnh front/back theo độ hiếm.
- **Nền**: `public/images/backgrounds/`
- **Icon / Logo**: `public/images/icons/`, `public/images/logo/`

---

## 🛠️ Phát triển

- **Thêm lá bài mới**: thêm object vào `CARDS` trong `src/data/cards.ts` và cập nhật `TOTAL_CARDS` nếu cần.
- **Đổi tốc độ animation**: chỉnh `DRAW_ANIMATION_MS` / `SHUFFLE_ANIMATION_MS` trong `src/constants/game.ts`.
- **Đổi giao diện**: toàn bộ style nằm trong `src/app/globals.css` (CSS thuần + Tailwind).
