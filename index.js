let canvas = document.querySelector('#c'),
  ctx = canvas.getContext('2d'),
  elements = [],
  draw = (...elements) => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    elements.forEach(element => element())
  },
  resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw(...elements)
  },
  scaleCanvas = scale => {
    canvas.width = window.innerWidth*scale
    canvas.height = window.innerHeight*scale
  },
  drawings = [
    // day 2
    () => {
      scaleCanvas(2)
      let blueLength = canvas.width/8,
      width = canvas.width,
      height = canvas.height,
      imageData = ctx.getImageData(0, 0, width, height),
      data = imageData.data,
      redAndGreenSize = 13,
      blueSize = 20 //redAndGreenSize * Math.sqrt(2)
      // red and green
      for (let y  = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let index = (y * width + x) * 4
          data[index] = Math.sin(x/redAndGreenSize) * 255
          data[index + 1] = Math.cos(y /redAndGreenSize) * 255
          data[index + 2] = 0
          data[index + 3] = 255
        }
      }
      
      // blue
      for (let x  = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          let index = (y * width + x) * 4
          data[index + 2] = Math.cos((x+y)/blueSize) * 255
        }
      }
      ctx.putImageData(imageData, 0, 0)
    },
    
    // day 1
    () => {
      let rotation = 0,
      squareSize = 50,
      starting = 0, 
      spacing = 1/3*squareSize, 
      scaling = 4
      
      canvas.width = window.innerWidth *scaling
      canvas.height = window.innerWidth *scaling
      
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 0.5
      
      for(let x = 0; x < canvas.width; x+=spacing){
        for(let y = 0; y < canvas.height; y+=spacing){
          ctx.save()
          ctx.beginPath()
          ctx.rotate((Math.PI / 24) + rotation)
       
          ctx.rect(x, y, squareSize, squareSize)  
          ctx.stroke()
          ctx.restore()
          rotation+=Math.PI / 36
          ctx.lineWidth += 0.0002
        }
      }
    }
  ]

elements.push(drawings[0])
resizeCanvas()
window.addEventListener('resize', resizeCanvas)

canvas.addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = dataURL
  a.download = 'canvas_drawing.png'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
})
