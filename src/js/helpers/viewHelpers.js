export const hashShortner = hash => (
  hash.slice(0,10) + "..." + hash.slice(-4)
)
