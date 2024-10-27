import * as monaco from 'monaco-editor'
import { emmetHTML } from 'emmet-monaco-es'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { getState } from './state.js'

const {
  fontSize,
  lineNumbers,
  minimap,
  theme,
  wordWrap
} = getState()

const COMMON_EDITOR_OPTIONS = {
  automaticLayout: true,
  fontSize,
  scrollBeyondLastLine: false,
  roundedSelection: false,
  padding: {
    top: 16
  },
  lineNumbers,
  minimap: {
    enabled: minimap
  },
  wordWrap,
  theme
}

emmetHTML(monaco)

window.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'html') return new HtmlWorker()
    if (label === 'javascript') return new JsWorker()
    if (label === 'css') return new CssWorker()
  }
}

export const createEditor = ({ domElement, language, value }) => {
  return monaco.editor.create(domElement, {
    value,
    language,
    ...COMMON_EDITOR_OPTIONS
  })
}