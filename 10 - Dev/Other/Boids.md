---
publish: true
---

Boids are a relatively easy behavior to implement.
The first time I implemented boids was back in 2019 in C when my programming knowledge was still at a more apprentice level. 


### General Idea
BOIDs are a type of flocking and steering behavior. 
You can think of Boids as an algorithm to dynamically create groups of objects like a flock of birds or a school of fish.

There are 3 main components to accomplish this: <u>Separation</u>, <u>Alignment</u> and <u>Cohesion</u>.

<u>Alignment</u>: Tries to keep nearby Boids going in roughly the same direction.

<u>Separation</u>: Tries to keep nearby Boids from crowding too close and running into each other.

<u>Cohesion</u>: Tries to make Boids go towards each other.

For each component you check for Boids in range and apply a force to try steer that Boid in the desired direction. 

The range for each will be different. Cohesion wants to bring boids together so it will generally have the largest range. And cohesion mainly cares about Boids already in the flock going the same direction so it will be somewhere in the middle.

The force applied can be a static amount, linear equation, exponential, or some custom curve. It's all about finding a balance between them to create the desired effect.



#### Optional Components
There are also several optional components you can add. 

You can use general steering behaviors to avoid or go towards specific things.

You can roughly divide everything into being either an <u>Attractor</u> or a <u>Repulsor</u>. 
As the name suggest they either attract or repel boids in range.

A more unique type of attractor would be a <u>Tether</u>. The unique aspect of a tether is that it is made to keep boids contained to an area. Normal Attractors only affect things in the set range where Tethers affect things outside the range.

A specific type of attractor or tether can be a <u>Leader</u>. A specially designated Boid(Or other object) whose goal is to lead the flock. A leader does not need to be a Boid itself and can have it's own separate behavior to guide it's path.

#### Flock Formations
Sometimes you want to flock to form specific shapes. Many birds fly in a V formation. 
Each Boid can check in front of them in an angle for other boids to steer away from. 
Another way is to have the cohesion force steer to an offset position.

More specific shapes will probably require you to get a bit creative to achieve. 

If you know the general direction of the flock and the relative position of the Boid in the flock you can change how the forces are applied. Maybe you want them to fly in the shape of a box. 
- In that case you would need to increase the cohesion force on the boids directly in the front, back, and sides. 
- You can also try and give them a preference to follow directly behind other boids.

#### Other Things

Another way to possibly change the behavior is with momentum and reaction speed.
If you have a spot with a strong attraction force: 
- a slow turning or reaction speed would have them zip past it kind of like a swarm of bugs.
- a weaker alignment might and decent separation force could result in them circling the object.

Reaching the right balance of forces for these can be tricky.


Not all boids need to have the same settings. You can offset the alignment force on some Boids to cause them to fly more along the edges of the flock.


## Implementation
This is some rough pseudo code.
### Seperation

### Alignment

### Cohesion

```c++
vec3 avgeragePosition;
int count = 0;
for each (otherBoid.distance() < CohesionDistance)
{
  avgeragePosition += otherBoid.position;
  count += 1;
}  

averagePosition /= count;

vec3 SeekDirection = normalize(averagePosition - boid.position);
SeekDirection = Lerp(boid.rotation, seekDirection, cohesionStrength);
```




