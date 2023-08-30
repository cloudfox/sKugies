

```
while( expression )
{
	statements
}
```



```
do 
{
	statements
}
while ( expression )
```
In a normal while loop the expression is checked then if true the statements are run before going back up to check the expression again. 
Do-while loops are the reverse. The statements are run first then the expression is checked if it should continue the loop. This means that the statements will run at least once even if the expression is false.


---

```
for( expression1 ; expression2 ; expression3 )
{
	statements
}
```

expression1  - is only run once at the start, generally used to create the variable to test(you can leave it blank and create the variable outside the loop if you want/need to)
 
expresion2 - the expression to evaluate in order to run the loop

expression3 - generally used to modify the variable that is tested

```
for( int i = 0 ; i < 10 ; ++i )
{
	statements
}
```

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
	
	..continues until is is 10
```


---

range based
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





----
#### Nested Loops


1.

