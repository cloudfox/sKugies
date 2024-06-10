---
publish: true
tags:
  - tutorial
  - programming
---
<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>


[[Programming#Section 1 Foundation|Learn Programming Section 1]]  previous: [[Iteration - Loops]]   

---

1. general definition
2. static vs dynamic arrays
3. access
4. init
	1. partial init
5. passing arrays
6. 1d vs 2d vs N-d arrays
	1. memory layout 
	2. access
7.  Pointer Arithmetic
	

## What is an Array
An Arrays is a variable that can store multiple values of the specified type.

## Declaration
```cpp
type name[size];
int letters[26];
float distance[50];
```

## Access part of an Array

## Initialize Arrays

## Static vs Dynamic Arrays
### Static

### Dynamic

## 1d vs 2d vs N-d Arrays

### Memory Layout

### Access


## Pointer Arithmetic











Arrays are for storing multiple values of a single type in a variable. 
## Declaration
basic array declaration format
```c++
type name[size];
//examples
int fruit[10]; //an array of 10 ints
float weight[6]; //an array of 6 floats
char word[5]; //an array of 5 char
```
 A basic array will generally hold only one type of data. There are some ways around this but we won't worry about that right now.

The other requirement is to specify the size of the array. This defines how many variables the array stores.

> [!note]
> The above example is creating a static array. An array whose size does not change. It is possible to create dynamic arrays - ones whose size can change.

### Initializing
By default the values of an array are uninitialized. 
Usually there won't be anything there but you should stay on the safe side and just initialize it.

You can assign default values in the declaration
```c++
float coins[10] {}; //inits all values to 0
int fruit[3] {62, 7, 31};
int moreFruit[3] = {4, 17, 42};
```
or do so after the declaration
```c++
float fruit[3];
for(int i = 0; i < 3; i++)
  fruit[i] = 0; //or whatever other value you want
```
## Accessing
The most common way of accessing a variable in an array(and most other data structures) is using the array index.

>[!warning]
You might notice that the for loop above is in the range from 0 to <u>less than</u> 3. Most programming languages are what is called 0-indexed. This means that things like array start counting from 0.
>
> The size of the array is 3 so you will have indices 0,1, and 2.  So in this example much like at Valve, 3 doesn't exist.
> 
> Using an index that doesn't exist will usually give you a Access Violation Error.
> 


```cpp

int test;

void foo(int k, float y)
{
		return;
}


```





# 
----
next: [[Code Style]] 