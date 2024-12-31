const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_RATIOS = [7 / 10, 10 / 7, 1 / 1, 3 / 2, 16 / 9, 4 / 3]; // Allowed aspect ratios
const RATIO_TOLERANCE = 0.1; // Allow small rounding errors

export const isValidAspectRatio = (width: number, height: number) => {
  const ratio = width / height;
  return ALLOWED_RATIOS.some(
    (allowedRatio) => Math.abs(ratio - allowedRatio) < RATIO_TOLERANCE
  );
};

export const validateFile = (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const isSizeValid = file.size <= MAX_FILE_SIZE;
        const isRatioValid = isValidAspectRatio(img.width, img.height);
        resolve(isSizeValid && isRatioValid);
      };
      if (event.target) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  });
