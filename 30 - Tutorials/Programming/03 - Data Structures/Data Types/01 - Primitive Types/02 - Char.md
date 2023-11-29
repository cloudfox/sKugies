---
publish: true
---


a char is a single alpha numeric letter
values are assigned by surrounding the character with single quotes. They can also be asigned using ASCII code

size of 1 byte 

char aLetter = 'B';
char aNumber = '5';
char anotherLetter = 65;  //65 is the code for uppercase a


https://www.asciitable.com/


Under the hood char are basically 1 byte integers. That means you can perform mathmatical operations on them.  A key one is adding 32 changes an uppercase letter to lower case.

anotherLetter += 32; //value is now 97 or lowercase a
anotherLetter -= 32; //value is back to A
anotherLetter += 1;  // value is now B
