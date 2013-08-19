/* Binary Tree implementation */

function BinaryTree() {
	this.root = null;

	BinaryTree.makeNode = function(data) {
		return { data : data,
		         leftChild : null,
		         rightChild : null
		       };
	}	
}

var bt = new BinaryTree();
bt.root = BinaryTree.makeNode(1);
root.leftChild = BinaryTree.makeNode(2);
root.rightChild = BinaryTree.makeNode(3);
root.rightChild.leftChild = BinaryTree.makeNode(6);
root.leftChild.leftChild = BinaryTree.makeNode(4);
root.leftChild.rightChild = BinaryTree.makeNode(5);
root.leftChild.leftChild.rightChild = BinaryTree.makeNode(7);
root.rightChild.rightChild = BinaryTree.makeNode(5);
root.rightChild.rightChild.leftChild = BinaryTree.makeNode(4);
root.rightChild.rightChild.leftChild.leftChild = BinaryTree.makeNode(2);
root.rightChild.rightChild.leftChild.leftChild.leftChild = BinaryTree.makeNode(1);
root.rightChild.rightChild.leftChild.leftChild.rightChild = BinaryTree.makeNode(3);
root.rightChild.rightChild.rightChild = BinaryTree.makeNode(8);
root.rightChild.rightChild.rightChild.leftChild = BinaryTree.makeNode(7);
root.rightChild.rightChild.rightChild.rightChild = BinaryTree.makeNode(9);
root.rightChild.rightChild.rightChild.rightChild.rightChild = BinaryTree.makeNode(10);
