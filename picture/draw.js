function DlDraw(option) {
  this.currentColor = '#000'; // 当前的颜色
  this.currentline = 1; // 当前的线宽
  this.currentTool = 'pencil'; // line: 设置线宽, pencil: 铅笔, rubber: 橡皮
  this.colourDiskArr = []; // 存储色盘path的数组
  this.lineWidthArr = []; // 存储线宽path的数组
  this.mouseRubberPath = {};
  this.pencilPath = new Path2D;
  this.rubberPath = new Path2D;
  this.linePath = new Path2D(); // 存储铅笔、橡皮、线宽点击选择的path
  this.drawInit(option)
}

DlDraw.prototype.drawInit = function(option) {
  if (!option.el) return console.log('请传入绑定的标签')
  this.drawBox = document.querySelector(option.el)
  this.drawBox.style.position = 'relative';
  this.drawBox.style.width = option.width + 'px';
  this.drawBox.style.height = option.height + 'px';
  this.drawBox.style.border = '1px solid #ccc';

  this.desk = document.createElement('canvas');
  this.desk.width = this.drawBox.offsetWidth;
  this.desk.height = this.drawBox.offsetHeight;
  this.desk.id = 'desk';
  this.desk.style.position = 'absolute';
  this.desk.style.left = 0;
  this.desk.style.top = 0;
  this.deskCtx = this.desk.getContext('2d');
  
  this.canvas = document.createElement('canvas');
  this.canvas.width = this.drawBox.offsetWidth;
  this.canvas.height = this.drawBox.offsetHeight - 50;
  this.canvas.id = 'canvas';
  this.ctx = this.canvas.getContext('2d');
  
  this.tools = document.createElement('canvas');
  this.tools.width = this.drawBox.offsetWidth;
  this.tools.height = 50;
  this.tools.id = 'tools';
  this.toolsCtx = this.tools.getContext('2d');

  this.drawBox.appendChild(this.desk)
  this.drawBox.appendChild(this.canvas)
  this.drawBox.appendChild(this.tools)
  console.log(this.drawBox.children)
  for (let i = 0; i < this.drawBox.children.length; i++) {
    if (this.drawBox.children[i].tagName === 'CANVAS') {
      this.drawBox.children[i].style.verticalAlign = 'middle';
    }
    if (['canvas', 'tools'].indexOf(this.drawBox.children[i].id) !== -1) {
      this.drawBox.children[i].style.position = 'relative';
      this.drawBox.children[i].style.zIndex = 100;
    }
  }

  this.colorDiskX = option.colorDiskX || 550

  // 画布桌面初始化
  this.deskInit()

  // 工具栏初始化
  this.toolsInit()

  // 画布初始化
  this.canvasInit()
}

DlDraw.prototype.deskInit = function() {
  const _this = this;
  window.addEventListener('mousemove', function(e) {
    _this.clearDesk(true)

    if (e.pageX > _this.drawBox.offsetLeft && e.pageX < _this.drawBox.offsetLeft + _this.drawBox.offsetWidth && e.pageY > _this.drawBox.offsetTop && e.pageY < _this.drawBox.offsetTop + _this.canvas.height) {
      const x = e.pageX - _this.drawBox.offsetLeft;
      const y = e.pageY - _this.drawBox.offsetTop;
      
      _this.drawMouseDesk(_this.currentTool, x, y, true)
    } 
    else if (_this.currentTool === 'line') _this.lineWidthSetting()
  })
}

