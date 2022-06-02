// @ts-ignore
import "tippy.js/dist/tippy.css";

import React from "react";
import ReactDOM from "react-dom/client";
import styled, { StyleSheetManager } from "styled-components";
import {
  ColorSchemeProvider,
  GlobalStyle,
  PaintkitProvider,
} from "@seanchas116/paintkit/src/components/GlobalStyle";
import { ContextMenuProvider } from "@seanchas116/paintkit/src/components/menu/ContextMenuProvider";
import { JSONUndoHistory } from "@seanchas116/paintkit/src/util/JSONUndoHistory";
import { RootPortalHostProvider } from "@seanchas116/paintkit/src/components/RootPortal";
import { DocumentJSON, Document } from "../models/Document";
import { EditorState } from "../state/EditorState";
import { Editor } from "../views/Editor";

class EditorElementEditorState extends EditorState {
  readonly history = new JSONUndoHistory<DocumentJSON, Document>(
    new Document()
  );
}

const StyledEditor = styled(Editor)`
  width: 100%;
  height: 100%;
`;

const App: React.FC<{
  editorState: EditorState;
}> = ({ editorState }) => {
  return (
    <ColorSchemeProvider colorScheme="auto">
      <GlobalStyle />
      <PaintkitProvider>
        <ContextMenuProvider>
          <StyledEditor editorState={editorState} />
        </ContextMenuProvider>
      </PaintkitProvider>
    </ColorSchemeProvider>
  );
};

export class MacaronEditorElement extends HTMLElement {
  private _editorState: EditorElementEditorState;

  constructor() {
    super();
    this._editorState = new EditorElementEditorState();
  }

  connectedCallback(): void {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const styles = document.createElement("div");
    shadowRoot.append(styles);

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
      }
    `;
    styles.appendChild(style);

    const mountPoint = document.createElement("span");
    shadowRoot.appendChild(mountPoint);

    const root = ReactDOM.createRoot(mountPoint);
    root.render(
      <React.StrictMode>
        <RootPortalHostProvider value={shadowRoot}>
          <StyleSheetManager target={styles}>
            <App editorState={this._editorState} />
          </StyleSheetManager>
        </RootPortalHostProvider>
      </React.StrictMode>
    );
  }

  get editorState(): EditorElementEditorState {
    return this._editorState;
  }
}

customElements.define("macaron-editor", MacaronEditorElement);
