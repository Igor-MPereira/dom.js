interface Window {
  HTMLElementTagNameMap: Record<keyof HTMLElementTagNameMap, string>;
}

export interface CreateElementOptions<T extends HTMLElement = HTMLElement> {
  parentList?: NodeList;
}



export interface DOMJSElement<Element extends HTMLElement = HTMLElement> extends DocumentAndElementEventHandlers, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
  readonly element: Element;

  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: DOMJSElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: DOMJSElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export interface DOMJSElementConstructor {
  new <Element extends HTMLElement = HTMLElement>(element: Element, options?: CreateElementOptions<Element>): DOMJSElement<Element>;
  new <Element extends HTMLElement = HTMLElement>(element: Element): DOMJSElement<Element>;
  readonly prototype: DOMJSElement<HTMLElement>;
}

declare var DOMJSElement: DOMJSElementConstructor;

export function CreateElement(tagName: keyof HTMLElementTagNameMap): void;