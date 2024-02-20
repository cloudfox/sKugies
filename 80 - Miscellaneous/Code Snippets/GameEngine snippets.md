---
publish: true
---

<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>

From Sophomore game project. That year we had to make a game engine from scratch.


1. [[GameEngine snippets#GameobjectManager.cpp]]
2. [[GameEngine snippets#CollisionSat.cpp]]
3. [[GameEngine snippets#Application.h]]


## GameobjectManager.cpp
```cpp
//-----------------------------------------------------------------------------
//
// File Name:	GameObjectManager.cpp
// Author(s):	Steven Kugies
// Team:		Apricat Games
// Course:		Game200
//
// Copyright © 2020 DigiPen (USA) Corporation.
//
//-----------------------------------------------------------------------------
#include  "GameObjectManager.h"
#include "GameObject.h"
#include "../Core/GamePauseLevel.h"


namespace ECS
{
  //gives a unique id for every created gameobject
  static int newID = 0;

  /*!****************************************************************************
  \brief
      CONSTRUCTOR of GameObjectManager
  ******************************************************************************/
  GameObjectManager::GameObjectManager()
  {
    firstAvailableObj_ = 1;
    PoolSetup(10);
  }

  /*!****************************************************************************
  \brief
      DESTRUCTOR of GameObjectManager
  ******************************************************************************/
  GameObjectManager::~GameObjectManager()
  {

  }

  /*!****************************************************************************
  \brief
      Initializes the Game Object pool
  \param poolSize
      How many GameObjects we want to have at the start in the pool
  ******************************************************************************/
  void GameObjectManager::PoolSetup(unsigned int poolSize)
  {
    GameObjects_.resize(poolSize);
    for (unsigned int i = 0; i < poolSize; i++)
    {
      GameObjects_[i].next_ = i + 1;
      GameObjects_[i].id_ = newID++;
    }
    GameObjects_.back().next_ = NULL;

    firstAvailableObj_ = 1;
  }

  /*!****************************************************************************
  \brief
      Resizes the pool to double it's capacity when it is full
  ******************************************************************************/
  void GameObjectManager::ExpandPool()
  {
    const unsigned int oldSize = unsigned int(GameObjects_.size());
    const unsigned int size = oldSize * 2;
    GameObjects_.resize(size);

    //initialize the new objects into the free list
    for (unsigned int i = oldSize; i < size; i++)
    {
      GameObjects_[i].id_ = newID++;
    }

    //Setting up the linking of objects in the freelist
    for (unsigned int i = oldSize-1; i < size; i++)
    {
      GameObjects_[i].next_ = i + 1;
    }

    //set last object to 0 as nothing exists beyond that point
    GameObjects_[size - 1].next_ = 0;
    //the next object that can be spawned
    firstAvailableObj_ = oldSize;
  }

  /*!****************************************************************************
   \brief
       Gets the pool of objects
   \return
       reference to the pool
   ******************************************************************************/
  std::vector<GameObject>& GameObjectManager::GetPool()
  {
    return GameObjects_;
  }

  /*!****************************************************************************
  \brief
      Spawns a gameobject from the pool. Expands the pool if the pool is empty.
  \return
      id of the spawned gameobject
  ******************************************************************************/
  ObjectId GameObjectManager::Spawn()
  {
    //Expand pool if empty
    if (firstAvailableObj_ == 0)
      ExpandPool();

    //Gets first available object for use
    GameObject& g = GameObjects_[firstAvailableObj_];
    g.active_ = true;
    g.destroyed_ = false;
    g.saveable_ = true;
    g.OMBus_.Clear();

    //update first available to the next object in free list
    firstAvailableObj_ = g.next_;

    return g.id_;
  }

  /*!****************************************************************************
  \brief
      Puts GameObject back into pool for later use
  \param id
      the id of the object to despawn
  ******************************************************************************/
  void GameObjectManager::DeSpawn(ObjectId id)
  {
    //update the list of available objects
    GameObjects_[id].next_ = firstAvailableObj_;
    firstAvailableObj_ = id;
    GameObjects_[id].setName("");
    GameObjects_[id].SetPersistent(false);

    //reset basic values
    GameObjects_[id].active_ = false;
    GameObjects_[id].destroyed_ = false;
    ClearComponentBits(id);
  }

  /*!****************************************************************************
  \brief
      Marks the gameobject to be despawned at the end of the Update
  \param id
      the id of the object to despawn
  ******************************************************************************/
  void GameObjectManager::DestroyGameObject(ObjectId id)
  {
    GameObjects_[id].destroyed_ = true;

  }

  /*!****************************************************************************
  \brief
      Sets all objects to be destroyed except for persistent objects
  ******************************************************************************/
  void GameObjectManager::ClearGameObjects()
  {
    const unsigned int size = (const unsigned int)GameObjects_.size();
    for (unsigned int i = 1; i < size; i++)
    {
      GameObject& obj = GameObjects_[i];
      if (obj.active_ && !obj.IsPersistent())
        DestroyGameObject(obj.id_);
    }
  }

  void GameObjectManager::ClearPauseObjects()
  {
    const unsigned int size = (const unsigned int)GameObjects_.size();
    for (unsigned int i = 1; i < size; i++)
    {
      GameObject& obj = GameObjects_[i];
      if (obj.active_ && !obj.IsPersistent() && obj.StateId_ == Engine::GameStateManager::LevelID::GamePause)
        DestroyGameObject(obj.id_);
    }
  }


  void GameObjectManager::ClearActiveObjects()
  {
      const unsigned int size = (const unsigned int)GameObjects_.size();
      for (unsigned int i = 1; i < size; i++)
      {
          GameObject& obj = GameObjects_[i];
          if (obj.active_ && !obj.IsPersistent() && obj.StateId_ == Engine::Application::instance().GameState_->GetCurrent())
              DestroyGameObject(obj.id_);
      }
  }


  /*!****************************************************************************
  \brief
      Get a pointer to the gameobject
  \param id
      the id of the object we want
  \return
      gameobject pointer
******************************************************************************/
  GameObject* GameObjectManager::GetGameObject(ObjectId id)
  {
    return &GameObjects_[id];
  }

  /*!****************************************************************************
  \brief
      Iterates through each gameObject. Takes the name of a gameObject and returns
      an ObjectId with the same name.
  \param name
      the name of the game object who's ID we want
  \return
      ObjectId of the object with the same name as the parameter.
  ******************************************************************************/
  ObjectId GameObjectManager::GetIDFromString(std::string name, bool paused)
  {
      //For each game object in GameObjects_
      for (GameObject& obj : GameObjects_)
      {
          if (paused || (obj.GetStateId() == (int)Engine::Application::instance().GameState_->GetCurrent()))
          {
              if (obj.name_ == name)
              {
                  return obj.id_;
              }
          }
      }
      //If no match found, return 0
      return 0;
  }

  /*!****************************************************************************
  \brief
      Sets which Components this gameobject has
  \param id
      the id of the gameobject
  \param type
      the type of component
  \param state
      whether the gameobject has the component or not
  ******************************************************************************/
  void GameObjectManager::SetComponentBit(ObjectId id, int type, bool state)
  {
    GameObjects_[id].componentBitSet_[type] = state;
  }

  /*!****************************************************************************
  \brief
      When an object has all components removed use to clear objects
      component bitset 
  \param id
      object to clear
  ******************************************************************************/
  void GameObjectManager::ClearComponentBits(ObjectId id)
  {
    GameObjects_[id].componentBitSet_ = 0;
  }

  /*!****************************************************************************
  \brief
      Gets the current size of the object pool
  \return
      the pool size
  ******************************************************************************/
  int GameObjectManager::PoolSize()
  {
    return (int)GameObjects_.size();
  }

  /*!****************************************************************************
  \brief
      Gets the current number of active objects in the pool
  \return
      total number of active objects
  ******************************************************************************/
  int GameObjectManager::TotalActive()
  {
    int count = 0;
    for (GameObject& obj : GameObjects_)
    {
      if (obj.isActive())
        count++;
    }
    return count;
  }
}

```


## CollisionSat.cpp

```cpp
//-----------------------------------------------------------------------------
//
// File Name:	CollisionSAT.cpp
// Author(s):	Steven Kugies
// Team:		Apricat Games
// Course:		Game200
//
// Copyright © 2020 DigiPen (USA) Corporation.
//
//-----------------------------------------------------------------------------

#include "CollisionSystem.h"
#include <glm/detail/func_geometric.inl>


/*!****************************************************************************
\brief
    Uses Seperate Axis Theorem to do a Collision Check between 2 colliders
\param col1
    the first collider 
\param col2
    the second collider
\param CollisionAxis
    the shortest vector to move the colliders to no longer be penetrating
\return
    if there was a collision
******************************************************************************/
bool ECS::CollisionSystem::CollisionSAT(Collider& col1, Collider& col2, glm::vec2& CollisionAxis)
{
  std::vector<glm::vec2>& verts1 = col1.verts_;
  std::vector<glm::vec2>& verts2 = col2.verts_;

  const int totalVerts1 = static_cast<int>(verts1.size());
  const int totalVerts2 = static_cast<int>(verts2.size());

  int axis = 0; /*index of the smallest collision axis*/
  bool shape = 0; /*used to check origin of axis for it's direction*/
  float smallest = FLT_MAX; /*length of smallest collision axis*/

  //First test in regards to the first collider
  for (int vert = 0; vert < totalVerts1; vert++)
  {
    const int nextVert = (vert + 1) % totalVerts1;

    const glm::vec2 normal = { -(verts1.at(nextVert).y - verts1.at(vert).y),
                          verts1.at(nextVert).x - verts1.at(vert).x };


    //used in the next two 'for loops'. Represents a vertex projected onto our normal vector
    float projection;

    //projects each point of collider1 onto normal and saves only the smallest and largest point
    float min1 = 999999;
    float max1 = -999999;
    for (int v = 0; v < totalVerts1; v++)
    {
      projection = (verts1.at(v).x * normal.x + verts1.at(v).y * normal.y);

      if (projection < min1)
        min1 = projection;
      if (projection > max1)
        max1 = projection;
    }

    //projects each point of collider2 onto normal and saves only the smallest and largest point
    float min2 = 999999;
    float max2 = -999999;
    for (int v = 0; v < totalVerts2; v++)
    {
      projection = (verts2.at(v).x * normal.x + verts2.at(v).y * normal.y);

      if (projection < min2)
        min2 = projection;
      if (projection > max2)
        max2 = projection;
    }

    //compares the smallest and largest points of the two objects to check if there is any overlap
    if (!(max2 >= min1 && max1 >= min2))
      return false;

    //finding the smallest collision Axis
    float temp = max1 - min2;
    if (temp < smallest)
    {
      smallest = temp;
      axis = vert;
    }
    temp = max2 - min1;
    if (temp < smallest)
    {
      smallest = temp;
      axis = vert;
    }
  }

  //Second test in regards to the Second collider
  for (int vert = 0; vert < totalVerts2; vert++)
  {
    int nextVert = (vert + 1) % totalVerts2;


    glm::vec2 normal = { -(verts2.at(nextVert).y - verts2.at(vert).y),
                          verts2.at(nextVert).x - verts2.at(vert).x };


    //used in the next two for loops. Represents a vertex projected onto our normal vector
    float projection;

    //projects each point of collider1 onto normal and saves only the smallest and largest point
    float min1 = FLT_MAX;
    float max1 = -FLT_MIN;
    for (int v = 0; v < totalVerts1; v++)
    {
      projection = (verts1.at(v).x * normal.x + verts1.at(v).y * normal.y);

      if (projection < min1)
        min1 = projection;
      if (projection > max1)
        max1 = projection;
    }

    //projects each point of collider2 onto normal and saves only the smallest and largest point
    float min2 = FLT_MAX;
    float max2 = -FLT_MIN;
    for (int v = 0; v < totalVerts2; v++)
    {
      projection = (verts2.at(v).x * normal.x + verts2.at(v).y * normal.y);

      if (projection < min2)
        min2 = projection;
      if (projection > max2)
        max2 = projection;
    }

    //compares the smallest and largest points of the two objects to check if there is any overlap
    if (!(max2 >= min1 && max1 >= min2))
      return false;

    //finding the smallest collision Axis
    float temp = max1 - min2;
    if (temp < smallest)
    {
      smallest = temp;
      axis = vert;
      shape = 1;
    }
    temp = max2 - min1;
    if (temp < smallest)
    {
      smallest = temp;
      axis = vert;
      shape = 1;
    }
  }

  //Axis depends on which shape it came from
  if (shape)
  {
    const int nextVert = (axis + 1) % totalVerts2;
    CollisionAxis = { -(verts2.at(nextVert).y - verts2.at(axis).y),verts2.at(nextVert).x - verts2.at(axis).x };
    CollisionAxis *= -1;
  }
  else
  {
    const int nextVert = (axis + 1) % totalVerts1;
    CollisionAxis = { -(verts1.at(nextVert).y - verts1.at(axis).y),verts1.at(nextVert).x - verts1.at(axis).x };
  }

  float mag = glm::dot(CollisionAxis, CollisionAxis);
  CollisionAxis *= smallest / mag;


  return true;

}


```


<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>

## Application.h

```cpp
//-----------------------------------------------------------------------------
//
// File Name:	Application.cpp
// Author(s):	Ben Schwedler, Erin Scribner, Scott Fado-Bristow, 
//            Steven Kugies, Yi-Chun Chen
// Team:		  Apricat Games
// Course:		Game200
//
// Copyright © 2020 DigiPen (USA) Corporation.
//
//-----------------------------------------------------------------------------
#include <Windows.h>
#include "Application.h"
#include <chrono>
#include "Message.h"
#include "WindowSystem.h"
#include "Level1.h" //main level
#include "GameOverLevel.h" //game over screen
#include "GameWonLevel.h" //winner screen
#include "LevelA.h"
#include "ScottLevel.h"
#include "AlexLevel.h"
#include "SoundLevel.h"
#include "../Utilities/window/DebugWindow.h"
#include "../Utilities/window/EditorWindow.h"
#include "../Utilities/window/SystemsInfoWindow.h"
#include "FMODSystem.h"
#include "StevenLevel.h"
#include "TitleScreen.h"
#include "SplashScreen.h"
#include "OptionsLevel.h"
#include "Credits.h"
#include "LevelExit.h"
#include "GamePauseLevel.h"
#include "ObjectEditor.h"
#include "HowToPlayLevel.h"
#include "CreditsPause.h"
namespace Engine
{
  Application Application::instance_;


  float GetFixedDeltaTime(std::chrono::steady_clock::time_point& current);


  /*!****************************************************************************
  \brief
      CONSTRUCTOR of Application
  ******************************************************************************/
  Application::Application() : lightSource_()
  {
    //This is first, due to how the subscribe stuff is working right now
    messageBus_ = new Message::MessageBus();

    //The managers are up here due to default meshes being assigned
    meshManager_ = new Manager::MeshManager();
    spriteSourceManager_ = new Manager::SpriteSourceManager();

    ECS_ = new ECS::ECSystem;
    GameState_ = new GameStateManager;

    objectArchetypeManager_ = new Manager::GameObjectArchManager();

    isRunning = true;
    windowSystem = nullptr;
    renderer = nullptr;
    Editor = nullptr;
    FMODSystemInstance = nullptr;
    camera_ = nullptr;
    perspCamera_ = nullptr;

    //DebugData.SetBig();


    //temp
    GameState_->GameStateAdd(new Level1);
    GameState_->GameStateAdd(new LevelA);
    GameState_->GameStateAdd(new ScottLevel(true));
    GameState_->GameStateAdd(new AlexLevel);
    GameState_->GameStateAdd(new SoundLevel);
    GameState_->GameStateAdd(new StevenLevel);
    //If there is a true boolean, it is a pause state
    GameState_->GameStateAdd(new GameOver(true));
    GameState_->GameStateAdd(new GameWon(true));
    GameState_->GameStateAdd(new TitleScreen);
    GameState_->GameStateAdd(new SplashScreen);
    GameState_->GameStateAdd(new OptionsLevel(true));
    GameState_->GameStateAdd(new HowToPlayLevel(true));
    //If there is a true boolean, it is a pause state
    GameState_->GameStateAdd(new Credits(true));
    GameState_->GameStateAdd(new LevelExit);
    //If there is a true boolean, it is a pause state
    GameState_->GameStateAdd(new GamePause(true));
    GameState_->GameStateAdd(new ObjectEditor);
    GameState_->GameStateAdd(new CreditsPause(true));
  }

  /*!****************************************************************************
  \brief
      DESTRUCTOR of Application
  ******************************************************************************/
  Application::~Application()
  {

#ifdef _Editor
      DebugData.Write();
#endif // 


    delete Editor;
    delete renderer;
    delete windowSystem;
    delete ECS_;
    delete meshManager_;
    delete spriteSourceManager_;
    delete FMODSystemInstance;
    delete messageBus_;
    delete camera_;
    delete perspCamera_;
    for (int i = 0; i < MAX_LIGHT_NUM; ++i)
    {
      delete lightSource_[i];
    }
  }

  /*!****************************************************************************
  \brief
      Initializes various parts of the application
  \param  title
      the title of the application
  \param width
      width of the window
  \param height
      height of the window
  \param fullscreen
      if the window should start in fullscreen
  ******************************************************************************/
  void Application::Init(const char* title, int width, int height, bool fullscreen)
  {
    windowSystem = new WindowSystem(title, width, height, fullscreen);
    renderer = new Renderer();
    FMODSystemInstance = new FMODNamespace::FMODSystem();
#if 0
    camera_ = new Camera(
      Camera::PROJ_TYPE::ORTHO,
      glm::vec3(0.0f, 0.0f, 1.0f), // Position.
      glm::vec3(0.0f, 0.0f, 0.0f), // Target.
      glm::vec3(0.0f, 1.0f, 0.0f), // World up.
      90.0f, // FOV.
      (float)windowSystem->GetWidth() / (float)windowSystem->GetHeight(), // Aspect ratio.
      0.1f, // Near plane.
      1000.0f // Far plane.
    );
#else
    camera_ = new Camera(
      Camera::PROJ_TYPE::PERSP,
      glm::vec3(0.0f, 0.0f, 360.0f), // Position.
      glm::vec3(0.0f, 0.0f, 0.0f), // Target.
      glm::vec3(0.0f, 1.0f, 0.0f), // World up.
      90.0f, // FOV.
      (float)windowSystem->GetWidth() / (float)windowSystem->GetHeight(), // Aspect ratio.
      0.1f, // Near plane.
      1000.0f // Far plane.
    );
#endif
    // Create light sources.
    for (int i = 0; i < MAX_LIGHT_NUM; ++i)
    {
      lightSource_[i] = new LightSource(i, glm::vec2(0.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), 1.0f, 1500.0f, 1.9f);
    }
    // Hard code the light sources.
    lightSource_[1]->SetIntensity(0.7f);
    lightSource_[1]->SetPosition(glm::vec2(8496.0f, 2813.0f));
    lightSource_[2]->SetIntensity(0.7f);
    lightSource_[2]->SetPosition(glm::vec2(29857.0f, 7356.0f));
    lightSource_[3]->SetIntensity(0.7f);
    lightSource_[3]->SetPosition(glm::vec2(47951.0f, 10427.0f));
    


#ifdef _Editor
    Editor = new ImGuiManager(windowSystem->GetWindow());

    Editor->AddWindow(new DebugWindow);
    Editor->AddWindow(new EditorWindow);
    Editor->AddWindow(new SystemsInfoWindow);
    BaseWindow* OEwindow_ = Application::instance().Editor->AddWindow(new ObjectEditorWindow);
    OEwindow_->Toggle();
#endif //_NO_EDITOR
    //GameState_->GameStateNextGameState(GameStateManager::TestLevel);
    glfwSetInputMode(windowSystem->GetWindow(), GLFW_CURSOR, GLFW_CURSOR_HIDDEN);


  }


  /*!****************************************************************************
  \brief
      The Main Game Loop
      based on: https://gafferongames.com/post/fix_your_timestep/
  ******************************************************************************/
  void Application::Run()
  {
    //how much time has passed since startup       
    float t = 0.0f;


    auto currentTime = std::chrono::steady_clock::now();
    //how much time has passed since last update
    float accumulator = dt;

    while (isRunning && !windowSystem->WindowShouldClose())
    {
      //get time since last update
      const float delta = GetFixedDeltaTime(currentTime);

      //checks for input
      //----------------
      //Checks windows messaging for new keyboard events
      windowSystem->PollEvents();
      //keyInput_->UpdateKeys();

      HandleEvents(delta);
      /*Message* msg = new Message(1);
      ECS_->BroadcastMessage(msg, 1.0f, 0);
      delete(msg);
      */

      //add how much time has passed since previous update
      accumulator += delta;
      //fixed game update
      while (accumulator >= dt)
      {
        // game systems update
        // -----------------
        if (windowSystem->GetWindowState() != WindowSystem::WINDOW_STATE::MINIMIZED)
        {
          Engine::Application::instance().FMODSystemInstance->ControlPause(false);
          Update(dt);
        }
        else
        {
          Engine::Application::instance().FMODSystemInstance->ControlPause(true);
            //Update only FMODSystem because we need it to process the pause request.
          FMODSystemInstance->Update();
        }

        

        accumulator -= dt;
        t += dt;
      }

      // render
      // ------
      const float alpha = accumulator / dt;
      renderer->Clear(glm::vec4(244.0f / 255.0f, 241.0f / 255.0f, 234.0f / 255.0f, 1.0f));
      renderer->SetShader(Shader::SHADER_TYPE::LIGHTING);
      //renderer->SetShader(Shader::SHADER_TYPE::DEFAULT);
      Render(alpha);
      windowSystem->SwapBuffers();
    }
  }

  /*!****************************************************************************
  \brief
      where input is processed
  \param dt
      how much time since the previous update
  ******************************************************************************/
  void Application::HandleEvents(float dt)
  {
    //Here will lie stuff for handling Windows Messages
    //This needs WinMain()
    windowSystem->ProcessInput(); // Testing. -Alex
  }

  /*!****************************************************************************
  \brief
      the main Render call
  \param dt
      percent until the next fixed update. Used to interpolate between
      previous and current positions      
  ******************************************************************************/
  void Application::Update(float dt)
  {
    //Game State Manager
    GameState_->GameStateUpdate(dt);


    //GameObject Manager/ECS
    ECS_->Update(dt);

    //Update FMOD after the level and the objects have been updated
    FMODSystemInstance->Update();
  }

  /*!****************************************************************************
  \brief
      where input is processed
  \param dt
      how much time since the previous
  ******************************************************************************/
  void Application::Render(float dt)
  {
    ECS_->Draw(dt);


#ifdef _Editor

    Editor->Update();

#endif // _EDITOR
  }

  /*!****************************************************************************
  \brief
      gets the timestep
  \return
      the timestep
  ******************************************************************************/
  float Application::GetTimeStep()
  {
    return dt;
  }

  /*!****************************************************************************
  \brief
      change the timestep
  \param timestep
      value to set timestep to
  ******************************************************************************/
  void Application::SetTimeStep(float timestep)
  {
    dt = timestep;
  }


  /*!****************************************************************************
  \brief
      given a point in time return how much time has passed since then
  \param current
      the time at the start of the previous frame
  ******************************************************************************/
  float GetFixedDeltaTime(std::chrono::steady_clock::time_point& current)
  {
    auto newTime = std::chrono::steady_clock::now();
    auto duration = std::chrono::duration<float>(newTime - current);
    float frameTime = duration.count();
    current = newTime;

    if (frameTime > 0.25f)
      frameTime = 0.25f;

    return frameTime;
  }
}

```




<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>

