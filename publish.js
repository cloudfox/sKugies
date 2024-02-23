function injectScript(src) {
        return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', resolve);
        script.addEventListener('error', e => reject(e.error));
        document.body.appendChild(script);
    });
}


injectScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js')
    .then(() => {
        console.log("script loaded");
    }).catch(error  => {
    console.log(error);
    });
    

