var t = document.querySelectorAll(".grid");
var sorting = false;
var timeout = [];
var oper = [];

document.addEventListener("keydown", function (event) {
  if (event.key == "Enter") document.querySelector(".start").onclick();
});

for (var i = 0; i < 10; i++) {
  var h = 5 + Math.floor(Math.random() * 95);
  t[i].style.height = h + "%";
}
function changReload() {
  var m = document.querySelector(".newval");
  var n = document.querySelector(".start");
  m.innerText = "Reload";
  n.innerText = "Reload";
  m.setAttribute("onclick", "Reload()");
  n.setAttribute("onclick", "Reload()");
}
function Reload() {
  location.reload();
}

function MAIN() {
  clearTimeout();
  var opt = document.querySelector(".sorting-tech").value;
  if (!sorting) {
    switch (opt) {
      case "bubble":
        bubbleSort(t);
        break;
      case "merge":
        mergeSort(t);
        break;
      // case "quick":
      //   quickSort();
      //   break;
      // case "selction":
      //   selctionSort();
      //   break;
      // case "insertion":
      //   insertionSort();
      //   break;
      // case "heap":
      //   heapSort();
      //   break;
    }
  }
}

function clearTime() {
  for (var i = 0; i < timeout.length; i++) {
    window.clearTimeout(timeout[i]);
  }
  timeout = [];
}
function chang() {
  clearTime();
  if (sorting) changReload();
  for (var i = 0; i < t.length; i++) {
    var h = 5 + Math.floor(Math.random() * 95);
    t[i].style.height = h + "%";
  }
}
function change() {
  clearTime();
  if (sorting) changReload();
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
  chang();
}

function get(ind) {
  var k = t[ind].style.height;
  if (k.length == 3) k = k.substring(0, 2);
  else k = k.substring(0, 1);
  return parseInt(k);
}
function set(ind, val) {
  t[ind].style.height = val + "%";
}
function swap(x, y) {
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
  return Math.ceil(3000 / oper.length);
}

function bubbleSort(t) {
  oper = [];
  clearTime();
  timeout = [];
  sorting = true;
  var le = t.length;
  var a = [];
  for (var i = 0; i < le; i++) a.push(get(i));
  for (var i = 0; i < le; i++) {
    for (var j = 0; j < le - i - 1; j++) {
      oper.push([funr, j, j + 1]);
      if (a[j] > a[j + 1]) {
        var t = a[j];
        a[j] = a[j + 1];
        a[j + 1] = t;
        oper.push([swap, j, j + 1]);
      }
      oper.push([funb, j, j + 1]);
    }
  }
  run(oper);
}

function mergeSort(t) {
  oper = [];
  clearTime();
  timeout = [];
  sorting = true;
  var le = t.length;
  var a = [];
  for (var i = 0; i < le; i++) a.push(get(i));
  mergesort(a, 0, le - 1);
  run(oper);
}
function mergesort(arr, b, e) {
  if (b < e) {
    var m = Math.floor((b + e) / 2);
    mergesort(arr, b, m);
    mergesort(arr, m + 1, e);
    merge(arr, b, m, e);
  }
  return;
}
function merge(arr, b, m, e) {
  var len1 = m - b + 1,
    len2 = e - m;
  var l = [];
  var r = [];
  for (var i = 0; i < len1; i++) l[i] = arr[b + i];
  for (var i = 0; i < len2; i++) r[i] = arr[m + 1 + i];
  var i = 0,
    j = 0,
    k = b;
  while (i < len1 && j < len2) {
    if (l[i] < r[j]) {
      arr[k] = l[i];
      oper.push([funr, k, k]);
      oper.push([set, k, l[i]]);
      oper.push([funb, k, k]);
      k++;
      i++;
    } else {
      arr[k] = r[j];
      oper.push([funr, k, k]);
      oper.push([set, k, r[j]]);
      oper.push([funb, k, k]);
      k++;
      j++;
    }
  }
  while (i < len1) {
    arr[k] = l[i];
    oper.push([funr, k, k]);
    oper.push([set, k, l[i]]);
    oper.push([funb, k, k]);
    k++;
    i++;
  }
  while (j < len2) {
    arr[k] = r[j];
    oper.push([funr, k, k]);
    oper.push([set, k, l[i]]);
    oper.push([funb, k, k]);
    k++;
    j++;
  }
  return;
}

//---------------------------------------
function run(op) {
  var ti = 0;
  var tgap = timegap(t.length);
  for (var i = 0; i < op.length; i++) {
    timeout[i] = setTimeout(op[i][0], ti, op[i][1], op[i][2]);
    ti += tgap;
  }
  timeout.push(
    setTimeout(function () {
      sorting = false;
    }, ti)
  );
}
