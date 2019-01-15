// http://www.geeksforgeeks.org/pattern-searching-set-8-suffix-tree-introduction/
// http://www.geeksforgeeks.org/ukkonens-suffix-tree-construction-part-1/
// A suffix tree is a compressed Trie
function SuffixTree() {

}

/*
-can be use for string matching (O(m + # of occurrences) where m is length of pattern), longest repeated substring (O(n)) by finding the deepest internal vertex x, longest
 common substring (combine suffix tree of both strings and get the deepest internal vertex that both strings share)
*/