import './regex.js';
import Logger from './logger.js';
import InternalLogger from './internalLogger.js';

export * from './logger.js';
export * from './styles.js';
export * from './internalLogger.js';
export * from './keys.js';
export function NonEmpty(x) { return Boolean(x); }
export { Logger, InternalLogger };