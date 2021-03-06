import React, { useContext } from "react";
import { EditorState } from "../state/EditorState";

const EditorStateContext = React.createContext<EditorState | undefined>(
  undefined
);

export function useEditorState(): EditorState {
  const editorState = useContext(EditorStateContext);
  if (editorState === undefined) {
    throw new Error(
      "useEditorState must be used within an EditorStateProvider"
    );
  }
  return editorState;
}

export const EditorStateProvider = EditorStateContext.Provider;
