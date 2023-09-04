[[Learn programming (C++)]]  previous: [[Conditions]]  #tutorial 

---
## What are Functions
All programs are made up of collections of functions. You could possibly do everything in main but why make things harder for no reason.

#### Function Format
```cpp
return_type function_name( parameters ); //declaration/prototype

return_type function_name( parameters )  //implementation
{
	statements..
	return type;
}
```

Most of the time you will be declaring and defining functions in separate places. This could be in one or multiple files. The declaration will go into a header file if you want that function to be visible to other files or in the cpp file if you want to keep it hidden.

You can skip using a declaration but then only functions declared after it will be able to call it.

using a simple function
```cpp
int sum(int a, int b);  //declaration/prototype

int main()
{
int x = sum(5,10);
return 0;
}

int sum (int a, int b) //implementation
{
	return a + b;
}
```

#### Default Arguments

When calling a function you must fill out all parameters.
```cpp
int x = sum(5);  //error
```

You can however define default arguments. The only rule to that being the default parameters go last.
```cpp
//this is fine
int sum(int a, int b = 0)
{  return a + b;  }

//this is not
int sum(int a = 0, int b)
{  return a + b;  }
```

#### Passing Arguments 
When you call a function and pass in the parameters it makes a copy of those values to use. This is called pass by value.
```cpp
void foo(int x)  //declaring and implementing in place
{
  x += 1;
}

int main
{
  int y = 5; // y is 5
  foo(y);// value of y is passed in, y remains unchanged
}
```

Instead if we want our function to change our value we can use pass by reference. To do this we change the parameter to take a reference to an int.
```cpp
void foo(int& x)  //& means a reference 
{
  x += 1;
}

int main
{
  int y = 5; // y is 5
  foo(y);// y is passed in, y becomes 6

  //One limitation to pass by ref is you cannot pass in straight values.
  foo(5); // error
  
  return 0;
}
```

##### Return 
void is used when a function does not return anything.
```cpp
void foo()
{
	statements;
	//no return statement
}
```

A function can have multiple return statements so long as all paths return. 
```cpp
int foo(int x){
	if (x < 10)
		return 1;
	if (x < 20)
		return 2;
	
	return 0; //if this return was missing you could run into errors
}
```

You also need to return the correct type. Sometimes the type can be converted but this is not something you should rely on.
```cpp
float foo()
{
	return; // warning/error
	return 1; // warning int is converted to float
	
	return 'helloworld'; // error wrong type
}

void bar()
{
	return 1.0f; // warning return float on void
	
	return; //this one is fine
}
```


##### Example
Functions help divide work into more manageable bites. It also allows you to easily reuse code.

Lets say we want to check for the collision of 2 moving spheres. We will want a function to update the position over time and a function to check for collision.
```cpp
//pseudocode
struct Sphere
{
	vec3 velocity;
	vec3 position;
	float radius;
}

void UpdateSphere(Sphere& sphere){
	sphere.position += sphere.velocity;
	//sphere.velocity += acceleration; //maybe your spheres also have acceleration too
	sphere.velocity *= dragForce;
}

bool SphereCollisionTest(Sphere& a, Sphere& b)
{
	//find distance between center points
	const vec3 relativePosition = a.position - b.position;
	const float distance = relativePosition.magnitude();

	const float combinedRadius = a.radius + b.radius;

	//if distance is less than or equal the combined radius they are  colliding
	if ( distance <= combinedRadius )	
		return true;

	return false;
}

void HandleCollision(...);

int main()
{
	//create our 2 spheres
	Sphere sphere1;
	Sphere sphere2;

	//set sphere position, velocity, and radius
	...

	//update loop
	bool running = true;
	while(running)
	{
		UpdateSphere(sphere1);
		UpdateSphere(sphere2);
		
		if( SphereCollisionTest (sphere1, sphere2) )
			HandleCollision(...);
		
		etc...
	}
	
	return 0;
}
```

These functions are simplified a lot. If the spheres are fast enough here they could potentially teleport past each other. You also might want the collision check to tell you at what point the spheres meet. That point could then be used by the collision handling function.



next: [[Scope Lifetime]] 