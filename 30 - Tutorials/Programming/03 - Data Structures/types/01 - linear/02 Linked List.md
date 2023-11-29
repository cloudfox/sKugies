
Singly Linked List
Doubly Linked list
Circular Linked List
Circular Doubly Linked List
Skip List

Header Pointer
Tail Pointer





Singly Linked List

``` c++ node
class Node {
public:
	int data;
	Node* next; // Pointer to next node in LL
};
```

Doubly Linked list
	
	class Node {
	public:
	    int data;
	    struct Node* next; // Pointer to next node in DLL
	    struct Node* prev; // Pointer to the previous node in DLL
	};

Circular Linked List
uses same structure as single or double linked list
last Node.next = first node
first Node.prev = last node

	class Node {
	public:
		int data;
		Node* next; // Pointer to next node in LL
	};


