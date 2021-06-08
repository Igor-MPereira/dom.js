'use strict';

(function () {
  const VALID_BASE_62_CHARS = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  /**
   * Generates A Random String With Input Length Containing Base62 Charachters.
   * @param {number} keyLength The Key String Length. Defaults To 8.
   * @returns {string} A Random Base62 Key String.
   */
  function randomBase62Key(keyLength) {
    keyLength = keyLength || 8;
    let key = '';

    for(let i = 0; i < keyLength; i++) {
      key += VALID_BASE_62_CHARS[Math.round(Math.random() * 62)];
    }

    return key;
  }

  exports.randomBase62Key = randomBase62Key;
})();