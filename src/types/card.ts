export interface Card {
  id: number;

  // Nội dung được hiển thị trên mặt trước của lá bài
  content: string;

  // Ảnh mặt trước
  frontImage: string;

  // Ảnh mặt sau
  backImage: string;
}