DlDraw.prototype.toolsInit = function(option) {
  this.toolsCtx.beginPath()
  this.toolsCtx.moveTo(0 , 0 )
  this.toolsCtx.lineTo(this.tools.width, 0 )
  this.toolsCtx.strokeStyle = '#ccc';
  this.toolsCtx.stroke()

  this.toolsCtx.strokeStyle = '#000';
  this.toolsCtx.fillStyle = '#fff';
  this.pencilPath.rect(20, 10, 30, 30)
  this.toolsCtx.stroke(this.pencilPath)
  this.toolsCtx.fill(this.pencilPath)
  const pencilOptions = {
    ctx: this.toolsCtx, // canvas2d对象
    x: 25, // 铅笔的落点x坐标
    y: 35, // 铅笔的落点y坐标
    // nibLength: 8, // 笔尖的长度
    // width: 3, // 铅笔的一半宽度
    // length: 18, // 笔杆的长度
    // color: '#b78c8c' // 铅笔颜色
  }
  this.drawPencil(pencilOptions)

  this.toolsCtx.strokeStyle = '#000';
  this.toolsCtx.fillStyle = '#fff';
  this.toolsCtx.lineWidth = 1;
  this.rubberPath.rect(60, 10, 30, 30)
  this.toolsCtx.stroke(this.rubberPath)
  this.toolsCtx.fill(this.rubberPath)
  const rubberOptions = {
    ctx: this.toolsCtx, // canvas2d对象
    x: 68, // 橡皮的落点x坐标
    y: 33, // 橡皮的落点y坐标
    nibLength: 3, // 橡皮尖的长度
    width: 4.5, // 橡皮的一半宽度
    height: 5, // 橡皮的厚度
    length: 15, // 橡皮的长度
    outlength: 5, // 橡皮露出纸壳的长度
    color: '#9e9a9a', // 橡皮纸壳的颜色
    cbColor: '#b78c8c' // 橡皮纸壳的颜色
  }
  this.drawRubber(rubberOptions)

  this.drawLineWidth(1)

  const colorOptions = {
    ctx: this.toolsCtx, // canvas2d对象
    x: this.colorDiskX,
    y: 7,
    width: 15,
    diatance: 5,
    colorArr: ['#000000', '#ffffff', '#C3C3C3', '#7F7F7F', '#880015', '#ED1C24', '#FF7F27', '#FFF200', '#22B14C', '#00A2E8', '#3F48CC', '#A349A4', '#B97A57', '#FFAEC9', '#FFC90E', '#EFE4B0', '#B5E61D', '#99D9EA', '#7092BE', '#C8BFE7'],
    count: 20
  }
  this.colourDisk(colorOptions)

  this.refreshCurrentColor({ color: this.currentColor})

  const _this = this
  this.drawBox.addEventListener('mousemove', function(e) {
    const x = e.offsetX, y = e.offsetY;
    _this.tools.style.cursor = 'auto';

    if (_this.toolsCtx.isPointInPath(_this.pencilPath, x, y)) return _this.tools.style.cursor = 'pointer';
    if (_this.toolsCtx.isPointInPath(_this.rubberPath, x, y)) return _this.tools.style.cursor = 'pointer';
    if (_this.toolsCtx.isPointInPath(_this.linePath, x, y)) return _this.tools.style.cursor = 'pointer';

    for (let i = 0; i < _this.colourDiskArr.length; i++) {
      if (_this.toolsCtx.isPointInPath(_this.colourDiskArr[i].path, x, y)) return _this.tools.style.cursor = 'pointer';
    }
  })

  this.tools.addEventListener('click', function(e) {
    const x = e.offsetX, y = e.offsetY;

    if (_this.toolsCtx.isPointInPath(_this.pencilPath, x, y)) {
      _this.changeTools && _this.changeTools('pencil')
      return _this.currentTool = 'pencil'
    }

    if (_this.toolsCtx.isPointInPath(_this.rubberPath, x, y)) {
      _this.changeTools && _this.changeTools('rubber')
      return _this.currentTool = 'rubber'
    }

    if (_this.toolsCtx.isPointInPath(_this.linePath, x, y)) {
      _this.changeTools && _this.changeTools('line')
      _this.currentTool = 'line';
      _this.lineWidthSetting()
      return 
    }

    for (let i = 0; i < _this.colourDiskArr.length; i++) {
      if (_this.toolsCtx.isPointInPath(_this.colourDiskArr[i].path, x, y)) {
        _this.refreshCurrentColor({ color: _this.colourDiskArr[i].color })
        break
      }
    }
  })
}

