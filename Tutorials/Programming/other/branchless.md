

https://github.com/alpbintug/Branchless-programming/tree/master

branched 
```c++
if(i%2==0)
  x*=2;
		
if(i%3==0)
  x/=11;

if(i%5==0)
  x+=7;

if(i%7==0)
  x-=5;
```

branchless
```c++
x*=(2*(i%2==0)+!(i%2==0));
x/=(11*(i%3==0)+!(i%3==0));
x+=7*(i%5==0);
x-=5*(i%7==0);
```
