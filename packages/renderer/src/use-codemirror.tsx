/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { basicSetup } from '@codemirror/basic-setup'
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { indentOnInput } from '@codemirror/language'
import { HighlightStyle, tags } from '@codemirror/highlight'
import { javascript } from '@codemirror/lang-javascript'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { oneDark } from '@codemirror/theme-one-dark'
import type React from 'react'

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%'
  }
})

const syntaxHighlighting = HighlightStyle.define([
  { tag: tags.heading1, fontSize: '1.6em', fontWeight: 'bold' },
  { tag: tags.heading2, fontSize: '1.4em', fontWeight: 'bold' },
  { tag: tags.heading3, fontSize: '1.2em', fontWeight: 'bold' }
])

interface Props {
  initalDoc: string
  onChange?: (state: EditorState) => void
}

const useCodeMirror = <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props

  useEffect(() => {
    if (!refContainer.current) return
    const startState = EditorState.create({
      doc: props.initalDoc,
      extensions: [
        keymap.of(defaultKeymap),
        basicSetup,
        // highlightActiveLineGutter(),
        // history(),
        indentOnInput(),
        // bracketMatching(),
        // defaultHighlightStyle.fallback,
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true
        }),
        oneDark,
        transparentTheme,
        // syntaxHighlighting,
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) onChange && onChange(update.state)
        })
      ]
    })
    const view = new EditorView({
      state: startState,
      parent: refContainer.current
    })
    setEditorView(view)
  }, [refContainer])
  return [refContainer, editorView]
}
export default useCodeMirror
