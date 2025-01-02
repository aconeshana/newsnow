import { useState } from "react"
import { useBlock } from "~/hooks/useBlock"

interface BlockButtonProps {
  title: string
}

export function BlockButton({ title }: BlockButtonProps) {
  const [isInputVisible, setInputVisible] = useState(false)
  const [keyword, setKeyword] = useState("")
  const { blockKeywords, addBlockKeyword, removeBlockKeyword } = useBlock()

  const handleAddKeyword = () => {
    if (keyword.trim()) {
      addBlockKeyword(keyword.trim())
      setKeyword("")
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setInputVisible(!isInputVisible)}
        className="btn i-ph:prohibit-duotone"
      />

      {isInputVisible && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setInputVisible(false)
            }
          }}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-96" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">拦截关键词管理</h3>
              <button
                onClick={() => setInputVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="i-ph:x-duotone text-xl" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              来源:
              {title}
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="输入关键词"
                className="flex-1 px-3 py-2 border rounded"
                onKeyDown={e => e.key === "Enter" && handleAddKeyword()}
              />
              <button
                onClick={handleAddKeyword}
                disabled={!keyword.trim()}
                className={
                  keyword.trim()
                    ? "px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    : "px-4 py-2 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              >
                添加
              </button>
            </div>

            {blockKeywords.length > 0
              ? (
                  <div>
                    <h4 className="font-medium mb-2">已添加的关键词：</h4>
                    <div className="max-h-60 overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {blockKeywords.map(word => (
                          <div
                            key={word}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full"
                          >
                            <span>{word}</span>
                            <button
                              onClick={() => removeBlockKeyword(word)}
                              className="text-gray-400 hover:text-red-500"
                              title="删除关键词"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              : (
                  <div className="text-center text-gray-500 py-4">
                    暂无拦截关键词
                  </div>
                )}
          </div>
        </div>
      )}
    </>
  )
}
