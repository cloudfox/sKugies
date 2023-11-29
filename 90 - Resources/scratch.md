
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
            <h3>Apartments</h3>  
            <h4>Places to be apart. Wait, what?</h4>
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
            <h3>Unicorns</h3>  
            <h4>A single corn. Er, I mean horn.</h4>
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
            <h3>Blender Phones</h3>  
            <h4>These absolutely deserve to exist.</h4>
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
            <h3>Adios</h3>  
            <h4>See you...</h4>
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
            <h3>I mean hello</h3>  
            <h4>...over here.</h4>
          </div>    
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <div class="card-image">
        <i class="fa-duotone fa-otter"></i>
      </div>
      <div class="card-info-wrapper">
        <div class="card-info">
          <i class="fa-duotone fa-otter"></i>
          <div class="card-info-title">
            <h3>Otters</h3>  
            <h4>Look at me, imma cute lil fella.</h4>
          </div>    
        </div>
      </div>
    </div>
  </div>
</div>

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
