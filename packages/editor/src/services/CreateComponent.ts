import { runInAction } from "mobx";
import { Vec2 } from "paintvec";
import { Component } from "../models/Component";
import { Element } from "../models/Element";
import { ElementInstance, instancesFromHTML } from "../models/ElementInstance";
import { getInstance } from "../models/InstanceRegistry";
import { positionalStyleKeys, styleKeys } from "../models/Style";
import { TextInstance } from "../models/TextInstance";
import { EditorState } from "../state/EditorState";

export function createEmptyComponent(editorState: EditorState): Component {
  const component = new Component();
  component.defaultVariant.rootInstance.style.width = "100px";
  component.defaultVariant.rootInstance.style.height = "100px";
  component.defaultVariant.rootInstance.style.position = "relative";
  component.defaultVariant.rootInstance.style.display = "block";
  editorState.document.components.append(component);

  const pos = editorState.findNewComponentPosition(new Vec2(100, 100));
  component.defaultVariant.x = pos.x;
  component.defaultVariant.y = pos.y;

  return component;
}

export function setComponentContent(
  component: Component,
  instance: ElementInstance | TextInstance | undefined
): void {
  if (!instance) {
    return;
  }

  if (instance.type === "text") {
    component.rootElement.append(instance.node);
    return;
  }

  const createsWrapper = ["img", "input", "textarea", "select"].includes(
    instance.element.tagName
  );

  if (createsWrapper) {
    component.rootElement.append(instance.node);
    for (const property of positionalStyleKeys) {
      instance.style[property] = undefined;
    }
  } else {
    for (const property of styleKeys) {
      if ((positionalStyleKeys as readonly string[]).includes(property)) {
        continue;
      }
      component.defaultVariant.rootInstance.style[property] =
        instance.style[property];
    }
    component.rootElement.append(...instance.element.children);
  }
  component.defaultVariant.rootInstance.style.position = "relative";
  component.defaultVariant.rootInstance.style.display = "block";
}

export async function moveComponentToAvailableSpace(
  editorState: EditorState,
  component: Component
): Promise<void> {
  component.defaultVariant.x = -10000;
  component.defaultVariant.y = -10000;

  await new Promise((resolve) => setTimeout(resolve, 0));

  runInAction(() => {
    const size = component.defaultVariant.rootInstance.boundingBox.size;

    const pos = editorState.findNewComponentPosition(size, {
      exclude: new Set([component]),
    });

    component.defaultVariant.x = pos.x;
    component.defaultVariant.y = pos.y;
  });
}

export async function createComponentFromExistingInstance(
  editorState: EditorState,
  instance: ElementInstance
): Promise<Component> {
  if (!instance) {
    return createEmptyComponent(editorState);
  }

  const parent = instance.element.parent;
  if (!parent) {
    return createEmptyComponent(editorState);
  }

  const document = instance.element.component?.document;
  if (!document) {
    return createEmptyComponent(editorState);
  }

  // build component
  // TODO: generate component name

  const component = new Component();
  document.components.append(component);

  setComponentContent(component, instancesFromHTML([instance.outerHTML])[0]);

  // create instance

  const newElement = new Element({
    tagName: component.name,
  });
  newElement.setID(instance.element.id);
  parent.insertBefore(newElement, instance.element);

  const newInstance = getInstance(undefined, newElement);

  for (const property of positionalStyleKeys) {
    newInstance.style[property] = instance.style[property];
  }

  instance.element.remove();

  await moveComponentToAvailableSpace(editorState, component);

  return component;
}
