[[Learn programming (C++)]]  previous: [[Functions]]  #tutorial 
---
## What is Scope?
Not everything remains through the lifetime of a program. Scope determines what parts of the program are currently accessible or exist.

```c++
int main()
{
	int x = 10; //x's scope starts here
	
	{//entering a new scope
		int y = 5;	//y's scope starts here / y is local to this scope
		x = y;  //x is still in scope
	}// leaving scope, y's scope ends here

	y = 10 // error y does not exist in this scope
	x *= 5; // x is now 25
	
	{//entering a new scope
		int y = 5; // y's scope starts here / y is local to this scope
	}// leaving scope, y's scope ends here
}
```

Scope can be seen as the area within the curly brackets { } 
- When inside you can see out and up.
- When outside you can not see what is inside them.
This applies to functions, if statements, loops, and so on.

Functions cannot see out of their scope with a except for a special case when defined in a class/struct.

In different scopes you can define new variables with the same name.

```c++
void foo(int x)
{...}

int main()
{
	int x = 10; //x's scope starts here
	
	{
		int x = 5; //this x is different from the above x
		foo(100); //x in foo is also a different x
		if(x)
		{
			int x = 1000; //also different
		}
	}
	
}
```
My recommendation is within the scope of a function to use different names to avoid confusion.



next: [[Iteration - Loops]] 