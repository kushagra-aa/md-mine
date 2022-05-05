/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect } from 'react'
import useCodeMirror from './use-codemirror'
import './editor.css'

interface Props {
  initialDoc: string
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = props => {
  const { onChange, initialDoc } = props
  const handleChange = useCallback(
    state => onChange(state.doc.toString()),
    [onChange]
  )
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initalDoc: initialDoc,
    onChange: handleChange
  })

  useEffect(() => {
    if (editorView) {
      //   nothing
    }
  }, [editorView])

  return <div className="editor-wrapper" ref={refContainer}></div>
}
export default Editor
