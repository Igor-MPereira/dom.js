'use strict';

(function () {
  /**
   * Resets 'lastIndex' Then Runs The RegExp Completely On String Returning An Array Containing Every Matching Index.
   * @param {string} string The String object or string literal on which to perform the search.
   */
  RegExp.prototype.execAll = function (string) {
    if (!this.global || this.ignoreCase) throw Error("Can't Use " + this.execAll.name + " On A " + (!this.global && 'Non-Global') || (this.ignoreCase && 'Ignore Case') || 'Unknown' + " RegExp.");

    this.lastIndex = 0;

    const indexArray = [];
    let obj = {};

    while (obj !== null) {
      obj = this.exec(string);

      if (obj && obj.index > -1) { 
        indexArray.push(obj.index);
      }
    }

    return indexArray;
  };
})();