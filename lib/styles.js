import { err } from './internalLogger.js';
const UPPERCASE_MATCH_AND_SAVE = /([A-Z])/g;
export function GetStyleString(/* styles */) {
  let result = '';
  switch (arguments.length) {
    case 0: throw SyntaxError("An argument for 'styles' was not providad");
    case 1:
      const styles = arguments[0];
      if (!styles) throw SyntaxError("'" + styles + "' is not a valid argument for 'styles'");
      if (typeof styles === 'object' && styles.length > 1) { result += GetStyleString.apply(null, styles); }
      else {
        switch (typeof styles) {
          case 'string': result += styles; break;
          case 'object': {
            let styleRuleString = '';
            let appendResult = '';
            let atRuleResultString = '';
            for (let styleRuleKey in styles) {
              if (Object.prototype.hasOwnProperty.call(styles, styleRuleKey)) {
                const styleRule = styles[styleRuleKey];
                ({ styleRuleString, appendResult, atRuleResultString } = HandleStyleRule(styleRule, styleRuleKey));
                result += styleRuleKey + '{' + styleRuleString + '}';
                if (atRuleResultString) { result += atRuleResultString; }
                if (appendResult) { result += styleRuleKey + appendResult; }
              }
            }
          } break;
          default: throw SyntaxError('Invalid type for \'styles\':' + typeof styles + '. \'styles\' must be of type \'string\' or \'object\' (can be an array/list of strings and/or objects)');
        }
      }
      break;
    default: {
      const styleList = Array.from(arguments);
      for (const style of styleList) {
        try { result += GetStyleString(style); }
        catch (e) { err(e); }
      }
    } break;
  }
  return result;
}
export function HandleStyleRule(styleRule, upperLevelKey) {
  let styleRuleString = '';
  let appendResultString = '';
  let atRuleResultString = '';
  switch (typeof styleRule) {
    case 'string': styleRuleString += styleRule; break;
    case 'object': {
      for (let stylePropOrAdditionalRule in styleRule) {
        if (Object.prototype.hasOwnProperty.call(styleRule, stylePropOrAdditionalRule)) {
          switch (stylePropOrAdditionalRule[0]) {
            case '&': {
              const addStyleRuleKey = stylePropOrAdditionalRule.slice(1);
              const addStyleRule = styleRule[stylePropOrAdditionalRule];
              const addStyleResult = HandleStyleRule(addStyleRule, upperLevelKey + addStyleRuleKey);
              if (addStyleResult && addStyleResult.styleRuleString) { appendResultString += addStyleRuleKey + '{' + addStyleResult.styleRuleString + '}'; }
              if (addStyleResult && addStyleResult.atRuleResultString) { appendResultString += addStyleResult.atRuleResultString; }
              if (addStyleResult && addStyleResult.appendResult) { appendResultString += upperLevelKey + addStyleRuleKey + addStyleResult.appendResult; }
            } break;
            case '@': {
              const atRuleKey = stylePropOrAdditionalRule;
              const atRule = styleRule[stylePropOrAdditionalRule];
              const atRuleResult = HandleStyleRule(atRule, upperLevelKey);
              if (atRuleResult && atRuleResult.styleRuleString) { atRuleResultString += atRuleKey + '{' + upperLevelKey + '{' + atRuleResult.styleRuleString + '}' + (atRuleResult.atRuleResultString || '') + '}'; }
              if (atRuleResult && atRuleResult.appendResult) { atRuleResultString += atRuleKey + '{' + atRuleResult.appendResult + '}'; }
            } break;
            default: {
              const stylePropKey = ForceKebabCase(stylePropOrAdditionalRule);
              const styleProp = styleRule[stylePropOrAdditionalRule];
              switch (typeof styleProp) {
                case 'string': styleRuleString += stylePropKey + ':' + styleProp + ';'; break;
                case 'number': styleRuleString += stylePropKey + ':' + styleProp + 'px;'; break;
                case 'object': {
                  for (let subPropPartialKey in styleProp) {
                    if (Object.prototype.hasOwnProperty.call(styleProp, subPropPartialKey)) {
                      const subPropKey = stylePropKey + ForceKebabCase(subPropPartialKey, true);
                      const subProp = styleProp[subPropPartialKey];
                      switch (typeof subProp) {
                        case 'string': styleRuleString += subPropKey + ':' + subProp + ';'; break;
                        case 'number': styleRuleString += subPropKey + ':' + subProp + 'px;'; break;
                        default: throw SyntaxError('Invalid type for \'subProp\':' + typeof subProp + '. \'subProp\' must be of type \'string\' or \'number\'');
                      }
                    }
                  }
                } break;
                default: throw SyntaxError('Invalid type for \'styleProp\':' + typeof styleProp + '. \'styleProp\' must be of type \'string\', \'number\' or \'object\'');
              }
            } break;
          }
        }
      }
    } break;
    default: throw SyntaxError('Invalid type for \'styleRule\':' + typeof styleRule + '. \'styleRule\' must be of type \'string\' or \'object\'');
  }
  return { styleRuleString, appendResult: appendResultString, atRuleResultString };
}
/**
 * 
 * @param {string} string 
 * @param {boolean | undefined} partial
 * @returns {string} Kebab Cased String From Camel Cased
 */
export function ForceKebabCase(string, partial) {
  return string.split(UPPERCASE_MATCH_AND_SAVE).map((c, i) => {
    if (partial && i === 0 && c.trim() !== '') {
      return '-' + c;
    } else if (i % 2 === 0) { return c; }
    return '-' + c.toLowerCase();
  }).join('');
}