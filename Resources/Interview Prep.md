---
publish:
---

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
## Optimization Questions
 How can we use a Bounding Volume Hierarchy(or an octree, or something similar) to speed up a raytracer?
- Explain about Cache Memory(L1 and L2 caches, and so on)
- What is [Data Oriented Design?](https://en.wikipedia.org/wiki/Data-oriented_design)
- Explain how view frustum culling can be optimized using multithreading and SIMD(see e.g. the blog post by [Andreas Asplund](http://bitsquid.blogspot.se/2016/10/the-implementation-of-frustum-culling.html))
- Do you have experience with using performance profiling tools for the GPU?
Game companies seem to expect you to have experience with profiling and optimizing your code using tools such as NVIDIA Nsight, so do get familiar with them. Also, [this](http://pages.tacc.utexas.edu/~eijkhout/Articles/EijkhoutIntroToHPC.pdf) is a good book for brushing up on computer architecture topics such as cache memory.
## Math Questions 
- What is a dot product?
- What is a cross product?
- What do they represent?
- Why should you use quaternions over euler angles?
- How do you use matrices to apply transformations to an object? For instance, how do you scale, translate and rotate an object with matrices?
- How do you calculate the intersection between a ray and a plane/sphere/triangle?
- Explain concepts like world space, object space and camera space.
- ray/sphere intersection
- reflecting vectors against walls
-  what the magnitude of both the dot and cross product mean
- now when you need to normalize a vector and when you don't
-  how to calculate a normal
- how to calculate the distance between two vectors
- what each value in a 4x4 matrix 
- how would you find the angle between two vectors, distance between two lines ethic 
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
- how you convert coordinates from world space to the screen.

## General Programming knowledge 

 - The big O runtime of ALL containers, including map, unordered map/hashmap, set, array, list, vector, and any others. 
 - runtime of common algorithms such as binary searching an array
 - when to use each container
 >[!tip] Ask what the data is being used for and how it's being given to you, see if it can be sorted and if that helps, check if you can cache results somehow, consider the case of 1 lookup vs 1000
- what a "balanced tree" is and what the pros/cons are compared to an unbalanced one
- how a hashmap works under the hood
-  how to implement depth-first and breadth-first searches (using a stack/queue instead of recursive function calling), and how to do a binary search.
- struct packing
- diamond inheritance problem
- hared/weak/unique pointers, 
- std::move, 
- how the vtable and dynamic_cast work,
- when to a use a mutex vs atomic
- what kind of mutexes exist, bit shifting,
- object pooling,
- placement new, 
- reflection.
- Multithreading, its pros and cons (how I would implement a thread-safe singleton)
- Memory corruption, multiplayer lag compensation in a shooter game (go watch that famous Overwatch GDC video again).
- Optimization questions like “in a big map full of items, how would you find the items that the player can interact with” (the answer included quadtrees)
- 


## Debugging and optimization 
You'll be given strange scenarios and have to come up with all the possible things that could be wrong and how you might fix it. 

Think about things like how to reproduce the issue, whether it only happens on certain computers, how you can debug it if you can't reproduce it on your computer, what tools are available in a debugger (line break points, memory break points, stack traces, core dumps, etc). 

Have at least 5 answers for "why is the screen black?" 

When optimizing, make sure you ask for as much relevant information about your hypothetical data as possible. 

Consider the differences between optimizing for speed vs memory. You will most likely be asked about how to allocate memory in order to take advantage of the CPU cache size. Be familiar with static and runtime analysis tools like VTune. Experience with libraries like TBB is a plus.


## The Structure of an Interview
Nearly all interviews with game companies follow the same pattern: 
1. phone screen
2. take-home programming test
3. on-site interview.

#### Phone Interviews
 Generally two types:
  1. interviewer asks rapid-fire low-level programming questions
  2. more casual talk about past work experience. 
#### Take Home Test
The take-home test questions tend to be on par with generic HackerRank questions, and will take between 2-4 hours.

 >[!tip]  If it takes longer than 4 hours at any company besides Bungie (who asks two 4-hour questions), that is a strong indicator that you are not qualified for the position.

On-sites vary greatly by company, but you can expect at most places to meet with 4 groups of 2 people, where 2 groups will ask you technical questions, make you code on a whiteboard, and explain specific examples of things you've done in the past. 
The other 2 groups will ask about how you get along with others, how you interact with management and artists, and other culture/work ethic questions. 
Nearly all interviews will be conducted assuming you have advanced knowledge of C++. In the case of WPF-based tools development or Unity games, you may be asked about C# instead; however, in the case where the job requires C#, most companies will still interview you in C++ if you prefer.

- leave comments as to why you used certain decisions
- There might be follow-up interviews about this step where you are asked to go through the code and add new features or extend the existing ones.
- slightly modified version of game-of-life

##### Example Questions
“what’s the output of this program”
“implement the concrete class of this interface with blah functionality”

- Implement tic-tac-toe (something not too tricky, but requires a fair amount of code)
- C-style strings: Implement strtok, reverse words in-place, etc.
- Implement a linked list/binary tree/hash table
- Low-level understanding: If you have a pointer to a type of "int", and increment the pointer by 4, how many bytes have you advanced?
- C++ trivia: What are the differences between a struct and a class? Should destructors be virtual? Etc.
- Find distance between point and line segment

leet [[Code Style]] 
- mostly easy side
- maybe one medium
-  solved one with two-pointers approach and 1-D dynamic programming
 - focus more on just getting solid & efficient implementations for easy/medium problems in C++

read Scott Meyer’s books, starting from “Effective C++”

Know basics of the STL: vector, list, map and unordered map, and have a high-level understanding of how they are implemented under the hood
(a good exercise is to implement a hash table if you haven’t done before)


####  Whiteboard questions:
	 Usually these are in the form of leetcode-style questions, on the easy side. They don’t expect a compiling and running code
- outline the pseudocode that covers the solution.
- be vocal about your thought process,

One example is: “Given an array of numbers, replace each number with the product of all the numbers in the array except the number itself”.
##### System design
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


## Questions to ask 
If time permits, they leave a ~5 minute window at the end of each round for you to ask questions. It doesn’t seem like that at first, but this interval is pretty important: you’re able to get as much insight as possible regarding the team structure, ways of working, expectations from the role, future of the role etc. [This (gamedev focused)](https://lindenreidblog.com/2020/05/21/questions-to-ask-game-studios-youre-interviewing-with/) and [this (more general tech oriented)](https://github.com/viraptor/reverse-interview) list of questions are pretty comprehensive.

- What does the team look like? Who would I be working with and report to?
- Company’s policy about seniority levels and their criteria.
- What is the onboarding process for the role? How do a new hire’s first couple of months look like?
- How do the features get decided?
- (to game designers) What sort of programmers do you enjoy working with?
- Remote/hybrid working policy, if applicable
- Company policy with gamedev-related side projects
- What is one thing that you wish somebody told you before you started?
- Any extracurricular activity: events, gaming nights, game jams etc.
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

## Review
1. Review C++ faq https://isocpp.org/faq  This helps avoid getting tripped up on C++ trivia.
2. Review my resume & experience and think about points I'd like to chat about, that are especially relevant to this job.
3.  Review the company's games - Think about what I like & dislike about them, so I can talk about them intelligently.
4.  Review some basic vector/matrix math: Dot product, cross product, how to project a point onto a line, how to use matrices for rotations, etc. It doesn't always come up but I like to be prepared just in case.
5. Leetcode problems as time permits. At least a couple easy problems the night before to make sure I'm "warmed up".


# Compensation

- In general, a "gameplay engineering" position usually pays less well than a "software engineering" position.
- The offer that I accepted from Bungie was very competitive for the games industry.
- My compensation will actually be somewhat close to what I was making at Google.
- In particular, the base salary, annual bonus, 401k matching, and miscellaneous benefits are all very similar.
- The main difference is in equity (stocks).

- About half of my compensation at Google was equity.
- Bungie is also offering me a decent chunk of something resembling equity.
- But a lot of this will depend on how Bungie handles periodic equity refreshes.
- Unfortunately the details for this are a bit in-the-air since their acquisition by Sony is still in-progress.

- In addition, I'm getting a hefty signing bonus!

- I think it helped that Bungie was a little slower than the other companies I was talking to.
- I already had a couple offers by the time I did my all-day virtual "onsite" with Bungie.
- I gave them a deadline to respond within the week.
- So I think they felt like they needed to give a strong offer up-front, since they wouldn't have time for any back-and-forth.





- High-level overview of the scope of gameplay-engineering interviews
[https://www.reddit.com/r/gamedev/comments/9n847g/18_months_of_game_programming_interviews/](https://www.reddit.com/r/gamedev/comments/9n847g/18_months_of_game_programming_interviews/)

- Game-math refresher:

- [https://gamemath.com/book/](https://gamemath.com/book/)

- C++ refresher:

- [https://learnxinyminutes.com/docs/c++/](https://learnxinyminutes.com/docs/c++/)

- [Glassdoor's numbers](https://www.glassdoor.com/Salary/Bungie-Senior-Gameplay-Programmer-Washington-State-Salaries-EJI_IE284423.0,6_KO7,33_IL.34,50_IS3020.htm) seem somewhat accurate for base salary.

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

