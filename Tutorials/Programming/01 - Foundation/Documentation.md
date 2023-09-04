[[Learn programming (C++)]]  previous: [[Code Style]]   #tutorial

---

While this is technically part of code style it is important enough to talk about separately.

Larger companies and studio might use something like doxygen which generates documentation from specifically formatted comments. While all the requirements can be a bit much for smaller projects I find that the Header and Function comments are particularly good.

##### Header Comment Example
```cpp
/*!*****************************************************************************
 \file   filename.cpp
 \author Billy Bob Smith
 \par    email: BillBob@SeriousBussiness.com 
 \date   05/11/1999
 
 \brief 
   Description of what the file does
 
*******************************************************************************/

..the rest of the file..
```
The header comment also will often include the copywrite information and other metadata as needed.
It will sometimes include a list of all functions in the file.

##### Function Comment Example
```cpp
/*!****************************************************************************
\brief
    program entry point
\param argc
    number of arguments
\param argv
    the arguments 
\return
    returns 0 for success
******************************************************************************/
int main(int argc, char **argv){ ... }
```
Function comments are straightforward. A brief description of the function, a list and description of each parameter, and a description of what it returns if it has a return type.

Alternatively if you aren't using doxygen you could go for something simpler like
```cpp
/*****************************************************************************
Description of the function
******************************************************************************/
```

#### Commenting your code












next: [[Programming Paradigms]] 
