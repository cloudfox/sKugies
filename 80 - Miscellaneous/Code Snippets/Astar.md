---
publish: true
---
Pathfinding code from an AI class I took a few years ago.  There are definitely many improvements that I could have made but there is never enough time to test everything. Still it was enough to get me the 2nd fastest time in the class.


```c++
const float sqrtTwo = 1.41;
float (AStarPather::* heuresticFunction)(Position) = NULL;

void AStarPather::mapSetup()
{
  height = terrain->get_map_height();
  width = terrain->get_map_width();

  for (int y = 0; y < height; y++)
  {
    for (int x = 0; x < width; x++)
    {
      nodes[x][y].x = x;
      nodes[x][y].y = y;
      nodes[x][y].onList = 0;
    }
  }

  openList.clear();

  const int height2 = height - 1;
  const int width2 = width - 1;

  //Neighbor pre-calculation
  for (int y = 0; y < height; y++)
  {
    for (int x = 0; x < width; x++)
    {
      nodes[x][y].north = 0;
      nodes[x][y].east = 0;
      nodes[x][y].south = 0;
      nodes[x][y].west = 0;
      nodes[x][y].northeast = 0;
      nodes[x][y].northwest = 0;
      nodes[x][y].southeast = 0;
      nodes[x][y].southwest = 0;
    }
  }

  //vert/horz
  for (int y = 1; y < height2; y++)
  {
    for (int x = 1; x < width2; x++)
    {
      if (terrain->is_wall(y, x))
        continue;

      if (!terrain->is_wall(y + 1, x))
      {
        nodes[x][y].north = 1;
        nodes[x][(unsigned long long)y + 1].south = 1;
      }

      if (!terrain->is_wall(y, x + 1))
      {
        nodes[x][y].east = 1;
        nodes[(unsigned long long)x + 1][y].west = 1;
      }

      if (!terrain->is_wall(y - 1, x))
      {
        nodes[x][y].south = 1;
        nodes[x][(unsigned long long)y - 1].north = 1;
      }

      if (!terrain->is_wall(y, x - 1))
      {
        nodes[x][y].west = 1;
        nodes[(unsigned long long)x - 1][y].east = 1;
      }
    }
  }

  //top-bottom horz
  for (int x = 1; x < width; x++)
  {
    if (!terrain->is_wall(0, x) && !terrain->is_wall(0, x - 1))
    {
      nodes[x][0].west = 1;
      nodes[(unsigned long long)x - 1][0].east = 1;
    }

    if (!terrain->is_wall(height2, x) && !terrain->is_wall(height2, x - 1))
    {
      nodes[x][height2].west = 1;
      nodes[(unsigned long long)x - 1][height2].east = 1;
    }
  }

  //left-right vert
  for (int y = 1; y < height; y++)
  {
    if (!terrain->is_wall(y, 0) && !terrain->is_wall(y - 1, 0))
    {
      nodes[0][y].south = 1;
      nodes[0][(unsigned long long)y - 1].north = 1;
    }

    if (!terrain->is_wall(y, width2) && !terrain->is_wall(y - 1, width2))
    {
      nodes[width2][y].south = 1;
      nodes[width2][(unsigned long long)y - 1].north = 1;
    }
  }

  //diagonals
  for (int y = 1; y < height2; y++)
  {
    for (int x = 1; x < width2; x++)
    {
      if (terrain->is_wall(y, x))
        continue;

      //northeast
      if (!terrain->is_wall(y + 1, x + 1) && nodes[x][y].north && nodes[x][y].east)
      {
        nodes[x][y].northeast = 1;
        nodes[(unsigned long long)x + 1][(unsigned long long)y + 1].southwest = 1;
      }

      //northwest
      if (!terrain->is_wall(y + 1, x - 1) && nodes[x][y].north && nodes[x][y].west)
      {
        nodes[x][y].northwest = 1;
        nodes[(unsigned long long)x - 1][(unsigned long long)y + 1].southeast = 1;
      }

      //southeast
      if (!terrain->is_wall(y - 1, x + 1) && nodes[x][y].south && nodes[x][y].east)
      {
        nodes[x][y].southeast = 1;
        nodes[(unsigned long long)x + 1][(unsigned long long)y - 1].northwest = 1;
      }

      //southwest
      if (!terrain->is_wall(y - 1, x - 1) && nodes[x][y].south && nodes[x][y].west)
      {
        nodes[x][y].southwest = 1;
        nodes[(unsigned long long)x - 1][(unsigned long long)y - 1].northeast = 1;
      }
    }
  }

  //for reseting nodes on new requests
  memcpy(&nodes2[0][0], &nodes[0][0], sizeof(nodes2));
}



float AStarPather::Octile(Position pos)
{
  const int xDiff = std::abs(((int)goal.x - (int)pos.x));
  const int yDiff = std::abs((int)goal.y - (int)pos.y);
  const float min = (float)std::min(xDiff, yDiff);
  const float max = (float)std::max(xDiff, yDiff);

  return (weight * ((min * sqrtTwo) + max - min));
}

inline float AStarPather::Manhattan(Position pos)
{
  const int xDiff = std::abs(((int)goal.x - (int)pos.x));
  const int yDiff = std::abs((int)goal.y - (int)pos.y);

  return (float)xDiff + yDiff;
}

inline float AStarPather::Chebyshev(Position pos)
{
  const int xDiff = std::abs(((int)goal.x - (int)pos.x));
  const int yDiff = std::abs((int)goal.y - (int)pos.y);


  return (float)std::max(xDiff, yDiff);
}

inline float AStarPather::Euclidean(Position pos)
{
  const int xDiff = std::abs(((int)goal.x - (int)pos.x));
  const int yDiff = std::abs((int)goal.y - (int)pos.y);

  return (float)sqrt(pow(xDiff, 2) + pow(yDiff, 2));
}



void AStarPather::RubberBand(std::list<Vec3>& path) 
{

  std::vector<Vec3> arr;
  arr.reserve(path.size());

  int k = 0;
  for (Vec3 const& v : path) {
    arr.push_back(v);
  }

  std::vector<Vec3> newPath;
  newPath.reserve(path.size() * 4);
  newPath.push_back(arr.back());
  arr.pop_back();

  while(arr.size() > 1)
  {
    GridPos pos1 = terrain->get_grid_position(newPath.back());
    GridPos pos2 = terrain->get_grid_position(arr[arr.size() - 2]);

    int xStart, xStop;
    if (pos1.col < pos2.col)
    {
      xStart = pos1.col;
      xStop = pos2.col;
    }
    else {
      xStart = pos2.col;
      xStop = pos1.col;
    }
    int yStart, yStop;
    if (pos1.row < pos2.row)
    {
      yStart = pos1.row;
      yStop = pos2.row;
    }
    else {
      yStart = pos2.row;
      yStop = pos1.row;
    }

    bool search = true;
    for (int x = xStart; x <= xStop && search; x++)
    {
      for (int y = yStart; y <= yStop && search; y++)
      {
        GridPos gp;
        gp.row = y;
        gp.col = x;
        if (terrain->is_wall(gp))
        {
          newPath.push_back(arr.back());
          search = false;
        }
      }
    }   
      arr.pop_back();
  }
  newPath.push_back(path.front());
  path.clear();
  for (Vec3 const& v : newPath) {
    path.push_back(v);
  }
  path.reverse();
}


void AStarPather::rubberSmooth(std::list<Vec3>& path)
{
  std::vector<Vec3> arr;
  arr.reserve(path.size());

  int k = 0;
  for (Vec3 const& v : path) {
    arr.push_back(v);
  }

  std::vector<Vec3> newPath;
  newPath.reserve(path.size() * 4);
  newPath.push_back(arr.back());
  arr.pop_back();

  while(!arr.empty())
  {
    //distance between two adjacent nodes
    float distance = Vec3::Distance(newPath.back(), arr.back());

    if(distance > 1.5f)
    {
      //mid point
      Vec3 newVec = (newPath.back()+ arr.back()) / 2;
      
      //add as next value to find distance to
      arr.push_back(newVec);
    }
    else
    {
      newPath.push_back(arr.back());
      arr.pop_back();
    }
  }

  path.clear();
  for (Vec3 const& v : newPath) {
    path.push_back(v);
  }
  path.reverse();
}


void AStarPather::smooth(std::list<Vec3>& path)
{
  if (path.size() < 4)
    return;


  std::vector<Vec3> arr;
  arr.reserve(path.size());

  int k = 0;
  for (Vec3 const& v : path) {
    arr.push_back(v);
  }

  std::vector<Vec3> newPath;
  newPath.reserve(path.size() * 4);
  newPath.push_back(arr[0]);

  newPath.push_back(Vec3::CatmullRom(arr[0], arr[0], arr[1], arr[2], 0.25f));
  newPath.push_back(Vec3::CatmullRom(arr[0], arr[0], arr[1], arr[2], 0.5f));
  newPath.push_back(Vec3::CatmullRom(arr[0], arr[0], arr[1], arr[2], 0.75f));
  
  size_t size = path.size() - 4;
  for(int i = 1; i < size; i++)
  {
    path.push_back(arr[i]);
    newPath.push_back(Vec3::CatmullRom(arr[i], arr[(unsigned long long)i + 1], arr[(unsigned long long)i + 2], arr[(unsigned long long)i + 3], 0.25f));
    newPath.push_back(Vec3::CatmullRom(arr[i], arr[(unsigned long long)i + 1], arr[(unsigned long long)i + 2], arr[(unsigned long long)i + 3], 0.5f));
    newPath.push_back(Vec3::CatmullRom(arr[i], arr[(unsigned long long)i + 1], arr[(unsigned long long)i + 2], arr[(unsigned long long)i + 3], 0.75f));
  }

  size_t i = size;
  path.push_back(arr[i]);
  newPath.push_back(Vec3::CatmullRom(arr[i], arr[i + 1], arr[i + 2], arr[i + 2], 0.25f));
  newPath.push_back(Vec3::CatmullRom(arr[i], arr[i + 1], arr[i + 2], arr[i + 2], 0.5f));
  newPath.push_back(Vec3::CatmullRom(arr[i], arr[i + 1], arr[i + 2], arr[i + 2], 0.75f));
  newPath.push_back(arr.back());

  path.clear();
  for (Vec3 const& v : newPath) {
    path.push_back(v);
  }
}

AStarPather::AStarPather() : weight(1), height(40), width(40), debugColor(false)
{
}

AStarPather::~AStarPather()
{
}

bool AStarPather::initialize()
{
  // handle any one-time setup requirements you have

  /*
    If you want to do any map-preprocessing, you'll need to listen
    for the map change message.  It'll look something like this:

    Callback cb = std::bind(&AStarPather::your_function_name, this);
    Messenger::listen_for_message(Messages::MAP_CHANGE, cb);

    There are other alternatives to using std::bind, so feel free to mix it up.
    Callback is just a typedef for std::function<void(void)>, so any std::invoke'able
    object that std::function can wrap will suffice.
  */

  Callback cb = std::bind(&AStarPather::mapSetup, this);
  Messenger::listen_for_message(Messages::MAP_CHANGE, cb);
 
  openList.listMembers.reserve(600);

  return true; // return false if any errors actually occur, to stop engine initialization
}

void AStarPather::shutdown()
{
  /*
      Free any dynamically allocated memory or any other general house-
      keeping you need to do during shutdown.
  */
}

PathResult AStarPather::compute_path(PathRequest &request)
{
  /*
    This is where you handle pathing requests, each request has several fields:

    start/goal - start and goal world positions
    path - where you will build the path upon completion, path should be
        start to goal, not goal to start
    heuristic - which heuristic calculation to use
    weight - the heuristic weight to be applied
    newRequest - whether this is the first request for this path, should generally
        be true, unless single step is on

    smoothing - whether to apply smoothing to the path
    rubberBanding - whether to apply rubber banding
    singleStep - whether to perform only a single A* step
    debugColoring - whether to color the grid based on the A* state:
        closed list nodes - yellow
        open list nodes - blue

        use terrain->set_color(row, col, Colors::YourColor);
        also it can be helpful to temporarily use other colors for specific states
        when you are testing your algorithms

    method - which algorithm to use: A*, Floyd-Warshall, JPS+, or goal bounding,
        will be A* generally, unless you implement extra credit features

    The return values are:
        PROCESSING - a path hasn't been found yet, should only be returned in
            single step mode until a path is found
        COMPLETE - a path to the goal was found and has been built in request.path
        IMPOSSIBLE - a path from start to goal does not exist, do not add start position to path
  */

  if(request.newRequest)
  {
    memcpy(&nodes[0][0], &nodes2[0][0], sizeof(nodes));

    switch (request.settings.heuristic)
    {
    case Heuristic::CHEBYSHEV:
      heuresticFunction = &AStarPather::Chebyshev;
        break;
    case Heuristic::EUCLIDEAN:
      heuresticFunction = &AStarPather::Euclidean;
      break;
    case Heuristic::MANHATTAN:
      heuresticFunction = &AStarPather::Manhattan;
      break;
    case Heuristic::OCTILE:
      heuresticFunction = &AStarPather::Octile;
      break;
    default:
      heuresticFunction = &AStarPather::Octile;
      break;
    }
    
    debugColor = request.settings.debugColoring;
    openList.debugColor = debugColor;

    openList.clear();

    GridPos gridStart = terrain->get_grid_position(request.start);
    GridPos gridGoal = terrain->get_grid_position(request.goal);
    goal = Position(gridGoal.col, gridGoal.row);
    start = Position(gridStart.col, gridStart.row);
    weight = request.settings.weight + 0.01f;

    //Push Start Node to Open List
    Node& startNode = nodes[start.x][start.y];
    startNode.given = 0;
    startNode.heurestic = Octile(start);
    startNode.cost = startNode.given + startNode.heurestic;
    startNode.onList = 1;

    openList.push(startNode.position(), startNode.cost);
  }

  while (!openList.empty())
  {
    //get cheapest node
    Position pos = openList.listMembers.front().position;
    std::pop_heap(openList.listMembers.begin(), openList.listMembers.end(), std::greater<>{});
    openList.listMembers.pop_back();
    Node curr = nodes[pos.x][pos.y];

    if(curr == goal)
    {
      std::vector<Vec3> vec;
      vec.reserve((int)curr.given);
      while ((curr.x != start.x || curr.y != start.y))
      {
        GridPos pos;
        pos.col = curr.x;
        pos.row = curr.y;
        
        vec.push_back(terrain->get_world_position(pos));
        curr = nodes[curr.parentX][curr.parentY];
      }

      vec.push_back(request.start);   
      request.path.resize((int)curr.given);
      request.path.assign(vec.begin(), vec.end());
      request.path.reverse();

      if (request.settings.debugColoring)
      {
        terrain->set_color(terrain->get_grid_position(request.goal), Colors::Yellow);
      }

      if (request.settings.rubberBanding)
      {
        RubberBand(request.path);

        if (request.settings.smoothing)
          rubberSmooth(request.path);
      }
      if (request.settings.smoothing)
        smooth(request.path);

      return PathResult::COMPLETE;
    }

    //checking for children nodes
    if(curr.north)
    {
      {
        CheckListsToAdd(curr, 0,1);
      }

      if(curr.northeast)
      {
        CheckListsToAdd(curr, 1, 1);
      }
      if(curr.northwest)
      {
        CheckListsToAdd(curr, -1, 1);
      }
    }
    if(curr.south)
    {
      {
        CheckListsToAdd(curr, 0, -1);
      }

      if(curr.southeast)
      {
        CheckListsToAdd(curr, 1, -1);
      }
      if (curr.southwest) 
      {
        CheckListsToAdd(curr, -1, -1);
      }
    }
    if(curr.east)
    {
      CheckListsToAdd(curr, 1, 0);
    }
    if(curr.west)
    {
      CheckListsToAdd(curr, -1, 0);
    }
    
    //move node to closed list
    curr.onList = 2;

    if(debugColor)
    {
      GridPos position;
      position.row = curr.y;
      position.col = curr.x;
      terrain->set_color(position, Colors::Yellow);
    }

    if (request.settings.singleStep)
      return PathResult::PROCESSING;

    //if taking too much time
      //abort and pause search  return working
  }

  return PathResult::IMPOSSIBLE;
}


void AStarPather::CheckListsToAdd(Node& parent, char x, char y)
{
  Node& child = nodes[(unsigned long long)parent.x + x][(unsigned long long)parent.y + y];
  
  if(child.onList == 1)
  {
    float given;
    if (y && x)
      given = sqrtTwo;
    else
      given = 1;

    float newGiven = parent.given + given;
    float newCost = newGiven + child.heurestic;

    if (newCost < child.cost)
    {
      child.given = newGiven;
      child.cost = newCost;
      child.parentX = parent.x;
      child.parentY = parent.y;

      //openList.remove(child.Position());
      openList.push(child.position(), child.cost);   
    } 

  }
  else if (child.onList == 2)
  {
    float given;
    if (x && y)
      given = sqrtTwo;
    else
      given = 1;

    float newGiven = parent.given + given;
    float newCost = newGiven + child.heurestic;

    if (newCost < child.cost)
    {
      child.given = newGiven;
      child.cost = newCost;
      child.parentX = parent.x;
      child.parentY = parent.y;
      child.onList = 1;
      openList.push(child.position(), child.cost);
    }

  } 
  else 
  {
    float given;
    if (x && y)
      given = sqrtTwo;
    else
      given = 1;

    child.parentX = parent.x;
    child.parentY = parent.y;
    child.onList = 1;
    child.given = parent.given + given;
    child.heurestic = Octile(child.position());
    child.cost = child.given + child.heurestic;

    openList.push(child.position(), child.cost);
  }
}

OpenList::OpenList() : debugColor(false)
{  
}


void OpenList::push(Position p, float cost)
{
    listMembers.push_back(posCost(p, cost)); 
    std::push_heap(listMembers.begin(), listMembers.end(), std::greater<>{});

    if (debugColor)
    {
      GridPos position;
      position.row = p.y;
      position.col = p.x;
      terrain->set_color(position, Colors::Blue);
    }
}


void OpenList::clear()
{
  //bucket = std::priority_queue<posCost, std::vector<posCost>, std::greater<posCost>>();
  listMembers.clear();
}

bool OpenList::empty()
{
  //bucket.empty()
  //for (auto const& b : bucket)
  //  if (!b.empty())
  //    return false;

  return listMembers.empty();
  //return bucket.empty();
}




Node::Node() : parentX(0), parentY(0), onList(0), given(0), cost(0)
{
  north = 0;
  east = 0;
  south = 0;
  west = 0;
  northeast = 0;
  northwest = 0;
  southeast = 0;
  southwest = 0;
}

Node::Node(float g, float c) : parentX(0), parentY(0), onList(0), given(g), cost(c + g)
{
  north = 0;
  east = 0;
  south = 0;
  west = 0;
  northeast = 0;
  northwest = 0;
  southeast = 0;
  southwest = 0;
}

Node::Node(Position p, float g, float c) : x(p.x), y(p.y), parentX(0), parentY(0), onList(0), given(g), cost(c + g)
{
  north = 0;
  east = 0;
  south = 0;
  west = 0;
  northeast = 0;
  northwest = 0;
  southeast = 0;
  southwest = 0;
}

```