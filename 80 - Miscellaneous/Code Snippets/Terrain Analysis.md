

```c++

float distance_to_closest_wall(int row, int col)
{
  /*
    Check the euclidean distance from the given cell to every other wall cell,
    with cells outside the map bounds treated as walls, and return the smallest
    distance.  Make use of the is_valid_grid_position and is_wall member
    functions in the global terrain to determine if a cell is within map bounds
    and a wall, respectively.
  */
  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();

  int radius = 0;

  float closest = FLT_MAX;
  bool search = true;

  while (search)
  {
    radius += 1;

    int yTop = row + radius;
    int yBottom = row - radius;
    //top/bottom row
    for (int x = col - radius; x <= col + radius; x++)
    {
      if (terrain->is_valid_grid_position(yTop, x))
      {
        if (terrain->is_wall(yTop, x))
        {
          const int xDiff = std::abs((x - col));
          const int yDiff = std::abs(yTop - row);

          float dist = (float)sqrt(pow(xDiff, 2) + pow(yDiff, 2));
          if (dist < closest)
          {
            closest = dist;
            search = false;
          }
        }
      }
      else
      {
        const int xDiff = std::abs((x - col));
        const int yDiff = std::abs(yTop - row);

        float dist = (float)sqrt(pow(xDiff, 2) + pow(yDiff, 2));
        if (dist < closest)
        {
          closest = dist;
          search = false;
        }
      }

      if (terrain->is_valid_grid_position(yBottom, x))
      {
        if (terrain->is_wall(yBottom, x))
        {
          const int xDiff = std::abs((x - col));
          const int yDiff = std::abs(yBottom - row);

          float dist = (float)sqrt(xDiff * xDiff + yDiff * yDiff);
          if (dist < closest)
          {
            closest = dist;
            search = false;
          }
        }
      }
      else 
      {
        const int xDiff = std::abs((x - col));
        const int yDiff = std::abs(yBottom - row);

        float dist = (float)sqrt(pow(xDiff, 2) + pow(yDiff, 2));
        if (dist < closest)
        {
          closest = dist;
          search = false;
        }
      }
    }

    int xRight = col + radius;
    int xLeft = col - radius;
    //left right side
    for (int y = 1 + row - radius; y <= row + radius; y++)
    {
      if (terrain->is_valid_grid_position(y, xRight))
      {
        if (terrain->is_wall(y, xRight))
        {
          const int xDiff = std::abs((xRight - col));
          const int yDiff = std::abs(y - row);

          float dist = (float)sqrt(pow(xDiff, 2) + pow(yDiff, 2));
          if (dist < closest)
          {
            closest = dist;
            search = false;
          }
        }
      }
      else
      {
        const int xDiff = std::abs((xRight - col));
        const int yDiff = std::abs(y - row);

        float dist = (float)sqrt(pow(xDiff, 2) + pow(yDiff, 2));
        if (dist < closest)
        {
          closest = dist;
          search = false;
        }
      }

      if (terrain->is_valid_grid_position(y, xLeft))
      {
        if (terrain->is_wall(y, xLeft))
        {
          const int xDiff = std::abs((xLeft - col));
          const int yDiff = std::abs(y - row);

          float dist = (float)sqrt(pow(xDiff, 2) + pow(yDiff, 2));
          if (dist < closest)
          {
            closest = dist;
            search = false;
          }
        }
      }
      else
      {
        const int xDiff = std::abs((xLeft - col));
        const int yDiff = std::abs(y - row);

        float dist = (float)sqrt(pow(xDiff, 2) + pow(yDiff, 2));
        if (dist < closest)
        {
          closest = dist;
          search = false;
        }
      }
    }
  }

  return closest;
}

bool is_clear_path(int row0, int col0, int row1, int col1)
{
  /*
    Two cells (row0, col0) and (row1, col1) are visible to each other if a line
    between their center points doesn't intersect the four boundary lines of every
    wall cell.  You should puff out the four boundary lines by a very tiny amount
    so that a diagonal line passing by the corner will intersect it.  Make use of the
    line_intersect helper function for the intersection test and the is_wall member
    function in the global terrain to determine if a cell is a wall or not.
  */

  if (terrain->is_wall(row1, col1))
    return false;

  Vec2 line0p0((float)col0, (float)row0);
  Vec2 line0p1((float)col1, (float)row1);

  const int rise0 = ((row0 - row1));
  const int run0 = ((col0 - col1));
  const float edge = 0.5001f;

  {
    int xStart, xEnd;
    if (col0 < col1)
    {
      xStart = col0;
      xEnd = col1;
    }
    else
    {
      xStart = col1;
      xEnd = col0;
    }


    int yStart, yEnd;
    if (row0 < row1)
    {
      yStart = row0;
      yEnd = row1;
    }
    else
    {
      yStart = row1;
      yEnd = row0;
    }

    for(int x = xStart; x <= xEnd; x++)
      for (int y = yStart; y <= yEnd; y++)
      {
        if(terrain->is_wall(y,x))
        {
          bool intersect = false;

          //north edge
          {
            Vec2 line1p0((float)x + edge, (float)y + edge);
            Vec2 line1p1((float)x - edge, (float)y + edge);
            if (line_intersect(line0p0, line0p1, line1p0, line1p1))
            {
              const int rise1 = 0;
              const int run1 = 1;

              if(rise0 * run1 != rise1 * run0)
                intersect = true;
            }
          }
          //east edge
          {
            Vec2 line1p0((float)x + edge, (float)y + edge);
            Vec2 line1p1((float)x + edge, (float)y - edge);
            if (line_intersect(line0p0, line0p1, line1p0, line1p1))
            {
              const int rise1 = 1;
              const int run1 = 0;

              if (rise0 * run1 != rise1 * run0)
                intersect = true;
            }
          }
          //west edge
          {
            Vec2 line1p0((float)x - edge, (float)y + edge);
            Vec2 line1p1((float)x - edge, (float)y - edge);
            if (line_intersect(line0p0, line0p1, line1p0, line1p1))
            {
              const int rise1 = 1;
              const int run1 = 0;

              if (rise0 * run1 != rise1 * run0)
                intersect = true;
            }
          }
          //south edge
          {
            Vec2 line1p0((float)x + edge, (float)y - edge);
            Vec2 line1p1((float)x - edge, (float)y - edge);
            if (line_intersect(line0p0, line0p1, line1p0, line1p1))
            {
              const int rise1 = 0;
              const int run1 = 1;

              if (rise0 * run1 != rise1 * run0)
                intersect = true;
            }
          }
          if (intersect)
            return false;
        }
      }
  }

  return true;
}

void analyze_openness(MapLayer<float> &layer)
{
    /*
        Mark every cell in the given layer with the value 1 / (d * d),
        where d is the distance to the closest wall or edge.  Make use of the
        distance_to_closest_wall helper function.  Walls should not be marked.
    */

  const int height = terrain->get_map_height();
  const int width = terrain->get_map_width();

  for(int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      if (terrain->is_wall(y, x))
        continue;

      const float d = distance_to_closest_wall(y, x);
      layer.set_value(y, x, 1.0f / (d * d));
    }
}

void analyze_visibility(MapLayer<float>& layer)
{
  /*
      Mark every cell in the given layer with the number of cells that
      are visible to it, divided by 160 (a magic number that looks good).  Make sure
      to cap the value at 1.0 as well.

      Two cells are visible to each other if a line between their centerpoints doesn't
      intersect the four boundary lines of every wall cell.  Make use of the is_clear_path
      helper function.
  */

  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();

  for (int row = 0; row < height; row++)
  {
    for (int col = 0; col < width; col++)
    {
       if (terrain->is_wall(row, col))
      {
        continue;
      }
        
      float count = 0;
      int radius = 1;

      //scanning up
      for (int y = row + 1; y < height; y++)
      {
        int Start = col - radius;
        int End = col + radius;
        if (Start < 0)
          Start = 0;
        if (End >= width)
          End = width - 1;

        for (int x = Start; x <= End; x++)
        {
          if (is_clear_path(row, col, y, x))
            ++count;
        }
        ++radius;
      }

      radius = 1;
      //scanning down
      for (int y = row - 1; y >= 0; y--)
      {
        int Start = col - radius;
        int End = col + radius;
        if (Start < 0)
          Start = 0;
        if (End >= width)
          End = width - 1;

        for (int x = Start; x <= End; x++)
        {
          if (is_clear_path(row, col, y, x))
            ++count;
        }
        ++radius;
      }

      radius = 0;
      //scanning right
      for (int x = col + 1; x < width; x++)
      {
        int Start = row - radius;
        int End = row + radius;
        if (Start < 0)
          Start = 0;
        if (End >= height)
          End = height - 1;

        for (int y = Start; y <= End; y++)
        {
          if (is_clear_path(row, col, y, x))
            ++count;
        }
        ++radius;
      }

      radius = 0;
      //scanning left
      for(int x = col - 1; x >= 0; x--)
      {
        int Start = row - radius;
        int End = row + radius;
        if (Start < 0)
          Start = 0;
        if (End >= height)
          End = height - 1;

        for (int y = Start; y <= End; y++)
        {
          if (is_clear_path(row, col, y, x))
            ++count;
        }
        ++radius;
      }


      count /= 160.0f;
      if (count > 1.0f)
        count = 1.0f;
      
      layer.set_value(row, col, count );
    }
  }
}

struct VisibleCells
{
  VisibleCells(unsigned int r, unsigned int c)
  {
    row = r;
    col = c;
  }
  unsigned int row : 8;
  unsigned int col : 8;
};


void analyze_visible_to_cell(MapLayer<float> &layer, int row, int col)
{
    /*
        For every cell in the given layer 
        if it is visible to the given cell mark it 1.0, 
        if it isn't visible but is next to a visible cell mark it 0.5,
        otherwise 0.0.

        Two cells are visible to each other if a line between their centerpoints doesn't
        intersect the four boundary lines of every wall cell.  Make use of the is_clear_path
        helper function.
    */

  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
      layer.set_value(y, x, 0);

  layer.set_value(row, col, 1);

  std::vector<VisibleCells> vCells;


  int radius = 1;
    //scanning up
  for (int y = row + 1; y < height; y++)
  {
    int Start = col - radius;
    int End = col + radius;
    if (Start < 0)
      Start = 0;
    if (End >= width)
      End = width - 1;

    for (int x = Start; x <= End; x++)
    {
      if (is_clear_path(row, col, y, x))
      {
        vCells.push_back(VisibleCells(y, x));
        layer.set_value(y, x, 1.0f);
      }
    }
    ++radius;
  }

  radius = 1;
  //scanning down
  for (int y = row - 1; y >= 0; y--)
  {
    int Start = col - radius;
    int End = col + radius;
    if (Start < 0)
      Start = 0;
    if (End >= width)
      End = width - 1;

    for (int x = Start; x <= End; x++)
    {
      if (is_clear_path(row, col, y, x))
      {
        vCells.push_back(VisibleCells(y, x));
        layer.set_value(y, x, 1.0f);
      }
      
    }
    ++radius;
  }

  radius = 0;
  //scanning right
  for (int x = col + 1; x < width; x++)
  {
    int Start = row - radius;
    int End = row + radius;
    if (Start < 0)
      Start = 0;
    if (End >= height)
      End = height - 1;

    for (int y = Start; y <= End; y++)
    {
      if (is_clear_path(row, col, y, x)) 
      {
        vCells.push_back(VisibleCells(y, x));
        layer.set_value(y, x, 1.0f);
      }
      
    }
    ++radius;
  }

  radius = 0;
  //scanning left
  for (int x = col - 1; x >= 0; x--)
  {
    int Start = row - radius;
    int End = row + radius;
    if (Start < 0)
      Start = 0;
    if (End >= height)
      End = height - 1;

    for (int y = Start; y <= End; y++)
    {
      if (is_clear_path(row, col, y, x)) 
      {
        vCells.push_back(VisibleCells(y, x));
        layer.set_value(y, x, 1.0f);
      }
    }
    ++radius;
  }

  for(VisibleCells v : vCells)
  {
    //N
    if(terrain->is_valid_grid_position(v.row + 1, v.col))
      if (!terrain->is_wall(v.row + 1, v.col) && layer.get_value(v.row + 1, v.col) ==  0)
        layer.set_value(v.row + 1, v.col, 0.5f);
    
    //NE
    if (terrain->is_valid_grid_position(v.row + 1, v.col+1))
      if (!terrain->is_wall(v.row + 1, v.col + 1) && layer.get_value(v.row + 1, v.col + 1) == 0)
        layer.set_value(v.row + 1, v.col + 1, 0.5f);

    //E
    if (terrain->is_valid_grid_position(v.row, v.col+1))
      if (!terrain->is_wall(v.row, v.col + 1) && layer.get_value(v.row, v.col + 1) == 0)
        layer.set_value(v.row, v.col + 1, 0.5f);

    //SE
    if (terrain->is_valid_grid_position(v.row - 1, v.col + 1))
      if (!terrain->is_wall(v.row - 1, v.col + 1) && layer.get_value(v.row - 1, v.col + 1) == 0)
        layer.set_value(v.row - 1, v.col + 1, 0.5f);

    //S
    if (terrain->is_valid_grid_position(v.row - 1, v.col))
      if (!terrain->is_wall(v.row - 1, v.col) && layer.get_value(v.row - 1, v.col) == 0)
        layer.set_value(v.row - 1, v.col, 0.5f);

    //SW
    if (terrain->is_valid_grid_position(v.row - 1, v.col - 1))
      if (!terrain->is_wall(v.row - 1, v.col - 1) && layer.get_value(v.row - 1, v.col - 1) == 0)
        layer.set_value(v.row - 1, v.col - 1, 0.5f);

    //W
    if (terrain->is_valid_grid_position(v.row, v.col - 1))
      if (!terrain->is_wall(v.row, v.col - 1) && layer.get_value(v.row, v.col - 1) == 0)
        layer.set_value(v.row, v.col - 1, 0.5f);

    //NW
    if (terrain->is_valid_grid_position(v.row + 1, v.col - 1))
      if (!terrain->is_wall(v.row + 1, v.col - 1) && layer.get_value(v.row + 1, v.col - 1) == 0)
        layer.set_value(v.row - 1, v.col - 1, 0.5f);
  }

}

void analyze_agent_vision(MapLayer<float> &layer, const Agent *agent)
{
    /*
        For every cell in the given layer that is visible to the given agent,
        mark it as 1.0, otherwise don't change the cell's current value.

        You must consider the direction the agent is facing.  All of the agent data is
        in three dimensions, but to simplify you should operate in two dimensions, the XZ plane.

        Take the dot product between the view vector and the vector from the agent to the cell,
        both normalized, and compare the cosines directly instead of taking the arccosine to
        avoid introducing floating-point inaccuracy (larger cosine means smaller angle).

        Give the agent a field of view slighter larger than 180 degrees.

        Two cells are visible to each other if a line between their centerpoints doesn't
        intersect the four boundary lines of every wall cell.  Make use of the is_clear_path
        helper function.
    */

    // WRITE YOUR CODE HERE

  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();


  Vec3 forward = agent->get_forward_vector();
    
  const auto& agentWorldPos = agent->get_position();
  const auto agentGridPos = terrain->get_grid_position(agentWorldPos);

  const float fov = cos(88.0f * 3.14159f/180.0f);

  for(int x = 0; x < width; x++)
    for(int y = 0; y < height; y++)
    {
      Vec3 cellWorldPos = terrain->get_world_position(y, x);
      Vec3 AgentToCell = agentWorldPos - cellWorldPos;
      AgentToCell.Normalize();

      float dot = AgentToCell.x * forward.x + AgentToCell.z * forward.z;
      if (fov - dot > 0)
      {
        if(is_clear_path(agentGridPos.row, agentGridPos.col, y,x))
          layer.set_value(y, x, 1.0f);
      }
    }
 
}

void propagate_solo_occupancy(MapLayer<float> &layer, float decay, float growth)
{
    /*
        For every cell in the given layer:

            1) Get the value of each neighbor and apply decay factor
            2) Keep the highest value from step 1
            3) Linearly interpolate from the cell's current value to the value from step 2
               with the growing factor as a coefficient.  Make use of the lerp helper function.
            4) Store the value from step 3 in a temporary layer.
               A float[40][40] will suffice, no need to dynamically allocate or make a new MapLayer.

        After every cell has been processed into the temporary layer, write the temporary layer into
        the given layer;
    */

  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();

  float temp[40][40];

  for(int x = 0; x < width; x++)
    for(int y = 0; y < height; y++)
    {
          if (terrain->is_wall(y, x))
          {
            temp[y][x] = 0;
            continue;
          }
           


      float current = layer.get_value(y, x);
      float highest = 0;
      float value = 0;
      //N
      if (terrain->is_valid_grid_position(y + 1, x))
      {
        if (!terrain->is_wall(y + 1, x))
        {
          value = layer.get_value(y + 1, x);
          value = value * (1-decay);
          if (value > highest)
            highest = value;
        }   
      }
      
      //NE
      if (terrain->is_valid_grid_position(y + 1, x + 1))
      {
        if (!terrain->is_wall(y + 1, x) && !terrain->is_wall(y, x + 1) &&  !terrain->is_wall(y + 1, x + 1))
        {
          value = layer.get_value(y + 1, x + 1);
          value = value * (1 - decay);
          if (value > highest)
            highest = value;
        }      
      }

      //E
      if (terrain->is_valid_grid_position(y , x + 1))
      {
        if (!terrain->is_wall(y, x + 1))
        {
          value = layer.get_value(y , x + 1);
          value = value * (1 - decay);
          if (value > highest)
            highest = value;
        }
      }
        
      //SE
      if (terrain->is_valid_grid_position(y - 1, x + 1))
      {
        if (!terrain->is_wall(y, x + 1) && !terrain->is_wall(y - 1, x) &&!terrain->is_wall(y - 1, x + 1))
        {
          value = layer.get_value(y - 1, x + 1);
          value = value * (1 - decay);
          if (value > highest)
            highest = value;
        }
      }
        
      //S
      if (terrain->is_valid_grid_position(y - 1, x))
      {
        if (!terrain->is_wall(y - 1, x))
        {
          value = layer.get_value(y - 1, x);
          value = value * (1 - decay);
          if (value > highest)
            highest = value;
        }
      }
        
      //SW
      if (terrain->is_valid_grid_position(y - 1, x - 1))
      {
        if (!terrain->is_wall(y - 1, x) && !terrain->is_wall(y, x - 1) && !terrain->is_wall(y - 1, x - 1))
        {
          value = layer.get_value(y - 1, x - 1);
          value = value * (1 - decay);
          if (value > highest)
            highest = value;
        }
      }
        
      //W
      if (terrain->is_valid_grid_position(y, x - 1))
      {
        if (!terrain->is_wall(y, x - 1))
        {
          value = layer.get_value(y, x - 1);
          value = value * (1 - decay);
          if (value > highest)
            highest = value;
        }
      } 

      //NW
      if (terrain->is_valid_grid_position(y + 1, x - 1))
      {
        if (!terrain->is_wall(y, x - 1) && !terrain->is_wall(y + 1, x) && !terrain->is_wall(y + 1, x - 1))
        {
          value = layer.get_value(y + 1, x - 1);
          value = value * (1 - decay);
          if (value > highest)
            highest = value;
        }
      }
        
      temp[y][x] = lerp(current, highest, growth);
    }

    for (int x = 0; x < width; x++)
      for (int y = 0; y < height; y++)
      {
        layer.set_value(y, x, temp[y][x]);
      }

}

void propagate_dual_occupancy(MapLayer<float> &layer, float decay, float growth)
{
    /*
        Similar to the solo version, but the values range from -1.0 to 1.0, instead of 0.0 to 1.0

        For every cell in the given layer:

        1) Get the value of each neighbor and apply decay factor
        2) Keep the highest ABSOLUTE value from step 1
        3) Linearly interpolate from the cell's current value to the value from step 2
           with the growing factor as a coefficient.  Make use of the lerp helper function.
        4) Store the value from step 3 in a temporary layer.
           A float[40][40] will suffice, no need to dynamically allocate or make a new MapLayer.

        After every cell has been processed into the temporary layer, write the temporary layer into
        the given layer;
    */

  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();

  float temp[40][40];

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      if (terrain->is_wall(y, x))
      {
        temp[y][x] = 0;
        continue;
      }

      float current = layer.get_value(y, x);
      float highest = 0;
      float value = 0;
      //N
      if (terrain->is_valid_grid_position(y + 1, x))
      {
        if (!terrain->is_wall(y + 1, x))
        {
          value = layer.get_value(y + 1, x);
          value = value * (1 - decay);
          if (abs(value) > abs(highest))
            highest = value;
        }
      }

      //NE
      if (terrain->is_valid_grid_position(y + 1, x + 1))
      {
        if (!terrain->is_wall(y + 1, x) && !terrain->is_wall(y, x + 1) && !terrain->is_wall(y + 1, x + 1))
        {
          value = layer.get_value(y + 1, x + 1);
          value = value * (1 - decay);
          if (abs(value) > abs(highest))
            highest = value;
        }
      }

      //E
      if (terrain->is_valid_grid_position(y, x + 1))
      {
        if (!terrain->is_wall(y, x + 1))
        {
          value = layer.get_value(y, x + 1);
          value = value * (1 - decay);
          if (abs(value) > abs(highest))
            highest = value;
        }
      }

      //SE
      if (terrain->is_valid_grid_position(y - 1, x + 1))
      {
        if (!terrain->is_wall(y, x + 1) && !terrain->is_wall(y - 1, x) && !terrain->is_wall(y - 1, x + 1))
        {
          value = layer.get_value(y - 1, x + 1);
          value = value * (1 - decay);
          if (abs(value) > abs(highest))
            highest = value;
        }
      }

      //S
      if (terrain->is_valid_grid_position(y - 1, x))
      {
        if (!terrain->is_wall(y - 1, x))
        {
          value = layer.get_value(y - 1, x);
          value = value * (1 - decay);
          if (abs(value) > abs(highest))
            highest = value;
        }
      }

      //SW
      if (terrain->is_valid_grid_position(y - 1, x - 1))
      {
        if (!terrain->is_wall(y - 1, x) && !terrain->is_wall(y, x - 1) && !terrain->is_wall(y - 1, x - 1))
        {
          value = layer.get_value(y - 1, x - 1);
          value = value * (1 - decay);
          if (abs(value) > abs(highest))
            highest = value;
        }
      }

      //W
      if (terrain->is_valid_grid_position(y, x - 1))
      {
        if (!terrain->is_wall(y, x - 1))
        {
          value = layer.get_value(y, x - 1);
          value = value * (1 - decay);
          if (abs(value) > abs(highest))
            highest = value;
        }
      }

      //NW
      if (terrain->is_valid_grid_position(y + 1, x - 1))
      {
        if (!terrain->is_wall(y, x - 1) && !terrain->is_wall(y + 1, x) && !terrain->is_wall(y + 1, x - 1))
        {
          value = layer.get_value(y + 1, x - 1);
          value = value * (1 - decay);
          if (abs(value) > abs(highest))
            highest = value;
        }
      }

      temp[y][x] = lerp(current, highest, growth);
    }

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      layer.set_value(y, x, temp[y][x]);
    }
}

void normalize_solo_occupancy(MapLayer<float> &layer)
{
    /*
        Determine the maximum value in the given layer, and then divide the value
        for every cell in the layer by that amount.  This will keep the values in the
        range of [0, 1].  Negative values should be left unmodified.
    */
  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();

  float max = 0;

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      float value = layer.get_value(y, x);
      if (value > max)
        max = value;
    }

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      float value = layer.get_value(y, x);
      if (value > 0)
        layer.set_value(y, x, value / max);
    }
}

void normalize_dual_occupancy(MapLayer<float> &layer)
{
    /*
        Similar to the solo version, but you need to track greatest positive value AND 
        the least (furthest from 0) negative value.

        For every cell in the given layer, if the value is currently positive divide it by the
        greatest positive value, or if the value is negative divide it by -1.0 * the least negative value
        (so that it remains a negative number).  This will keep the values in the range of [-1, 1].
    */

  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();

  float max = 0;
  float min = 0;

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      float value = layer.get_value(y, x);
      if (value > max)
        max = value;
      if (value < min)
        min = value;
    }

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      float value = layer.get_value(y, x);
      if (value > 0)
        layer.set_value(y, x, value / max);
      if(value < 0)
        layer.set_value(y, x, value / (-1.0f*min));
    }

}

void enemy_field_of_view(MapLayer<float> &layer, float fovAngle, float closeDistance, float occupancyValue, AStarAgent *enemy)
{
    /*
        First, clear out the old values in the map layer by setting any negative value to 0.
        Then, for every cell in the layer that is within the field of view cone, from the
        enemy agent, mark it with the occupancy value.  Take the dot product between the view
        vector and the vector from the agent to the cell, both normalized, and compare the
        cosines directly instead of taking the arccosine to avoid introducing floating-point
        inaccuracy (larger cosine means smaller angle).

        If the tile is close enough to the enemy (less than closeDistance),
        you only check if it's visible to enemy.  Make use of the is_clear_path
        helper function.  Otherwise, you must consider the direction the enemy is facing too.
        This creates a radius around the enemy that the player can be detected within, as well
        as a fov cone.
    */

  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      float value = layer.get_value(y, x);
      if (value < 0)
        layer.set_value(y, x, 0);
    }


  Vec3 forward = enemy->get_forward_vector();

  const auto& enemyWorldPos = enemy->get_position();
  const auto enemyGridPos = terrain->get_grid_position(enemyWorldPos);

  const float fov = cos(fovAngle*3.14159f/360.0f)*-1.0f;

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      int xdiff = (enemyGridPos.col - x);
      int ydiff = (enemyGridPos.row - y);
      float distance =  (float)sqrt(xdiff*xdiff + ydiff*ydiff);
      if (distance < closeDistance)
      {
        if (is_clear_path(enemyGridPos.row, enemyGridPos.col, y, x))
          layer.set_value(y, x, occupancyValue);
      }
      else
      {

        Vec3 cellWorldPos = terrain->get_world_position(y, x);
        Vec3 AgentToCell = enemyWorldPos - cellWorldPos;
        AgentToCell.Normalize();

        float dot = AgentToCell.x * forward.x + AgentToCell.z * forward.z;
        if (dot - fov < 0)
        {
          if (is_clear_path(enemyGridPos.row, enemyGridPos.col, y, x))
            layer.set_value(y, x, occupancyValue);

        }
      }
    }
}

bool enemy_find_player(MapLayer<float> &layer, AStarAgent *enemy, Agent *player)
{
    /*
        Check if the player's current tile has a negative value, ie in the fov cone
        or within a detection radius.
    */

    const auto &playerWorldPos = player->get_position();

    const auto playerGridPos = terrain->get_grid_position(playerWorldPos);

    // verify a valid position was returned
    if (terrain->is_valid_grid_position(playerGridPos) == true)
    {
        if (layer.get_value(playerGridPos) < 0.0f)
        {
            return true;
        }
    }

    // player isn't in the detection radius or fov cone, OR somehow off the map
    return false;
}

bool enemy_seek_player(MapLayer<float>& layer, AStarAgent* enemy)
{
  /*
      Attempt to find a cell with the highest nonzero value (normalization may
      not produce exactly 1.0 due to floating point error), and then set it as
      the new target, using enemy->path_to.

      If there are multiple cells with the same highest value, then pick the
      cell closest to the enemy.

      Return whether a target cell was found.
  */

  const int width = terrain->get_map_width();
  const int height = terrain->get_map_height();

  GridPos target;
  target.row = 0;
  target.col = 0;
  float targetValue = 0;

  for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
    {
      float value = layer.get_value(y, x);
      if (value > targetValue)
      {
        targetValue = value;
        target.row = y;
        target.col = x;
      }
    }

  if (targetValue) 
  {
    enemy->path_to(terrain->get_world_position(target.row, target.col));
    return true;
  }
  
  return false;
}

```