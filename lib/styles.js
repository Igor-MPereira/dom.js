import { DOMJSElement } from './dom.js';
import { err } from './internalLogger.js';
import { ToBoolean } from './utils.js';
const UPPERCASE_MATCH_AND_CAPTURE = /([A-Z])/g;
const CURLY_BRACE_START_MATCH_AND_CAPTURE = /(?<!\\)({)/g;
const CURLY_BRACE_END_MATCH_AND_CAPTURE = /(?<!\\)(})/g;
const SEMICOLON_MATCH_AND_CAPTURE = /(?<!\\)(;)/g;
let TAB_SIZE = 2;
let SPACING = true;
let USE_FORMATTING = true;
const SINGLE_SPACE = ' ';
Object.defineProperty(window, '__use_formatting', {
  get: function () { return USE_FORMATTING; },
  set: function () { throw SyntaxError('Can\'t assign to read only variable. import and use \'setFormatting\' instead.'); },
  configurable: false,
  enumerable: false
});
export function GetStyleString() {
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
            let appendResultString = '';
            let atRuleResultString = '';
            for (let styleRuleKey in styles) {
              if (Object.prototype.hasOwnProperty.call(styles, styleRuleKey)) {
                const styleRule = styles[styleRuleKey];
                ({ styleRuleString, appendResultString, atRuleResultString } = HandleStyleRule(styleRule, styleRuleKey));
                result += styleRuleKey + '{' + styleRuleString + '}';
                if (atRuleResultString) { result += atRuleResultString; }
                if (appendResultString) { result += styleRuleKey + appendResultString; }
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
              if (addStyleResult && addStyleResult.appendResultString) { appendResultString += upperLevelKey + addStyleRuleKey + addStyleResult.appendResultString; }
            } break;
            case '@': {
              const atRuleKey = stylePropOrAdditionalRule;
              const atRule = styleRule[stylePropOrAdditionalRule];
              const atRuleResult = HandleStyleRule(atRule, upperLevelKey);
              if (atRuleResult && atRuleResult.styleRuleString) { atRuleResultString += atRuleKey + '{' + upperLevelKey + '{' + atRuleResult.styleRuleString + '}' + (atRuleResult.atRuleResultString || '') + '}'; }
              if (atRuleResult && atRuleResult.appendResultString) { atRuleResultString += atRuleKey + '{' + atRuleResult.appendResultString + '}'; }
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
  return { styleRuleString, appendResultString, atRuleResultString };
}
/**
 * 
 * @param {string} string 
 * @param {boolean | undefined} partial
 * @returns {string} Kebab Cased String From Camel Cased
 */
export function ForceKebabCase(string, partial) {
  return string.split(UPPERCASE_MATCH_AND_CAPTURE).map(function (c, i) {
    if (partial && i === 0 && c.trim() !== '') { return '-' + c; }
    else if (i % 2 === 0) { return c; }
    return '-' + c.toLowerCase();
  }).join('');
}
export function FormatCSSString(string, config) {
  if (!__use_formatting) return string;
  let tabSize = TAB_SIZE;
  let spacing = SPACING;
  if (config && config.spacing !== null && config.spacing !== undefined) { spacing = config.spacing; }
  if (config && config.tabSize !== null && config.tabSize !== undefined) { tabSize = config.tabSize; }
  return HandleString(string, tabSize, spacing);
}
function HandleString(string, tabSize, spacing) {
  const TAB = SINGLE_SPACE.repeat(tabSize);
  let IL = 0;
  return string.split(CURLY_BRACE_START_MATCH_AND_CAPTURE).filter(ToBoolean).map(function (str, i, arr) {
    let result = str;
    if (i % 2 === 0) {
      result = result.split(SEMICOLON_MATCH_AND_CAPTURE).filter(ToBoolean).map(function (semi, i_semi, arr_semi) {
        const next = arr_semi[i_semi + 1];
        if (i_semi % 2 === 0) {
          if (spacing && next && next.startsWith(';')) { semi = semi.replace(/:\s*/g, ': '); }
          return semi;
        } else {
          if (next && !next.startsWith('\n')) { semi += '\n'; }
          if (next && (next === '}' || next.match(/\n*}/g))) { IL = (IL - 1 > -1 && IL - 1 || 0); }
          semi += TAB.repeat(IL);
          return semi;
        }
      }).join('');
      result = result.split(CURLY_BRACE_END_MATCH_AND_CAPTURE).map(function (end, i_end, arr_end) {
        if (end.trim() === '') return '';
        let next = arr_end[i_end + 1];
        let next_2 = arr_end[i_end + 2];
        if (i_end % 2 === 0) {
          return end;
        } else {
          end = end.trim();
          IL = (IL - 1 > -1 && IL - 1 || 0);
          const resp = end + '\n';
          if ((next && !next.startsWith('\n\n') && !next.startsWith('}')) || (next_2 && !next_2.startsWith('\n\n') && !next_2.startsWith('}'))) {
            end = resp + ((next !== '\n' || next_2 !== '}') && '\n' || '');
          } else { end = resp; }
          return end;
        }
      });
      return result.join('');
    } else {
      IL++;
      const prev = arr[i - 1];
      const next = arr[i + 1];
      if (next && !next.startsWith('\n')) { result = str + '\n' + TAB.repeat(IL); }
      if (prev && !prev.endsWith(' ') && spacing) { result = ' ' + result; }
      return result;
    }
  }).join('');
}
export function setFormatting(useFormatting, config) {
  USE_FORMATTING = useFormatting;
  TAB_SIZE = (config && config.tabSize) || TAB_SIZE;
  SPACING = (config && config.spacing) || SPACING;
}