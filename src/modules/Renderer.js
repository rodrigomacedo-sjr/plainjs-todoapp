const Renderer = (function() {
  let content = document.getElementById("content");
  if (content === null) {
    content = document.createElement("div");
    content.id = "content";
    document.body.appendChild(content);
  }

  let innerPage = document.getElementById("inner-page");
  if (innerPage === null) {
    innerPage = document.createElement("div");
    innerPage.id = "inner-page";
    content.appendChild(innerPage);
  }

  const replaceContent = function(div) {
    content.innerHTML = "";
    content.appendChild(div);
    content.appendChild(innerPage);
  };

  const replaceInnerPage = function(div) {
    innerPage.innerHTML = "";
    innerPage.appendChild(div);
  };

  const replaceInnerPageCallback = function(div) {
    return function() {
      Renderer.replaceInnerPage(div);
    };
  };

  return {
    replaceContent,
    replaceInnerPage,
    replaceInnerPageCallback,
  };
})();

export default Renderer;
