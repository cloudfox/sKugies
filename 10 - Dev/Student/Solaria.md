---
cssclasses: 
tags:
  - project
---

<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>

![](https://www.youtube.com/watch?v=wM3hRoneoVg)


## What is the game?

SCHMUP based in space.

### What did I work on?

This was my first real dive into making AI, tools, and level design.

Being a top down shmup the behaviors were mostly simple. We had a variety of shooting and moving patterns that we could combine with some triggers to engage the player. My favorite of them was a simple BOIDs implementation. A hive/breeder ship would spawn a group of little guys that would chase you down. There was a physics bug earlier on that made them swarm around you like actual flies. Thinking back I should have pushed for them to leave that bug in because it looked so much cooler and didn’t negatively affect anything else.

The level design tool was fairly simple yet I can only describe it as janky. The enemies would spawn based off of a time stamp so I made an excel sheet to represent the position of the enemies using the columns and time they would spawn by row. Then using a few formulas everything would be spit out onto another sheet in the correct format to later be read into the game. Considering the amount of time we had it actually came out pretty well. The game was definitely way too hard for most people though but that was my own oversight having tested it so much.

### Other thoughts

I have dabbled in making games before this but this was the first real project that I worked on a team with. At the time I didn’t really realize just how much more there was for me to learn.