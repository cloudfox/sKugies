[[Learn programming (C++)#Section 1 Foundation|Learn Programming Section 1]]  

---

## Getting Started
If you are completely new to programming then you will need something to program and later compile your code.

You could use notepad if you like pain and suffering but I'd at least use [notepad++](https://notepad-plus-plus.org/). You'd then need to separately compile the code.

For simplicity you could alternatively use an IDE like: [vsCode](https://code.visualstudio.com/), [Visual Studio](https://visualstudio.microsoft.com/), [Code::Blocks](https://www.codeblocks.org/)or any of the others.

To quickly get started https://www.onlinegdb.com/ works just as well.

---
## Breaking it Down

One way to break down the fundamentals of programming is into 4 categories.
We can break a program down into four categories.
- input
- storage
- manipulation/transformation
- output 

### Input
Few programs are ever fully self contained. We want to be able to interact and insert new data into our program. There are also many other parts like functions and classes that take input in the form of parameters.

Inputs can come from a number of different sources
- input device(keyboard, mouse, controller, snesors etc)
- files(binary, text, csv, obj, etc)
- networked(talking to servers, peers, and other devices)
- other(command line, randomly generated, other programs)

This is not a comprehensive list but should give you a good general idea.

### Storage
Our data can't exist in the void so we need a place to put it.

On one side we have the physical medium that data can be put into. 
 Most of your files will be stored on some sort of physical drive.
 
 For most of the data internal to the program will reside in a mix of places. 
 - Most of the program will exist in RAM(fast memory)
 - When you get close to doing work with data it gets sent to the cpu caches(very fast memory but small)
 - When you actually get to working with the data it bounces in and out of cpu registers
 - unused data might get pushed to your storage drive

In terms of speed you have the slowest to fastest
- storage drives(hard disk, solid state, etc) 
- RAM
- CPU Caches

### manipulation/transformation/testing
Programming wouldn't be very interesting if didn't do anything with our data

On the relatively simpler side we have all of our math expressions.
We can test and compare to start building logic and build more complicated 

### Output
Once we are done working on our data we will usually want to send it somewhere else.
 Most of the time this will be to another part of our program. After that would probably be outputting to an external device(speakers, screens, lights, motors, etc) 

#
---
next: [[Hello World]] 