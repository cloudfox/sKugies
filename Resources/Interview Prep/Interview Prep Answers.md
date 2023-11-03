---
publish: false
cssclasses: []
---

https://docs.google.com/document/d/1ph1JRdXltYedvpKexz0Az7XtQohyI5sTGpOT8KJyL5o/edit

## Programming
#### C++
**When should you use virtual destructors?(interviewers absolutely love this question!)**
	Used when you might delete an instance of a derived class through a pointer to the base class. Without the virtual destructor in derived only the base classes destructor is called possibly leaking data.
```cpp
class Base 
{    /** some virtual methods  */   };

class Derived : public Base
{
  ~Derived() {/*Cleanup*/}  //this should be virtual
};
```

```
Base *b = new Derived();
delete b; // Here's the problem!
```


---  
 **What is the difference between allocating memory on the heap versus the stack?**
 
The stack is a linear block of memory with limited space
Specifically range of memory that is accessible via the stack register of the CPU
- memory is allocated/deallocated automatically with the 
- temporary variables (including those passed to functions)
- Last in - First Out

The heap is memory allocated at runtime.
- the reference to where the heap is located is stored on the stack(pointers/references/etc..)
- manual creation/deletion

---
**What C++11 and C++14 features are you using?**
**C++11**
https://github.com/AnthonyCalandra/modern-cpp-features
- Lambda expressions  
https://www.geeksforgeeks.org/lambda-expression-in-c/
```
[capture](parameters)->return-type {body}

//example-  lambda expression to print vector
    
    for_each(v.begin(), v.end(), [](int i)
    { std::cout %3C< i << " "; });
    
```
- Deleted and default functions
```
A()=default; //C++11
virtual ~A()=default; //C++11

NoCopy ( const NoCopy & ) = delete;  //useful for preventing copy constructors
```
- nullptr
keyword that designates a null pointer constant, strongly typed
-  Delegating Constructors
constructor that can call another constructor of the same class
- Threading Library
- smart pointer class 

**C++14**
- Binary Literals
- Generic Lambda Expressions - Polymorphic Lambdas
- Lambda Capture initializers
- variable templates 
- depreciated attribute
- make_unique
**C++17**
- constexpr lambda 
- inline Variables
- nested namespaces
- constexpr if
---
**What are templates used for?**
blueprint or formula for creating a generic class or a function.
used for algorithms that work for a variety of data types
ex: sorting, counting, object pools,  containers etc..

---
**Explain the `inline` keyword**
An inline function is expanded in line when called.
The whole code is inserted at that location.
- reduces function call overhead
- insertion/substitution happens at compile time
- is a request to the compiler, can be ignored
>[!tip] The compiler may ignore inline when:
	1. function contains a loop. 
	2. function contains static variables.
	3. function is recursive. 
	4. return type is not void, and the return statement isn't in the function body. 
	5. function contains a switch or goto statement.

- still uses registers for added variables
- increases binary exe size
- can reduce cache hit rate
- can increase compile time
---
**What is little and big endian?**
Ways of storing multibyte data

little endian - reverse order last byte to first byte
big endian - first byte to last byte

---
**Explain what const-correctness is?**
const is a for a variable that cannot change after initialization
const correctness is preventing a const object from being mutated.
-  prevents you from _inadvertently_ modifying something you didn’t expect would be modified
https://isocpp.org/wiki/faq/const-correctness
---
**What overhead is associated with calling a virtual function?**

virtual methods implemented through virtual method tables(table of function pointers). Small part of cost is additional time to call function through table instead of directly.

Greater cost is in the compiler usually not being able to do any branch prediction optimization

---
**bit twiddling tricks**
https://github.com/virtyaluk/Bit-Twiddling-Hacks
---
- There will probably be one question where you are asked to do something with a linked list, or some other pointer-based data structured like a tree. For instance, reversing a linked list.

---
**What is the size of a pointer in C++?(that is, the result of `sizeof` for a pointer)** 
depends on architecture 32bit or 64bit  i.e. 4bytes or 8 bytes

---
**The big O runtime of ALL containers**,
![[Resources/Interview Prep/BIGO.png]]
![[big-o-cheat-sheet-poster.png]]

https://www.bigocheatsheet.com/

