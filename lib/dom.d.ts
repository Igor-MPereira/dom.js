interface Window {
  HTMLElementTagNameMap: Record<keyof HTMLElementTagNameMap, string>
}

interface CreateElementOptions<T extends HTMLElement = HTMLElement> {
  parentList?: NodeList;
  
} 

interface DOMJSElement<Element extends HTMLElement = HTMLElement> {
  readonly element: Element;
  
}

export function CreateElement(tagName: keyof HTMLElementTagNameMap, options: CreateElementOptions): void;