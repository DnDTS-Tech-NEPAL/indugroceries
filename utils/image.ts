export const calculateHeightAndWidth = (width: number, height: number) => {
  const maxHeight = 90;
  const maxWidth = 190;
  let ratio = 1;

  if (height > maxHeight) ratio = height / maxHeight;

  if (width / ratio > maxWidth) ratio = width / maxWidth;

  return {
    height: Math.floor(height / ratio),
    width: Math.floor(width / ratio),
  };
};
