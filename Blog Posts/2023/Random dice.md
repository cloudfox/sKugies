



```c++

#include <iostream>
#include <stdio.h>      /* printf, scanf, puts, NULL */
#include <stdlib.h>     /* srand, rand */
#include <time.h>       /* time */
#include <vector>

using namespace std;



int main()
{
    std::vector<int> rolls;
    rolls.resize(50);
    
    for(int i = 0; i < 5000; i++){
        int roll1 = rand() % 20 + 1;
        int roll2 = rand() % 20 + 1;
        
        int total = roll1;
        if(roll2 > roll1)
        total = roll2;
        
        int roll3 = rand() % 10 + 1;
        int roll4 = rand() % 10 + 1;
        
        if(roll3 > roll4)
            total += roll3;
        else
            total += roll4;
        
        rolls[total] += 1;
    }
    
    for(int i = 0; i < rolls.size(); i++){
        std::cout << i << ": " << (float)rolls[i]/50 << std::endl;
    }


    return 0;
}

```