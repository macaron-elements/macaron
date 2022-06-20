import { runInAction } from "mobx";
import replaceCSSURL from "replace-css-url";
import { parseFragment, stringifyFragment } from "../fileFormat/fragment";
import { Document } from "../models/Document";
import { ElementInstance } from "../models/ElementInstance";
import { Fragment } from "../models/Fragment";
import { TextInstance } from "../models/TextInstance";

export async function copyLayers(document: Document): Promise<void> {
  const fragment = document.selectedFragment;
  if (!fragment) {
    return;
  }

  const fragmentString = stringifyFragment(fragment);
  const base64 = Buffer.from(fragmentString).toString("base64");

  const encoded = `<span data-macaron="${base64}"></span>`;

  const type = "text/html";
  const blob = new Blob([encoded], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  await navigator.clipboard.write(data);
}

export async function pasteLayers(document: Document): Promise<void> {
  const contents = await navigator.clipboard.read();

  const item = contents.find((i) => i.types.includes("text/html"));
  if (!item) {
    return;
  }

  const encoded = await (await item.getType("text/html")).text();

  const match = encoded.match(/<span data-macaron="(.*)">/);
  if (!match) {
    return;
  }

  const base64 = match[1];
  const fragmentString = Buffer.from(base64, "base64").toString();
  const fragment = parseFragment(fragmentString);
  if (fragment) {
    extractDataURLFromFragment(fragment);

    runInAction(() => {
      document.appendFragmentBeforeSelection(fragment);
    });
  }
}

function extractDataURLFromFragment(fragment: Fragment): void {
  if (fragment.type !== "instances") {
    return;
  }

  fragment.instances.forEach(extractDataURL);
}

function extractDataURL(instance: ElementInstance | TextInstance): void {
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
