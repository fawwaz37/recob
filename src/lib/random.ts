function generateRandomCode(length: number): string {
  const characters = '0123456789';
  return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

export default generateRandomCode;
