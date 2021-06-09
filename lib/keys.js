const VALID_BASE_62_CHARS = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Generates A Random String With Input Length Containing Base62 Charachters.
 * @param {number} keyLength The Key String Length. Defaults To 8.
 * @returns {string} A Random Base62 Key String.
 */
export function randomBase62Key(keyLength) {
  keyLength = keyLength || 8;
  let key = '';

  for (let i = 0; i < keyLength; i++) {
    key += VALID_BASE_62_CHARS[Math.floor(Math.random() * 62)];
  }

  return key;
}