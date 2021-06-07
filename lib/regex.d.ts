interface RegExp {
  /**
   * Resets 'lastIndex' Then Runs 'exec' Completely On String Returning An Array Containing Every Matching Index.
   * @param string The String object or string literal on which to perform the search.
   */
  execAllIndexes(string: string): number[];
}