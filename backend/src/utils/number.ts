export function getRandomInt(max: number) {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(max);
  return Math.floor(
    Math.random() * (maxFloored - minCeiled) + minCeiled
  );
}
