import { ElementInstance } from "../models/ElementInstance";
import { Variant } from "../models/Variant";
import { ChildMountSync } from "./ElementMount";
import { MountRegistry } from "./MountRegistry";

export class VariantMount {
  constructor(
    variant: Variant,
    registry: MountRegistry,
    domDocument: globalThis.Document
  ) {
    this.variant = variant;
    this.registry = registry;
    this.domDocument = domDocument;

    this.element = domDocument.createElement("div");
    this.host = domDocument.createElement("div");
    this.shadow = this.host.attachShadow({ mode: "open" });
    this.element.append(this.host);

    // TODO: add style

    this.childMountSync = new ChildMountSync(
      ElementInstance.get(variant, variant.component.rootElement),
      registry,
      this.shadow
    );
    registry.setVariantMount(this);
  }

  dispose(): void {
    this.childMountSync.dispose();
    this.registry.deleteVariantMount(this);
  }

  readonly variant: Variant;
  readonly registry: MountRegistry;
  readonly domDocument: globalThis.Document;

  readonly element: HTMLDivElement;
  readonly host: HTMLDivElement;
  readonly shadow: ShadowRoot;

  readonly childMountSync: ChildMountSync;
}
