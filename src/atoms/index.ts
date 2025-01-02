import type { FixedColumnID, SourceID } from "@shared/types"
import type { Update } from "./types"

export const focusSourcesAtom = atom((get) => {
  return get(primitiveMetadataAtom).data.focus
}, (get, set, update: Update<SourceID[]>) => {
  const _ = update instanceof Function ? update(get(focusSourcesAtom)) : update
  set(primitiveMetadataAtom, {
    updatedTime: Date.now(),
    action: "manual",
    data: {
      ...get(primitiveMetadataAtom).data,
      focus: _,
    },
  })
})

export const currentColumnIDAtom = atom<FixedColumnID>("focus")

export const currentSourcesAtom = atom((get) => {
  const id = get(currentColumnIDAtom)
  return get(primitiveMetadataAtom).data[id]
}, (get, set, update: Update<SourceID[]>) => {
  const _ = update instanceof Function ? update(get(currentSourcesAtom)) : update
  set(primitiveMetadataAtom, {
    updatedTime: Date.now(),
    action: "manual",
    data: {
      ...get(primitiveMetadataAtom).data,
      [get(currentColumnIDAtom)]: _,
    },
  })
})

export const blockKeywordsAtom = atom<string[]>({
  key: "blockKeywords",
  default: [],
})

blockKeywordsAtom.onMount = (setAtom) => {
  try {
    const stored = localStorage.getItem("blockKeywords")
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setAtom(parsed.filter(item => typeof item === "string"))
      }
    }
  } catch (error) {
    console.error("Failed to load block keywords:", error)
  }
}

export const goToTopAtom = atom({
  ok: false,
  el: undefined as HTMLElement | undefined,
  fn: undefined as (() => void) | undefined,
})
