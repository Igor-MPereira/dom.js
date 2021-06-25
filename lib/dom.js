import { MakeDefaultObjectDescriptor } from './utils.js';

const __DefaultDocumentAndElementEventHandlers = {
  /**
   * @type {((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null}
   */
  oncopy: null,
  /**
 * @type {((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null}
 */
  oncut: null,
  /**
 * @type {((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null}
 */
  onpaste: null
};

/**
 * 
 * @param {keyof HTMLElementTagNameMap} tagName 
 * @param {*} options 
 */
function CreateElement(tagName, options) {
  const element = document.createElement(tagName);
  const domJSEl = new DOMJSElement(element, options);
  return domJSEl;
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {*} options 
 */
function DOMJSElement() {

  const element = arguments[0];
  const options = arguments[1];

  if (!this) throw InvalidConstructorError();

  Object.defineProperty(this, 'element', {
    value: element.cloneNode(true),
    writable: false,
    enumerable: true,
    configurable: false
  });

  this[Symbol.toStringTag] = "DOMJSElement";
  this.toString = function toString() { return Object.prototype.toString.call(this); };
};


///////////////// PROTOTYPE ///////////////////
const prototype = Object.create(null);
console.log(prototype)
Object.assign(
  prototype,
  MakeDefaultObjectDescriptor(__DefaultDocumentAndElementEventHandlers, null, true),
  {
    element: {
      configurable: false,
      enumerable: true,
      get: function () { return null; }
    },
  }
);
console.log(prototype)

DOMJSElement.prototype = Object.create(
  DOMJSElement.prototype,
  prototype
);

DOMJSElement.prototype.toString = function () { return Object.prototype.toString.call(this); };
DOMJSElement.prototype.constructor = DOMJSElement;

///////////////////////////////////////////////

export {
  CreateElement,
  DOMJSElement
};
