---
tags:
  - tutorial
publish: true
cssclasses: []
---
[[Learn programming (C++)#Section 1 Foundation|Learn Programming Section 1]]  

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
``` 
Hello World!
```

### General Format

Here is a general format of a main file

```
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

---
#### Includes
Looking at the first line we have
```c++
#include <iostream> 
```

\#include \<filename\> is a special command of sorts that tells the preprocessor(a part of the compiler) to insert a file at that location. 

This lets us use that files functions and classes in our own files. You do want to try and limit your includes to only what you are using to keep the final size of your program down.

There are two types of includes
```c++
#include <file>  //mainly used to include standard or system files
#include "file" //mainly used to include user created files
```

The main difference is just where they look for the files(system directory vs the programs directory).

<br>

The file [iostream](https://en.cppreference.com/w/cpp/header/iostream)  stands for input output stream. A stream being a sequence of data. It is used for reading or writing to various streams. 

The two parts we are using from iostream being cout and endl.E
**cout** - character output stream or sometimes called console out
**endl** - end line

---
#### Comments

To the right of \#include \<iostream\>  you will see a comment
```
//std::cout, std::endl   
```
Comments are there to help explain or add context to a program. They are optional but good practice. Comments next to includes are typically there to tell you what parts of the file are being used. 

---
#### Function Format
On our next line we have our main function.
Functions can be broken down into by their return type, name, and parameters.
```cpp
return_type functionName (parameters)
{
	//body
	return value;
}
```


##### Return Type
All functions have a return type which in the case of main is always 'int'. Other functions can have other types or 'void' if you don't want to return something.

When a function is done running you will return a value.  In main it is standard to return 0 if it completed successfully or other numbers to represent an error.

##### Function Name
The function name is to differentiate functions from each other. You can overload functions with the same name by changing the parameters. Aside from that you cannot have two functions with the same name in the same file.

##### Parameters
Parameters are variables that are passed in from outside the function.
Our main does has two parameters argc and argv. Together they are used for when you want to pass some values into the program when you first run it.

**argc** - argument count -  tells us how many variables we are passing in
**\*argv\[]** - argument variable - where the arguments are stored 

Common uses for these two variables are to set the default settings such as to boot in safe mode, screen resolution, and other graphics settings.

##### Function Body
Looking inside the body of out main function:
```Cpp
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
```
123456789
```
vs.
```cpp
std::cout << "1" << "2" << "3" << std::endl;
std::cout << "4" << "5" << "6" << std::endl;
std::cout << "7" << "8" << "9" << std::endl;
```
Output:
``` 
123
456
789
```

---
next: [[Variables]] 