DlDraw.prototype.canvasInit = function() {
  const _this = this;
  this.canvas.addEventListener('mousedown', e => {
    const x = e.offsetX, y = e.offsetY;
    switch (_this.currentTool) {
      case 'pencil':
        _this.ctx.strokeStyle = _this.currentColor;
        _this.ctx.lineWidth = _this.currentline;
        _this.ctx.lineCap = 'round';
        _this.ctx.beginPath();
        _this.ctx.moveTo(x, y);

        _this.startDrawing && _this.startDrawing(x, y, 'ctx')

        function draw(e) {
          _this.drawPicture(e, _this)
        }

        _this.canvas.addEventListener('mousemove', draw)
        _this.canvas.addEventListener('mouseup', () => {
          _this.canvas.removeEventListener('mousemove', draw)
        })
        break;
      case 'rubber':
        _this.ctx.clearRect(_this.mouseRubberPath.x, _this.mouseRubberPath.y, _this.mouseRubberPath.width, _this.mouseRubberPath.height)

        _this.rubDrawing && _this.rubDrawing(_this.mouseRubberPath.x, _this.mouseRubberPath.y, _this.mouseRubberPath.width, _this.mouseRubberPath.height, 'ctx')

        function rub(e) {
          _this.rubPicture(e, _this)
        }

        _this.canvas.addEventListener('mousemove', rub)
        _this.canvas.addEventListener('mouseup', function() {
          _this.canvas.removeEventListener('mousemove', rub)
        })
        break;
      case 'line':
        const lineWidth = _this.lineWidthArr.filter(item => _this.deskCtx.isPointInPath(item.path, x, y))[0] ? _this.lineWidthArr.filter(item => _this.deskCtx.isPointInPath(item.path, x, y))[0].lineWidth : 1

        _this.changeLine && _this.changeLine(lineWidth)
        _this.drawLineWidth(lineWidth)
        break;
    }
  })
}

DlDraw.prototype.clearDesk = function(emitFlag = false) {
  this.deskCtx.clearRect(0, 0, this.desk.width, this.desk.height)
  this.canvas.style.cursor = 'auto';
  if (emitFlag) this.emptyDesk && this.emptyDesk('deskCtx')
}

DlDraw.prototype.drawMouseDesk = function(currentTool, x, y, emitFlag = false) {
  switch (currentTool) {
    case 'pencil':
      const pencilOption = {
        x,
        y: y - 3
      }
      this.canvas.style.cursor = 'none';

      if (emitFlag) this.drawMouse && this.drawMouse('deskCtx', currentTool, x, y)

      this.drawPencil(pencilOption)
      break;
    case 'rubber':
      this.canvas.style.cursor = 'none';

      if (emitFlag) this.drawMouse && this.drawMouse('deskCtx', currentTool, x, y)

      this.mouseRubber({ x, y })
      break;
    case 'line':
      
      if (emitFlag) this.drawMouse && this.drawMouse('deskCtx', currentTool)
      this.lineWidthSetting()
      break; 
  }
}

DlDraw.prototype.drawPencil = function({ ctx = this.deskCtx, x, y, nibLength = 8, width = 3, length = 18, color = '#b78c8c' }) {  
  const sin = function(range) {
    return Math.sin(Math.PI * range / 180)
  }
  const cos = function(range) {
    return Math.cos(Math.PI * range / 180)
  }

  const point = {
    x: x + cos(-45) * nibLength,
    y: y + sin(-45) * nibLength,
  }
  ctx.lineWidth = 1;
  ctx.lineCap = 'butt';
  ctx.strokeStyle = color;

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(point.x + cos(45) * width, point.y + sin(45) * width)
  ctx.lineTo(point.x + cos(-135) * width, point.y + sin(-135) * width)
  ctx.closePath()
  ctx.stroke()

  ctx.beginPath()
  ctx.lineWidth = width * 2 + 1;
  ctx.moveTo(point.x, point.y)
  ctx.lineTo(point.x + cos(-45) * length / 2, point.y + sin(-45) * length / 2)
  ctx.stroke()
  
  ctx.beginPath()
  ctx.moveTo(point.x + cos(-45) * length / 2, point.y + sin(-45) * length / 2)
  ctx.lineCap = 'round';
  ctx.lineTo(point.x + cos(-45) * length / 2 + cos(-45) * length / 2, point.y + sin(-45) * length / 2 + sin(-45) * length / 2)
  ctx.stroke()
}

