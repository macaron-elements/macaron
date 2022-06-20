import { runInAction } from "mobx";
import { parseFragment, stringifyFragment } from "../fileFormat/fragment";
import { Document } from "../models/Document";
import { Fragment } from "../models/Fragment";
import { extractDataURL } from "./ExtractDataURL";

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

  extractDataURL(fragment.instances);
}
