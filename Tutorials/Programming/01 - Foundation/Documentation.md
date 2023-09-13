[[Learn programming (C++)]]  previous: [[Code Style]]   #tutorial

---

While this is technically part of code style it is important enough to talk about separately.

Larger companies and studio might use something like doxygen which generates documentation from specifically formatted comments. While all the requirements can be a bit much for smaller projects I find that the Header and Function comments are particularly good.

##### Header Comment Example
```cpp
/*!****************************************************
 \file   filename.cpp
 \author Billy Bob Smith
 \par    email: BillBob@SeriousBussiness.com 
 \date   05/11/1999
 
 \brief 
   Description of what the file does
 
******************************************************/

..the rest of the file..
```
The header comment also will often include the copywrite information and other metadata as needed.
It will sometimes include a list of all functions in the file.

##### Function Comment Example
```cpp
/*!*****************************************************
\brief
    program entry point
\param argc
    number of arguments
\param argv
    the arguments 
\return
    returns 0 for success
******************************************************/
int main(int argc, char **argv){ ... }
```
Function comments are straightforward. A brief description of the function, a list and description of each parameter, and a description of what it returns if it has a return type.

Alternatively if you aren't using doxygen you could go for something simpler like
```cpp
/*****************************************************
Description of the function
******************************************************/
void function( ... ) { ... }
```

#### Commenting your code
Comments are there to help!

- Good comments are clear and concise. You don't need to comment on everything.
	- Properly named variables/functions reduce how many comments you need(but doesn't replace them).
	- For simple functions a simple description might be all that is really needed. For others breaking it down into steps can help.

- Write your comments as you are writing your code. It's a pain in the butt to go back afterwards.
	- Writing the comments first also works very well. And writing each step as a separate comment can act as a guide for the code you need to write.

- There are some comment tags you can use like TODO or FIXME. Some IDEs will color code or create a list of these comments to jump to.

- It can be good to include a links to references or source that the code came from.


# 
----
next: [[Section 1 Exercises]] 
