---
publish: true
---

### Spinning Things
<br>
Making a collection of object rotate around something.

## Just some random thoughts

My goal for a little project is to have various objects spin around a center point or object. I would like to have various objects that can fit together somehow. General inspiration is something like the solar core in Starcraft 2. I also want to try smaller shapes like triangles that form a sphere. 

First thought was to try and figure out a path for the objects to take around the center. Something basically predetermined.

Today I realized there is a much simpler method. I can calculate a flow field around the object. I can also use a BOID like steering behavior. This way I can have the objects spin around the center and lead them towards there final stopping point.

The flow field itself can have different patterns. The simples would just be spinning around a single axis. I could potentially rotate that axis over time as well. 

Likely issue with other patterns are the objects getting stuck in sections. Might need to look in flow fields that change over time with random noise. 