DlDraw.prototype.drawRubber = function({ ctx, x, y, nibLength, width, height, length, outlength, color, cbColor }) {
  const sin = function(range) {
    return Math.sin(Math.PI * range / 180)
  }
  const cos = function(range) {
    return Math.cos(Math.PI * range / 180)
  }

  const cardboard = new Path2D()
  ctx.strokeStyle = color

  ctx.beginPath()
  ctx.moveTo(x + cos(45) * width, y + sin(45) * width)
  const point = { // 纸壳点
    x: x + cos(45) * width + (nibLength + outlength) * cos(-45),
    y: y + sin(45) * width + (nibLength + outlength) * sin(-45)
  }
  ctx.lineTo(point.x, point.y)
  ctx.lineTo(point.x, point.y - height)
  ctx.lineTo(point.x + cos(135) * outlength, point.y - height + sin(135) * outlength)
  ctx.closePath()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(x + cos(45) * width, y + sin(45) * width)
  ctx.lineTo(x + cos(-135) * width, y + sin(-135) * width)
  ctx.lineTo(point.x + cos(135) * outlength + cos(-135) * width * 2, point.y - height + sin(135) * outlength + sin(-135) * width * 2)
  ctx.lineTo(point.x + cos(-135) * width * 2, point.y - height + sin(-135) * width * 2)
  ctx.lineTo(point.x, point.y - height)
  ctx.stroke()
  
  ctx.beginPath()
  ctx.moveTo(point.x + cos(135) * outlength + cos(-135) * width * 2, point.y - height + sin(135) * outlength + sin(-135) * width * 2)
  ctx.lineTo(point.x + cos(135) * outlength, point.y - height + sin(135) * outlength)
  ctx.stroke()

  cardboard.moveTo(point.x, point.y)
  cardboard.lineTo(point.x + (length - outlength) * cos(-45) , point.y + (length - outlength) * sin(-45))
  cardboard.lineTo(point.x + (length - outlength) * cos(-45) , point.y + (length - outlength) * sin(-45) - height)
  cardboard.lineTo(point.x, point.y - height)
  cardboard.closePath()
  
  cardboard.moveTo(point.x, point.y - height)
  cardboard.lineTo(point.x + cos(-135) * width * 2, point.y - height + sin(-135) * width * 2)
  cardboard.lineTo(point.x + (length - outlength) * cos(-45) + cos(-135) * width * 2, point.y + (length - outlength) * sin(-45) - height + sin(-135) * width * 2)
  cardboard.lineTo(point.x + (length - outlength) * cos(-45) , point.y + (length - outlength) * sin(-45) - height)
  cardboard.closePath()

  ctx.fillStyle = cbColor
  ctx.fill(cardboard)
  ctx.stroke(cardboard)
}

DlDraw.prototype.colourDisk = function({ ctx, x, y, width, diatance, colorArr, count }) {
  for (let i = 0; i < count; i++) {
    const path = new Path2D()
    ctx.fillStyle = colorArr[i] || '#fff';
    ctx.strokeStyle = '#666';
    
    if (i > (count / 2 - 1)) {
      path.rect(x + (i -(count / 2)) * (width + diatance), y + width + diatance, width, width)
    } else {
      path.rect(x + i * (width + diatance), y, width, width)
    }

    this.colourDiskArr.push({
      path,
      color: colorArr[i]
    })
    ctx.stroke(path)
    ctx.fill(path)
  }
}

