import {
  TreeNode,
  TreeNodeOptions,
} from "@seanchas116/paintkit/dist/util/TreeNode";
import { Element } from "./Element";
import { makeObservable, observable } from "mobx";

export interface TextJSON {
  type: "text";
  key: string;
  content: string;
}

export interface TextOptions extends TreeNodeOptions {
  content: string;
}

export class Text extends TreeNode<Element, Text, never> {
  constructor(options: TextOptions) {
    super(options);
    this.content = options.content;
    makeObservable(this);
  }

  @observable content: string;

  toJSON(): TextJSON {
    return {
      type: "text",
      content: this.content,
      key: this.key,
    };
  }

  loadJSON(json: TextJSON): void {
    if (this.key !== json.key) {
      throw new Error("Text key must match");
    }
    this.content = json.content;
  }
}
