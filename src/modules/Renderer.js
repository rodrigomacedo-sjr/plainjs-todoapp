const Renderer = (function() {
  const content = document.getElementById("content");
  const innerPage = document.getElementById("inner-page");

  const replaceContent = function(div) {
    content.replaceChild(div);
  };

  const replaceInnerPage = function(div) {
    innerPage.replaceChild(div);
  };

  return {
    replaceContent,
    replaceInnerPage,
  };
})();

export default Renderer;
