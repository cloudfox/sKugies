var tinylyticsScript = document.createElement('script');
tinylyticsScript.defer = true;
tinylyticsScript.src = 'https://tinylytics.app/embed/yDCHZhK672zD5-bq17Dx.js';
document.head.appendChild(tinylyticsScript);


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



