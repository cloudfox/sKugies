---
publish: true
---

### Stat Modifiers
<br>
Looking at different ways to increase and decrease values.

## linear percentage change
generally fine when going up
can be some problems when going down

+100% doubles but the equivalent decrease is -50%
and -100% is obviously a complete negation---
publish: false
---




To make this more obvious +99% almost doubles but -99% almost negates.


If you are just stacking percentages subtracting has a much greater relative affect.
Generally speaking you would have to be much more mindful of decreases.

## What are some options?

## Exponentials
An example of this is damage/armor in Guild Wars 1

$$ actual damage = base damage * 2^{-armor/40}  $$
What this formula is basically saying is for every 40 points of armor damage is cut in half.
Guild wars also has a value for piercing through armor that is calculated separately.
$$ actual damage = base damage * 2^{(strike-armor)/40}  $$
$$ value = baseFactor^{stat value/scaling factor} $$

With this sort of method increasing or decreasing the stat cause equivalent percentage changes.

A con of this method though is it is an exponential formula. Having the values double(or halve) each step can get out of hand.

We can control the growth a bit more by changing either the base factor or the scaling factor.
- A higher scaling factor effectively slows down the growth so we can work with nice more round numbers for our stats.
- The base factor does affect how quickly it grows but using factors like 2 or 10 are more friendly to work with(easier to make estimates etc..)


Risk of rain 2 has plenty examples of this. 
[Fuel Cells](https://riskofrain2.fandom.com/wiki/Fuel_Cell) have a base factor of 0.85
[Shaped Glass](https://riskofrain2.fandom.com/wiki/Shaped_Glass) has 2 exponential stats: base of 2 for damage and base of 0.5 for health


Risk of rain also uses a number of other scaling functions that are worth looking at.

## Hyperbolic
$$value = 1- \frac{1}{1+stat*scaling Factor}  $$
What this will give us is a diminishing return for each point of the stat.
To match our armor calculation above we have [Tougher Times](https://riskofrain2.fandom.com/wiki/Tougher_Times)
$$negation chance = 1- \frac{1}{1+0.15*amount}  $$

| stacks | increased chance  | total chance |
| ---- | ---- | ---- |
| 1 | 13% | 13% |
| 2 | 10% | 23% |
| 3 | 8% | 31% |
| 4 | 6% | 37% |
| ... | ... | ... |
| 20 | 1% | 75% |
(values are rounded down for simplicity)


## Reciprocal
Forms a mirrored graph of the hyperbolic function

$$value = \frac{scaling factor}{stat} $$
When your scaling factor and stat are equal you can consider the value to be in a sort of homeostasis.
The smaller the stat is compared to the factor the more drastically the value changes with each step.
And conversely the larger the stat is in comparison the smaller the change.

For this example I'm assuming a scaling factor of 10

| stat | result | change |
| ---- | ---- | ---- |
| 20 | 0.5 | 0.02 |
| 19 | 0.52 | 0.03 |
| ... | ... | ... |
| 13 | 0.77 | 0.06 |
| 12 | 0.83 | 0.08 |
| 11 | 0.91 | 0.09 |
| 10 | 1 | 0 |
| 9 | 1.11 | 0.11 |
| 8 | 1.25 | 0.14 |
| 7 | 1.42 | 0.17 |
| ... | ... | ... |
| 2 | 5 | 1.66 |
| 1 | 10 | 5 |
(values are rounded)


## Custom Curves
If you want to get extra fancy.

Simplest way would probably be to use Bezier curves.

I also find https://easings.net/# has a lot of good examples. If you click on one it even has the math function at the bottom.



### Mixing and matching

For more fun mix and match the functions to create new curves like the [Bandolier](https://riskofrain2.fandom.com/wiki/Bandolier) which applies an exponent of 0.33 to the reciprocal. It's still basically a hyperbolic function but it approaches a value of one significantly slower.




