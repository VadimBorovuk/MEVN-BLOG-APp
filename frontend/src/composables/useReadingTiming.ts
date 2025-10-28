export const useReadingTiming = (content?: string | undefined): number => {
  if (!content) return 0;

  const words = content.trim().split(/\s+/).length;

  // Середня швидкість читання — 200 слів/хв
  const minutes = words / 200;

  // Округлюємо вверх — щоби не показувати 0 хв
  return Math.ceil(minutes);
}
