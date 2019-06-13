

function tPointTest() {
  c.translate(10, 10);
  var p1 = {
    x: Math.random() * 250,
    y: Math.random() * 250,
    v: Math.random() * 250
  }
  var p2 = {
    x: Math.random() * 250,
    y: Math.random() * 250,
    v: Math.random() * 250
  }
  var t = Math.random() * 250;
  var p = tPoint(p1, p2, t);
  c.beginPath();
  c.moveTo(p1.x, p1.y);
  c.lineTo(p2.x, p2.y);
  c.stroke();
  c.fillRect(p1.x, p1.y, p1.v * 0.1, p1.v * 0.1);
  c.fillRect(p.x, p.y, p.v * 0.1, p.v * 0.1);
  c.fillRect(p2.x, p2.y, p2.v * 0.1, p2.v * 0.1);
}

function drawBoxTest() {
  c.translate(10, 10);
  c.scale(30, 30);
  var tl, tr, bl, br;
  for(var y = 0; y < 10; y++) {
    for(var x = 0; x < 20; x++) {
      c.save();
      c.translate(x * 1.5, y * 1.5);
      tl = Math.round(Math.random());
      tr = Math.round(Math.random());
      bl = Math.round(Math.random());
      br = Math.round(Math.random());
      if(tl > 0.5) c.fillRect(-0.1, -0.1, 0.1, 0.1);
      if(tr > 0.5) c.fillRect(1, -0.1, 0.1, 0.1);
      if(bl > 0.5) c.fillRect(-0.1, 1, 0.1, 0.1);
      if(br > 0.5) c.fillRect(1, 1, 0.1, 0.1);
      drawBox(tl, tr, bl, br, 0.5);
      c.restore();
    }
  }
}

function drawBoxTest2() {
  c.translate(10, 10);
  c.scale(30, 30);
  var tl, tr, bl, br;
  for(var y = 0; y < 10; y++) {
    for(var x = 0; x < 20; x++) {
      c.save();
      c.translate(x * 1.5, y * 1.5);
      tl = Math.random();
      tr = Math.random();
      bl = Math.random();
      br = Math.random();
      if(tl > 0.5) c.fillRect(-0.1, -0.1, 0.1, 0.1);
      if(tr > 0.5) c.fillRect(1, -0.1, 0.1, 0.1);
      if(bl > 0.5) c.fillRect(-0.1, 1, 0.1, 0.1);
      if(br > 0.5) c.fillRect(1, 1, 0.1, 0.1);
      drawBox(tl, tr, bl, br, 0.5);
      c.restore();
    }
  }
}

function drawBoxTest3() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  var pos;
  c.save();
  c.translate(10, 10);
  c.scale(15, 15);
  if(window.w) {
    if(window.walker) {
      pos = Math.random() * 3.0;
      if(pos < 0.25) walker++;
      else if(pos < 0.5) walker--;
      else if(pos < 0.75) walker += 40;
      else if(pos < 1.0) walker -= 40;
      if(walker < 0) walker += w.length;
      if(walker >= w.length) walker -= w.length;
      w[walker] -= Math.random();
    } else window.walker = Math.floor(Math.random() * w.length * 0.1);
  } else {
    window.w = [];
    for(var y = 0; y < 20; y++) {
      for(var x = 0; x < 40; x++) {
        w.push(1.0);//Math.random());
      }
    }
  }
  for(var y = 0; y < 19; y++) {
    for(var x = 0; x < 39; x++) {
      c.save();
      c.translate(x, y);
      pos = y * 40 + x;
      drawBox(
        w[pos],
        w[pos + 1],
        w[pos + 40],
        w[pos + 41],
        0.5
      );
      c.restore();
    }
  }
  c.restore();
  
  setTimeout(drawBoxTest3, 10);
}

function paintWorldTest2() {
  if(!window.testWorld) {
    window.testWorld = {
      width: 100,
      height: 50,
      data: [],
      painting: false
    }
    for(var y = 0; y < testWorld.height; y++) {
      for(var x = 0; x < testWorld.width; x++) {
        testWorld.data.push({
          v: 0
        });
      }
    }
    canvas.onmousedown = function(e) {
      testWorld.painting = true;
      canvas.onmousemove(e);
    }
    canvas.onmousemove = function(e) {
      if(testWorld.painting) {
        paintWorld(testWorld, {
          x: (e.clientX - 10) / 10,
          y: (e.clientY - 10) / 10
        }, 2, 1, 1);
  
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.save();
        c.translate(10, 10);
        c.scale(10, 10);
        drawWorld(testWorld, {x: 0, y: 0}, testWorld.width, testWorld.height);
        c.restore();
      }
    }
    canvas.onmouseup = function(e) {
      testWorld.painting = false;
    }
  }
}

