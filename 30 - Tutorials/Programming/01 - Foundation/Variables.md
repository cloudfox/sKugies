---
publish: true
tags:
  - tutorial
  - programming
---

<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>

[[Programming#Section 1 Foundation|Learn Programming Section 1]]  previous: [[Hello World|Hello World]]   

---
##  What is a variable?
A variable is an abstract storage location for some sort of data. 
This data is generally stored in binary format that is then interpreted based on the type.

When you create a variable you are effectively asking the processor for enough memory to hold that type. You then have a link from your variables name to some place in memory.

With C++ being a [strongly typed](https://en.wikipedia.org/wiki/Strong_and_weak_typing) language we have to declare what kind of data the variable holds before we can use it. There are ways to change a variables type through casting and conversion but we will worry about those later.

``` cpp
//int and float are our types 
//a and b are the names
int a;
float b;
```

Currently our variables above don't have any set value. We would call them uninitialized. 
```cpp
//a few ways to initialize variables
int a{0};
int b(1);
int c = 2;
int d = {1};
int e;
e = 1;
```

> [!attention] Warning
> You always want to initialize your variables before using them.  Uninitialized variables can potentially have any value in them and are this can lead to [undefined behavior](https://en.wikipedia.org/wiki/Undefined_behavior).


### What are the types?
There are many different types varying from built in types to ones you can define yourself.

Primitives are your most common types as they are built in.
[**Primitive types**](https://en.wikipedia.org/wiki/Composite_data_type): integrals, floating point, logical, literal, strings, enumerations, null, etc..

Composites are groupings of other variables. The grouped variables can be all the same type or different. These include a mix of built in and user defined types.
[Composite types](https://en.wikipedia.org/wiki/Composite_data_type): arrays, lists, structs, classes, etc...

There is also a specific grouping of particularly useful types called [[Data Structures]] that we'll go over in another section.

Some types can be modified with various keywords.
**Keywords to modify types:**  signed, unsigned, const, static, etc...

**signed/unsigned**: most primitive types are signed by default; meaning they can have both positive and negative numbers. If you only have positive numbers or need a greater ranger of positive values then you can mark a variable as unsigned.
```cpp
unsigned int a = 0;
a -= 1; // possibly wraps around to largest int 

unsigned int b = -1; //ERROR
```

**const**: used to make it so you can't change a variable. There are ways around this but it's kinda hacky and not a good idea. 
```cpp
const float x = 3.14159f;
x = 3.0f; //ERROR

const float y; //ERROR const must be initialized
```

**static**:  is for when you need to keep a variable around for the entire life of a program. Most other variables when you leave the section they are in are tossed back into the pile of unused memory. More details later in [[Scope Lifetime]] 



#### Integrals
These are your whole numbers. They can be positive / negative and have different possible ranges of values. 
Depending on the size of the specific integral type determines what range of values they can store. You can also use these numbers to represent letters and other characters like with ASCII

| type               | alias*         | size in bytes | range (binary)    | (range decimal)                                         |
| ------------------ | -------------- | ------------- | ----------------- | ------------------------------------------------------- |
| unsigned char      | char           | 1             | 0 to 2^8 -1       | 0 to 255                                                |
| signed char        | signed char    | 1             | -2^7 to 2^7 -1    | -128 to 127                                             |
| unsigned short int | unsigned short | 2             | 0 to 2^16 -1      | 0 to 65535                                              |
| signed short int   | short          | 2             | -2^15 to 2^15 -1  | -32768 to 32767                                         |
| unsigned int       | unsigned       | 4             | 0 to 2^32 -1      | 0 to   4,294,967,295                                    |
| signed int         | int            | 4             | -2^31 to 2^31 -1  | -2,147,483,648 to 2,147,483,647                         |
| unsinged long  int | unsigned long  | 8             | 0 to 2^64 - 1     | 0 to 18,446,744,073,709,551,615                         |
| signed long int    | long           | 8             | -2^63 to 2^63 - 1 | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |

 >[!info] some aliases can vary depending on the compiler

> [!info]- info
> Technically char and int are the base types; With unsigned, short, and long being
> modifiers to those types but for practical purposes the modified types are treated as 
>  separate types.

> [!tip]- 
>  You usually want to use the smallest data type that will hold your data. If you are creating  
>  a variable to hold someone's age then you don't need negative values or a very large number so unsigned char with a range of 0 to 255 is perfect.     
>  Don't worry about this right away though as premature optimization can cause unforeseen  
>  problems. For example if you all of a sudden you start looking at the age of trees then you will run into problems. 
>  When you hit the max or min value it will wrap around. If you add 1 to a max value u-char then all of a sudden it is back to 0; This can be hard to troubleshoot when operating with larger numbers.

#### Floating points
Floating points are our fractional or decimal values. These values are not always completely accurate due to the conversion from binary. You can use the larger types to increase precision but it will never be perfect unless you are dealing with values that cleanly divide by 2, i.e. 0.5, 0.25, 0.125, 0.375(0.25 + 0.125), etc..  Even then you will eventually run into problems with smaller and smaller values.

> [!note]
> If you want to know more about it I'd recommend looking at some videos showing the conversion. [Computerphile Vid](https://www.youtube.com/watch?v=PZRI1IfStY0)The main takeaway I want you to get from this is that they don't have perfect precision and for comparison you should often look to see if they are close to each other rather than exact matches.

| Type        | Size | Range                            | Precision |
| ----------- | ---- | -------------------------------- | --------- |
| float       | 4    | 1.1754*10^-38 to 3.4028 * 10^38* | 6 digits  |
| double      | 8    | 2.225 * 10^-308*                 | 15 digits |
| long double | *  |  *                                |   *        |

> [!info] info
 long doubles vary depending on the compiler you are using. You will most likely see it either defined as 8, 10, 12, or 16 bytes. My advice is to stick with floats or doubles unless you absoultely know you need more precision.

> [!info]  floating points are signed only


#### Logical 
Booleans are all about true or false expressions.

| type | Size | Range |
| ---- | ---- | ----- |
| bool     |   *   |    0(false) or 1(true)   |

>[!info] Usually you will see a size of 1 but it depends on the implementation. Some have bool defined as int

You can use other types to represent a bool. In those cases 0 is false and any other number is true(including negative numbers). 

```cpp
bool hungry = true;
if(hungry) 
	printf("I'm hungry!");
else
	printf("I'm full.");
```

You only need a bit to hold a true/false value but memory is aligned to 1 byte boundaries so bools will take at least a byte of memory.

> [!tip]- tip
>  There are ways to store more in a byte through methods like bitsets and struct packing


#### literal constants

These are more values you hardcode that go into a variable or other expression. 
``` cpp
"hello world"; //string literal
'a'; //char literal 
42;  //literal for the int 42
100.0; // literal for double 100
```

Most of our literal integers are written in base 10 but you can use octal(base 8) or hexadecimal (base 16) if needed.

Octal literals are written with a leading 0
```note
01 00 01 142 145 145 160
```
Hex literals are written with a leading 0x
```note
0x68 0x65 0x6C 0x6C 0x6F
```

>[!info] octal and hex are unsigned only


#### Typedef  
typedef if a way to create an alias for another type. This can be done to add extra clarity to a variable or make the name simpler. It can also help keep you from accidentally mixing values of the same type but different purposes together.

``` cpp
typedef int potatoes; //created alias for int called potatoes
typedef float fluff; //created alias for float called fluff
typedef int a; //created alias for int called a
typedef int color; // created alias for int called color

potatoes count; //creates a variable of type potatoes(int)
color red; // creates a variable of type color(int)
color green; // creates a variable of type color(int)
color blue; // creates a variable of type color(int)
```


#### \#Define

Not technically a variable but can be used in a similar way.
\#define is a macro that replaces the text with whatever follows it during compilation(prepocessor phase) of the program.
	

	scope of the define is every function after the #define


``` cpp
#define PI 3.14159f

float CircleCircumference(float radius){
	return 2.0f * PI * radius;
}
```
the above  code after the preprocessor step in compilation will look more like 
``` cpp
float CircleCircumference(float radius){
	return 2.0f * 3.14159f * radius;
}
```

You can also go a bit crazier and have functions in defines. 

```cpp
#define SUM(a,b) (a+b)
std::cout << SUM(5,4);
```
becomes
```cpp
std::cout << (5+4)
```

> [!info] 
> In C++ global constants were intended to replace  \#define
> It's generally recommend to minimize the number of defines you use as defines don't have the  same error checking. This is doubly true for define functions.  

> [!tip]-
>\#defines and const are a better way of getting rid of 'magic numbers'
Magic numbers are often seemingly random literal values sprinkled throughout your code.
Even in the above example the 2.0f would technicaly be a magic number but for such a simple well known formula it's not as big of a deal. But as programs get more complex these things add up only making it more difficult to manage.
 

### Practice
> [!Example ] Practice 1
>  Create multiple defines then add them together in an new variable.

> [!Example ] Practice 2
> Try adding variables of different types to see what happens.

> [!Example ] Practice 3
> Create and initialize a float and assign it random values. Then output it using std::cout.  Try to get the console to display a number other than the one you assigned.

---

next: [[Expressions and Operators]] 


