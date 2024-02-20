var cppEditor = CodeMirror.fromTextArea(document.getElementById("cpp-code"), {
    lineNumbers: true,
    matchBrackets: true,
    mode: "text/x-c++src"
});