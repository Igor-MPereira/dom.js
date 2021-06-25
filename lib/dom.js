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

  if(!this) throw InvalidConstructorError();
  
  Object.defineProperty(this, 'element', {
    value: element.cloneNode(true),
    writable: false,
    enumerable: true,
    configurable: false
  });

  this[Symbol.toStringTag] = "DOMJSElement";
  this.toString = function toString() { return Object.prototype.toString.call(this); }
};


///////////////// PROTOTYPE ///////////////////
DOMJSElement.prototype = Object.create(DOMJSElement.prototype, {  
  element: {
    configurable: false,
    enumerable: true,
    value: null,
    writable: false
  },  
});

DOMJSElement.prototype.toString = function () { return Object.prototype.toString.call(this); };
DOMJSElement.prototype.constructor = DOMJSElement;

///////////////////////////////////////////////

export {
  CreateElement,
  DOMJSElement
};
