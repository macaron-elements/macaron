import { computed, makeObservable, observable } from "mobx";
import { Element } from "./Element";
import { TextInstance } from "./TextInstance";
import { Variant } from "./Variant";

// Variant × Element
export class ElementInstance {
  private static instances = new WeakMap<
    Variant,
    WeakMap<Element, ElementInstance>
  >();

  static get(variant: Variant, element: Element): ElementInstance {
    let instances = this.instances.get(variant);
    if (!instances) {
      instances = new WeakMap();
      ElementInstance.instances.set(variant, instances);
    }
    let instance = instances.get(element);
    if (!instance) {
      instance = new ElementInstance(variant, element);
      instances.set(element, instance);
    }
    return instance;
  }

  private constructor(variant: Variant, element: Element) {
    this.variant = variant;
    this.element = element;
    makeObservable(this);
  }

  get type(): "element" {
    return "element";
  }

  readonly variant: Variant;
  readonly element: Element;

  get parent(): ElementInstance | undefined {
    return this.element.parent
      ? ElementInstance.get(this.variant, this.element.parent)
      : undefined;
  }

  get children(): readonly (ElementInstance | TextInstance)[] {
    return this.element.children.map((child) =>
      child.type === "element"
        ? ElementInstance.get(this.variant, child)
        : TextInstance.get(this.variant, child)
    );
  }

  @observable selected = false;

  @computed get ancestorSelected(): boolean {
    return this.selected || this.parent?.ancestorSelected || false;
  }

  select(): void {
    this.selected = true;
    for (const child of this.children) {
      child.deselect();
    }
  }

  deselect(): void {
    this.selected = false;
    for (const child of this.children) {
      child.deselect();
    }
  }

  @computed.struct get selectedDescendants(): (
    | ElementInstance
    | TextInstance
  )[] {
    if (this.selected) {
      return [this];
    }
    return this.children.flatMap((child) => child.selectedDescendants);
  }

  @observable collapsed = true;

  expandAncestors(): void {
    this.collapsed = false;
    this.parent?.expandAncestors();
  }
}