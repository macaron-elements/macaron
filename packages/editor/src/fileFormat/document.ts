import type * as hast from "hast";
import { h } from "hastscript";
import { toHtml } from "hast-util-to-html";
import { isEqual } from "lodash-es";
import { formatHTML } from "../util/Format";
import { parseHTMLFragment } from "../util/Hast";
import { Document } from "../models/Document";
import { dumpComponent, loadComponent } from "./component";
import { dumpGlobalStyle, loadGlobalStyle } from "./globalStyle";

function dumpDocument(document: Document): hast.Content[] {
  const components = document.components.children.map(dumpComponent);

  const globalStyle = dumpGlobalStyle(document);

  const preludeScripts = document.preludeScripts.map((src) =>
    h("script", {
      type: "module",
      src,
    })
  );
  const preludeStyleSheets = document.preludeStyleSheets.map((href) =>
    h("link", {
      rel: "stylesheet",
      href,
    })
  );

  return [
    ...preludeStyleSheets,
    ...preludeScripts,
    globalStyle,
    ...components.flatMap((c): hast.Content[] => [
      { type: "text", value: " " },
      c,
    ]),
  ];
}

function loadDocument(document: Document, hastNodes: hast.Content[]): void {
  document.clear();

  for (const child of hastNodes) {
    if (child.type !== "element") {
      continue;
    }

    if (child.tagName === "macaron-component") {
      const component = loadComponent(child);
      document.components.append(component);
      continue;
    }

    if (
      child.tagName === "script" &&
      child.properties?.type === "module" &&
      child.properties?.src
    ) {
      document.preludeScripts.push(String(child.properties.src));
      continue;
    }

    if (
      child.tagName === "link" &&
      isEqual(child.properties?.rel, ["stylesheet"]) &&
      child.properties?.href
    ) {
      document.preludeStyleSheets.push(String(child.properties.href));
      continue;
    }

    if (child.tagName === "style") {
      loadGlobalStyle(document, child);
    }
  }
}

export function stringifyDocument(document: Document): string {
  const html = toHtml(dumpDocument(document));
  return formatHTML(html);
}

export function parseDocument(document: Document, data: string): void {
  const hast = parseHTMLFragment(data);
  return loadDocument(document, hast.children);
}
