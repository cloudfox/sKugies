---
publish: true
tags:
  - tutorial
  - programming
---
<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>

[[Programming#Section 1 Foundation|Learn Programming Section 1]]  previous: [[Variables]]  

---
## What are Expressions?
The simplest expressions are our literal constants and variables. 
They can also be formulas or the combined results from several functions.
examples:
```cpp
x
y
pi
3.14159
-5
4+4
x+y
x+7
2 * pi * radius
4/3 * pi * r^2
```

---
## What are operators?
Like their name states they perform an operation like those used in the above the above examples. 
These include everything from math operations, to functions calls, and more. Most operators do not modify the value of the operands.

### Assignment Operators
The most common operator. Modifies the value of the operand.
	Anytime an operation modifies the value of something it is called a side effect.

| operators | type                                    |
| --------- | --------------------------------------- |
| a = b     | assignment                              |
| a += b    | compound assignment add                 |
| a -=b     | compound assignment minus               |
| a*= b     | compound assignment multiply            |
| a /= b    | compound assignment divide              |
| a %= b    | compound assignment remainder           |
| a \|= b   | compound assignment bitwise OR          |
| a ^= b    | compound assignment bitwise XOR         |
| a <<= b   | compound assignment bitwise left shift  |
| a >>= b   | compound assignment bitwise right shift |                                        |


**simple assignment**
assignment followed by an expression.
```cpp
int x = 1;  //x is 1
x = 2;  //x is now 2
x = 100; // x is now 100
iny i; 
i = 3; //i is now 3
int k = 4 * 5; //k is 20
int j = k * x; // j is 2000, k and x are unchanged
int m = 10 / 2; //m is 5
int n = (5+3) * 2; // parantheses first, n is 16
a = b = c = 10; //values assigned from right to left a, b and c are now 10
a = b = 5*(c  = 10); //c is now 10, a and b are now 50
```

Some assignment operations are illegal. This depends on whether a value is a L value(left) or R value(right).
Assignments take R values and assign them to L values. Simply L values are your variables and R values are the result from an expression.

**compound assignment**
Modify a value relative to itself.
```cpp
x += 10; //compound version of x = x + 10
y \*= 5; //compound version of y = y * 5
```

#### Increment Decrement
there are also the increment/decrement  ++ and --

| operators | type                       |
| --------- | -------------------------- |
| ++a       | pre increment adds 1       |
| a++       | post increment adds 1      |
| --a       | pre decrement subtracts 1  |
| a--       | post decrement subtracts 1 |

The pre/post versions determines when the operation completes
```cpp
int x = 5;
int y = 5;
std::cout << ++x << std::endl;
std::cout << y++ << std::endl;
std::cout << y << std::endl;
```
Output:
```
6
5
6
```
while the post increment is evaluated earlier it takes place after the variable was output.
This can be a bit confusing.

#### Arithmetic
These are your common math operations plus some ops to modify the underlying bits.

| operators | type                   |
| --------- | ---------------------- |
| +a        | unary plus (redundant) |
| -a        | unary minus            |
| a+b       | add                    |
| a-b       | subtract               |
| a\*b      |  multiply                       |
| a/b       | division               |
| a%b    | modulo / remainder     | 
| ~a     |  bitwise NOT   |
| a & b  | bitwise AND    |
| a \| b |  bitwise OR   |
| a ^ b  |  bitwise XOR   |
| a << b |  bitwise left shift    |
| a >> b |  bitwise right shift   |

**Unary**
Unary plus is redundant on it's own but you can overload it to change it's behavior.
Unary minus negates a value. If it was positive it becomes negative or vice versa.

**Modulo**
Modulo is just the value left over from division. 
	10 / 5  = 2 with remainder 0
	10 / 4 = 2 with remainder 2
	10 / 3 = 3 with remainder 1

More on [[Bitwise]] operators later.


#### Logical
These operators are all about booleans (true or false) operations.

| operators | type   |
| --------- | ------ |
| !a        | negate |
| a && b    | AND    | 
| a \|\| b  | OR        |

Negate take a boolean expressions and returns the opposite. (true becomes false, false becomes true )
Logical AND returns true if both a and b are true. If either is false then it returns false.
Logical OR returns true if either a or b is true. It only returns false if both are false.

#### Comparison 
These operators make a comparison and return either true or false.

| operators | type                |
| --------- | ------------------- |
| a == b    | equal to            |
| a != b    | not equal           |
| a < b     | less than           |
| a <= b    | less or equal to    |
| a > b     | greater than        |
| a >= b    | greater or equal to |
| a <=> b   | 3 way comparison                    |

Most of these should be fairly apparent. If the condition is met returns true else false.

3 way comparison is a newer operator and a bit more complicated so I recommend looking at the wiki https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison

> [!tip]
> Avoid directly comparing floats due to issues with precision. If you want to know more this is a great blog post covering it https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/

#### Member Access

| operators | type              |
| --------- | ----------------- |
| a[]       | subscript         |
| \*a       | indirect          |
| &a        | address of        |
| a->b      | member of pointer |
| a.b       | member of object |


#### Special

**Casting**
static_cast
dynamic_cast
const_cast
reinterpret_cast
C-style cast

**Memory**
new
delete

**Other**
sizeof 
typeid
noexcept
alignof


---
### Operator Precedence
Just like math has an order of operations so do operators in programming. For operations of the same precedence use the associativity.

| Precedence | Operator        | Description                         | Associativity |
| ---------- | --------------- | ----------------------------------- | ------------- |
| 1          | ::              | Scope Resolution                    | left to right |
| 2          | a++  a--        | postfix increment/decrement         | left to right |
| 2          | type() type{}   | functional cast                     |               |
| 2          | a()             | function call                       |               |
| 2          | a[]             | subscript                           |               |
| 2          | .  ->           | member access                       |               |
| 3          | ++a  --a        | prefix increment decrement          | right to left |
| 3          | +a  -a          | unary plus/minus                    |               |
| 3          | !  ~            | logical NOT, bitwise NOT            |               |
| 3          | (type)          | c-style cast                        |               |
| 3          | \*a             | dereference                         |               |
| 3          | &a              | Address of                          |               |
| 3          | sizeof          | size of type                        |               |
| 3          | co_await        | await expressions                   |               |
| 3          | new  new[]      | memory allocation                   |               |
| 3          | delete delete[] | memory dealloc                      |               |
| 4          | .\*   ->**      | pointer to member                   | left to right |
| 5          | a\*b a/b a%b    | multipy, divide, remainder          |               |
| 6          | a+b a-b         | add, subtract                       |               |
| 7          | <<  >>          | bitwise left shift, right shift     |               |
| 8          | <=>             | three-way comparison                |               |
| 9          | < <= > >=       | relational operators                |               |
| 10         | == !=           | equality operators                  |               |
| 11         | a&b             | bitwise AND                         |               |
| 12         | ^               | bitwise XOR                         |               |
| 13         | \|              | bitwise OR                          |               |
| 14         | &&              | logical AND                         |               |
| 15         | \|\|            | logical OR                          |               |
| 16         | a?b:c           | ternary conditional                 | right to left |
| 16         | throw           | throw op                            |               |
| 16         | co_yield        | yield expressions                   |               |
| 16         | =               | direct assignment                   |               |
| 16         | +=  -=          | compound assignment sum difference  |               |
| 16         | \*= /= %=       | compound assignment multiply, divide, remainder |               |
| 16         | <<= >>=         | assignment bitwise shift            |               |
| 16         | &= ^= \|=       | assignment bitwise AND XOR OR       |               |
| 17         | ,               | comma                               | left to right |

It is not strictly necessary to know the exact precedence of everything but you should be at least somewhat familiar with it.

Things can still get confusing when you have a lot more operations in a single line. In those cases I recommend using a few well place parentheses or in the worst cases split it into multiple lines.

###
---
next: [[Conditions]]


