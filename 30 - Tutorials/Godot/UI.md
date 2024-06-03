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

private void resume()
{
	GetTree().Paused = false;
}

void pause()
{
	GetTree().Paused = true;
}


public override void _Process(double delta)
{
	if (Input.IsActionPressed("pause"))
	{
		if(GetTree().Paused == true)
			resume();			
		else
			pause();
	}
}
```
## HUD


