document.addEventListener("DOMContentLoaded", function () {
    loadContent("tiktaktoe.html");
    document.getElementById("tiktaktoe-link").addEventListener("click", function (event) {
        event.preventDefault();
        loadContent("tiktaktoe.html");
    });

    document.getElementById("hexcolor-link").addEventListener("click", function (event) {
        event.preventDefault();
        loadContent("hexcolor.html");
    });
});
