import { computed, makeObservable, observable } from "mobx";
import { Rect } from "paintvec";
import shortUUID from "short-uuid";
import type * as hast from "hast";
import { ElementInstance, InstanceRegistry } from "./ElementInstance";
import { Text } from "./Text";
import { DefaultVariant, Variant } from "./Variant";

// Variant × Text
export class TextInstance {
  private static instances = new InstanceRegistry<Text, TextInstance>(
    (variant, element) => new TextInstance(variant, element)
  );

  static get(variant: Variant | DefaultVariant, text: Text): TextInstance {
    return this.instances.get(variant, text);
  }

  private constructor(variant: Variant | DefaultVariant, text: Text) {
    this.variant = variant;
    this.text = text;
    makeObservable(this);
  }

  readonly key = shortUUID.generate();

  get type(): "text" {
    return "text";
  }

  get node(): Text {
    return this.text;
  }

  get parent(): ElementInstance | undefined {
    return this.text.parent
      ? ElementInstance.get(this.variant, this.text.parent)
      : undefined;
  }

  readonly variant: Variant | DefaultVariant;
  readonly text: Text;

  @observable selected = false;

  @computed get ancestorSelected(): boolean {
    return this.selected || this.parent?.ancestorSelected || false;
  }

  select(): void {
    this.selected = true;
  }

  deselect(): void {
    this.selected = false;
  }

  @computed get selectedDescendants(): TextInstance[] {
    return this.selected ? [this] : [];
  }

  expandAncestors(): void {
    this.parent?.expandAncestors();
  }

  @computed get allDescendants(): (ElementInstance | TextInstance)[] {
    return [this];
  }

  @observable.ref boundingBox: Rect = new Rect();

  get inFlow(): boolean {
    return true;
  }

  get outerHTML(): hast.Text {
    return this.text.outerHTML;
  }
}