function paintWorldTest() {
  if(!window.testWorld) {
    window.testWorld = {
      width: 100,
      height: 50,
      data: [],
      pos: { x: 50, y: 25 },
      dir: { x: 0, y: 0 }
    }
    for(var y = 0; y < testWorld.height; y++) {
      for(var x = 0; x < testWorld.width; x++) {
        testWorld.data.push({
          v: 0
        });
      }
    }
    canvas.onclick = function(e) {
      testWorld.pos = {
        x: (e.clientX - 10) / 10,
        y: (e.clientY - 10) / 10
      }
//       paintWorldTest();
    }
  }
  
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.translate(10, 10);
  c.scale(10, 10);
  drawWorld(testWorld, {x: 0, y: 0}, testWorld.width, testWorld.height);
  c.restore();
  
  paintWorld(testWorld, testWorld.pos, 3, 1, 0.5);
  testWorld.dir.x += (Math.random() - 0.5) * 0.8;
  testWorld.dir.x = Math.max(-1, Math.min(1, testWorld.dir.x));
  testWorld.dir.y += (Math.random() - 0.5) * 0.8;
  testWorld.dir.y = Math.max(-1, Math.min(1, testWorld.dir.y));
  testWorld.pos.x += testWorld.dir.x;
  if(testWorld.pos.x < 0) testWorld.pos.x += testWorld.width;
  if(testWorld.pos.x >= testWorld.width) testWorld.pos.x -= testWorld.width;
  testWorld.pos.y += testWorld.dir.y;
  if(testWorld.pos.y < 0) testWorld.pos.y += testWorld.height;
  if(testWorld.pos.y >= testWorld.height) testWorld.pos.y -= testWorld.height;
  setTimeout(paintWorldTest, 100);
}

function shooterTest() {
  this.pos = { x: 50, y: 25 }
  this.dir = 0;
  this.nrm = { x: 1, y: 0 }
  this.spd = { x: 0, y: 0 }
  this.target = { x: 50, y: 25 }
  this.accelerating = false;
  this.shooting = false;
  this.reload = 0;
  this.bullets = [];
  this.world = {
    width: 100,
    height: 50,
    data: []
  }
  for(var y = 0; y < this.world.height; y++) {
    for(var x = 0; x < this.world.width; x++) {
      this.world.data.push({
        v: 1
      });
    }
  }
  paintWorld(this.world, this.pos, 6, 0, 1);
  
  this.loop = this.loop.bind(this);
  this.follow = this.follow.bind(this);
  this.startShooting = this.startShooting.bind(this);
  this.stopShooting = this.stopShooting.bind(this);
  
  canvas.onmousemove = this.follow;
  canvas.onmousedown = this.startShooting;
  canvas.onmouseup = this.stopShooting;
}
shooterTest.prototype.loop = function() {
  this.draw();
  this.pos.x += this.spd.x;
  this.pos.y += this.spd.y;
  this.nrm = {
    x: Math.cos(this.dir),
    y: Math.sin(this.dir)
  }
  if(this.accelerating) {
    this.spd.x += this.nrm.x * 0.05;
    this.spd.y += this.nrm.y * 0.05;
  }
  this.spd.x *= 0.9;
  this.spd.y *= 0.9;
  this.accelerating = false;
  
  var relative = {
    x: this.target.x - this.pos.x,
    y: this.target.y - this.pos.y
  }
  var dist = Math.sqrt(relative.x * relative.x + relative.y * relative.y);
  if(dist < 1.0) this.dir = 0;
  else {
    this.nrm.x = relative.x / dist;
    this.nrm.y = relative.y / dist;
    this.dir = Math.atan2(this.nrm.y, this.nrm.x);
    if(dist > 10) this.accelerating = true;
  }
  
  if(this.reload > 0) this.reload -= 1;
  if(this.shooting) {
    if(this.reload <= 0) {
      this.reload = 5;
      console.log("BANG!", Math.random());
      // TODO
    }
  }
  setTimeout(this.loop, 50);
}
shooterTest.prototype.startShooting = function(e) {
  this.shooting = true;
}
shooterTest.prototype.stopShooting = function(e) {
  this.shooting = false;
}
shooterTest.prototype.follow = function(e) {
  this.target = {
    x: (e.clientX - 10) / 10,
    y: (e.clientY - 10) / 10
  }
}
shooterTest.prototype.draw = function() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.translate(10, 10);
  
  c.save();
  c.scale(10, 10);
  drawWorld(this.world, {x: 0, y: 0}, this.world.width, this.world.height);
  c.restore();
  
  c.save();
  c.translate(this.pos.x * 10, this.pos.y * 10);
  c.rotate(this.dir);
  c.fillRect(-5, -5, 10, 10);
  c.fillRect(5, -2, 4, 4);
  c.restore();
  
  c.restore();
}
