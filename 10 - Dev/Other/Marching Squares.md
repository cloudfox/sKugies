---
publish: true
---

I quickly threw this together as an exercise.

![[MarchingSquareTest.png]]

(The random colors are so I could more easily differentiate between the squares for testing)

Our grid is nothing fancy just a collection of bools. 
Then a Union to composite those bools into our individual marching squares state.

```cpp
Union SquareState{
	unsigned int state : 4;
	bitset<4> neighbors;
}

int grid[5][5];
MarchingSquare squares[4][4];
```

```cpp
void UpdateSquares()
{
	//The indexing into the grid is a tad weird due to the squares being offset by .5 in  each axis
	for (int x = 0; x < 4; x++) 
	    for (int y = 0; y < 4; y++)    {
	      squares[x][y].states[0] = grid[x][y];
	      squares[x][y].states[1] = grid[x+1][y];
	      squares[x][y].states[2] = grid[x+1][y+1];
	      squares[x][y].states[3] = grid[x][y+1];
    }	
}
```

I kept the square array 1 smaller than the grid as those are the only spaces than can have the full range of states. 



## Chunks
If I was going to use this for a larger map I would divide the grid/squares into chunks.
It does get a good bit trickier though. Especially if you want to load/unload them as you move around.

```cpp
struct MarchingChunk{
		int grid[x][y];
		MarchingSquare squares[x2][y2];
	}
```

If you let the grid points overlap Updating all the squares is still mostly the same. But then on the edges you have to worry about updating both chunks and you are wasting a little memory.

The other option I can think of is increasing the square row/column count by 1 in the chunk and offsetting the grids. Those edge squares would then need to look at the neighboring chunks.

The best option though is probably to use quadtrees. That way you could reduce how many objects you need to iterate through. Also if you have just a large solid block of squares you could render one big rectangle instead of a lot of tiny ones.


### Geometry Shader

I was testing out using a geometry shader to create the squares. 
>[!Note] The division by 2 is to fit everything onto the screen since it was faster than adding the projection transformation.

I'm not actually sure if this is the most efficient way. It might be better to just have the individual squares loaded as a mesh. Something to test in the future but beyond what I'm worried about here.

