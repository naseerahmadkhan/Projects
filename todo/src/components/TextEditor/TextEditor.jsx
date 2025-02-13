import React, { useState, useImperativeHandle, forwardRef } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css" // Add css for snow theme

const TextEditor = forwardRef((props, ref) => {
  const { quill, quillRef } = useQuill()

  // Expose clearText method to parent component via ref
  useImperativeHandle(ref, () => ({
    clearText: () => {
      if (quill) {
        quill.setText("") // Clear editor content
      }
    },
    getHTMLContent: () => {
        if (quill) {
            // Get the full HTML content (including tags)
            return quill.root.innerHTML
          }
          return "" // Return empty string if quill is not initialized
      }
  }))

  return (
    <div>
      <div ref={quillRef} style={{height:150}}/>
    </div>
  )
})

export default TextEditor
