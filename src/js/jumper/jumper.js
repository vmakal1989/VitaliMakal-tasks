import {renderInformWindow, renderFooter} from "../common"

export const openJumper = () => {
    window.gameInterval && clearInterval(window.gameInterval)
    window.gameSpeedInterval && clearTimeout(window.gameSpeedInterval)
    document.querySelector('.game__jumper').innerHTML = ''
    game.init()
    document.addEventListener('keydown', ball.control)
    document.addEventListener('keyup', ball.stopMove)
}

const game = {
    speed: 0,
    score: 0,
    init() {
        game.speed = 7000
        game.score = 0
        canvas.init()
        canvas.render()
        ball.init()
        ball.render()
        canvas.arrayIslands.forEach(island => island.render())
        renderFooter('jumper', game.score, game.start)
    },
    start() {
        window.gameInterval = setInterval(game.loop, 1000 / 60)
        canvas.moveIslands()
    }
    ,
    loop() {
        canvas.render()
        ball.render()
        ball.checkFall()
        canvas.arrayIslands.forEach(island => island.render())
        document.querySelector('.footer__score').innerHTML = `Score: ${game.score++}`
        if(canvas.arrayIslands[canvas.arrayIslands.length - 1].posY > getRandomIntInclusive(40, 70)) {
            canvas.islandGeneration()
        }
        if(ball.posY + ball.radius > canvas.height) {
            game.stop()
        }
        if(ball.posY < 150) {
            canvas.arrayIslands.forEach(island => {
                island.posY++
                game.score++
            })
        }
    },
    stop() {
        window.gameInterval && clearInterval(window.gameInterval)
        window.gameSpeedInterval && clearTimeout(window.gameSpeedInterval)
        renderInformWindow('pong', `Your score ${game.score}!`)
        setTimeout(function reset() {
            openJumper()
        }, 3000)
    }
}

const canvas = {
    width: 300,
    height: 400,
    color: '#ffffff',
    arrayIslands: [],

    init() {
        window.cvs = document.createElement('canvas')
        document.querySelector('.game__jumper').append(cvs)
        cvs.style.width = canvas.width + 'px'
        cvs.style.height = canvas.height + 'px'
        cvs.style.border = '1px solid #222222'
        canvas.arrayIslands = [new Island(0,400 - 20 , 300, 1,  '#004d40')]
        let height = canvas.height
        for(let i = 0; i < 5; i++) {
            canvas.arrayIslands.push(new Island(getRandomIntInclusive(0, canvas.width - 40),
                getRandomIntInclusive(height -= 50,height -= 20), getRandomIntInclusive(40, 70), 2,  '#004d40'))
        }
    },
    render() {
        window.ctx = cvs.getContext('2d')
        ctx.canvas.width = canvas.width
        ctx.canvas.height =  canvas.height
    },
    moveIslands() {
        canvas.arrayIslands.forEach(island => island.posY++)
        window.gameSpeedInterval = setTimeout( canvas.moveIslands, game.speed / 60)
    },
    islandGeneration() {
        canvas.addedIsland(getRandomIntInclusive(0, canvas.width), 0,
                            getRandomIntInclusive(25, 60), 2, '#004d40')
    },
    addedIsland(posX, posY, width, height, color) {
        canvas.arrayIslands.push( new Island(posX, posY, width, height, color))
    }
}

const ball = {
    color: '#000000',
	radius: 8,
	posX: null,
	posY: null,
    maxJumpHeight: 100,
    prevPosY: null,
    isJump: false,
    isFall: false,
    init(){
        this.posX = canvas.width / 2
        this.posY = canvas.height - this.radius - 20
    },
    render() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc( this.posX, this.posY, this.radius,0,Math.PI*2,true)
        ctx.closePath()
        ctx.fill()
    },
    control(event) {
        if(event.code === 'ArrowUp') {
            ball.jump()
        }
        if(!event.repeat) {
            if(event.code === 'ArrowLeft') {
                ball.move('left')
            } else if(event.code === 'ArrowRight') {
                ball.move('right')
            }
        }
    },
    move(direction) {
        window.moveBallInterval && clearInterval(window.moveBallInterval)
        window.moveBallInterval = setInterval(function moveBall() {
            direction === 'left' 
            ? ball.posX--
            : ball.posX++
            ball.checkCollisionWithWall()
            !ball.isFall && ball.checkFall()
        }, 3)
    },
    stopMove(event) {
        if(event.code !== 'ArrowUp')
            clearInterval(window.moveBallInterval)
    },
    jump() {
        if(!ball.isJump) {
            ball.prevPosY = ball.posY
            ball.isJump = true
            let calculated = -1
            window.jumpInterval = setInterval(function jumpBall() {
                ball.posY += calculated
                if(ball.isUnderIsland() || ball.prevPosY - ball.maxJumpHeight === ball.posY ){
                    calculated = +1
                }
                else if(ball.isOnIsland() || ball.posY === ball.prevPosY) {
                    ball.isJump = false
                    ball.checkFall()
                    clearInterval(window.jumpInterval)
                }
            }, 3)
        }
    },
    checkFall() {
        if(!ball.isJump && !ball.isOnIsland()) {
            ball.isFall  = true
            ball.fall()
        }
    },
    fall() {
        window.fallInterval && clearInterval(window.fallInterval)
        window.fallInterval = setInterval( function ballFall() {
            ball.posY++
            if(ball.isOnIsland()) {
                clearInterval(window.fallInterval)
                ball.isFall = false
            }
        }, 3)
    },
    checkCollisionWithWall() {
        if(ball.posX < 0)
            ball.posX = canvas.width
        else if(ball.posX > canvas.width)
            ball.posX = 0
    },
    isOnIsland() {
        let result = false
        canvas.arrayIslands.forEach(island => {
            if(ball.posY + ball.radius === island.posY
                && ball.posX + ball.radius >= island.posX
                && ball.posX - ball.radius <= island.posX + island.width) {
                result = true
            }
        })
        return result
    },
    isUnderIsland() {
        let result = false
        canvas.arrayIslands.forEach(island => {
            if(ball.posY - ball.radius === island.posY + island.height
                && ball.posX + ball.radius >= island.posX
                && ball.posX - ball.radius <= island.posX + island.width) {
                result = true
            }
        })
        return result
    }
}

class Island {
    constructor(posX, posY, width, height, color) {
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
        this.color = color
    }
    render() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.fillRect(this.posX, this.posY, this.width, this.height)
        ctx.closePath()
        ctx.fill()
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}