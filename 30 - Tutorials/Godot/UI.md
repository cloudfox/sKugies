---
tags: 
creation date: dateformat(file.ctime, "DD")
updated: Monday, June 3rd 2024, 8:17:37 am
publishurl:
date created: Friday, May 31st 2024, 12:45:12 am
---

## Main Menu

### Level Transition

get_tree().change_scene_to_file()
get_tree().quit()

GetTree().
GetTree().ReloadCurrentScene();


## Options

### Pause/Unpause
https://docs.godotengine.org/en/stable/tutorials/scripting/pausing_games.html


```c#
using Godot;
using System;

public partial class PauseMenu : Control
{
	private void resume()
	{
		GD.Print("Unpause");
		this.Set("visible", false);
		GetTree().Paused = false;
	}
	
	void pause()
	{
	 	GD.Print("pause");
		this.Set("visible", true);
		GetTree().Paused = true;
	}
	
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
	}

	// Called every frame. 'delta' is the elapsed time since the previous frame.
	public override void _Process(double delta)
	{
		if (Input.IsActionJustPressed("Pause"))
		{
			if(GetTree().Paused == true)
			{				
				resume();
			}
			else
			{		
				pause();
			}
		}
	}
	
	private void _on_resume_pressed()
	{
		resume();
	}
	
	private void _on_restart_pressed()
	{
		GetTree().Paused = false;
		GetTree().ReloadCurrentScene();
	}
	
	private void _on_quit_game_pressed()
	{
		GetTree().Paused = false;
		GetTree().ChangeSceneToFile("res://scenes/main_menu.tscn");
	}		
}
```

> [!Warning]  When changing scenes remember to unpause the tree


## HUD


