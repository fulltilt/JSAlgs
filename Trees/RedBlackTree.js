function Node() {

}

// http://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/
// http://www.geeksforgeeks.org/red-black-tree-set-2-insert/
// http://www.geeksforgeeks.org/red-black-tree-set-3-delete-2/
function RedBlackTree() {

}

module.exports = RedBlackTree;

/*
Comparison with AVL Tree
The AVL trees are more balanced compared to Red Black Trees, but they may cause more rotations during insertion and deletion. 
So if your application involves many frequent insertions and deletions, then Red Black trees should be preferred. And if the 
insertions and deletions are less frequent and search is more frequent operation, then AVL tree should be preferred over Red Black Tree.
*/