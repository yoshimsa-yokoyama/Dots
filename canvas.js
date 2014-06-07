window.onload = function() {
  'use strict';

  var Background = {
    init: function() {
      this.dots = [];
      this.minDistance = 70;
      this.springAmount = .0001;

      this.setCanvas();
      this.createDots();

      setInterval(Background.dotsLoop, 1000 / 100);
      // setInterval(Background.dotsLoop, 1000 / 31);
    },
    setCanvas: function() {
      this.canvas = document.getElementById('mycanvas');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;
      this.context = this.canvas.getContext('2d');
      this.context.lineWidth = .5;

      this.numOfDots = Math.round(this.canvasWidth * this.canvasHeight / 8192) * 2;
    },
    createDots: function() {
      for (var i = 0; i < Background.numOfDots; i++) {
        var dot = {
          radius: 1,
          x: Math.random() * Background.canvasWidth,
          y: Math.random() * Background.canvasHeight,
          vx: Math.random() * 4 - 2,
          vy: Math.random() * 4 - 2,
          update: function() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x > Background.canvasWidth) {
              this.x = 0;
            } else if (this.x < 0) {
              this.x = Background.canvasWidth;
            }
            if (this.y > Background.canvasHeight) {
              this.y = 0;
            } else if (this.y < 0) {
              this.y = Background.canvasHeight;
            }
          },
          draw: function() {
            Background.context.fillStyle = 'rgb(200, 200, 200)';
            Background.context.beginPath();
            Background.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            Background.context.closePath();
            Background.context.fill();
          }
        };
        Background.dots.push(dot);
      }
    },
    dotsLoop: function() {
      Background.context.clearRect(0, 0, Background.canvasWidth, Background.canvasHeight);
      for (var i = 0; i < Background.numOfDots; i++) {
        Background.dots[i].update();
        Background.dots[i].draw();
      }
      for (var i = 0; i < Background.numOfDots - 1; i++) {
        var dot1 = Background.dots[i];
        for (var j = i + 1; j < Background.numOfDots; j++) {
          var dot2 = Background.dots[j];
          Background.spring(dot1, dot2);
        }
      }
    },
    spring: function(da, db) {
      var dx = db.x - da.x;
      var dy = db.y - da.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < Background.minDistance) {
        Background.context.beginPath();
        Background.context.strokeStyle = 'rgba(200, 200, 200, ' + (1 - dist / Background.minDistance) + ')';
        Background.context.moveTo(da.x, da.y);
        Background.context.lineTo(db.x, db.y);
        Background.context.stroke();
        Background.context.closePath();
        var ax = dx * Background.springAmount;
        var ay = dy * Background.springAmount;
        da.vx += ax;
        da.vy += ay;
        db.vx -= ax;
        db.vy -= ay;
      }
    }
  }

  Background.init();
}
