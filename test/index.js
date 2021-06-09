import { Logger, setLevel } from '../lib/index.js';

console.log(new Logger(), new Logger())
console.log(setLevel)
setLevel('info');
console.log(window[Symbol.for(__main_logger_private_access_key)].level)