
function paintWorld(w, center, size, trg, str) {
  var pos, mid, x, y;
  for(var oY = -size; oY <= size; oY++) {
    for(var oX = -size; oX <= size; oX++) {
      x = Math.round(center.x) + oX;
      y = Math.round(center.y) + oY;
      if(y >= 0 && y < w.height && x >= 0 && x < w.width) {
        pos = y * w.width + x;
        mid = 1.0 - Math.min(1, Math.sqrt(oX * oX + oY * oY) / size);
        w.data[pos].v += (trg - w.data[pos].v) * str * mid;
      }
    }
  }
}

function drawWorld(w, tl, width, height) {
  var pos;
  for(var y = tl.y; y < height - 1; y++) {
    for(var x = tl.x; x < width - 1; x++) {
      c.save();
      c.translate(x, y);
//       c.scale(0.9, 0.9); // For visualizing
      pos = y * w.width + x;
      drawBox(
        w.data[pos].v,
        w.data[pos + 1].v,
        w.data[pos + w.width].v,
        w.data[pos + w.width + 1].v,
        0.5
      );
      c.restore();
    }
  }
}

function drawBox(tl, tr, bl, br, t) {
  
  // Corner points
  var pTl = { x: 0, y: 0, v: tl };
  var pTr = { x: 1, y: 0, v: tr };
  var pBl = { x: 0, y: 1, v: bl };
  var pBr = { x: 1, y: 1, v: br };
  
  // Wall mid points
  var pT = tPoint(pTl, pTr, t);
  var pR = tPoint(pTr, pBr, t);
  var pB = tPoint(pBl, pBr, t);
  var pL = tPoint(pTl, pBl, t);
  
  // Key for part
  var key = 0;
  if(tl > t) key += 1000;
  if(tr > t) key += 100;
  if(bl > t) key += 10;
  if(br > t) key += 1;
  
  // Make polygons
  var pol1 = [];
  var pol2 = [];
  switch(key) {
    case    0: break;
    case    1: pol1 = [pBr, pB, pR]; break;
    case   10: pol1 = [pBl, pL, pB]; break;
    case   11: pol1 = [pBr, pBl, pL, pR]; break;
    case  100: pol1 = [pTr, pR, pT]; break;
    case  101: pol1 = [pTr, pBr, pB, pT]; break;
    case  110: pol1 = [pTr, pR, pT]; pol2 = [pBl, pL, pB]; break;
    case  111: pol1 = [pTr, pBr, pBl, pL, pT]; break;
    case 1000: pol1 = [pTl, pT, pL]; break;
    case 1001: pol1 = [pTl, pT, pL];  pol2 = [pBr, pB, pR]; break;
    case 1010: pol1 = [pTl, pT, pB, pBl]; break;
    case 1011: pol1 = [pTl, pT, pR, pBr, pBl]; break;
    case 1100: pol1 = [pTl, pTr, pR, pL]; break;
    case 1101: pol1 = [pTl, pTr, pBr, pB, pL]; break;
    case 1110: pol1 = [pTl, pTr, pR, pB, pBl]; break;
    case 1111: pol1 = [pTl, pTr, pBr, pBl]; break;
  }
  
  // Draw the polygons
  if(pol1.length) {
    c.beginPath();
    c.moveTo(pol1[0].x, pol1[0].y);
    for(var i = 1; i < pol1.length; i++) {
      c.lineTo(pol1[i].x, pol1[i].y);
    }
    c.lineTo(pol1[0].x, pol1[0].y);
    
    if(pol2.length) {
      c.moveTo(pol2[0].x, pol2[0].y);
      for(var i = 1; i < pol2.length; i++) {
        c.lineTo(pol2[i].x, pol2[i].y);
      }
      c.lineTo(pol2[0].x, pol2[0].y);
    }
    
    c.fill();
  }
}

/** Find threshold point on a line **/
function tPoint(p1, p2, t) {
  var diff = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    v: p2.v - p1.v
  }
  var tDiff = t - p1.v;
  var tPos = 1.0 / diff.v * tDiff;
  var p = {
    x: p1.x + diff.x * tPos,
    y: p1.y + diff.y * tPos,
    v: p1.v + diff.v * tPos
  }
  return p;
}
