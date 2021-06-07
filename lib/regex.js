'use strict';

(function () {
  /**
   * Resets 'lastIndex' Then Runs 'exec' Completely On String Returning An Array Containing Every Matching Index.
   * @param {string} string The String object or string literal on which to perform the search.
   */
  RegExp.prototype.execAllIndexes = function (string) {
    if(!this.global || this.ignoreCase) throw Error("Can't Use 'execAllIndexes' On A " + (!this.global && 'Non-Global') || (this.ignoreCase && 'Ignore Case') || 'Unknown' + " RegExp.");

    const indexArray = [];
    let obj = {};

    while(obj !== null) {
      obj = this.exec();

      
    }
  }
})()