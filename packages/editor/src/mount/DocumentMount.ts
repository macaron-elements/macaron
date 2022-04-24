import { reaction } from "mobx";
import { Document } from "../models/Document";
import { DefaultVariant, Variant } from "../models/Variant";
import { MountRegistry } from "./MountRegistry";
import { VariantMount } from "./VariantMount";

export class DocumentMount {
  constructor(document: Document, domDocument: globalThis.Document) {
    this.document = document;
    this.domDocument = domDocument;

    const getAllVariants = () =>
      document.components.children.flatMap((component) => [
        component.defaultVariant,
        ...component.variants,
      ]);

    this.disposers = [
      reaction(getAllVariants, (variants) => {
        this.updateVariants(variants);
      }),
    ];
    this.updateVariants(getAllVariants());
  }

  dispose(): void {
    for (const variantMount of this.variantMounts) {
      variantMount.dispose();
    }
    this.disposers.forEach((disposer) => disposer());
  }

  private updateVariants(variants: (Variant | DefaultVariant)[]): void {
    const existingVariantMounts = new Map<
      Variant | DefaultVariant,
      VariantMount
    >();

    for (const variantMount of this.variantMounts) {
      existingVariantMounts.set(variantMount.variant, variantMount);
    }
    this.variantMounts = [];

    for (const variant of variants) {
      const variantMount =
        existingVariantMounts.get(variant) ||
        new VariantMount(variant, this.registry, this.domDocument);
      existingVariantMounts.delete(variant);
      this.variantMounts.push(variantMount);
    }
    console.log(this.variantMounts);

    for (const variantMount of existingVariantMounts.values()) {
      variantMount.dispose();
    }
  }

  readonly document: Document;
  readonly domDocument: globalThis.Document;
  readonly registry = new MountRegistry();
  readonly disposers: (() => void)[] = [];
  variantMounts: VariantMount[] = [];
}
