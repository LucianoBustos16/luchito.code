import './style.css'
import Split from 'split-grid'
import { encode, decode } from 'js-base64';
import * as monaco from 'monaco-editor';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

window.MonacoEnvironment = {
  getWorker (_, label) {
    if ( label === 'html' ) return new HtmlWorker()
    if ( label === 'javascript') return new JsWorker()
    if ( label === 'css') return new CssWorker()
  }
}

const $ = selector => document.querySelector(selector)

Split({
  columnGutters: [{
      track: 1,
      element: $('.gutter-col-1'),
  }],
  rowGutters: [{
      track: 1,
      element: $('.gutter-row-1'),
  }]
})



const $js = $('#js')
const $css = $('#css')
const $html = $('#html')

const { pathname } = window.location


const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')


const html = rawHtml ? decode(rawHtml) : ''
const css = rawCss ? decode(rawCss) : ''
const js = rawJs ? decode(rawJs) : ''

const COMMON_EDITOR_OPTIONS = {
  fontSize: 18,
  automaticLayout: true,
  theme: 'vs-dark',
}


const HtmlEditor = monaco.editor.create($html, {
  value: html,
  language: 'html',
  ... COMMON_EDITOR_OPTIONS
})

const JsEditor = monaco.editor.create($js, {
  value: js,
  language: 'javascript',
  ... COMMON_EDITOR_OPTIONS
})

const CssEditor = monaco.editor.create($css, {
  value: css,
  language: 'css',
  ... COMMON_EDITOR_OPTIONS
})

HtmlEditor.onDidChangeModelContent(update)
JsEditor.onDidChangeModelContent(update)
CssEditor.onDidChangeModelContent(update)

const htmlForPreviw = createHtml({html, css, js})
$('iframe').setAttribute('srcdoc', htmlForPreviw)


function update () {
  const html = HtmlEditor.getValue()
  const css = CssEditor.getValue()
  const js = JsEditor.getValue()

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`

  window.history.replaceState(null, null, `/${hashedCode}`)

  const htmlForPreviw = createHtml({html, css, js})
  $('iframe').setAttribute('srcdoc', htmlForPreviw)
}

function createHtml ({html, css, js}) {
  return `
    <!doctype html>
      <html lang="es">
        <head>
          <style>
          ${css}
          </style>
        </head>
        <body>
          ${html}
        <script>
          ${js}
        </script>
        </body>
        </html>
        `
}