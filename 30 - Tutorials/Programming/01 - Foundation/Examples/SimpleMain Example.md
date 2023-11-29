---
publish: true
---

```c++
/****************************
 \file   main.cpp
 \Author: Steven Kugies jr.
 \par: email: contact@stevenkugies.com
 \date   09/02/2023

 \brief
	Generate 2 random numbers 
	muliply or add them together
	prints result
*****************************/

#include <stdio.h>  \\printf
#include <stdlib.h> \\rand, srand
#include <time.h>   \\time

/*****************************************************
\brief
    adds or multiplies randomly
\param a
    first random number
\param b
    second random number
\return
    result from a and b
******************************************************/
int RandomMath(int a, int b)
{
	if(a > b)	
		return a * b;
	else
		return a + b;
}

/*****************************************************
\brief
    generates and multiplies random numbers
\param argc
    number of arguments, unused
\param argv
    the arguments, unused
\return
    returns 0 for success
******************************************************/
int main(int argc, char **argv)
{ 
	//Init seed 
	srand(time(NULL))

	//generate 2 random numbers in range 0-99
	int a = rand() % 100;
	int b = rand() % 100;
	
	printf("Result %i", RandomMath(a,b));
	
	return 0;
}
```







