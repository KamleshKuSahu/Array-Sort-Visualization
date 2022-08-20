var t = document.querySelectorAll(".grid");
var sorting = false;
var timeout = [];
document.querySelector(".start").addEventListener("click", function (event) {
  clearTimeout();
  if (!sorting) bubbleSort();
});

for (var i = 0; i < 10; i++) {
  var h = 5 + Math.floor(Math.random() * 95);
  t[i].style.height = h + "%";
}
function clearTimeOut() {
  // setTimeout(() => {

  // }, 1000000);
  for (var i = 0; i < timeout.length; i++) {
    clearTimeout(timeout[i]);
  }
  // timeout = [];
}
function change() {
  clearTimeOut();
  var s = document.querySelector(".size").value;
  if (s >= t.length) {
    var si = s - t.length,
      xx = t.length;
    for (var i = 0; i < si; i++) {
      var ele = document.createElement("div");
      ele.className = "grid";
      ele.id = "l" + xx;
      xx++;
      var h = 5 + Math.floor(Math.random() * 95);
      ele.style.height = h + "%";
      document.querySelector(".container").append(ele);
    }
  } else {
    var si = t.length - 1;
    for (var i = si; i >= s; i--) {
      var ti = document.querySelector(".container");
      var xx = document.querySelector("#l" + i);
      ti.removeChild(xx);
    }
  }
  t = document.querySelectorAll(".grid");
}

function get(ind) {
  var k = t[ind].style.height;
  if (k.length == 3) k = k.substring(0, 2);
  else k = k.substring(0, 1);
  return parseInt(k);
}
function set(ind, val) {
  t[ind].style.height = val;
}
function swap(x, y) {
  funr(x, y);
  var co1 = t[x].style,
    co2 = t[y].style;
  var t1 = get(x),
    t2 = get(y);
  if (t1 > t2) {
    co1.height = t2 + "%";
    co2.height = t1 + "%";
  }
}
function funr(x, y) {
  var co1 = t[x].style,
    co2 = t[y].style;
  co1.backgroundColor = "red";
  co2.backgroundColor = "red";
}
function funb(x, y) {
  var co1 = t[x].style,
    co2 = t[y].style;
  co1.backgroundColor = "black";
  co2.backgroundColor = "black";
}

function timegap(leng) {
  if (leng < 20) return 200;
  else if (leng < 50) return 10;
  else if (length < 80) return 3;
  else return 1;
}

function bubbleSort() {
  sorting = true;
  var l = t.length;
  var ti = 1,
    tgap = 10;
  for (var i = 0; i < l; i++) {
    for (var j = 0; j < l - i - 1; j++) {
      var x = j,
        y = j + 1;
      ti += tgap;
      timeout.push(setTimeout(swap, ti, x, y));
      ti += tgap;
      timeout.push(setTimeout(funb, ti, x, y));
    }
  }
  timeout.push(
    setTimeout(() => {
      sorting = false;
    }, ti)
  );
}
