import { useAtom } from "jotai"
import { blockKeywordsAtom } from "~/atoms"

export function useBlock(): {
  blockKeywords: string[]
  addBlockKeyword: (keyword: string) => void
  removeBlockKeyword: (keyword: string) => void
  isBlocked: (text: string) => boolean
} {
  const [blockKeywords, setBlockKeywords] = useAtom(blockKeywordsAtom)

  const ensureArray = (value: unknown): string[] => {
    if (Array.isArray(value)) {
      return value
    }
    console.error("Expected array but got:", value)
    return []
  }

  const addBlockKeyword = (keyword: string) => {
    const currentKeywords = ensureArray(blockKeywords)
    if (!currentKeywords.includes(keyword)) {
      const newKeywords = [...currentKeywords, keyword]
      setBlockKeywords(newKeywords)
      try {
        localStorage.setItem("blockKeywords", JSON.stringify(newKeywords))
      } catch (error) {
        console.error("Failed to save block keywords:", error)
      }
    }
  }

  const removeBlockKeyword = (keyword: string) => {
    const currentKeywords = ensureArray(blockKeywords)
    const newKeywords = currentKeywords.filter(k => k !== keyword)
    setBlockKeywords(newKeywords)
    try {
      localStorage.setItem("blockKeywords", JSON.stringify(newKeywords))
    } catch (error) {
      console.error("Failed to save block keywords:", error)
    }
  }

  const isBlocked = (text: string) => {
    const currentKeywords = ensureArray(blockKeywords)
    return currentKeywords.some(keyword =>
      text.toLowerCase().includes(keyword.toLowerCase()),
    )
  }

  return {
    blockKeywords: ensureArray(blockKeywords),
    addBlockKeyword,
    removeBlockKeyword,
    isBlocked,
  }
}
