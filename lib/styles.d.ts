export type StyleRule  = CSSStyleDeclaration;

export type StyleRules = { [ruleKey: string]: StyleRule; };

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