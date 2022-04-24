import type * as hast from "hast";
import { h } from "hastscript";
import { toHtml } from "hast-util-to-html";
import * as parse5 from "parse5";
import { inspect } from "unist-util-inspect";
import { fromParse5 } from "hast-util-from-parse5";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import { unified } from "unified";
import { formatHTML } from "../util/Format";
import { Component } from "./Component";
import { Document } from "./Document";
import { DefaultVariant, Variant } from "./Variant";

function dumpComponent(component: Component): hast.Element {
  return h(
    "macaron-component",
    {
      name: component.name,
    },
    [
      "\n",
      dumpDefaultVariant(component.defaultVariant),
      "\n",
      ...component.variants.map(dumpVariant),
      "\n",
      h("template", ["\n", ...component.rootElement.innerHTML, "\n"]),
      "\n",
    ]
  );
}

function dumpDefaultVariant(variant: DefaultVariant): hast.Element {
  return h("macaron-variant", {
    x: variant.x,
    y: variant.y,
    width: variant.width,
    height: variant.height,
  });
}

function dumpVariant(variant: Variant): hast.Element {
  return h("macaron-variant", {
    selector: variant.selector || undefined,
    mediaQuery: variant.mediaQuery || undefined,
    x: variant.x,
    y: variant.y,
    width: variant.width,
    height: variant.height,
  });
}

function dumpDocument(document: Document): hast.Element[] {
  return document.components.children.map(dumpComponent);
}

export function stringifyDocument(document: Document): string {
  const html = toHtml(dumpDocument(document));
  return formatHTML(html);
}

function loadComponent(node: hast.Element): Component {
  const name = node.properties?.name ?? "unnamed-component";

  const component = new Component();
  component.rename(String(name));

  for (const child of node.children) {
    if (
      child.type === "element" &&
      child.tagName === "template" &&
      child.content
    ) {
      const newContent = unified()
        .use(rehypeMinifyWhitespace)
        .runSync(child.content);

      component.rootElement.setInnerHTML(newContent.children);
    }
  }

  return component;
}

export function parseDocument(data: string): Document {
  const p5ast = parse5.parseFragment(data);
  //@ts-ignore
  let hast: hast.Root = fromParse5(p5ast);
  console.log(inspect(hast));
  hast = unified().use(rehypeMinifyWhitespace).runSync(hast);
  console.log(inspect(hast));

  if (hast.type !== "root") {
    throw new Error("Root node expected");
  }

  const document = new Document();

  for (const child of hast.children) {
    if (child.type === "element" && child.tagName === "macaron-component") {
      const component = loadComponent(child);
      document.components.append(component);
    }
  }

  return document;
}
