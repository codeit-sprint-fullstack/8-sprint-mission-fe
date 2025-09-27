export function useRules(){
  const nameOK = v => typeof v === 'string' && v.trim().length >= 1 && v.trim().length <= 10
  const descOK = v => typeof v === 'string' && v.trim().length >= 10 && v.trim().length <= 100
  const priceOK = v => /^\d+$/.test(String(v))
  const tagOK = v => typeof v === 'string' && v.trim().length >= 1 && v.trim().length <= 5
  return { nameOK, descOK, priceOK, tagOK }
}