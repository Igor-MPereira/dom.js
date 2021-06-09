import { Logger, setLevel, InternalLogger } from '../lib/index.js';

console.log(window[Symbol.for(__main_logger_private_access_key)])
console.log(new Logger().logger_id)
console.log(setLevel)
setLevel('info');
console.log(Logger.prototype)