
<div id='stars'></div>
<div id='stars2'></div>
<div id='stars3'></div>
<div id='stars4'></div>


```dataviewjs
const saveCursorPosition = function(x, y) {
  document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }
  
}

document.addEventListener('mousemove', e => { saveCursorPosition(e.clientX, e.clientY); })
```

<div id="cards">
  <div class="card">
    <div class="card-content">
      <div class="card-image">
        <i class="fa-duotone fa-apartment"></i>
      </div>
      <div class="card-info-wrapper">
        <div class="card-info">
          <i class="fa-duotone fa-apartment"></i>
          <div class="card-info-title">
            <h3>Projects</h3>  
          </div>    
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <div class="card-image">
        <i class="fa-duotone fa-unicorn"></i>
      </div>
      <div class="card-info-wrapper">
        <div class="card-info">
          <i class="fa-duotone fa-unicorn"></i>
          <div class="card-info-title">
            <h3>Blog</h3>  
          </div>    
        </div>  
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <div class="card-image">
        <i class="fa-duotone fa-blender-phone"></i>
      </div>
      <div class="card-info-wrapper">
        <div class="card-info">
          <i class="fa-duotone fa-blender-phone"></i>
          <div class="card-info-title">
            <h3>Tutorials</h3>  
                      </div>    
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <div class="card-image">
        <i class="fa-duotone fa-person-to-portal"></i>
      </div>
      <div class="card-info-wrapper">
        <div class="card-info">
          <i class="fa-duotone fa-person-to-portal"></i>
          <div class="card-info-title">
            <h3>Contact</h3>  
          </div>    
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <div class="card-image">
        <i class="fa-duotone fa-person-from-portal"></i>
      </div>
      <div class="card-info-wrapper">
        <div class="card-info">
          <i class="fa-duotone fa-person-from-portal"></i>
          <div class="card-info-title">
            <h3>Resume</h3>  
          </div>    
        </div>
      </div>
    </div>
  </div>
  
  
</div>





>[!multi-column|no-wrap]

> [!multi-column|center-fixed-medium]
>
>> [!info|wide-3]+  New Files
>> ![[Recent New Files]] 
>
>> [!info|wide-2]+  Recent Changes
>> ![[Recently Edited]] 
>





\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
<tab>