|Data Structure|Time Complexity|   |   |   |   |   |   |   |Space Complexity|
|---|---|---|---|---|---|---|---|---|---|
||Average|   |   |   |Worst|   |   |   |Worst|
||Access|Search|Insertion|Deletion|Access|Search|Insertion|Deletion||
|[Array](http://en.wikipedia.org/wiki/Array_data_structure)|`Θ(1)`|`Θ(n)`|`Θ(n)`|`Θ(n)`|`O(1)`|`O(n)`|`O(n)`|`O(n)`|`O(n)`|
|[Stack](http://en.wikipedia.org/wiki/Stack_(abstract_data_type))|`Θ(n)`|`Θ(n)`|`Θ(1)`|`Θ(1)`|`O(n)`|`O(n)`|`O(1)`|`O(1)`|`O(n)`|
|[Queue](http://en.wikipedia.org/wiki/Queue_(abstract_data_type))|`Θ(n)`|`Θ(n)`|`Θ(1)`|`Θ(1)`|`O(n)`|`O(n)`|`O(1)`|`O(1)`|`O(n)`|
|[Singly-Linked List](http://en.wikipedia.org/wiki/Singly_linked_list#Singly_linked_lists)|`Θ(n)`|`Θ(n)`|`Θ(1)`|`Θ(1)`|`O(n)`|`O(n)`|`O(1)`|`O(1)`|`O(n)`|
|[Doubly-Linked List](http://en.wikipedia.org/wiki/Doubly_linked_list)|`Θ(n)`|`Θ(n)`|`Θ(1)`|`Θ(1)`|`O(n)`|`O(n)`|`O(1)`|`O(1)`|`O(n)`|
|[Skip List](http://en.wikipedia.org/wiki/Skip_list)|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`O(n)`|`O(n)`|`O(n)`|`O(n)`|`O(n log(n))`|
|[Hash Table](http://en.wikipedia.org/wiki/Hash_table)|`N/A`|`Θ(1)`|`Θ(1)`|`Θ(1)`|`N/A`|`O(n)`|`O(n)`|`O(n)`|`O(n)`|
|[Binary Search Tree](http://en.wikipedia.org/wiki/Binary_search_tree)|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`O(n)`|`O(n)`|`O(n)`|`O(n)`|`O(n)`|
|[Cartesian Tree](https://en.wikipedia.org/wiki/Cartesian_tree)|`N/A`|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`N/A`|`O(n)`|`O(n)`|`O(n)`|`O(n)`|
|[B-Tree](http://en.wikipedia.org/wiki/B_tree)|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`O(log(n))`|`O(log(n))`|`O(log(n))`|`O(log(n))`|`O(n)`|
|[Red-Black Tree](http://en.wikipedia.org/wiki/Red-black_tree)|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`O(log(n))`|`O(log(n))`|`O(log(n))`|`O(log(n))`|`O(n)`|
|[Splay Tree](https://en.wikipedia.org/wiki/Splay_tree)|`N/A`|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`N/A`|`O(log(n))`|`O(log(n))`|`O(log(n))`|`O(n)`|
|[AVL Tree](http://en.wikipedia.org/wiki/AVL_tree)|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`O(log(n))`|`O(log(n))`|`O(log(n))`|`O(log(n))`|`O(n)`|
|[KD Tree](http://en.wikipedia.org/wiki/K-d_tree)|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`Θ(log(n))`|`O(n)`|`O(n)`|`O(n)`|`O(n)`|`O(n)`|

---
Runtime of common algorithms such as binary searching an array


| Algorithm                                                                                                        | Time Complexity |                  |                  | Space Complexity |
| ---------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- | ---------------- | ---------------- |
|                                                                                                                  | Best            | Average          | Worst            | Worst            |
| [Quicksort](http://en.wikipedia.org/wiki/Quicksort)                                                              | `Ω(n log(n))`   | `Θ(n log(n))`    | `O(n^2)`         | `O(log(n))`      |
| [Mergesort](http://en.wikipedia.org/wiki/Merge_sort)                                                             | `Ω(n log(n))`   | `Θ(n log(n))`    | `O(n log(n))`    | `O(n)`           |
| [Timsort](http://en.wikipedia.org/wiki/Timsort)                                                                  | `Ω(n)`          | `Θ(n log(n))`    | `O(n log(n))`    | `O(n)`           |
| [Heapsort](http://en.wikipedia.org/wiki/Heapsort)                                                                | `Ω(n log(n))`   | `Θ(n log(n))`    | `O(n log(n))`    | `O(1)`           |
| [Bubble Sort](http://en.wikipedia.org/wiki/Bubble_sort)                                                          | `Ω(n)`          | `Θ(n^2)`         | `O(n^2)`         | `O(1)`           |
| [Insertion Sort](http://en.wikipedia.org/wiki/Insertion_sort)                                                    | `Ω(n)`          | `Θ(n^2)`         | `O(n^2)`         | `O(1)`           |
| [Selection Sort](http://en.wikipedia.org/wiki/Selection_sort)                                                    | `Ω(n^2)`        | `Θ(n^2)`         | `O(n^2)`         | `O(1)`           |
| [Tree Sort](https://en.wikipedia.org/wiki/Tree_sort)                                                             | `Ω(n log(n))`   | `Θ(n log(n))`    | `O(n^2)`         | `O(n)`           |
| [Shell Sort](http://en.wikipedia.org/wiki/Shellsort)                                                             | `Ω(n log(n))`   | `Θ(n(log(n))^2)` | `O(n(log(n))^2)` | `O(1)`           |
| [Bucket Sort](http://en.wikipedia.org/wiki/Bucket_sort "Only for integers. k is a number of buckets")            | `Ω(n+k)`        | `Θ(n+k)`         | `O(n^2)`         | `O(n)`           |
| [Radix Sort](http://en.wikipedia.org/wiki/Radix_sort "Constant number of digits 'k'")                            | `Ω(nk)`         | `Θ(nk)`          | `O(nk)`          | `O(n+k)`         |
| [Counting Sort](https://en.wikipedia.org/wiki/Counting_sort "Difference between maximum and minimum number 'k'") | `Ω(n+k)`        | `Θ(n+k)`         | `O(n+k)`         | `O(k)`           |
| [Cubesort](https://en.wikipedia.org/wiki/Cubesort)                                                               | `Ω(n)`          | `Θ(n log(n))`    | `O(n log(n))`    | `O(n)`           |

---
 When to use each container
 >[!tip] Ask what the data is being used for and how it's being given to you, see if it can be sorted and if that helps, check if you can cache results somehow, consider the case of 1 lookup vs 1000

![[Container Flowchart.png|{width=150%}]]


---
What a "balanced tree" is and what the pros/cons are compared to an unbalanced one?
	A binary tree in which the height of the left and right subtree of any node differ by no more than 1

-  better search times O(log(n)) vs. O(n).
-  improve worst-case lookup time
- work better when the request frequencies across the data set are more evenly spread,
- can use more memory
- insert - remove times are generally slower 
- more complex

---
How does a hashmap works under the hood
- key-value pair stored in a table
- array is indexed with a hash function to convert a key into an index into the array
- if a key is already stored at that index use a collision resolution strategy
	strategies: 
	- chaining - linked list
	- open addressing - find an empty spot using probing
	- robin hood hashing - find closest empty spot
	- cuckoo hashing - use two or more hash functions to map each item

hash - mathematical function to generate fixed size unique value
used as a secure and ifficeient way to store and transmit data

---
 How to implement depth-first and breadth-first searches (using a stack/queue instead of recursive function calling), and how to do a binary search.

BFS: 
nodes to visit in a queue
put children of current node in queue

DFS: 
nodes to visit in a stack
put children of current node in stack



---
**struct packing**
Align data to boundaries
```cpp
struct
{
char* p; //8 bytes
int i;   //4 bytes
short s; //2 bytes
char c   //1 byte
//1 byte of padding
}
```

```cpp
#pragma pack(push, 1)
struct { short a; int b; }
#pragma pack(pop)
```

---
**Bit fields**
```cpp
struct somebits {
   unsigned int x; //4 bytes
   unsigned int y; //4 bytes
   unsigned int z; //4 bytes
   unsigned int w; //4 bytes
}; //16 bytes 

struct somebits {
   unsigned int x : 4; //4 bits
   unsigned int y : 4; //4 bits 
   unsigned int z : 4; //4 bits
   unsigned int w : 4; //4 bits
}; //16 bits but will take up 4 bytes due to padding to boundary
```


---
**Diamond inheritance problem**

Classes A and B having the same Base class
A fourth class that derives from A and B
the fourth class now inherits duplicate copies of the original base class

solved using virtual keyword in A and B on the Base Class

---
**Shared/weak/unique pointers** 

Shared pointer:  keeps track of how many pointers to the object exist, used for sharing ownership of a resource, when all shared pointers go out of scope resource is destroyed

weak pointer: copy of a shared pointer, is not considered for the counting of the shared pointer, can be used to avoid cyclical dependency problem

unique pointer:   container for raw pointers, prevents copying of its contained pointer
a replacement for auto_ptr, prevents fake copy assignment, can be std:move d

 --------------- 
**std::move**
kind of a function,  efficiently transfers resources to another object
Doesn't actually move anything, turns lvalue into an xvalue
tells the compiler the value is going to be destroyed so do whatever it can use the resource however it wants.

one good use case is in swapping values to avoid copying needlessly.

is just a request to move and if the type of the object does not have a move constructor/assign-operator defined

----
**how the vtable and dynamic_cast work**

vtable
 - table of function pointers to all the virtual methods
 - A pointer to this table (called the virtual table) exists as a data member in all the objects
- When one calls a virtual method, we lookup the object's v-table and call the appropriate derived class method. 

dynamic_cast
- applied to polymporphic type
- polymorphic types are any class with at least one virtual method , destructor, or virtual base class.
- dynamic cast checks the type of the actual object the pointer points to
-  mainly used for safe downcasting at run time
- returns null if cast fails
- has runtime overhead 
- implementation is compiler dependent
- one entry in the v-table is not used as a function-  
pointer, but as a pointer to the RTTI(“[Run-Time Type Information](https://www.geeksforgeeks.org/g-fact-33/)“.) information of the class.

---
 **When to a use a mutex vs atomic**

Both are used when sharing data between threads i.e. when multiple threads want to write to the same memory.

**atomic**
- used when there is a lock free requirement
- has the problem of dealing with race conditions
- uses hardware locking mechanisms for fundamental operations
- should be avoided for more complex types

**Mutex**
- can suspend a thread when it hits a lock fpossibly freeing up resources
- needs at least on atomic operation to lock a mutex and one to unlock
- insures only a single thread enters a critical section at a time

---
 **What kind of mutexes exist?** 
Recursive: allows the same thread to acquire multiple levels of ownership over the _mutex object_
Timed: additionally supporting _timed try-lock_ requests
Recursive-timed : combination of the above

 ---
Bit shifting
a << b; increases size of a
a >> b; decreases size of a

- shifting by negative numbers is undefined
- shifted more than the size of the integer is undefined
---
**object pooling**
pre-allocate objects
free list is awesome

---
**placement new** 
```cpp
char buffer[10 * sizeof(int)]; // enough space for 10 ints
int * test1 = new (buffer) int [10]; //placement new
```

- object construction can be done at a known address
- uses existing memory
- you need to provide the memory

---
**Reflection**
Allows data types to be inspected at runtime, 
- allows the enumeration of data types, the members of a given class or value type 
- most common way is through the gettype method
- name provided is the strong name

---
 **Multithreading,** its pros and cons (how I would implement a thread-safe singleton)

**Pro:**
performance, parallelization
responsiveness: single tasks don't block others from running

**Con:**
complexity
synchronization overhead: shared resources
context switching: switching between threads can be expensive if not done efficiently
harder to predict and debug
hardware limitations

**Thread-safe Singleton**
```cpp
class FileSystem
{
public:
  static FileSystem& instance()
  {
    static FileSystem *instance = new FileSystem();
    return *instance;
  }

private:
  FileSystem() {}
};
```

```cpp
#pragma once
#include <memory>
#include <mutex>

namespace utils
{
template<typename T>
class Singleton
{
private:
    Singleton<T>(const Singleton<T>&) = delete;
    Singleton<T>& operator = (const Singleton<T>&) = delete;

    Singleton<T>() = default;

    static std::unique_ptr<T> m_instance;
    static std::once_flag m_once;

public:
    virtual ~Singleton<T>() = default;

    static T* getInstance()
    {
        std::call_once(m_once, []() { m_instance.reset(new T); });
        return m_instance.get();
    }

    template<typename... Args>
    static T* getInstance2nd(Args&& ...args)
    {
        std::call_once(m_once, [&]() {
            m_instance.reset(new T(std::forward<Args>(args)...));
        });
        return m_instance.get();
    }
};

template<typename T> std::unique_ptr<T> Singleton<T>::m_instance;
template<typename T> std::once_flag Singleton<T>::m_once;
}
```

```
MySingleton * GetInstance()
{
      if (m_pOnlyOneInstance == NULL)
      {
            EnterCriticalSection();
            if (m_pOnlyOneInstance == NULL)
            // Solution 1 and 2 gaps addressed by moving
            // critical section block and by re-doing this check!
            {
                  m_pOnlyOneInstance = new MySingleton();
            }
            LeaveCriticalSection();
      }
      return m_pOnlyOneInstance;
}
```


---
**Memory corruption**
- using uninitialized memory
- using non-owned memory(memory from outside the program)
- using memory beyond what was allocated(buffer overflow)
- faulty heap memory management(memory leaks, freeing non-heap or unallocated memory)

---
multiplayer lag compensation in a shooter game (go watch that famous Overwatch GDC video again).

https://www.youtube.com/watch?v=zrIY0eIyqmI

---
#### Optimization Questions
**always ask for more information**
How can we use a Bounding Volume Hierarchy(or an octree, or something similar) to speed up a ray tracer?

Ray tracing needs to know when the ray will collide and bounce off of another object. 
bounding hierarchies or octrees can be used for spatial organization. 
You can more efficiently determine what objects the ray may collide with.

 
Explain about Cache Memory(L1 and L2 caches, and so on)
- memory on cpu to store frequently used instructions and data
- lower levels are faster but smaller
- the more effectively you can get data onto the cache the faster(usually) the program will run

What is [Data Oriented Design?](https://en.wikipedia.org/wiki/Data-oriented_design)
- Focuses on optimal transformations of data
- Transforms are abstractions of code that solely focus on the mapping of inputs to outputs
- optimize data layouts for these transforms
- separating and sorting [fields](https://en.wikipedia.org/wiki/Field_(computing) "Field (computing)") according to when they are needed
- Minimizing data movement, Maximizing data reuse, Optimizing for the cache

How it works
- Storing data in contiguous blocks
- Grouping related data together
- Using simple data structures:

Explain how view frustum culling can be optimized using multithreading and SIMD(see e.g. the blog post by [Andreas Asplund](http://bitsquid.blogspot.se/2016/10/the-implementation-of-frustum-culling.html))

- Kick jobs to do frustum vs sphere culling
    - For each frustum plane, test plane vs sphere
- Wait for sphere culling to finish
- For objects that pass sphere test, kick jobs to do frustum vs object-oriented bounding box (OOBB) culling
    - For each frustum plane, test plane vs OOBB
- Wait for OOBB culling to finished 


Do you have experience with using performance profiling tools for the GPU?

Game companies seem to expect you to have experience with profiling and optimizing your code using tools such as NVIDIA Nsight, so do get familiar with them. Also, [this](http://pages.tacc.utexas.edu/~eijkhout/Articles/EijkhoutIntroToHPC.pdf) is a good book for brushing up on computer architecture topics such as cache memory.


#### Debugging and optimization 
You'll be given strange scenarios and have to come up with all the possible things that could be wrong and how you might fix it. 

Think about things like how to reproduce the issue, whether it only happens on certain computers, how you can debug it if you can't reproduce it on your computer, **what tools are available in a debugger** (line break points, memory break points, stack traces, core dumps, etc). 

**Have at least 5 answers for "why is the screen black?"** 
drivers, shaders, camera issues, is anything loading in, something blocking camera, lights missing, lights to dark, hardware, loose cables

When optimizing, make sure you ask for as much relevant information about your hypothetical data as possible. 

**Consider the differences between optimizing for speed vs memory.** You will most likely be asked about how to allocate memory in order to take advantage of the CPU cache size. Be familiar with static and runtime analysis tools like VTune. Experience with libraries like TBB is a plus.


**“in a big map full of items, how would you find the items that the player can interact with” (the answer included quadtrees)**

https://thatgamesguy.co.uk/cpp-game-dev-16/



**You're searching for bottlenecks in your game, but nothing you're changing is making the game any faster, be it anything in the GPU pipeline or the CPU. Nothing is spiking, and the slowness appears to be distributed across everywhere. What do you do next?**

What do you mean by slowness specifically?
- lag
- input responsiveness
- network lag
Is this happening in a specific area of the game?
Are there any other process running?
Is there an issue with this specific machine it is being tested on? 
		drivers, antivirus, other software, hardware issues

run a profiler
check for memory leaks
maybe a problem with an API or library
maybe the fixed physics update is too low
Has any optimization been done?

ask for help/another pair of eyes/pair programming/code review

https://wiki.c2.com/?UniformlySlowCode

- use of inline/#define functions
- pass parameters by reference instead of value
- move functionality into database stored procedures
- change error handling to using exceptions
- change to a different API set (for example, move from ADO to ODBC)
- change from one third party module to another, from third party code to in-house code, or vice-versa
- move to a different OS

- passing vectors by reference can be bad, passing by value can mean the vectors data will already be in registers for use instead flushing the pointers first. Know what your data and functions need to do in order to make such a decision. 

Are you using a lot of factory or virtual functions?

Would caching/reusing some data help?

Are there interrelated functions? Id the slowness of one function causing another function to also slow down? Is the slowness distributed across a set of functions?


Try testing things with extreme parameters. Create thousands of objects or particles, have a large number of continuous physics collisions, etc...


- Prefer static linking and position-dependent code (as opposed to PIC, position-independent code).
- Prefer 64-bit code and 32-bit data.
- Prefer array indexing to pointers (this one seems to reverse every ten years).
- Prefer regular memory access patterns.
- Minimize control flow.
- Avoid data dependencies.

https://www.facebook.com/notes/10158791579037200/
**Reduce strength**
The first tip is simple: When implementing an algorithm, use operations of the minimum strength possible. The poster child of strength reduction is replacing x / 2 with x >> 1 in source code. In 1985, that was a good thing to do; nowadays, you're just making your compiler yawn.

The speed hierarchy of operations is:

- comparisons
- (u)int add, subtract, bitops, shift
- floating point add, sub (separate unit!)
- indexed array access (caveat: cache effects)
- (u)int32 mul
- FP mul
- FP division, remainder
- (u)int division, remainder

**Minimize array writes**
To be faster, code should reduce the number of array writes, and more generally, writes through pointers.

Is the code optimized for one thing to the detriment of another (memory, speed, etc..)


---
## Math Questions 

****
**What is a dot product?**
- Yields a scalar.
- a · b = ax * bx + ay * by + az * bz
- a · b = ||a|| ||b|| cosθ
- measures the length of the projection of b onto a, multiplied by the length of a.
- The dot product can be used to measure displacement in a particular direction.
- can measures how close two vectors align, angle between two vectors
- Can use with a unit-vector to get the distance of another vector in that direction.
	
**What is a cross product?**
- Yields a vector.
- a × b = (ay * bz - az * by,   az * bx - ax * bz,   ax * by - ay * bx)
- ||a × b|| = ||a|| ||b|| sinθ
		magnitude of cross product = area of the parallelogram(with sides a and b)
- when parallel, **a × b = 0**
- calculates vector normal to plane formed from a and b 
		direction of that normal depends on left or right hand rule
 

---
**Why should you use quaternions over euler angles?**
	They don't suffer from singularities(Gimbal Lock)

**How do you use matrices to apply transformations to an object? For instance, how do you scale, translate and rotate an object with matrices?**

$$
Translate = 
\begin{pmatrix}
0 & 0 & 0 & x \\
0 & 0 & 0 & y \\
0 & 0 & 0 & z \\
0 & 0 & 0 &  1
\end{pmatrix}

Scale = 
\begin{pmatrix}
Sx & 0 & 0 & 0 \\
0 & Sy & 0 & 0 \\
0 & 0 & Sz & 0 \\
0 & 0 & 0 &  1
\end{pmatrix}

Rotation = 
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & cos\theta & -sin\theta & 0 \\
0 & sin\theta & cos\theta  & 0 \\
0 & 0 & 0 &  1
\end{pmatrix}



$$

scale first, then Rotate, last Translate
//order is right to left:  T * R * S


**How do you calculate the intersection between a ray and a plane/sphere/triangle?**
- Ray-Sphere
https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection.html
	often simplest intersection test
	find distance from center point to line, if less than radius then it intersects

Ray = Ray Origin point + t * Direction // R = O + tD
L=C-O
edges L, t_ca, and d form a right triangle
dot product corresponds to projecting point onto line
dot of L and D gives t_ca the closest point to the circle
negative values mean they are pointing away from each other
d = sqrt(L^2 -t_ca^2)
if(d<0) no intersection

```c++
	Vec3f L = orig - center;
	float a = dir.dotProduct(dir);
	float b = 2 * dir.dotProduct(L);
	float c = L.dotProduct(L) - radius2;
	if (!solveQuadratic(a, b, c, t0, t1)) return false;
	
	if (t0 > t1) std::swap(t0, t1);
	
	if (t0 < 0) 
	{
			t0 = t1; // if t0 is negative, let's use t1 instead
			if (t0 < 0) return false; // both t0 and t1 are negative
	}

	t = t0;

	return true;
```

simplified
project center point of sphere onto line
projection = SphereCenter * dot(SphereCenter, Ray)/ Magnitude(SphereCenter)^2
look at distance between projection and sphere center

**Explain concepts like world space, object space and camera space.**
world space: coordinates used to compare different objects in more absolute terms
Object space: coordinates relative to an object, used for vertex placement
Camera Space: Coordinates relative to the camera view

**reflecting vectors against walls**
vector: v
line(wall): l
line normal: n
reflection: r
r = d - (2n * dot(d, n))

**how to calculate the distance between two vectors**
sqrt((x1-x2)^2+(y1-y2)^2+(z1-z2)^2)

## Computer Graphics Questions

- What anti-aliasing techniques do you know about?(some possible techniques are MSAA, MLAA, FXAA and TXAA)
- What are the most common elements of a rendering engine?(common elements will be things like a system for handling culling, rendering of shadows, handling of light sources with something like deferred/forward shading, how materials are handled in the engine, and so on)
- What shadow rendering techniques do you know about?(there are TONS of shadow rendering techniques out there. Some examples are variance shadow mapping and exponential shadow mapping, and the newer [moment shadow mapping](http://cg.cs.uni-bonn.de/aigaion2root/attachments/MomentShadowMapping.pdf))
- What are the pros and cons of a deferred renderer?
- Explain to me physically based rendering?
- Can you give an explanation of how the [Rendering Equation](https://en.wikipedia.org/wiki/Rendering_equation) works?
- What is a BRDF? What does it mean to say that a BRDF is "energy conserving"?
- What are the performance implications of branching in a shader?(hint: read up on the concept of a warp in GPU architecture)
- What advantages does newer API:s like Vulkan and DirectX 12 offer over old API:s like OpenGL and DirectX 11?(hint: primary reason is lower driver-overhead)
- What is the last graphics paper you read, and can you explain it to me?(this was a pretty common question)
- Describe to me the entire [graphics pipeline?](https://en.wikipedia.org/wiki/Graphics_pipeline)(your answer will probably be pretty long. You will explain about the vertex shader and the fragment shader, about perspective correct interpolation, about the z-buffer, about double buffering the framebuffer, about alpha blending, about transformation matrices, about homogeneous coordinates, about reflection models in the fragment shader and so on.)
- how you convert coordinates from world space to the screen.



---


## The Structure of an Interview
Nearly all interviews with game companies follow the same pattern: 
1. phone screen
2. take-home programming test
3. on-site interview.
#### Phone Interviews
 Generally two types:
  1. interviewer asks rapid-fire low-level programming questions
  2. more casual talk about past work experience. 
#### Take Home Test
The take-home test questions tend to be on par with generic HackerRank questions, and will take between 2-4 hours.

 >[!tip]  If it takes longer than 4 hours at any company besides Bungie (who asks two 4-hour questions), that is a strong indicator that you are not qualified for the position.

On-sites vary greatly by company, but you can expect at most places to meet with 4 groups of 2 people, where 2 groups will ask you technical questions, make you code on a whiteboard, and explain specific examples of things you've done in the past. 
The other 2 groups will ask about how you get along with others, how you interact with management and artists, and other culture/work ethic questions. 
Nearly all interviews will be conducted assuming you have advanced knowledge of C++. In the case of WPF-based tools development or Unity games, you may be asked about C# instead; however, in the case where the job requires C#, most companies will still interview you in C++ if you prefer.

- leave comments as to why you used certain decisions
- There might be follow-up interviews about this step where you are asked to go through the code and add new features or extend the existing ones.
- slightly modified version of game-of-life
##### Example Questions
“what’s the output of this program”
“implement the concrete class of this interface with blah functionality”

- Implement tic-tac-toe (something not too tricky, but requires a fair amount of code)
- C-style strings: Implement strtok, reverse words in-place, etc.
- Implement a linked list/binary tree/hash table
- Low-level understanding: If you have a pointer to a type of "int", and increment the pointer by 4, how many bytes have you advanced?
- C++ trivia: What are the differences between a struct and a class? Should destructors be virtual? Etc.
- Find distance between point and line segment

leet Code
- mostly easy side
- maybe one medium
-  solved one with two-pointers approach and 1-D dynamic programming
- focus more on just getting solid & efficient implementations for easy/medium problems in C++
read Scott Meyer’s books, starting from “Effective C++”


####  Whiteboard questions:
Usually these are in the form of leetcode-style questions, on the easy side. They don’t expect a compiling and running code
- outline the pseudocode that covers the solution.
- be vocal about your thought process,

One example is: “Given an array of numbers, replace each number with the product of all the numbers in the array except the number itself”.
##### System design
- The crucial point here is to keep asking questions for clarification
 - you should _never_ go straight into code or class design

- If you’re lost and it makes sense in the context of the problem, start with asking the purpose of the feature, what problem it tries to solve. If nothing else, it will make you more familiar with the game/context
- Explain how you imagine the thing might look on screen, and confirm that it is the case for them as well. Be on the same page.
- Think from a QA perspective and try to break the feature: What happens if something is full/empty, too close/too far, takes too long, happens too frequently etc. The goal is to show them you’re not just doing whatever you’re told and you’re framing the problem into doable bounds.
- Think about the limits. How large the world is, how many stuff are you’re gonna have in it, and how this affects the solution.
- In the process, try to come up with the magic numbers and make them adjustable by game design. Give them as much control as possible in your solution. If it doesn’t contain any moving parts like that, you might be missing something: specifically ask for what they would want to poke at.
- Think about what extensions game design might come up with. If nothing comes to mind, ask them what parts they think are likely to change.
- If you think you’re not in the right direction (or you feel lost, which was my case a couple of times) just ask for hints. It’s true that they don’t expect you to be a mind-reader, but they’re evaluating your capability of extracting the design out of their minds. While falling into this situation will eventually reflect as negative on your score, you should ask for a clue _before_ they’re forced to give you one (which would be even worse for you).


#### Review
1. Review C++ faq https://isocpp.org/faq  This helps avoid getting tripped up on C++ trivia.
2. Review my resume & experience and think about points I'd like to chat about, that are especially relevant to this job.
3.  Review the company's games - Think about what I like & dislike about them, so I can talk about them intelligently.
4.  Review some basic vector/matrix math: Dot product, cross product, how to project a point onto a line, how to use matrices for rotations, etc. It doesn't always come up but I like to be prepared just in case.
5. Leetcode problems as time permits. At least a couple easy problems the night before to make sure I'm "warmed up".

## Soft skills questions 
- What’s the project from your CV that you’re proud of the most?
- What’s one thing that you’re proud of having done in [that project from your CV]?
- Specifically about [that side project from your CV]: What have you learned?
- How do you find the motivation to make games in spare time?
- What do you do outside of work?
- Is there anything you’ve learned early in your career and carried it with yourself until today?
- Would you prefer working with Unity or Unreal? In game jams? In the day job?
- You’re experienced with Unity and C#, why do you leave your comfort zone?
- Ever had game design come to you with something that you think is impossible? How did you react?
- What do you think of UI development in general? (I reckon this is intentionally vague)
- What do you think your challenges will be, in the case you’re hired?
- Did you miss a sprint deadline? What happened? What have you learned?
- How would you feel when some other programmer messes with your part of the code?
- What’s the best part of being an engineer for you? Worst part?
- What would your mindset be when you’re just starting implementing a new feature? What would be the important things for you? (part 2) How would that mindset change when you’re working on a legacy codebase?
- Let’s say you have another member joining you in the feature. How would you onboard them?
- What do you think of TDD’s?

## Questions to ask 
If time permits, they leave a ~5 minute window at the end of each round for you to ask questions. It doesn’t seem like that at first, but this interval is pretty important: you’re able to get as much insight as possible regarding the team structure, ways of working, expectations from the role, future of the role etc. [This (gamedev focused)](https://lindenreidblog.com/2020/05/21/questions-to-ask-game-studios-youre-interviewing-with/) and [this (more general tech oriented)](https://github.com/viraptor/reverse-interview) list of questions are pretty comprehensive.

- What does the team look like? Who would I be working with and report to?
- Company’s policy about seniority levels and their criteria.
- What is the onboarding process for the role? How do a new hire’s first couple of months look like?
- How do the features get decided?
- (to game designers) What sort of programmers do you enjoy working with?
- Remote/hybrid working policy, if applicable
- Company policy with gamedev-related side projects
- What is one thing that you wish somebody told you before you started?
- Any extracurricular activity: events, gaming nights, game jams etc.
    - What's work/life balance and crunch like? Do folks ever work evenings or weekends?
    - What's the culture and team dynamic like?
    - Tell me about the game.
    - Tell me about my role.
    - What are the biggest challenges/unknowns finished and remaining?
    - How the company get formed? How'd you get there? Is it what you wanted it to be?
    - If there's one thing you could change about the company or product?
    - What's the timeline for your current game?
    - How much of the team is remote?
    - What are your remote tools / procedures?
    - Is my particular experience going to be OK?



# Compensation

- In general, a "gameplay engineering" position usually pays less well than a "software engineering" position.
- The offer that I accepted from Bungie was very competitive for the games industry.
- My compensation will actually be somewhat close to what I was making at Google.
- In particular, the base salary, annual bonus, 401k matching, and miscellaneous benefits are all very similar.
- The main difference is in equity (stocks).

- About half of my compensation at Google was equity.
- Bungie is also offering me a decent chunk of something resembling equity.
- But a lot of this will depend on how Bungie handles periodic equity refreshes.
- Unfortunately the details for this are a bit in-the-air since their acquisition by Sony is still in-progress.

- In addition, I'm getting a hefty signing bonus!

- I think it helped that Bungie was a little slower than the other companies I was talking to.
- I already had a couple offers by the time I did my all-day virtual "onsite" with Bungie.
- I gave them a deadline to respond within the week.
- So I think they felt like they needed to give a strong offer up-front, since they wouldn't have time for any back-and-forth.
- [Glassdoor's numbers](https://www.glassdoor.com/Salary/Bungie-Senior-Gameplay-Programmer-Washington-State-Salaries-EJI_IE284423.0,6_KO7,33_IL.34,50_IS3020.htm) seem somewhat accurate for base salary.



Resources
- High-level overview of the scope of gameplay-engineering interviewers [https://www.reddit.com/r/gamedev/comments/9n847g/18_months_of_game_programming_interviews/](https://www.reddit.com/r/gamedev/comments/9n847g/18_months_of_game_programming_interviews/)
- Game-math refresher:
[https://gamemath.com/book/](https://gamemath.com/book/)
- C++ refresher:
[https://learnxinyminutes.com/docs/c++/](https://learnxinyminutes.com/docs/c++/)
Other:
https://old.reddit.com/r/gamedev/comments/vnjivd/getting_that_gamedev_job_from_frontend_software/
https://github.com/viraptor/reverse-interview
https://lindenreidblog.com/2020/05/21/questions-to-ask-game-studios-youre-interviewing-with/
https://old.reddit.com/r/cscareerquestionsEU/comments/smbkmt/how_do_you_stay_motivated_at_your_job_knowing/hvw7756/?context=3
https://old.reddit.com/r/cscareerquestions/comments/ujjhpi/not_all_can_make_top_5_salaries_by_definition_but/
https://www.kalzumeus.com/2012/01/23/salary-negotiation/
https://learnxinyminutes.com/docs/c++/
https://www.gamelogicrecruitment.com/post/game-developer-interview-questions
https://career.guru99.com/top-25-interview-questions-for-game-developer/
https://www.talentlyft.com/en/resources/game-developer-interview-question
create a showreel ([levi.dev/showreel](https://levi.dev/showreel)).