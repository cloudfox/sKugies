---
publish: false
---
# https://erkaman.github.io/posts/junior_graphics_programmer_interview.html
## C++ Questions

- When should you use virtual destructors?(interviewers absolutely love this question!)
- What is the difference between allocating memory on the heap versus the stack?
- What C++11 and C++14 features are you using?
- What are templates used for?
- Explain the `inline` keyword
- What is little and big endian?
- Explain what const-correctness is?
- What overhead is associated with calling a virtual function?
- There will probably be some question where you are asked to perform some bit twiddling tricks, using operators such as `&` and `|` and friends
- There will probably be one question where you are asked to do something with a linked list, or some other pointer-based data structured like a tree. For instance, reversing a linked list.
- What is the size of a pointer in C++?(that is, the result of `sizeof` for a pointer)

As a general rule, none of the questions were about advanced language features. I was for instance never asked to do any template metaprogramming, which was a relief.

## Mathematics Questions

There was actually not much variety when it came to the math questions:

- What is a dot product?
- What is a cross product?
- Why should you use quaternions over euler angles?
- How do you use matrices to apply transformations to an object? For instance, how do you scale, translate and rotate an object with matrices?
- How do you calculate the intersection between a ray and a plane/sphere/triangle?
- Explain concepts like world space, object space and camera space.

You will probably also be asked to solve some practical, graphics-related problems that will involve using dot products, cross products, and quaternions. But if you are an experienced graphics programmer, this should pose no issues.

## Optimization Questions

