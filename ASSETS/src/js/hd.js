window.onload = function() {
  function byId(id) {
    return typeof id === "string" ? document.getElementById(id) : id;
  }
  function byCName(name) {
    return typeof name === "string"
      ? document.getElementsByClassName(name)
      : name;
  }
  // trash btn delete action;
  function deleteAction(e) {
    currentDOM = e.target;
    currentDOM.parentNode.parentNode.removeChild(currentDOM.parentNode);
  }
  // get the dom once to combine the function ;
  var leftClose = byId("leftClose");
  var popClose = byId("close");
  var addResource = byId("add");
  var cancel = byId("cancel");
  var userAction = byId("userAction");
  var addPlusBtn = byCName("icon-plus");
  var deleteResource = byCName("icon-trash");
  var popupWindow = byId("popup");
  var saveDOM = null;
  var navBtn = byId("navBtn");
  var navLeftDom = byCName("container")[0].getElementsByClassName(
    "nav-left"
  )[0];
  var userActionDom = byCName("customAction");
  var popupbackground = byCName("popupContainer")[0];
  var triangle = byId("triangle");

  navBtn.onclick = function() {
    navLeftDom.style.display = "block";
  };
  leftClose.onclick = function() {
    navLeftDom.style.display = "none";
  };

  userAction.onclick = function(e) {
    var currentDOM = e.target;

    if (currentDOM.getAttribute("class") == "icon-angle-up") {
      if (userActionDom.length > 0) {
        for (var i = 1; i < userActionDom.length; i++) {
          userActionDom[i].style.display = "none";
        }
      }
      currentDOM.setAttribute("class", "icon-angle-down");
    } else {
      if (userActionDom.length > 0) {
        for (var i = 1; i < userActionDom.length; i++) {
          userActionDom[i].style.display = "block";
        }
      }
      currentDOM.setAttribute("class", "icon-angle-up");
    }
  };
  if (addPlusBtn.length > 0) {
    // console.log(add)
    for (var i = 0; i < addPlusBtn.length; i++) {
      addPlusBtn[i].onclick = function(e) {
        // chcek viewport width;

        var viewWidth = window.innerWidth;
        saveDOM = e.target;
        if (viewWidth > 767 && viewWidth < 1024) {
          triangle.style.display = "none";
          popupbackground.style.display = "block";
          popupWindow.style.display = "block";
          popupWindow.style.top = "30%";
          popupWindow.style.left = viewWidth / 2 - 285 + "px";
          return;
        }
        triangle.style.display = "block";
        if (popupWindow.style.display == "block") {
          return;
        }

        var h = mytop(saveDOM) + 30 + 10;
        var l = myleft(saveDOM);
        popupWindow.style.position = "absolute";
        popupWindow.style.top = h + "px";
        popupWindow.style.left = l + "px";
        popupWindow.style.display = "block";
        byId("inputvalue").focus();
      };
    }
  }

  var mytop = function getOffsetTop(el) {
    return el.offsetParent
      ? el.offsetTop + getOffsetTop(el.offsetParent)
      : el.offsetTop;
  };

  var myleft = function getOffsetLeft(el) {
    return el.offsetParent
      ? el.offsetLeft + getOffsetLeft(el.offsetParent)
      : el.offsetLeft;
  };

  // close the popup windson function ;
  popClose.onclick = function() {
    popupWindow.style.display = "none";
    popupbackground.style.display = "none";
  };
  // delete btn on showlist part
  if (deleteResource.length > 0) {
    for (var i = 0; i < deleteResource.length; i++) {
      deleteResource[i].onclick = deleteAction;
    }
  }
  // add plus btn action;
  addResource.onclick = function(e) {
    var value = byId("inputvalue").value;
    // no value do nothing
    if (!value) {
      popClose.onclick();
      return;
    }
    value = value.split(",");
    if (value.length > 0) {
      for (var i = 0; i < value.length; i++) {
        var domh =
          '<span class="OSname">' +
          value[i].replace(/\</gi, "&lt;") +
          '</span><span class="icon-trash"></span>';
        var para = document.createElement("button");
        var node = document.createTextNode("");
        var att = document.createAttribute("class");
        att.value = "button-style";
        para.innerHTML = domh;
        para.appendChild(node);
        para.setAttributeNode(att);
        console.log(para);
        var Dtrash = para.childNodes[1];
        // create the dome and combile the delete action for each new trash icon dom;
        Dtrash.onclick = deleteAction;
        saveDOM.parentElement.appendChild(para);
        byId("inputvalue").value = "";
        popClose.onclick();
      }
    }
  };
  // popup window cancel and cross btn action;
  cancel.onclick = function() {
    byId("inputvalue").value = "";
    popClose.onclick();
  };
};
