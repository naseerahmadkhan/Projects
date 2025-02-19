import React, { useImperativeHandle, forwardRef, useEffect, useState } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"

const TextEditor = forwardRef((props, ref) => {
  const { quill, quillRef } = useQuill()
  const [pendingHTML, setPendingHTML] = useState("")

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    clearText: () => {
      if (quill) {
        quill.setText("") // Clear editor content
      }
    },
    getHTMLContent: () => {
      return quill ? quill.root.innerHTML : "" // Get full HTML content
    },
    setHTMLContent: (html) => {
      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(html) // Properly insert HTML content
      } else {
        setPendingHTML(html) // Store HTML until Quill is ready
      }
    },
  }))

  // When Quill is ready, insert stored content
  useEffect(() => {
    if (quill && pendingHTML) {
      quill.clipboard.dangerouslyPasteHTML(pendingHTML)
      setPendingHTML("") // Clear pending state after applying content
    }
  }, [quill, pendingHTML]) // Runs when Quill or `pendingHTML` updates

  return <div ref={quillRef} style={{ height: 150 }} />
})

export default TextEditor
