export const openJumper = () => {
    window.gameInterval && clearInterval(window.gameInterval)
    document.querySelector('.game').innerHTML = ''
    game.init()
    document.addEventListener('keydown', ball.control)
    document.addEventListener('keyup', ball.stopMove)
}

const game = {
    init() {
        canvas.init()
        canvas.render()
        ball.render()
        game.start()
    },
    start() {
        window.gameInterval = setInterval(game.loop, 1000 / 60)
    },
    loop() {
        canvas.render()
        ball.render()
    },
    end() {
        window.gameInterval && clearInterval(window.gameInterval)
    }
}

const canvas = {
    width: 300,
    height: 400,
    color: '#ffffff',

    init() {
        window.cvs = document.createElement('canvas')
        document.querySelector('.game__jumper').append(cvs)
        cvs.style.width = canvas.width + 'px'
        cvs.style.height = canvas.height + 'px'
        cvs.style.border = '1px solid #222222'
    },
    render() {
        window.ctx = cvs.getContext('2d')
        ctx.canvas.width = canvas.width
        ctx.canvas.height =  canvas.height
    }
}

const ball = {
    color: '#000000',
	radius: 6,
	posX: canvas.width / 2 - 3,
	posY: canvas.height - 6,
    maxJumpHeight: 100,

    render() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc( this.posX, this.posY, this.radius,0,Math.PI*2,true)
        ctx.closePath()
        ctx.fill()
    },
    move(direction) {
        window.moveBallInterval = setInterval(function speedBall() {
            direction === 'left' 
            ? ball.posX--
            : ball.posX++
        }, 1)
    },
    jump() {
        window.moveInterval = setInterval(function speedJumpBall() {
            
        }, 100)
    },
    stopMove() {
        clearInterval(window.moveBallInterval)
    },
    control(event) {
        if(!event.repeat) {
            window.moveBallInterval && clearInterval(window.moveBallInterval)
            if(event.code === 'ArrowLeft') {
                ball.move('left')
            } else if(event.code === 'ArrowRight') {
                ball.move('right')
            } else if (event.code === 'ArrowUp') {
                ball.jump()
            }
        }
    },
    collision() {
    }
}