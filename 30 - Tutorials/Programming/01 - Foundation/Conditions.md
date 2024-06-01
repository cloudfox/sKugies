---
publish: true
tags:
  - tutorial
  - programming
---

<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>

[[Programming#Section 1 Foundation|Learn Programming Section 1]]  previous: [[Expressions and Operators]]  

---
## What are Conditions?
When you need to pick and choose what code to run you have the if statement.
If statements are fairly straightforward by themselves but can get more complex with nesting and chaining statements.

#### If Statement
Simplest form
```cpp
if( expression )
	statement;

if( expression ) statement;  //functionally the same
```

If statements only run one statement unless you add curly brackets
```cpp
if( expression )
{
	statement1;
	statement2;
	//etc...
}
```

Sometimes you want to check the inverse of a condition with the not Operator '!'
```cpp
//this is often done to return from a function early.
if(!condition)
	statement;
```

#### If Else Statement
When you need to run different code depending on if it is true or false. (again you can add curly brackets when you need multiple statements in any section.)
```cpp
if( expression )
		statement1; //runs when true
else
	statement2; //runs when false
```

##### Else If Statement
If you have a bunch of exclusive conditions then 'else if' might be what you are looking for. 
```cpp
if( expression1 )
	statement1;  //runs when true
else if( expression2 )
	statement2;  //runs when exp1 is false and exp2 is true
else if( expression3 )
	statement3; //runs when exp1 and exp2 are false and exp3 is true
else
	statement4; //runs only when 1,2, and 3 are false;
```

### Nesting Statements
```cpp
if( expression )
{
	statement; //runs when expresion1 is true

	if( expression ) 
	  statement;  //runs when expresion1 and 2 are true
	  
	statement; //runs when expresion1 is true
}
```
When possible try to avoid going nesting more than 3 times if you can. After a point it becomes more difficult to read.

This isn't too awful with only a single statement but it could still be better.
```cpp
if( expression )
  if( expression )
	if( expression )
	  if( expression )
	    statement; 
```

One option is to combine if statements when possible using logical operators.
```cpp
//&& being the logical AND operator
if( expression1 && expresion2 && expression3 && expresion4 )
	statement;
```


> [!NOTE] Note
> The expressions are evaluated in series. Once on is evaluated as false further expressions are not evaluated. This can be important if you are using the increment operator in an expression. This is referred to as short circuit evaluation.


Another example with multiple conditions
```cpp
//if you want multipe expresions to trigger the same statement
if(expresion1)
	statement1;
if(expresion2)
	statement1

// a better way is to use the logical OR operator
if(expresion1 || expresion2)
	statement1;
```

> [!NOTE] Note
> The OR operator will stop evaluating further expressions once it finds a true expression. This is also a short circuit.

### Switch Statement
An alternative to using a chain of else if is the switch statement. 
```cpp
switch ( expression )
case constant_value1:
	statement
	break;
case constant_value2:
	statement
	break;
default:
	statement;
	break;
```

Taking you value of your expression you match it with a case value. If you find a match run all statements below it until you hit a break. This means you can run the statements in other cases. This is known as fall-through. Once a break is hit no more code in the switch is run.

If you don't find a matching case value then the default case is run (if you included one).

#### Switch Vs if else

Basically for longer lists switches are more efficient as they will use a jump table.

There are ways you can make you can make if else more efficient depending on how things are ordered and nested. If you know certain conditions are more likely you want to check those first.

Most of the time the best way is going to be whichever is the easiest to read and maintain.


---

next: [[Functions]] 