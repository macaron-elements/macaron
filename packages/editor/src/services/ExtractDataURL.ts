import replaceCSSURL from "replace-css-url";
import shortUUID from "short-uuid";
import { ElementInstance } from "../models/ElementInstance";
import { TextInstance } from "../models/TextInstance";

function visitImageURLs(
  instance: ElementInstance | TextInstance,
  visit: (instance: ElementInstance, url: string) => string
) {
  if (instance.type === "text") {
    return [];
  }

  const element = instance.node;

  if (element.tagName === "img") {
    const src = element.attrs.get("src");
    if (src) {
      element.attrs.set("src", visit(instance, src));
    }
  }

  if (instance.style.background) {
    replaceCSSURL(instance.style.background, (url: string) =>
      visit(instance, url)
    );
  }

  for (const child of instance.children) {
    visitImageURLs(child, visit);
  }
}

export async function extractDataURLs(
  instances: (ElementInstance | TextInstance)[],
  saveImageFiles: (
    imageFiles: { name: string; dataURL: string }[]
  ) => Promise<string[]>
): Promise<void> {
  const imageFiles: { uuid: string; name: string; dataURL: string }[] = [];

  for (const instance of instances) {
    visitImageURLs(instance, (i, url) => {
      if (url.startsWith("data:")) {
        const uuid = shortUUID.generate();
        imageFiles.push({
          uuid,
          name: i.element.id ?? "image",
          dataURL: url,
        });
        return uuid;
      }
      return url;
    });
  }

  const saved = await saveImageFiles(imageFiles);

  const uuidToSavedPath = new Map<string, string>();

  for (let i = 0; i < saved.length; i++) {
    uuidToSavedPath.set(imageFiles[i].uuid, saved[i]);
  }

  for (const instance of instances) {
    visitImageURLs(instance, (i, url) => {
      const path = uuidToSavedPath.get(url);
      if (path) {
        return path;
      }
      return url;
    });
  }
}
