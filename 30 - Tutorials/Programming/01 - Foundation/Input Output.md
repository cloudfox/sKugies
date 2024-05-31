---
tags:
  - tutorial
  - programming
publish: true
---
<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>
[[Programming#Section 1 Foundation|Learn Programming Section 1]]  previous: [[Iteration - Loops]]  

---
## Writing to Console

We've already been using [printf](https://cplusplus.com/reference/cstdio/printf/) and cout a fair bit. 

printf directs its output to the [stdout](https://cplusplus.com/reference/cstdio/stdout/) stream which by default is then redirected to the console. stdout can be directed to go to other streams(such as to a file).

Some other notable standard streams are 
cerr - error stream
clog - logging stream
These can be redirected to different files but we'll be ignoring that for now.

The big advantage of printf over streams is with formatting.
```cpp
int potatoes = 10;
float turnips = 5.3f;
printf("There are %i potatoes and %f turnips!\n", potatoes, turnips);

cout << "There are " << potatoes << " and " << turnips <<"!\n";
```
You can  achieve the same result with both. It is mostly just less work to use printf.

### Printf  Format Specifier
Used to insert variables into the string. The first format specifier used above is '%i' specifically it is saying to replace it with an integer(in this case potatoes). The second format specifier '%f' is to be replaced by a float(our second variable turnips).

| flag | description |
| ---- | ----------- |
| %c | characters |
|%s | strings  |
|%i or %d | integers|
|%f | floating point (float or double)|
|%e | scientific notation|
|%g | floating point (shortest representation)|
|%p | pointer address in hex|
|%x | unsigned hexadecimal integers|
|%u | unsigned integer|
|%ld or %li | long integers|
|%lu | unsigned long integers   |

Format specifier also include other flags to change things such as number of decimal points or minimal number of characters to print. For a more complete list please refer to https://cplusplus.com/reference/cstdio/printf/

```cpp
#define _USE_MATH_DEFINES

#include<cmath> //M_PI
#include<stdio.h> //printf

printf("%1.2f", M_PI);  //outputs 3.14
printf("%2.5f", M_PI);  //outputs 3.14159 
printf("%04.7f", M_PI); //output 0003.1415926
```

You can also print things using their ascii value https://en.cppreference.com/w/cpp/language/ascii  
```cpp
printf("%c", 65) //prints 'A'
printf("%c", 97) //prints 'a'
```
>[!tip] 
>You can convert between lower/uppercase ascii characters by adding/subtracting 32

printf returns the number of characters output.
## Reading Input
Just as there is a cout for output there is a cin for input.
```cpp
int potatoes;
cin >> potatoes;
```
We can also request multiple inputs in one line.
```cpp
cin >> potatoes >> tomatoes;
//same as
cin >> potatoes;
cin >> tomatoes;
```

Things get a slightly more complicated with strings. cin considers spaces as terminating so you have to use other functions if you want to enter a sentence. This is where getline() comes in.
```cpp
std::string s;
getline (cin, s); //places input from cin into string s
```


Our other option for input and counterpart to printf is scanf().
```cpp
int potatoes;
scanf("%i", &potatoes);
```
or multiple items
```cpp
scanf("%i%i%f", &potatoes, &tomatoes, &water);
```
It uses similar format specifiers and whitespace rules. https://cplusplus.com/reference/cstdio/scanf/?kw=scanf 

scanf returns the number of characters input

### StringStream
You can treat strings as streams for the use in both input and output.
```cpp
std::string aString;
int potatoes;
...
stringstream(aString) >> potatoes; //inputs from string as an integer into potatoes
```

#### 
---
next: [[Arrays]] 
Related: [[File IO]]
