import * as monaco from 'monaco-editor'
import { $ } from './dom.js'

export const initEditorHotKeys = ({ htmlEditor, jsEditor, cssEditor }) => {
  const editors = [htmlEditor, jsEditor, cssEditor]
  editors.forEach(editor => {
    editor.addAction({
      id: 'open-settings',
      label: 'Open Settings',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Comma
      ],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: () => {
        $('button[data-to="settings"]').click()
      }
    })
  })
}