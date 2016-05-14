var numStack = [1, 2, 3, 5, 4];


//渲染
function renderStack() {
  var wrapper = "";
  for (var n in numStack) {
    wrapper += "<div class='wrap'>" + numStack[n] + "</div>";
  }
  console.log(wrapper);
  // document.getElementById("stack").innerHTML(wrapper);
  document.getElementById('stack').innerHTML = wrapper;
}

//左侧插入按钮时间处理方法
function leftInsert() {
  var text = document.getElementById('text');
  if (isNaN(text.value)) {
    alert("请输入数字！");
    return;
  }
  numStack.unshift(text.value);
  renderStack();
}

//右侧插入
function rightInsert() {
  var text = document.getElementById('text');
  if (isNaN(text.value)) {
    alert("请输入数字！");
    return;
  }
  numStack.push(text.value);
  renderStack();
}

//左侧出
function leftOut() {
  if (numStack.length === 0) {
    alert("没有东西可以出来了。。");
    return;
  }
  var temp = numStack.shift();
  renderStack();
  alert(temp);
}

//右侧出
function rightOut() {
  if (numStack.length === 0) {
    alert("没有东西可以出来了。。");
    return;
  }
  var temp = numStack.pop();
  renderStack();
  alert(temp);
}

//按钮事件绑定
function initButton() {
  document.getElementById('left-insert').addEventListener("click", leftInsert, false);
  document.getElementById('right-insert').addEventListener("click", rightInsert, false);
  document.getElementById('left-out').addEventListener("click", leftOut, false);
  document.getElementById('right-out').addEventListener("click", rightOut, false);
}

function init() {
  renderStack();
  initButton();
}

init();
