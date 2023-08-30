
Some of the will be reiterated from the basics



General Structure of a program

```
include files

global data declarations // variables, constants, macros

function declarations  // anywhere before function is called

function definitions   // can go anywhere 

main function  //generally placed after everything else
{
	//other statements
	//you should have a return statement but it is not required
}
```

For mains return value like mentioned previously 0 is typically for reporting success.
Any other value is usually to report a specific error but their it is up to you. For more specific error error handling std::exceptions can be used or some type of logging system.

