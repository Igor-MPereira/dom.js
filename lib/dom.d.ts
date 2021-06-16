interface Window {
  HTMLElementTagNameMap: Record<keyof HTMLElementTagNameMap, string>
}

interface CreateElementOptions<T extends HTMLElement = HTMLElement> {
  parent?: Node;
  
}