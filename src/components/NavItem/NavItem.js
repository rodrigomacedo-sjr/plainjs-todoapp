const NavItem = function(title, callBack) {
  const item = document.createElement("div");
  item.className = "nav-item";
  item.textContent = title;

  item.addEventListener("click", callBack);

  return item;
};

export default NavItem;
