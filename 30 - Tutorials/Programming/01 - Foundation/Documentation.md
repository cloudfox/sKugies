---
publish: true
---

<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>

[[Learn programming (C++)#Section 1 Foundation|Learn Programming Section 1]]  previous: [[Code Style]]   #tutorial

---

While this is technically part of code style it is important enough to talk about separately.

Larger companies and studio might use something like doxygen which generates documentation from specifically formatted comments. While all the requirements can be a bit much for smaller projects I find that the Header and Function comments are particularly good.

### Header Comment Example
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

### Function Comment Example
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

### Commenting your code
Comments are there to help!

- Good comments are clear and concise. You don't need to comment on everything.
	- Properly named variables/functions reduce how many comments you need(but doesn't replace them).
	- For simple functions a simple description might be all that is really needed. For others breaking it down into steps can help.

- Write your comments as you are writing your code. It's a pain in the butt to go back afterwards.
	- Writing the comments first also works very well. And writing each step as a separate comment can act as a guide for the code you need to write.

- There are some comment tags you can use like TODO or FIXME. Some IDEs will color code or create a list of these comments to jump to.

- It can be good to include a links to references or source that the code came from.




## Other
- Be consistent; find a style guide you like

- Write the comments first
	1. Start with a description of the function
	2. write out the individual steps
	3. then fill in the code under each step
	
- Names should be be both descriptive and precise
	- avoid uncommon acronyms or 1-2 letter names
		a variable named p is ambiguous; it could be position, potatoes, power, etc.
		It's more okay for iterators but for consistency try to stick to the more common names like x,y,z,i,j,k,n
	- shorthand names can be okay but you should still have the full name it represents in the function header

- Avoid repetition
	comments should add context to code not repeat it

- explain why
	some functions can done in a less intuitive or normally inefficient way to accommodate a limitation or other requirement
	documenting these can later help describe why it was done and avoid confusion

- Have the style guide readily accessible

# 
----
next: [[Section 1 Exercises]] 
