import { InvalidConstructorError } from './utils.js';

const HTMLElementTagNameMap = {
  "a": "HTMLAnchorElement",
  "abbr": "HTMLElement",
  "address": "HTMLElement",
  "applet": "HTMLAppletElement",
  "area": "HTMLAreaElement",
  "article": "HTMLElement",
  "aside": "HTMLElement",
  "audio": "HTMLAudioElement",
  "b": "HTMLElement",
  "base": "HTMLBaseElement",
  "bdi": "HTMLElement",
  "bdo": "HTMLElement",
  "blockquote": "HTMLQuoteElement",
  "body": "HTMLBodyElement",
  "br": "HTMLBRElement",
  "button": "HTMLButtonElement",
  "canvas": "HTMLCanvasElement",
  "caption": "HTMLTableCaptionElement",
  "cite": "HTMLElement",
  "code": "HTMLElement",
  "col": "HTMLTableColElement",
  "colgroup": "HTMLTableColElement",
  "data": "HTMLDataElement",
  "datalist": "HTMLDataListElement",
  "dd": "HTMLElement",
  "del": "HTMLModElement",
  "details": "HTMLDetailsElement",
  "dfn": "HTMLElement",
  "dialog": "HTMLDialogElement",
  "dir": "HTMLDirectoryElement",
  "div": "HTMLDivElement",
  "dl": "HTMLDListElement",
  "dt": "HTMLElement",
  "em": "HTMLElement",
  "embed": "HTMLEmbedElement",
  "fieldset": "HTMLFieldSetElement",
  "figcaption": "HTMLElement",
  "figure": "HTMLElement",
  "font": "HTMLFontElement",
  "footer": "HTMLElement",
  "form": "HTMLFormElement",
  "frame": "HTMLFrameElement",
  "frameset": "HTMLFrameSetElement",
  "h1": "HTMLHeadingElement",
  "h2": "HTMLHeadingElement",
  "h3": "HTMLHeadingElement",
  "h4": "HTMLHeadingElement",
  "h5": "HTMLHeadingElement",
  "h6": "HTMLHeadingElement",
  "head": "HTMLHeadElement",
  "header": "HTMLElement",
  "hgroup": "HTMLElement",
  "hr": "HTMLHRElement",
  "html": "HTMLHtmlElement",
  "i": "HTMLElement",
  "iframe": "HTMLIFrameElement",
  "img": "HTMLImageElement",
  "input": "HTMLInputElement",
  "ins": "HTMLModElement",
  "kbd": "HTMLElement",
  "label": "HTMLLabelElement",
  "legend": "HTMLLegendElement",
  "li": "HTMLLIElement",
  "link": "HTMLLinkElement",
  "main": "HTMLElement",
  "map": "HTMLMapElement",
  "mark": "HTMLElement",
  "marquee": "HTMLMarqueeElement",
  "menu": "HTMLMenuElement",
  "meta": "HTMLMetaElement",
  "meter": "HTMLMeterElement",
  "nav": "HTMLElement",
  "noscript": "HTMLElement",
  "object": "HTMLObjectElement",
  "ol": "HTMLOListElement",
  "optgroup": "HTMLOptGroupElement",
  "option": "HTMLOptionElement",
  "output": "HTMLOutputElement",
  "p": "HTMLParagraphElement",
  "param": "HTMLParamElement",
  "picture": "HTMLPictureElement",
  "pre": "HTMLPreElement",
  "progress": "HTMLProgressElement",
  "q": "HTMLQuoteElement",
  "rp": "HTMLElement",
  "rt": "HTMLElement",
  "ruby": "HTMLElement",
  "s": "HTMLElement",
  "samp": "HTMLElement",
  "script": "HTMLScriptElement",
  "section": "HTMLElement",
  "select": "HTMLSelectElement",
  "slot": "HTMLSlotElement",
  "small": "HTMLElement",
  "source": "HTMLSourceElement",
  "span": "HTMLSpanElement",
  "strong": "HTMLElement",
  "style": "HTMLStyleElement",
  "sub": "HTMLElement",
  "summary": "HTMLElement",
  "sup": "HTMLElement",
  "table": "HTMLTableElement",
  "tbody": "HTMLTableSectionElement",
  "td": "HTMLTableDataCellElement",
  "template": "HTMLTemplateElement",
  "textarea": "HTMLTextAreaElement",
  "tfoot": "HTMLTableSectionElement",
  "th": "HTMLTableHeaderCellElement",
  "thead": "HTMLTableSectionElement",
  "time": "HTMLTimeElement",
  "title": "HTMLTitleElement",
  "tr": "HTMLTableRowElement",
  "track": "HTMLTrackElement",
  "u": "HTMLElement",
  "ul": "HTMLUListElement",
  "var": "HTMLElement",
  "video": "HTMLVideoElement",
  "wbr": "HTMLElement",
};

window.HTMLElementTagNameMap = HTMLElementTagNameMap;

/**
 * 
 * @param {keyof HTMLElementTagNameMap} tagName 
 * @param {*} options 
 */
function CreateElement(tagName, options) {
  const element = document.createElement(tagName);
  const domJSEl = DOMJSElement(element, options);
  console.log(domJSEl.constructor)
  return domJSEl;
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {*} options 
 */
function DOMJSElement(element, options) {

  if(!this) throw InvalidConstructorError();
  
  Object.defineProperty(this, 'element', {
    value: element.cloneNode(true),
    writable: false,
    enumerable: true,
    configurable: false
  });
};

DOMJSElement[Symbol.toStringTag] = "DOMJSElement";
DOMJSElement.toString = function () { return Object.prototype.toString.call(this); }

///////////////// PROTOTYPE ///////////////////

DOMJSElement.prototype = Object.create({
  constructor: DOMJSElement
}, {
  element: {
    configurable: false,
    enumerable: true,
    value: document,
    writable: false
  }
});

///////////////////////////////////////////////

export {
  CreateElement,
  DOMJSElement
};