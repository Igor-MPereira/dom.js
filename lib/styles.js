import { err } from './internalLogger.js';


export function GetStyleString(/* styles */) {
  let result = '';
  
  switch (arguments.length) {
    case 0: throw SyntaxError("An argument for 'styles' was not providad");

    case 1:
      const styles = arguments[0];

      if (!styles) throw SyntaxError("'" + styles + "' is not a valid argument for 'styles'");

      if(typeof styles === 'object' && styles.length > 1) {
        result += GetStyleString.apply(null, styles);
      } else {
        if(typeof styles === 'string') {
          result += styles;
        } else if(typeof styles === 'object') {

          for (let styleKey in styles) {
            if(Object.prototype.hasOwnProperty.call(styles, styleKey)) {
              
            }
          }

        } else throw SyntaxError(
          'Invalid type for \'styles\':' + 
          typeof styles + 
          '. \'styles\' must be of type \'string\' or \'object\' (can be an array/list of strings and/or objects)'
        );
      }
    break;

    default:
      const styleList = Array.from(arguments);
      console.log(styleList)
      
      for (const style of styleList) {
        try {
          result += GetStyleString(style);
        } catch (e) {
          err(e);
        }
      }
    break;
  }

  return result;
}