```geometry_shader
#version 330 core
layout (points) in;
layout (triangle_strip, max_vertices = 6) out;

in VS_OUT {
    int type;
} gs_in[];  

uniform mat4 projection;

out vec3 fColor;

void build_msquare(vec4 position, int type)
{    
   
   switch(type){
    case 0: //empty
   
    break;
    case 1: //bottom left corner
    fColor = vec3(1,0,0);
   
    gl_Position = position;
    EmitVertex();   
    gl_Position = position + vec4(0.5, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(0, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    EndPrimitive();
    break;

    case 2:  //BR corner
    fColor = vec3(0.8,0,0);
    gl_Position = position + vec4(0.5, 0, 0.0, 0.0)/2.0f;
    EmitVertex();   
    gl_Position = position + vec4(1, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(1, 0.5, 0, 0.0)/2.0f; 
    EmitVertex();   
    EndPrimitive();
    break;

    case 3: //BH
    fColor = vec3(1,1,0);
    
    gl_Position = position;
    EmitVertex();   
    gl_Position = position + vec4(0, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();
    gl_Position = position + vec4(1, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(1, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();
    EndPrimitive();
    break;

    case 4: //TR corner
    fColor = vec3(0.6,0,0);

    gl_Position = position + vec4(1, 0.5, 0.0, 0.0)/2.0f;
    EmitVertex();   
    gl_Position = position + vec4(1, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(0.5, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    EndPrimitive();
    break;

    case 5: //diag BL-TR

    fColor = vec3(0,1,1);
    gl_Position = position;
    EmitVertex();   
    gl_Position = position + vec4(0.5, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(0, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    EndPrimitive();

    fColor = vec3(0,1,1);
    gl_Position = position + vec4(1, 0.5, 0.0, 0.0)/2.0f;
    EmitVertex();   
    gl_Position = position + vec4(1, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(0.5, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    EndPrimitive();
    break;


    case 6: //RH
    fColor = vec3(0.8,0.8,0);
    gl_Position = position + vec4(0.5f, 0, 0.0, 0.0)/2.0f;
    EmitVertex();   
    gl_Position = position + vec4(0.5f, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();
    gl_Position = position + vec4(1, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(1, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();
    EndPrimitive();
    break;

    case 7: //TL Empty corner
    fColor = vec3(0.8,0.8,0.8);
    gl_Position = position;
    EmitVertex();  
    gl_Position = position + vec4(1, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(0, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(1, 0.5f, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(0.5f, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(1, 1, 0, 0.0)/2.0f; 
    EmitVertex();  
    EndPrimitive();

    break;

    case 8: //TL 
    fColor = vec3(0.4,0,0);
    gl_Position = position + vec4(0, 0.5f, 0.0, 0.0)/2.0f;
    EmitVertex();   
    gl_Position = position + vec4(0.5f, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(0, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    EndPrimitive();
    break;

    case 9: //LH
    fColor = vec3(0.5,0.5,0);
    
    gl_Position = position;
    EmitVertex();   
    gl_Position = position + vec4(0, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();
    gl_Position = position + vec4(0.5, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(0.5, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();

    EndPrimitive();
    break;

    case 10: //Diag TL-BR  
    fColor = vec3(0.4,0.4,0.4);
    gl_Position = position + vec4(0, 0.5f, 0.0, 0.0)/2.0f;
    EmitVertex();   
    gl_Position = position + vec4(0.5f, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(0, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    EndPrimitive();

    fColor = vec3(0.4,0.4,0.4);
    gl_Position = position + vec4(0.5, 0, 0.0, 0.0)/2.0f;
    EmitVertex();   
    gl_Position = position + vec4(1, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(1, 0.5, 0, 0.0)/2.0f; 
    EmitVertex();   
    EndPrimitive();

    break;

    case 11: // TR empty
    fColor = vec3(0.25,0.3,0.25);
    gl_Position = position + vec4(0, 1, 0.0, 0.0)/2.0f;
    EmitVertex();  
    gl_Position = position+ vec4(0, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(0.5, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(0.5, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(1, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(1, 0, 0, 0.0)/2.0f; 
    EmitVertex();  
    EndPrimitive();
    break;


    case 12: //TH
    fColor = vec3(0.55,0.75,0);
    
    gl_Position = position + vec4(0, 0.5, 0.0, 0.0)/2.0f;
    EmitVertex();   
    gl_Position = position + vec4(0, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();
    gl_Position = position + vec4(1, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(1, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();
    EndPrimitive();

    EndPrimitive();
    break;

    
    case 13: //BR empty
    fColor = vec3(0.25,0.3,0.35);
    gl_Position = position + vec4(1, 1, 0.0, 0.0)/2.0f;
    EmitVertex();  
    gl_Position = position+ vec4(0, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(1, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(0, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(0.5, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(0, 0, 0, 0.0)/2.0f; 
    EmitVertex();  
    EndPrimitive();
    break;


    case 14: //BL empty
    fColor = vec3(0.25,0.2,0.25);
    gl_Position = position + vec4(0, 1, 0.0, 0.0)/2.0f;
    EmitVertex();  
    gl_Position = position+ vec4(1, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    gl_Position = position + vec4(0, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();  

    gl_Position = position + vec4(1, 0.5, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    
    gl_Position = position + vec4(0.5, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();  
    
    gl_Position = position + vec4(1, 0, 0, 0.0)/2.0f; 
    EmitVertex();  
    EndPrimitive();
    break;

    case 15: //solid
    fColor = vec3(1,1,1);
    gl_Position = position;
    EmitVertex();   
    gl_Position = position + vec4(0, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();
    gl_Position = position + vec4(1, 0, 0.0, 0.0)/2.0f; 
    EmitVertex();   
    gl_Position = position + vec4(1, 1, 0.0, 0.0)/2.0f; 
    EmitVertex();

    EndPrimitive();
    break;

    default:
    fColor = vec3(1,1,1);
    EndPrimitive();
    break;
   }

}

void main() {    
    build_msquare(gl_in[0].gl_Position, gs_in[0].type);
}
```

##
---

I'll probably post the full code once I polish it up a bit. 



Some possible uses:
The most obvious are terrain and liquid simulations.
Beyond that my next though is for a fog of war.

