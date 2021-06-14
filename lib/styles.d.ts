export type StyleRule  = CSSStyleDeclaration | { [key: `&${string}` | `@${string}`]: StyleRule };
export type StyleRules = { [ruleKey: string]: StyleRule; };
export type HandledStyleRuleResult = {
  styleRuleString: string,
  atRuleResultString: string,
  appendResultString: string
};
export type CSSFormatConfig = {
  tabSize?: number,
  spacing?: number
};


/**
 * Converts A Styles object, string or collection of styles to a css string
 */
export function GetStyleString(styles: string): string;
/**
 * Converts A Styles object, string or collection of styles to a css string
 */
export function GetStyleString(styles: StyleRules): string;
/**
 * Converts A Styles object, string or collection of styles to a css string
 */
export function GetStyleString(styles: StyleRules[]): string;
/**
 * Converts A Styles object, string or collection of styles to a css string
 */
export function GetStyleString(...styles: StyleRules[]): string;

/**
 * @returns Kebab Cased String From Camel Cased
 */
export function ForceKebabCase(string: string, partial?: boolean): string;
export function HandleStyleRule(styleRule: StyleRule, upperLevelKey: string): HandledStyleRuleResult;
export function FormatCSSString(string: string, config?: CSSFormatConfig): string;