- How can we use a Bounding Volume Hierarchy(or an octree, or something similar) to speed up a raytracer?
- Explain about Cache Memory(L1 and L2 caches, and so on)
- What is [Data Oriented Design?](https://en.wikipedia.org/wiki/Data-oriented_design)
- Explain how view frustum culling can be optimized using multithreading and SIMD(see e.g. the blog post by [Andreas Asplund](http://bitsquid.blogspot.se/2016/10/the-implementation-of-frustum-culling.html))
- Do you have experience with using performance profiling tools for the GPU?

Game companies seem to expect you to have experience with profiling and optimizing your code using tools such as NVIDIA Nsight, so do get familiar with them. Also, [this](http://pages.tacc.utexas.edu/~eijkhout/Articles/EijkhoutIntroToHPC.pdf) is a good book for brushing up on computer architecture topics such as cache memory.

## Computer Graphics Questions

- What anti-aliasing techniques do you know about?(some possible techniques are MSAA, MLAA, FXAA and TXAA)
- What are the most common elements of a rendering engine?(common elements will be things like a system for handling culling, rendering of shadows, handling of light sources with something like deferred/forward shading, how materials are handled in the engine, and so on)
- What shadow rendering techniques do you know about?(there are TONS of shadow rendering techniques out there. Some examples are variance shadow mapping and exponential shadow mapping, and the newer [moment shadow mapping](http://cg.cs.uni-bonn.de/aigaion2root/attachments/MomentShadowMapping.pdf))
- What are the pros and cons of a deferred renderer?
- Explain to me physically based rendering?
- Can you give an explanation of how the [Rendering Equation](https://en.wikipedia.org/wiki/Rendering_equation) works?
- What is a BRDF? What does it mean to say that a BRDF is "energy conserving"?
- What are the performance implications of branching in a shader?(hint: read up on the concept of a warp in GPU architecture)
- What advantages does newer API:s like Vulkan and DirectX 12 offer over old API:s like OpenGL and DirectX 11?(hint: primary reason is lower driver-overhead)
- What is the last graphics paper you read, and can you explain it to me?(this was a pretty common question)
- Describe to me the entire [graphics pipeline?](https://en.wikipedia.org/wiki/Graphics_pipeline)(your answer will probably be pretty long. You will explain about the vertex shader and the fragment shader, about perspective correct interpolation, about the z-buffer, about double buffering the framebuffer, about alpha blending, about transformation matrices, about homogeneous coordinates, about reflection models in the fragment shader and so on.)


# https://www.reddit.com/r/gamedev/comments/9n847g/18_months_of_game_programming_interviews/

## The Structure of an Interview

Nearly all interviews with game companies follow the same pattern: phone screen, take-home programming test, on-site interview. There generally seems to be two types of phone screens: one where the interviewer asks rapid-fire low-level programming questions, and the other being a more casual talk about past work experience. The take-home test questions tend to be on par with generic HackerRank questions, and will take between 2-4 hours. If it takes longer than 4 hours at any company besides Bungie (who asks two 4-hour questions), that is a strong indicator that you are not qualified for the position. On-sites vary greatly by company, but you can expect at most places to meet with 4 groups of 2 people, where 2 groups will ask you technical questions, make you code on a whiteboard, and explain specific examples of things you've done in the past. The other 2 groups will ask about how you get along with others, how you interact with management and artists, and other culture/work ethic questions. Nearly all interviews will be conducted assuming you have advanced knowledge of C++. In the case of WPF-based tools development or Unity games, you may be asked about C# instead; however, in the case where the job requires C#, most companies will still interview you in C++ if you prefer.

## What You Need To Know
- The big O runtime of ALL containers, including map, unordered map/hashmap, set, array, list, vector, and any others. You'll also need to know the runtime of common algorithms such as binary searching an array. Perhaps most importantly, you need to know when to use each container - just because one container is theoretically faster than another doesn't mean it's a better choice. Ask what the data is being used for and how it's being given to you, see if it can be sorted and if that helps, check if you can cache results somehow, consider the case of 1 lookup vs 1000. Also, I had never heard this term before, but know what a "balanced tree" is and what the pros/cons are compared to an unbalanced one. Be prepared to know how a hashmap works under the hood. Know how to implement depth-first and breadth-first searches (using a stack/queue instead of recursive function calling), and how to do a binary search.

-  What, specifically, dot product and cross product represent and all the different ways they can be used. Common questions involve things like ray/sphere intersection, reflecting vectors against walls, and determining when a moving object is nearest to another object. I was asked what the magnitude of both the dot and cross product means. Know when you need to normalize a vector and when you don't. Definitely know how to calculate a normal and how to calculate the distance between two vectors. Know what each value in a 4x4 matrix represents, and how you convert coordinates from world space to the screen.

- Debugging and optimization are both important. You'll be given strange scenarios and have to come up with all the possible things that could be wrong and how you might fix it. Think about things like how to reproduce the issue, whether it only happens on certain computers, how you can debug it if you can't reproduce it on your computer, what tools are available in a debugger (line break points, memory break points, stack traces, core dumps, etc). Have at least 5 answers for "why is the screen black?" When optimizing, make sure you ask for as much relevant information about your hypothetical data as possible. Consider the differences between optimizing for speed vs memory. You will most likely be asked about how to allocate memory in order to take advantage of the CPU cache size. Be familiar with static and runtime analysis tools like VTune. Experience with libraries like TBB is a plus.

- Miscellaneous stuff that comes to mind: struct packing, diamond inheritance problem, shared/weak/unique pointers, std::move, how the vtable and dynamic_cast work, when to a use a mutex vs atomic and what kind of mutexes exist, bit shifting, object pooling, placement new, reflection.

https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions

https://neetcode.io/practice


# https://www.reddit.com/r/gamedev/comments/xbcvvt/my_first_interviewing_experience_for_aaa_gameplay/


“what’s the output of this program”
“implement the concrete class of this interface with blah functionality”

leet [[Code Style]] 
- mostly easy side
- maybe one medium
-  solved one with two-pointers approach and 1-D dynamic programming
 - focus more on just getting solid & efficient implementations for easy/medium problems in C++

big-O correct

Take-home tasks:
- leave comments as to why you used certain decisions
- There might be follow-up interviews about this step where you are asked to go through the code and add new features or extend the existing ones.
- slightly modified version of game-of-life

## Tech screens

### C++ 
 (`const`, virtual destructors, `enable_shared_from_this`)
 favorite post-11 feature (and why)

read Scott Meyer’s books, starting from “Effective C++”

Know basics of the STL: vector, list, map and unordered map, and have a high-level understanding of how they are implemented under the [[Hello World]] 
(a good exercise is to implement a hash table if you haven’t done before)


### 2-) General knowledge
	Multithreading, its pros and cons (how I would implement a thread-safe singleton)
Memory corruption, multiplayer lag compensation in a shooter game (go watch that famous Overwatch GDC video again).

Optimization questions like “in a big map full of items, how would you find the items that the player can interact with” (the answer included quadtrees)

 vector math questions like how would you find the angle between two vectors, distance between two lines ethic 

### 3-) Whiteboard questions:
	 Usually these are in the form of leetcode-style questions, on the easy side. They don’t expect a compiling and running code
- outline the pseudocode that covers the solution.
- be vocal about your thought process,

One example is: “Given an array of numbers, replace each number with the product of all the numbers in the array except the number itself”.


## System design
- The crucial point here is to keep asking questions for clarification
 - you should _never_ go straight into code or class design


- If you’re lost and it makes sense in the context of the problem, start with asking the purpose of the feature, what problem it tries to solve. If nothing else, it will make you more familiar with the game/context
- Explain how you imagine the thing might look on screen, and confirm that it is the case for them as well. Be on the same page.
- Think from a QA perspective and try to break the feature: What happens if something is full/empty, too close/too far, takes too long, happens too frequently etc. The goal is to show them you’re not just doing whatever you’re told and you’re framing the problem into doable bounds.
- Think about the limits. How large the world is, how many stuff are you’re gonna have in it, and how this affects the solution.
- In the process, try to come up with the magic numbers and make them adjustable by game design. Give them as much control as possible in your solution. If it doesn’t contain any moving parts like that, you might be missing something: specifically ask for what they would want to poke at.
- Think about what extensions game design might come up with. If nothing comes to mind, ask them what parts they think are likely to change.
- If you think you’re not in the right direction (or you feel lost, which was my case a couple of times) just ask for hints. It’s true that they don’t expect you to be a mind-reader, but they’re evaluating your capability of extracting the design out of their minds. While falling into this situation will eventually reflect as negative on your score, you should ask for a clue _before_ they’re forced to give you one (which would be even worse for you).


## Soft skills questions
- What’s the project from your CV that you’re proud of the most?
- What’s one thing that you’re proud of having done in [that project from your CV]?
- Specifically about [that side project from your CV]: What have you learned?
- How do you find the motivation to make games in spare time?
- What do you do outside of work?
- Is there anything you’ve learned early in your career and carried it with yourself until today?
- Would you prefer working with Unity or Unreal? In game jams? In the day job?
- You’re experienced with Unity and C#, why do you leave your comfort zone?
- Ever had game design come to you with something that you think is impossible? How did you react?
- What do you think of UI development in general? (I reckon this is intentionally vague)
- What do you think your challenges will be, in the case you’re hired?
- Did you miss a sprint deadline? What happened? What have you learned?
- How would you feel when some other programmer messes with your part of the code?
- What’s the best part of being an engineer for you? Worst part?
- What would your mindset be when you’re just starting implementing a new feature? What would be the important things for you? (part 2) How would that mindset change when you’re working on a legacy codebase?
- Let’s say you have another member joining you in the feature. How would you onboard them?
- What do you think of TDD’s?



## Questions to asked 
If time permits, they leave a ~5 minute window at the end of each round for you to ask questions. It doesn’t seem like that at first, but this interval is pretty important: you’re able to get as much insight as possible regarding the team structure, ways of working, expectations from the role, future of the role etc. [This (gamedev focused)](https://lindenreidblog.com/2020/05/21/questions-to-ask-game-studios-youre-interviewing-with/) and [this (more general tech oriented)](https://github.com/viraptor/reverse-interview) list of questions are pretty comprehensive.

Some of the ones I ended up asking are:

- What does the team look like? Who would I be working with and report to?
- Company’s policy about seniority levels and their criteria.
- What is the onboarding process for the role? How do a new hire’s first couple of months look like?
- How do the features get decided?
- (to game designers) What sort of programmers do you enjoy working with?
- Remote/hybrid working policy, if applicable
- Company policy with gamedev-related side projects
- What is one thing that you wish somebody told you before you started?
- Any extracurricular activity: events, gaming nights, game jams etc.



1. Review C++ faq https://isocpp.org/faq  This helps avoid getting tripped up on C++ trivia.
2. Review my resume & experience and think about points I'd like to chat about, that are especially relevant to this job.
3.  Review the company's games - Think about what I like & dislike about them, so I can talk about them intelligently.
4.  Review some basic vector/matrix math: Dot product, cross product, how to project a point onto a line, how to use matrices for rotations, etc. It doesn't always come up but I like to be prepared just in case.
5. Leetcode problems as time permits. At least a couple easy problems the night before to make sure I'm "warmed up".

Some example questions off the top of my head:

- Implement tic-tac-toe (something not too tricky, but requires a fair amount of code)
- C-style strings: Implement strtok, reverse words in-place, etc.
- Implement a linked list/binary tree/hash table
- Low-level understanding: If you have a pointer to a type of "int", and increment the pointer by 4, how many bytes have you advanced?
- C++ trivia: What are the differences between a struct and a class? Should destructors be virtual? Etc.
- Find distance between point and line segment






https://old.reddit.com/r/gamedev/comments/vnjivd/getting_that_gamedev_job_from_frontend_software/

https://github.com/viraptor/reverse-interview

https://lindenreidblog.com/2020/05/21/questions-to-ask-game-studios-youre-interviewing-with/

https://old.reddit.com/r/cscareerquestionsEU/comments/smbkmt/how_do_you_stay_motivated_at_your_job_knowing/hvw7756/?context=3

https://old.reddit.com/r/cscareerquestions/comments/ujjhpi/not_all_can_make_top_5_salaries_by_definition_but/

https://www.kalzumeus.com/2012/01/23/salary-negotiation/

https://learnxinyminutes.com/docs/c++/

https://www.gamelogicrecruitment.com/post/game-developer-interview-questions

https://career.guru99.com/top-25-interview-questions-for-game-developer/

https://www.talentlyft.com/en/resources/game-developer-interview-question



 create a showreel ([levi.dev/showreel](https://levi.dev/showreel)).

**

Game-dev interview prep notes

# Linear algebra

- Miscellaneous:
    

- Left-handed coordinate system is maybe more normal?
    

- Maybe not... OpenGL is right-handed, with +z pointing out of the screen.
    

- +z points into screen with a left-handed coordinate system.
    
- “Projection” refers to any dimension-reducing operation.
    

- Cross product
    

- Only applicable in 3D.
    
- Yields a vector.
    
- Not commutative.
    
- a × b = (ay * bz - az * by,   az * bx - ax * bz,   ax * by - ay * bx)
    
- ||a × b|| = ||a|| ||b|| sinθ
    

- The magnitude of the cross product is also the area of the parallelogram with two sides being a and b.
    

- If a and b are parallel (or if a or b are the zero vector), then a × b = 0.
    
- a × b is perpendicular to a and b.
    

- Useful for calculating normals!
    

- Direction of a × b:
    

- Depends on ordering (non-commutative).
    
- Depends on left-handed vs right-handed coordinate system.
    
- Point fingers in direction of a, curl in direction of b, thumb points to a × b.
    

- Dot product
    

- Yields a scalar.
    
- a · b = ax * bx + ay * by + az * bz
    
- The dot product a · b measures the length of the projection of b onto a, multiplied by the length of a.
    
- The dot product can be used to measure displacement in a particular direction.
    
- The projection operation is closely related to the cosine function.
    

- a · b = ||a|| ||b|| cosθ
    

- Dot product can be used to determine if two vectors point in the same direction, opposite directions, or are perpendicular.
    
- We can use the dot product with a unit-vector to get the distance of another vector in that direction.
    

- This is useful with orthonormal basis vectors to determine the coordinate in object space.
    

- Matrices
    

- A 4x3 matrix has 4 rows and 3 columns (hamburger shaped).
    

- mij is the element i-down and j-over.
    

- Matrix multiplication is associative: ABC = A(BC) = (AB)C.
    
- Like left vs right handedness, the choice of row-vector vs column-vector is important and inconsistent across technologies:
    

- Row-vector “reads better” on single lines and in code.
    
- Column-vector is standard outside of computer programming.
    
- DirectX uses row-vector.
    
- OpenGL uses column-vector.
    
- Row-vector results in the vector being on the left-side: vABC.
    
- Column-vector results in the vector being on the right-side: CBAv.
    

- Linear transformation:
    

- Preserves straight and parallel lines, and doesn’t translate.
    
- Rotation, scale, reflection, shearing, orthographic, ...
    

- Affine transformation:
    

- Contains translations.
    

- An affine transformation is a linear transformation followed by a translation.
    

- Can’t be represented with only 3x3 matrices.
    
- This is why we use 4x4 matrices!
    

- The rows of a matrix are the basis vectors of a coordinate space.
    
- To visualize/conceptualize a 2D matrix transformation:
    

- Matrix:
    

-  2 1
    
- -1 2
    

- Basis vectors:
    

- p = [2 1]
    
- q = [-1 2]
    

- Think of the basis vectors forming an L.
    
- p represents +x shifting from (1, 0) to (2, 1).
    
- q represents +y shifting from (0, 1) to (-1, 2).
    
- Taken together, this looks like a rotation of 26.5-degrees, and an up-scale of slightly more than x2.
    

- To visualize a 3D matrix transformation:
    

- Think of the basis vectors as forming an orthogonal tripod.
    

- Rotation matrix:
    

- Rotation about the x-axis:
    

- 1     0        0
    
- 0  cosθ sinθ
    
- 0 -sinθ cosθ
    

- y and z are similar.
    
- Rotation around an arbitrary axis gets ugly.
    

- Scale matrix:
    

- Scaling along the cardinal axes:
    

- kx 0  0
    
- 0  ky  0
    
- 0  0  kz
    

- The “model transform” transforms the vertices of an object from object space into world space.
    
- The “view transform” transforms world-space coordinates into camera space.
    
- p_camera = p_object * M_model_transform * M_view_transform
    
- All linear and affine transformations are “invertible”, except projection (which irrevocably removes one dimension).
    
- The determinant of an invertible matrix is nonzero.
    
- A “singular matrix” is not invertible.
    
- An “orthogonal matrix”’s rows form an orthonormal basis.
    

- Axes are perpendicular to each other and have unit length.
    
- The determinant of an orthogonal matrix is +/- 1.
    

- A rigid body transformation changes the location and orientation of an object but not its shape.
    
- Determinant:
    

- |M| or `det M`
    
- Only a square matrix has a determinant.
    
- In 3D, the determinant is the volume of the parallelepiped that has the transformed basis vectors as three edges.
    
- If the determinant of a matrix is zero, then the matrix contains a projection.
    
- If the determinant of a matrix is negative, then reflection is contained in the matrix.
    
- The test for invertibility:
    

- The determinant of a singular matrix is zero and the determinant of a nonsingular matrix is nonzero.
    

-   
    

- Orthogonal matrix:
    

- The transpose and inverse are equal.
    
- This is powerful, because the inverse is more expensive to calculate.
    
- Rotation and reflection are orthogonal.
    

- 4D vectors and 4x4 matrices
    

- The “homogeneous” coordinate: w.
    
- [x  y  z  1] [ 1    0   0   0   =  [x+Δx   y+Δy   z+Δz   1]
    
-                   0    1   0   0
    
-                   0    0   1   0
    
-                   Δx Δy Δz 1]
    
- This is actually shearing in 4D space.
    
- We can take any 4x4 matrix and separate it into a 3x3 linear transformation portion, and a translation portion.
    
- If the w component of a 4D vector is 0, it “switches off” the translation portion of a 4x4 matrix.
    

- This is useful because some vectors represent “locations” and should be translated, but others represent “directions” (such as normals) and should not be.
    

- So, a vector with w=0 can be thought of as a direction or "vector" and a vector with w=1 as a "point".
    

- General affine transformations:
    

- Translate to origin, apply linear transformation (rotate/scale), translate to position.
    
- T R_4x4 T^-1
    

- Perspective transformation matrix:
    

- [1. 0. 0. 0
    
-  0. 1. 0. 0
    
-  0. 0. 1. 1/d
    
-  0. 0. 0. 0]
    
- Projection plane is at distance d in front of the center of projection.
    
- "Clip matrix" is the actual thing used.
    

- A 4x3 matrix can handle translation but not projection.
    

- Rotation:
    

- 3x3 matrix
    

- Always works
    
- Composites well
    
- Takes more space to store.
    
- More floating point error, due to small numbers between 0 and 1.
    
- Floating point drift can also produce "invalid" matrices that are no longer orthogonal.
    

- Or Euler angles
    

- Only three floats, so less storage space.
    
- Not as much of a problem with round off error.
    
- Even with floating point drift, the angles are still valid, just slightly inaccurate.
    
- Intuitive.
    
- Aliasing problems.
    
- Interpolation problems.
    
- Gimbal lock!
    

- (See above two bullets.)
    

- Or quaternions
    

- All quaternions used for orientation are "unit quaternions" with length of 1.
    

- Quaternions
    

- [ w  x  y  z ]
    
- They essentially use an axis of rotation and an amount of rotation about that axis.
    

- But that’s not directly represented by the 4 coordinates!
    

- Quaternion multiplication can be used to concatenate multiple rotations, just like matrix multiplication.
    
- p' = b(apa^-1)b^-1
    
- p' = (ba)p(ba)^-1
    
- Quaternion multiplication is "inside out" from right to left.
    
- Spherical linear interpolation : slerp
    
- Quaternions can be concatenated using the quaternion cross product.
    
- Can become “invalid” through roundoff error.
    

- This can be fixed by normalizing the quaternion.
    

- Unintuitive.
    
- Easy and fast to invert.
    

- Clip space
    

- Model space is transformed by model transform into world space.
    
- Then transformed by the view transform into camera space or view space.
    
- Then transformed by the clip matrix or projection matrix into clip space.
    
- The homogeneous coordinate, w, helps enable projection and zoom for clip space.
    
- All transform matrices are combined into a single mvp matrix for the vertex shader.
    

- “Frustrum” is the clipped pyramid that represents the volume of things that will be rendered on the screen.
    
- Indexed triangle mesh:
    

- A list of vertices, and a list of triangles.
    
- Each vertex contains a position in 3D.
    
- Each triangle contains 3 vertex indices.
    
- Left-handed convention dictates that vertices are listed in clockwise order when viewed from the front side (or outside).
    

- Normals:
    

- Normals are defined for vertices.
    
- Triangle faces typically interpolate the normals from adjacent vertices.
    
- If we need non-smoothed edges, like for a cube, then we need to duplicate the vertices, so that we can define separate normals for each face.
    

- Texture maps
    
- Lighting models
    
- Precalculated lighting
    
- Skeletal animation and skinning
    
- Bump mapping
    
- Graphics pipeline:
    

- Setting up the scene
    

- C++
    
- Define the models.
    
- Define the camera.
    
- Define the lights.
    

- Visibility determination
    

- C++
    
- Filter-out objects that won’t appear on screen.
    

- Setting object-level rendering states
    

- C++
    
- Textures
    
- Materials
    

- Geometry generation/delivery
    

- C++
    
- Provide triangle mesh to the rendering API.
    
- Also perform LOD selection.
    

- Vertex-level operations
    

- GLSL
    
- Transform from model space to camera space.
    
- Skeletal skinning.
    
- Vertex lightning.
    
- Coordinate texture generation.
    
- All handled by the vertex shader.
    

- Culling, clipping, and projection
    

- GPU
    
- Clipping: Remove parts of the triangle that are outside the frustrum.
    
- Projection: Project the clipped vertices onto 2D screen space.
    
- Culling: Remove triangles that face away from the camera.
    

- Rasterization
    

- GPU
    
- Map pixels to parts of triangles.
    
- Interpolate vertex texture, color, and lighting.
    

- Pixel shading
    

- GLSL
    
- Computes the color of the pixel.
    
- Fragment shader.
    

- Blending and output
    

- GPU
    
- At this point, we have color, opacity, and depth for each pixel.
    
- The depth value is then tested against the depth buffer for per-pixel visibility.
    
- Alpha blending.
    

  
  
  

# Data structures and algorithms

- A*
    

- “admissible heuristic”: Never greater than the actual cost
    
- A* is a form of “best first search”.
    
-   
    

- Djisktra’s algorithm
    

-   
    

- Balanced tree
    

-   
    

- RTree
    

-   
    

- Basic time and space complexities for common structures
    

- HashTable
    
- LinkedList
    
- Array
    
- PriorityQueue
    

- Decision trees vs FSMs vs Hierarchical FSMs vs Behavior trees
    
- Behavior trees:
    

- “Sequence” nodes
    

- AND
    
- Return success if all children succeed.
    

- “Selector” nodes
    

- OR
    
- Return success if any child succeeds.
    

- “Task” nodes
    

- Actually run logic.
    
- Return success, failure, or running.
    

- How often to traverse the tree?
    

- Every frame?
    
- Only when something happens that could change one of the conditions?
    

- Navmesh
    

- Annotate walkable surfaces in 3D level.
    

- Like a series of runner carpets.
    

- A* can then be used to find a path through the navmesh surface area.
    

-   
    

  
  
  
  

# C#

- Capitalized public member (field/property/method) names.
    

- Can use lower-case for private methods.
    

- async/await with Task<T>.
    
- Func<,> vs Action<> with () => expression.
    
- Dictionary<T,U> dict = Dictionary<T,U>.new {[“foo”] = “bar”};
    
- constructor calling parent constructor with :.
    
- Tuples and destructor.
    

- (int x, int y) = GetCoords();
    

- structs vs classes
    

- Values vs references
    

- Interfaces
    
- Abstract, virtual, override
    
- Properties
    

- public string Name { get; set; } = “Levi”;
    
- public string Name { get { return _name; } set { _name = value; } } = “Levi”;
    

- Finalizer
    

- class Foo { public Foo() {} ~Foo() {} }
    

- Nullable
    

- ? and !
    

- StringBuilder vs String
    
- “Overloading” vs overriding
    

  
  
  
  

# C++

- Nullptr
    

- int* ip = nullptr;
    

-   
    
- #include <cstdio>
    
- printf()
    

-   
    

-   
    
- Exceptions
    
- namespace
    

-   
    

- header files
    

-   
    

-   
    
- #include <iostream>
    
- std::out << “Hello!” << std::endl;
    
- using namespace std;
    
- out << “Hello!” << endl;
    
-   
    
- Strings:
    

- #include<string>
    
- using namespace std;
    
-   
    
- C++ strings are mutable.
    
-   
    

- References:
    

- string foo = “I am foo”;
    
- string bar = “I am bar”;
    
- string& fooRef = foo;
    
- fooRef += “. Hi!”; // Modifies foo.
    
- fooRef = bar; // Doesn’t reassign fooRef. This is the same as `foo = bar`. Now `foo == “I am bar”`.
    
- cout << &fooRef << endl; // This prints the address of foo. This is the same before and after `fooRef = bar`.
    
-   
    

- Classes:
    

- Member variables and functions are private by default.
    
- private, protected, public
    

- struct vs class:
    

- Public by default in struct, private by default in class
    
- By convention: structs are used for storing/grouping data, classes are used for abstraction and further inheritance
    

- Never put a "using namespace" statement in a header.
    
- “Friends” of a class?
    

-   
    

- C++ destructors should always be declared as virtual.
    
- Semicolon after class/struct definition.
    
- Functions defined in the class body are automatically inlined.
    
- Inline
    
- Functions that don’t modify the state of the object should be marked as const.
    

- virtual void print() const;
    

- Objects (such as strings) should be passed by reference if you are modifying them or const reference if you are not.
    

- void Dog::setName(const std::string& dogsName)
    
- {
    
-     name = dogsName;
    
- }
    

-   
    
- class OwnedDog : public Dog { ...
    
-   
    
- Initialization list:
    

- Point (double a, double b) :
    
-     x(a),
    
-     y(b)
    
- { /* Do nothing except initialize the values */ }
    

-   
    
- Point& Point::operator+=(const Point& rhs)
    
- {
    
-     x += rhs.x;
    
-     y += rhs.y;
    
-   
    
-     // `this` is a pointer to the object, on which a method is called.
    
-     return *this;
    
- }
    
-   
    
- template<class T>
    
- class Box { ...
    
-   
    
- template<class T>
    
- void barkThreeTimes(const T& input)
    
- { ...
    
-   
    
-   
    
- & and * go after the type token, and before the variable name token.
    
-   
    
- // Template parameters don't have to be classes:
    
- template<int Y>
    
- void printMessage() {
    
-   cout << "Learn C++ in " << Y << " minutes!" << endl;
    
- }
    
- // And you can explicitly specialize templates for more efficient code. Of
    
- // course, most real-world uses of specialization are not as trivial as this.
    
- // Note that you still need to declare the function (or class) as a template
    
- // even if you explicitly specified all parameters.
    
- template<>
    
- void printMessage<10>() {
    
-   cout << "Learn C++ faster in only 10 minutes!" << endl;
    
- }
    
- printMessage<20>();  // Prints "Learn C++ in 20 minutes!"
    
- printMessage<10>();  // Prints "Learn C++ faster in only 10 minutes!"
    
-   
    
- RAII stands for "Resource Acquisition Is Initialization":
    

- A constructor for an object acquires that object's resources and the destructor releases them.
    

- Strange shortened variable declaration, initialization, and assignment with calling a function as part of variable name declaration:
    

- std::ifstream fh(filename);
    
- // Now we can use the fh variable.
    

- Raw pointers vs smart pointers:
    

- Smart pointers use reference counting to automatically destroy the object when the last reference is destroyed.
    
- // Usage of a raw pointer:
    
- Dog* ptr = new Dog();
    
- ptr->bark();
    
- delete ptr;
    
- Circular references cause objects to never be destroyed!
    
- std::unique_ptr vs std::shared_ptr vs std::weak_ptr
    

- Iterators:
    

- set<int>::iterator it;
    
- for(it=ST.begin();it!=ST.end();it++) {
    
-     cout << *it << endl;
    
- }
    

- The word `virtual` goes before the return type, but the word `override` goes after the function name and parameters.
    
- A vtable is automatically created by the compiler to point each method name to its implementation on one of the classes in the inheritance chain.
    

- This is created anytime a class contains a method declared with virtual.
    

- Calling a constructor with `new` stores it on the heap, while omitting new stores it on the stack.
    
- Anything allocated on the stack has to have a constant size, determined at compile-time.
    
- Lambda expressions:
    

- sort(tester.begin(), tester.end(), [](const pair<int, int>& lhs, const pair<int, int>& rhs) {
    
-         return lhs.second < rhs.second;
    
-     });
    
- The [] at the start of the lambda is the “capture list” for referencing variables from the outer scope.
    

- `auto` can be used for type deduction.
    

- Apparently they like the word “deduction” rather than “inference”, and “auto” rather than “var”.
    

- Range for-loop:
    

- int array[3] = {30, 50, 10};
    
- for (int element: array) {
    
-     cout << element << endl;
    
- }
    

- bool* pt = new bool;
    
- *pt = false; // Sets the value pointed-to by 'pt' to false.
    
- pt = 0;  // Sets 'pt' to the null pointer.
    
- int y[4][3] = { // array of 4 arrays of 3 ints each (4x3 matrix)
    
-     { 1 },      // row 0 initialized to {1, 0, 0}
    
-     { 0, 1 },   // row 1 initialized to {0, 1, 0}
    
-     { [2]=1 },  // row 2 initialized to {0, 0, 1}
    
- };              // row 3 initialized to {0, 0, 0}
    
- int a = (int) b; // Compiler doesn’t check types for pointers.
    
- Foo* foo = static_cast<Foo>(bar); // Does a run-time check; Doesn’t allow base-to-derived type conversions.
    
- Foo* foo = dynamic_cast<Foo>(bar); // Only does a compile-time check: No runtime check is performed to see if the object being converted is in fact a full object of the destination type.
    

- More specifically, dynamic_cast compares the vtable between the two types.
    
- Sorta like duck typing.
    

- #pragma once // Should be included at the top of all header files, to ensure they’re only included once.
    
-   
    
- bool , char , char8_t , unsigned char , signed char , __int8
    
- char16_t , __int16 , short , unsigned short , wchar_t , __wchar_t
    
- char32_t , float , __int32 , int , unsigned int , long , unsigned long
    
- double , __int64 , long double , long long , unsigned long long
    

- delete vs delete[]
    

- The delete operator deallocates memory and calls the destructor for a single object created with new.
    
- The delete [] operator deallocates memory and calls destructors for an array of objects created with new [].
    

- lvalue vs rvalue
    

- lvalue is a named variable
    
- rvalue is a temporary object that is destroyed at the next semicolon
    

- rvalue reference: Allows us to detect rvalue arguments via function overloading
    

- string(string&& that)   // string&& is an rvalue reference to a string
    
- {
    
-     data = that.data;
    
-     that.data = nullptr;
    
- }
    

- Move semantics:
    

- class string
    
- {
    
-     char* data;
    
-   
    
- public:
    
-   
    
- ~string() // Destructor
    
-     {
    
-         delete[] data;
    
-     }
    
-   
    
- // Constructor
    
- string(const char* p)
    
-     {
    
-         size_t size = std::strlen(p) + 1;
    
-         data = new char[size];
    
-         std::memcpy(data, p, size);
    
-     }
    
-   
    
- // Copy constructor
    
- string(const string& that)
    
-     {
    
-         size_t size = std::strlen(that.data) + 1;
    
-         data = new char[size];
    
-         std::memcpy(data, that.data, size);
    
-     }
    
-   
    
- // Swap constructor
    
- string(string&& that)   // string&& is an rvalue reference to a string
    
-     {
    
-         data = that.data;
    
-         that.data = nullptr;
    
-     }
    
-   
    
- // Copy assignment operator
    
- string& operator=(string that)
    
-     {
    
-         std::swap(data, that.data);
    
-         return *this;
    
-     }
    
-   
    
- string a(x);                                    // Line 1
    
- string b(x + y);                                // Line 2
    
- string c(some_function_returning_a_string());   // Line 3
    
-   
    
- If you say a = b, the copy constructor will initialize that (because the expression b is an lvalue), and the assignment operator swaps the contents with a freshly created, deep copy. That is the very definition of the copy and swap idiom -- make a copy, swap the contents with the copy, and then get rid of the copy by leaving the scope. Nothing new here.
    
-   
    
- But if you say a = x + y, the move constructor will initialize that (because the expression x + y is an rvalue).
    

- std::move()
    

- Changes an expression from being an lvalue (such as a named variable) to being an xvalue.
    
- This lets the client make sure that the swap-constructor is used instead of the copy-constructor, which will result in less temporary state.
    

- Rule of three
    

- If a class defines any of the following, then it should define all three:
    

- destructor
    
- copy constructor
    
- copy assignment operator
    

- Rule of five:
    

- copy assignment operator
    
- move assignment operator
    

- Copy-and-swap idiom...
    
- Run-Time Type Information (RTTI)
    
- `placement new` operator
    

- // buffer on stack
    
- unsigned char buf[sizeof(int)*2] ;
    
-   
    
- // placement new in buf
    
- int *pInt = new (buf) int(3);
    
- int *qInt = new (buf + sizeof (int)) int(5);
    
-   
    
- delete doesn’t work anymore. You have to handle deallocation manually in your destructor or elsewhere.
    
-   
    

- Object pool pattern
    

- Uses a set of pre-initialized objects ready to use.
    
- Rather than allocating and destroying objects on demand.
    
- Recycling
    

- Threading:
    

- Mutex:
    

- #include <iostream>
    
- #include <thread>
    
- #include <mutex>
    
-   
    
- std::mutex m;//you can use std::lock_guard if you want to be exception safe
    
- int i = 0;
    
-   
    
- void makeACallFromPhoneBooth() 
    
- {
    
-     m.lock();//man gets a hold of the phone booth door and locks it. The other men wait outside
    
-       //man happily talks to his wife from now....
    
-       std::cout << i << " Hello Wife" << std::endl;
    
-       i++;//no other thread can access variable i until m.unlock() is called
    
-       //...until now, with no interruption from other men
    
-     m.unlock();//man lets go of the door handle and unlocks the door
    
- }
    
-   
    
- int main() 
    
- {
    
-     //This is the main crowd of people uninterested in making a phone call
    
-   
    
-     //man1 leaves the crowd to go to the phone booth
    
-     std::thread man1(makeACallFromPhoneBooth);
    
-     //Although man2 appears to start second, there's a good chance he might
    
-     //reach the phone booth before man1
    
-     std::thread man2(makeACallFromPhoneBooth);
    
-     //And hey, man3 also joined the race to the booth
    
-     std::thread man3(makeACallFromPhoneBooth);
    
-   
    
-     man1.join();//man1 finished his phone call and joins the crowd
    
-     man2.join();//man2 finished his phone call and joins the crowd
    
-     man3.join();//man3 finished his phone call and joins the crowd
    
-     return 0;
    
- }
    
-   
    

- lock_guard:
    

- std::lock_guard<std::mutex> guard(myMutex);
    
- Exception safe
    
- The guard locks the mutex in its constructor, and unlocks in its destructor.
    
- So when its scope exits, it is destroyed and the mutex is freed, even if your code in the scope threw an exception.
    

- Atomic:
    

- std::atomic<long> value(0);
    
- value++; //This is an atomic op
    
- value += 5; //And so is this
    

- Mutex vs atomic:
    

- Locks actually suspend thread execution, freeing up cpu resources for other tasks, but incurring obvious context-switching overhead when stopping/restarting the thread.
    
- On the contrary, threads attempting atomic operations don't wait and keep trying until success (so-called busy-waiting), so they don't incur in context-switching overhead, but neither free up cpu resources.
    
- Summing up, in general atomic operations are faster if contention between threads is sufficiently low.
    
- You should definitely do benchmarking as there's no other reliable method of knowing what's the lowest overhead between context-switching and busy-waiting.
    

- Header guard:
    

- #ifndef FOO_BAR_BAZ_H_
    
- #define FOO_BAR_BAZ_H_
    
-   
    
- ...
    
-   
    
- #endif  // FOO_BAR_BAZ_H_
    

- Lazy-initialize static state:
    

- Put static variable declaration inside a function.
    
- Fred& x()
    
- {
    
-   static Fred* ans = new Fred();
    
-   return *ans;
    
- }
    

-   
    
- const goes before parameter / variable name, but after function signature.
    
- Default-initialization vs value/zero-initialization:
    

- Foo foo; // Default-initialized
    
- Foo foo(); // Value/zero-initialized
    

- Array initialization:
    

- Must use `new` for dynamic allocation (if size isn’t known statically).
    
- Otherwise, can omit `new`.
    
- Can use {} or () afterward to zero-initialize.
    
- int[10] {}
    

- There is no out-parameter keyword. Instead, either a reference or a pointer param could be used. But a pointer would be better style!
    
- Pointer vs reference:
    

- A pointer can be NULL or nullptr, but a reference cannot.
    
- https://stackoverflow.com/a/57492/489568
    

- `catch(...)` is like `finally` in other languages.
    
- Specialization:
    

- // A generic sort function
    
- template <class T>
    
- void sort(T arr[], int size)
    
- {
    
-     // code to implement Quick Sort
    
- }
    

- // Template Specialization: A function
    
- // specialized for char data type
    
- template <>
    
- void sort<char>(char arr[], int size)
    
- {
    
-     // code to implement counting sort
    
- }
    

- Friend:
    

- If declared on a method definition, it makes the function actually be a non-member function, and makes it a friend of this class at the same time.
    

- noexcept:
    

- Can be included at the end of a function signature.
    
- There is no corresponding annotation to indicate which types a function might throw.
    

- Cache lines:
    

- ~64 contiguous bytes are transferred simultaneously whenever moving state into a CPU cache (L1/L2/L3).
    
- Access to a byte on the L1 cache is ~27x faster than access to a byte in RAM.
    
- When writing code, prefer arrays and vectors for contiguous memory, and prefer storing by value instead of by reference in order to optimize the correct data being moved and present when needed on the CPU.
    

- Array syntax:
    

- void myFunction(int* param, int size) ...
    
- void myFunction(int param[], int size) ...
    
- void myFunction(int param[10]) ...
    
- int myArray[10] = {}; // all elements 0
    
- int myArray[10] = { 1, 2 }; // initialize to 1,2,0,0,0...
    
-   
    

- Pointers are actually ints!
    

- string food = "Pizza";  // Variable declaration
    
- string* ptr = &food;     // Pointer declaration
    
- // Reference: Output the memory address of food with the pointer (0x6dfed4)
    
- cout << ptr << "\n";
    
- // Dereference: Output the value of food with the pointer (Pizza)
    
- cout << *ptr << "\n";
    

- Misc:
    

- int myArray[10] = {};
    
- std::vector<int> v = {7, 5, 16, 8};
    

- push_back, pop_back, erase
    

- std::unordered_map<int, int> order;
    

- size, empty, 
    
- myMap[k] = v
    
- myMap.find(k) == myMap.end()
    

- for (auto i = order.begin(); i != order.end(); i++) {...}
    
- for (auto item : list) {...}
    
- std::cout << "count: " << count << std::endl;
    

- #include <iostream>
    

- std::sort (myvector.begin(), myvector.end(), myfunction);
    

- #include <algorithm>
    

- using namespace std;
    
- class OwnedDog : public Dog { ...
    
- Point (double a, double b) : x(a), y(b) {}
    



**



- Some questions I asked most companies:
    - I found it useful to have a collection of questions on-hand to ask companies.
    - What's work/life balance and crunch like? Do folks ever work evenings or weekends?
    - What's the culture and team dynamic like?
    - Tell me about the game.
    - Tell me about my role.
    - What are the biggest challenges/unknowns finished and remaining?
    - How the company get formed? How'd you get there? Is it what you wanted it to be?
    - If there's one thing you could change about the company or product?
    - What's the timeline for your current game?
    - How much of the team is remote?
    - What are your remote tools / procedures?
    - Is my particular experience going to be OK?



