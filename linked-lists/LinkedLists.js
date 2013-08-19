/* Define a Linked List

*/
function ListNode(next, value) {
	this.next = next;
	this.value = value;
}

var node1 = new ListNode(null, 5);
console.log(node1.next);
console.log(node1.value);