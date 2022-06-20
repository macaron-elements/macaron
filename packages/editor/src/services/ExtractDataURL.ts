import replaceCSSURL from "replace-css-url";
import { ElementInstance } from "../models/ElementInstance";
import { TextInstance } from "../models/TextInstance";

export function extractDataURL(instance: ElementInstance | TextInstance): void {
  if (instance.type === "text") {
    return;
  }

  // extract img src
  const element = instance.node;

  if (element.tagName === "img") {
    const src = element.attrs.get("src");
    if (src && src.startsWith("data:")) {
      console.log(src);
    }
  }

  if (instance.style.background) {
    replaceCSSURL(instance.style.background, (url: string) => {
      if (url.startsWith("data:")) {
        console.log(url);
      }
      return url;
    });
  }

  for (const child of instance.children) {
    extractDataURL(child);
  }
}
