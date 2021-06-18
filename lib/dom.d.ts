interface Window {
  HTMLElementTagNameMap: Record<keyof HTMLElementTagNameMap, string>
}

export interface CreateElementOptions<T extends HTMLElement = HTMLElement> {
  parentList?: NodeList;
  
}

export type DOMJSElement<Element extends HTMLElement = HTMLElement> =  & {
  readonly element: Element;

}

export function CreateElement(tagName: keyof HTMLElementTagNameMap, options: CreateElementOptions): void;