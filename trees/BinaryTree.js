/* Binary Tree implementation - NOTE: THIS IS WRONG */

function BinaryTree() {
	this.root = null;

	BinaryTree.makeNode = function(data) {
		return { data : data,
		         leftChild : null,
		         rightChild : null
		       };
	}

	BinaryTree.BinaryTree = function() {
		console.log('hello');	
	}	

	this.print = function() {
		this.print(this.root);
	}
	this.print = function(node) {
		if (node === null) {
			return;
		}

		print(node.leftChild);
		console.log(node.data);
		print(node.rightChild);
	}
}


var root = new Node();
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
//	console.log(bt.root.leftChild.data);
//bt.print();