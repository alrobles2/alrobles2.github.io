'use strict';

function $$(expr, context) {
  var arr = Array.prototype.slice.call((context || document).querySelectorAll(expr), 0);
  return arr.length > 1 ? arr : arr[0];
}

var viewModel = function () {

  var currentMath = 1,
      snapCurrentPath = undefined,
      speed = 1000;

  var $drawing = $$('.drawing'),
      $info = $$('.info'),
      paper = Snap('#svg-some-math-dances'),
      $svg = $$('#svg-some-math-dances');

  function updateMath() {

    var $currentMathFunction = $$('.svg-dynamic .f' + currentMath, $svg);
    var d1 = $$('.from', $currentMathFunction).getAttribute('d');
    var d2 = $$('.to', $currentMathFunction).getAttribute('d');

    if (!snapCurrentPath) {
      snapCurrentPath = paper.path(d1).attr({
        id: 'currentPath',
        stroke: 'black'
      });
    } else {
      snapCurrentPath = paper.select('#currentPath');
    }

    // Adding custom properties to snap.svg object
    snapCurrentPath.myCustom = {
      path1: d1,
      path2: d2,
      nextPath: d2,
      direction: 0
    };
  }

  function loop() {

    snapCurrentPath.animate({
      d: snapCurrentPath.myCustom.nextPath
    }, speed, mina.easeinout, function () {

      // Update
      if (snapCurrentPath.myCustom.direction) {
        snapCurrentPath.myCustom.direction = 0;
        snapCurrentPath.myCustom.nextPath = snapCurrentPath.myCustom.path2;
      } else {
        snapCurrentPath.myCustom.direction = 1;
        snapCurrentPath.myCustom.nextPath = snapCurrentPath.myCustom.path1;
      }

      // Loop
      loop();
    });
  }

  function update(text) {
    updateMath();
    $info.innerHTML = 'y = ' + text;
  }

  update('k');
  loop();

  //calculateSvgDataPathExample();

  return {
    f1: function f1(element) {
      currentMath = 1;
      update(element.innerHTML);
    },
    f2: function f2(element) {
      currentMath = 2;
      update(element.innerHTML);
    },
    f3: function f3(element) {
      currentMath = 3;
      update(element.innerHTML);
    },
    f4: function f4(element) {
      currentMath = 4;
      update(element.innerHTML);
    },
    f5: function f5(element) {
      currentMath = 5;
      update(element.innerHTML);
    },
    f6: function f6(element, event) {
      currentMath = 6;
      update(element.innerHTML);
    },
    f7: function f7(element) {
      currentMath = 7;
      update(element.innerHTML);
    },
    f8: function f8(element) {
      currentMath = 8;
      update(element.innerHTML);
    },
    f9: function f9(element) {
      currentMath = 9;
      update(element.innerHTML);
    },
    showFps: showFps
  };

  function calculateSvgDataPathExample() {
    var _Math, _Math2;

    // example for y = k * x^2

    var datay = [],
        datayy = [],
        datax = [],
        k = 1,
        xmin = 25,
        xmax = 75,
        xlen = xmax - xmin;

    for (var i = -xlen / 2; i <= xlen / 2; i++) {
      var y = i * i * k;
      datay.push(y);
    }
    for (var i = xmin; i <= xmax; i++) {
      datax.push(i);
    }

    // Normalize range to new range
    // stackoverflow.com/questions/929103/convert-a-number-range-to-another-range-maintaining-ratio
    var OldMin = (_Math = Math).min.apply(_Math, datay),
        OldMax = (_Math2 = Math).max.apply(_Math2, datay),
        NewMin = 40,
        NewMax = 60,
        OldRange = OldMax - OldMin,
        NewRange = NewMax - NewMin;

    for (var i = 0; i < datay.length; i++) {
      var OldValue = datay[i],
          NewValue = (OldValue - OldMin) * NewRange / OldRange + NewMin;
      datayy.push(+NewValue.toFixed(2));
    }
    var arr1 = [],
        arr2 = [];

    for (var i = 0; i < datax.length; i++) {
      var x = datax[i],
          y1 = datayy[i],
          y2 = datayy[datax.length - 1 - i];

      if (i == 0) arr1.push('m' + x + ',' + y1);else arr1.push('L' + x + ',' + y1);
      if (i == 0) arr2.push('m' + x + ',' + +(-1 * (y2 - NewMin) + NewMin).toFixed(2));else arr2.push('L' + x + ',' + +(-1 * (y2 - NewMin) + NewMin).toFixed(2));
    };

    var path1 = arr1.reduce(function (p, c) {
      return p + ' ' + c;
    });
    var path2 = arr2.reduce(function (p, c) {
      return p + ' ' + c;
    });

    document.querySelector('.example1', $svg).setAttribute('d', path1);
    document.querySelector('.example2', $svg).setAttribute('d', path2);
  }

  // Stats.js
  function showFps() {
    var script = document.createElement('script');
    script.onload = function () {
      var stats = new Stats();
      stats.domElement.style.cssText = 'position:fixed;left:0;top:0;z-index:10000';
      document.body.appendChild(stats.domElement);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    script.src = '//cdn.rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    document.head.appendChild(script);
  }
}();
