[[Learn programming (C++)]]  previous: [[Scope Lifetime]]   #tutorial

---

They go by a few different names but when you need to do something multiple times loops/Iterators are your friend.

The most basic being the **while loop**
```
while( expression )
{
	statements
}
```
It will continue repeating so long as the expression remains true.

Slightly more complicated is the **do-while loop**
```
do 
{
	statements
}
while ( expression );
```
In a normal while loop the expression is checked first. If true the statements are run before going back up to check the expression again. 

Do-while loops are the reverse. The statements are run first then the expression is checked if it should continue the loop. This means that the statements will run at least once even if the expression is false.

---

**For Loops**
```
for( expression1 ; expression2 ; expression3 )
{
	statements
}
```

expression1  - is only run once at the start, generally used to create the variable to test(you can leave it blank and create the variable outside the loop if you want/need to)
 
expresion2 - the expression used to evaluate if the loop should continue running

expression3 - generally used to modify the expression that is tested

an example should make things more clear
```
for( int i = 0 ; i < 10 ; ++i )
{
	statements
}
```
Here we create a variable 'i' in our first expression 
The 2nd expression is checking if i is less than 10
The 3rd expression increments i by 1
In this example the statements will be run 10 times.

Breakdown of steps
```
1. expresion1 is evaluate 
	 int i = 0;
2. expresion2 is evaluted
	i < 10 // i is 0 
	0 < 10
	true
3. statements are run since expression2 is true
4. expression3 is run
	++i;   //i++ effectively does the same thing on modern compilers
	i is not 1	
5. repeats from step2 
	i < 10
	1 < 10
	true
	
	..continues until i is 10
```

You can also modify i in the body statements.

Any of the 3 expressions can also be omitted
```
for(;;)
{ statements; }
```
 Though you might need to provide a different way to exit the loop.
 
---
#### Continue and Break

Sometimes you want to skip certain iterations of a loop or even end the loop entirely. 

continue - go to next iteration
break - exits the loop (also used in switch statements)

```
for(int n = 0; n < 5; ++n)
{
	if(n == 1)
		continue;
	else if(n == 3)
		break;
	printf("loop %i \n", n);
}
```
Output:
```
loop 0
loop 1
```

As you can see when n equals 1 or 3 the printf command is not run.
Normally the loop would run 5 times but is broken out of at 3.

You can use continue/break in any kind of loop.

----
#### Nested Loops

Sometimes you want loops in your loops 

```
while( expression1 )
{
	for( ... )
	{
	
	}
}
```

You can nest as many loops as you want but it's generally wise to try and avoid going more than 2 or 3 levels deep. 
This is generally true for any nesting be it loops, if statements or whatever. The more nesting you have the more challenging it is to keep the code clear and concise. This is mainly a concern in larger programs.

---
##### Other
Like if statements you can also skip the braces for singular statements 

```
for( ... )
	statement;

while( expression )
	statement;

do 
	statement;
while( expression );

```

You can also define multiple variables in for loops

```
for(int x = 0, y = 0; x < 10 && y < 10; x+=1, y+=2) 
{
	statements;
}
```

>[!warning]-  Pay attention to the syntax! 
>
>**Expression 1:** the variables are declared together and cannot have separate types.
>**Expression 2:** use logical operators to test multiple expressions.
>**Expression 3:** You can put any number of expressions separated by commas here. Just be aware it can be more difficult to read the order of operations.


---
%%note move to iteration part 2%%
### Range based Loops

```
for ( range_declaration : range_expression )** 
{
	statements   
}
```

```
std::vector<int> vec;
for(int& i : vec)
{
	statements
}
```



next: [[Input]] 