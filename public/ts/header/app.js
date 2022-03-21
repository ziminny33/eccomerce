/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./resources/ts/header/app.ts ***!
  \************************************/
window.header = function () {
  var _window$fillVariables = window.fillVariables,
      isMobile = _window$fillVariables.isMobile,
      categories = _window$fillVariables.categories;
  var textHeader = document.querySelector(".global-header-company-name");
  var main = document.querySelector("main");
  var containerLogo = document.querySelector(".global-header-logo");
  var logo = document.querySelector(".global-header-logo-image");
  var text = document.querySelector(".global-header-company-name");
  var header = document.querySelector("header");
  console.log(isMobile);

  if (!isMobile) {
    textHeader.textContent = categories.Name;
    header.style.backgroundColor = "#f5f5f5";
    header.style.borderBottom = ".3px solid #DDDDDD";
    header.style.justifyContent = "stretch";
    header.style.height = "80px";
    main.style.paddingTop = "100px"; //Scroll

    window.addEventListener("scroll", function (e) {
      var top = window.scrollY;

      if (top > 60) {
        header.style.backgroundColor = "rgba(245,245,245,.9";
        header.style.height = "40px";
        containerLogo.style.marginRight = "8px";
        header.style.justifyContent = "center";
        logo.style.height = "18px";
        text.style.fontSize = "16px";
      } else {
        header.style.backgroundColor = "#f5f5f5";
        header.style.height = "80px";
        containerLogo.style.marginRight = "20px";
        header.style.justifyContent = "stretch";
        logo.style.height = "36px";
        text.style.fontSize = "18px";
      }
    });
  }
};
/******/ })()
;