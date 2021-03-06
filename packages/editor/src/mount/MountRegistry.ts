import { WeakMultiMap } from "@seanchas116/paintkit/src/util/WeakMultiMap";
import { ElementInstance } from "../models/ElementInstance";
import { TextInstance } from "../models/TextInstance";
import { DefaultVariant, Variant } from "../models/Variant";
import { ElementMount } from "./ElementMount";
import { TextMount } from "./TextMount";
import { VariantMount } from "./VariantMount";

export class MountRegistry {
  private readonly variantMounts = new WeakMultiMap<
    Variant | DefaultVariant,
    VariantMount
  >();
  private readonly elementMounts = new WeakMultiMap<
    ElementInstance,
    ElementMount
  >();
  private readonly textMounts = new WeakMultiMap<TextInstance, TextMount>();

  setElementMount(mount: ElementMount): void {
    this.elementMounts.set(mount.instance, mount);
  }

  setTextMount(mount: TextMount): void {
    this.textMounts.set(mount.instance, mount);
  }

  setVariantMount(mount: VariantMount): void {
    this.variantMounts.set(mount.variant, mount);
  }

  getElementMount(instance: ElementInstance): ElementMount | undefined {
    return [...this.elementMounts.get(instance)][0];
  }

  getTextMount(instance: TextInstance): TextMount | undefined {
    return [...this.textMounts.get(instance)][0];
  }

  getVariantMount(variant: Variant | DefaultVariant): VariantMount | undefined {
    return [...this.variantMounts.get(variant)][0];
  }

  deleteElementMount(mount: ElementMount): void {
    this.elementMounts.deleteValue(mount.instance, mount);
  }

  deleteTextMount(mount: TextMount): void {
    this.textMounts.deleteValue(mount.instance, mount);
  }

  deleteVariantMount(mount: VariantMount): void {
    this.variantMounts.deleteValue(mount.variant, mount);
  }
}
