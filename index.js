let canvas = document.querySelector('#c'),
scaling = 4,
  ctx = canvas.getContext('2d'),
  elements = [],
  draw = (...elements) => {
    elements.forEach(element => element())
  },
  resizeCanvas = () => {
    canvas.width = window.innerWidth *scaling
    canvas.height = window.innerHeight *scaling
    draw(...elements)
  },
  drawings = [
    () => {
      canvas.height = window.innerWidth *scaling
      const squareSize = 50
      
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 0.5
      let rotation = 0
      let starting = 0
      let spacing =1/3*squareSize
      for(let x = starting; x < canvas.width; x+=spacing){
        for(let y = starting; y < canvas.height; y+=spacing){
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
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'canvas_drawing.png'
    a.click()
    URL.revokeObjectURL(url)
  }, 'image/png')
})