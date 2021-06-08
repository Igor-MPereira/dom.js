interface RegExp {
  /**
   * Resets 'lastIndex' Then Runs The RegExp Completely On String Returning An Array Containing Every Matching Index.
   * @param string The String object or string literal on which to perform the search.
   */
  execAll(string: string): number[];
}