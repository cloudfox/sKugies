---
tags:
  - tutorial
  - programming
publish: true
cssclasses:
---

<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>

[[Programming#Section 1 Foundation|Learn Programming Section 1]]  

---
## First Program
Here is our first program in the file main.h
``` cpp 
#include <iostream>  //std::cout, std::endl

int main(int argc, char *argv[])
	std::cout << "Hello, World!" << std::endl;
	return 0;
}
```

If we run it we get the output:
``` output
Hello World!
```

### Comments
Anything that is after "// "  is a comment and is not included in the program.

Anything between "/\*"  and    "\*/" is also treated as a comment.

```cpp
/* 	this is a comment */

/* 	
And another comment
But this style also works across
multiple lines
*/
```


Comments are there to help explain or add context to a program. They are optional but good practice. 

### General Format

Here is a general format of a main file

```file header
file header - technically optional but good practice

includes

global variables

function declarations

function definitions - a functions definition can be anywhere after the declaration or bundled with the declaration

main function

other functions
```

Other files will follow the same general format excluding the main function(as you can only have one main function in a program)

> [!example]- 
>![[SimpleMain Example]]



#### File Header

File headers are there to give a description of the file, what it contains, copywrite info, and anything else you feel is relevant.

You don't have to use any specific format. The above example though is formatted for a documentation tool called doxygen. There are other tools with other formats and using one is up to you.
```cpp
/****************************
 \file   main.cpp
 \Author: Steven Kugies jr.
 \par: email: contact@stevenkugies.com
 \date   09/02/2023

 \brief
	Generate 2 random numbers 
	muliply or add them together
	prints result
*****************************/
```

A very simple example template
```cpp 
/*
File: 
Author: 
Brief:  
*/
```


#### Includes
Back to our program looking at the first line we have
```cpp
#include <iostream>  //std::cout, std::endl 
```

\#include \<filename\> is a special command of sorts that tells the preprocessor(a part of the compiler) to insert a file at that location. 

This lets us use that files functions and classes in our own files. You do want to try and limit your includes to only what you are using to keep the final size of your program down.

There are two types of includes
```cpp
#include <file>  //mainly used to include standard or system files
#include "file" //mainly used to include user created files
```

The main difference is just where they look for the files(system directory vs the programs directory).
<br>
The file [iostream](https://en.cppreference.com/w/cpp/header/iostream)  stands for input output stream. A stream being a sequence of data. It is used for reading or writing to various streams. 

The two parts we are using from iostream being cout and endl.
**cout** - character output stream or sometimes called console out
**endl** - end line

The comment to the right of our include is just there to tell us what parts of the file we are using. This is more relevant when your files start getting longer and have multiple includes.


#### Global Variables
To keep things simple for now.
Variables are used to store information but you are limited by where you can access them.
Global variables can be accessed from basically anywhere in the file(or other files using include).

You generally want to avoid using them(error prone, weaker security, maintenance, etc..)


#### Functions
Functions are there to help us organize our code into reusable sections. We will eventually create our own functions but for now we are sticking to main().

The main function is a bit special in that it is called automatically when you startup your program after some other initialization steps.
Here's a reference if you want to dive into more specifics. https://en.cppreference.com/w/cpp/language/main_function


##### Function Format
Functions can be broken down into by their return type, name, and parameters.
```cpp
return_type functionName (parameters)
{
	//body
	return value;
}
```

###### Return Type
All functions have a return type which in the case of main is always 'int'. Other functions can have other types or 'void' if you don't want to return something.

When a function is done running you will return a value. Mains return type is always int and it is standard to return 0 if it completed successfully or other numbers to represent an error(the specifics here are up to you). 

###### Function Name
The function name is to differentiate functions from each other. You can overload functions with the same name by changing the parameters. Aside from that you cannot have two functions with the same name in the same file.

###### Parameters
Parameters are variables that are passed in from outside the function.
Our main does has two parameters argc and argv. Together they are used for when you want to pass some values into the program when you first run it.

**argc** - argument count -  tells us how many variables we are passing in
**\*argv\[]** - argument variable - pointer to where the arguments are stored 

Common uses for these two variables are to set the default settings such as to boot in safe mode, screen resolution, and other graphics settings.


##### Function Body
Back to our program.
Looking inside the body of out main function:
```cpp
std::cout << "Hello, World!" << std::endl;
```
Here we are using cout to display the text "Hello, World!" onto the screen.

To read data into a stream we follow cout by "<<" and then the data or other commands. In this case the string "Hello, World" followed by the end line command.

endl is a special command that inserts a new line and then calls the [flush](https://en.cppreference.com/w/cpp/io/manip/flush) command. 
You can also directly insert a newline into strings with '\\n'
```cpp
std::cout << "Hello, World!\n"; 
```

Without a new line whatever we output would all appear on one line.
```cpp
std::cout << "1" << "2" << "3";
std::cout << "4" << "5" << "6";
std::cout << "7" << "8" << "9";
```
Output:
```output
123456789
```
vs.
```cpp
std::cout << "1" << "2" << "3" << std::endl;
std::cout << "4" << "5" << "6" << std::endl;
std::cout << "7" << "8" << "9" << std::endl;
```
Output:
```output
123
456
789
```

---
next: [[Variables]] 