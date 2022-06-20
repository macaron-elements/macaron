import replaceCSSURL from "replace-css-url";
import shortUUID from "short-uuid";
import { ElementInstance } from "../models/ElementInstance";
import { TextInstance } from "../models/TextInstance";

export function extractDataURLImpl(
  instance: ElementInstance | TextInstance
): { uuid: string; name: string; dataURL: string }[] {
  if (instance.type === "text") {
    return [];
  }

  const imageFiles: { uuid: string; name: string; dataURL: string }[] = [];

  const element = instance.node;

  if (element.tagName === "img") {
    const src = element.attrs.get("src");
    if (src && src.startsWith("data:")) {
      const uuid = shortUUID.generate();
      imageFiles.push({
        uuid,
        name: element.id ?? "image",
        dataURL: src,
      });
      element.attrs.set("src", uuid);
    }
  }

  if (instance.style.background) {
    replaceCSSURL(instance.style.background, (url: string) => {
      if (url.startsWith("data:")) {
        const uuid = shortUUID.generate();
        imageFiles.push({
          uuid,
          name: element.id ?? "image",
          dataURL: url,
        });
        return uuid;
      }
      return url;
    });
  }

  for (const child of instance.children) {
    imageFiles.push(...extractDataURLImpl(child));
  }

  return imageFiles;
}

export function extractDataURL(
  instances: (ElementInstance | TextInstance)[]
): void {
  const imageFiles = instances.flatMap((i) => extractDataURLImpl(i));
  console.log(imageFiles);
}