DlDraw.prototype.drawLineWidth = function(lineWidth) {
  let x = 100, y = 25;
  this.toolsCtx.clearRect(x - 5, 5, 50, 40)
  this.currentline = lineWidth;

  this.toolsCtx.strokeStyle = '#000';
  this.toolsCtx.fillStyle = '#fff';
  this.toolsCtx.lineWidth = 1;
  this.linePath.rect(x, 10, 40, 30)
  this.toolsCtx.stroke(this.linePath)
  this.toolsCtx.fill(this.linePath)
  
  if (lineWidth === 1) {
    x += 0.5;
    y += 0.5;
  }
  this.toolsCtx.lineWidth = lineWidth
  this.toolsCtx.beginPath()
  this.toolsCtx.moveTo(x + 5, y)
  this.toolsCtx.lineTo(x + 35, y)
  this.toolsCtx.stroke()
}

DlDraw.prototype.lineWidthSetting = function() {
  this.deskCtx.clearRect(0, 0, this.deskCtx.width, this.deskCtx.height)
  
  this.deskCtx.lineCap = 'butt';
  this.deskCtx.lineWidth = 1;
  this.deskCtx.strokeStyle = '#000';
  this.deskCtx.fillStyle = '#fff';
  this.deskCtx.strokeRect(100, 380, 40, 60)
  this.deskCtx.fillRect(100, 380, 40, 60)

  const lineArr = [1, 3, 6]

  for (let i = 0; i < lineArr.length; i++) {
    const path = new Path2D()
    this.deskCtx.beginPath()
    this.deskCtx.strokeStyle = '#000';
    if (i === 0) {
      this.deskCtx.moveTo(105, 380 + 10)
      this.deskCtx.lineTo(135, 380 + 10)
    } else {
      this.deskCtx.moveTo(105, 380 + 10 + 20 * i)
      this.deskCtx.lineTo(135, 380 + 10 + 20 * i)
    }
    this.deskCtx.lineWidth = lineArr[i];
    this.deskCtx.stroke()

    path.rect(102, 382 + 20 * i, 36, 16 )
    this.deskCtx.strokeStyle = '#666';
    this.deskCtx.lineWidth = 1;
    this.deskCtx.stroke(path)

    this.lineWidthArr.push({
      path,
      lineWidth: lineArr[i]
    })
  }
}

DlDraw.prototype.mouseRubber = function({ x, y, width = 30, height = 30 }) {
  const pointX = x - width / 2, pointY = y - height / 2;

  const path = new Path2D();

  this.deskCtx.strokeStyle = '#000';
  this.deskCtx.fillStyle = '#fff';
  this.deskCtx.lineWidth = 1;
  path.rect(pointX, pointY, width, height);
  this.mouseRubberPath.x = pointX;
  this.mouseRubberPath.y = pointY;
  this.mouseRubberPath.width = width;
  this.mouseRubberPath.height = height;
  this.deskCtx.stroke(path)
  this.deskCtx.fill(path)
}

DlDraw.prototype.refreshCurrentColor = function({ctx = this.toolsCtx, x = this.colorDiskX - 50, y = 10, width = 20, height = 20, color}) {
  ctx.strokeStyle = '#666';
  ctx.fillStyle = color;
  ctx.strokeRect(x, y, width, height)
  ctx.fillRect(x, y, width, height)
  this.currentColor = color;
  this.changeColor && this.changeColor(color)
}

DlDraw.prototype.drawPicture = function(event, _this) {
  const toX = event.offsetX, toY = event.offsetY;
  _this.drawingPicture && _this.drawingPicture(toX, toY, 'ctx')
  _this.ctx.lineTo(toX, toY)
  _this.ctx.stroke()
}

DlDraw.prototype.rubPicture = function() {
  this.ctx.clearRect(this.mouseRubberPath.x, this.mouseRubberPath.y, this.mouseRubberPath.width, this.mouseRubberPath.height)
  
  this.rubDrawing && this.rubDrawing(this.mouseRubberPath.x, this.mouseRubberPath.y, this.mouseRubberPath.width, this.mouseRubberPath.height, 'ctx')
}

window.DlDraw = DlDraw