[[Learn programming (C++)#Section 2 Intermediate]]]]  previous: [[pointers and references]]   

---
Sometimes you need to change the type of variable.
This isn't a perfect process so there are a number of things to look out for; namely with the accuracy and size of the types.

The simplest conversion is from a smaller or less accurate type to a larger/more accurate type.
```cpp
int distance = 1000;
short ShortDistance = distance;  //implicit conversion 
```
One of the main things to be careful of is can the new type hold the previous types data. Remembering back to [[Variables#Integrals]]  ints can hold more than shorts so you could run into problems if you aren't careful.

You can even convert between vastly different types.
```cpp
float cheese = 3.4f;
int cheesePieces = cheese; 
```
Unfortunately this example results in some data loss as we loose the trailing '.4' giving cheesePieces a final value of '3'.

##### There are two types of conversions: implicit and explicit.
**Implicit** is basically letting the compiler figure out what type it should be converted to.
**Explicit** is telling the compiler exactly what type you want. This is also known as type casting.

```cpp
int distance = 1000;
short ShortDistance = distance;  //implicit conversion 
short ShortDistance = (short)distance; //explicit conversion
```

Explicit conversion/casting has several different styles you can possibly use. 
```cpp
(type)expression; //c-style
type(expression); //function style
```
C style should generally be avoided as they can allow some dangerous things.

### Conversion Operators
A more modern version of casting
```cpp
static_cast<type>(expression);
const_cast<type>(expression);
dynamic_cast<type>(expression);
reinterpret_cast<type>(expression);
std::bit_cast<type>(expression); //C++20
```

#### Static Cast
used mainly for built in types

#### Const Cast
used to remove constness 

#### Dynamic Cast


#### Reinterpret Cast
- Least secure, use minimally. Doesn't have any safety checks.
- Can be used on practically anything possibly resulting in undefined behavior. You want to cast that turtle into an airplane? Sure go ahead! But no guarantees on what the turtle-plane will do! (maybe it'll crash maybe it'll fly at warp speed)




#### Bit Cast



### Conversion Constructor
related

You can also define these yourself but more on that in the next section.

# 
----
next: [[Command Line Arguments]] 