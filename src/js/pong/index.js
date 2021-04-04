export const openPong = () => {
	game.reset()
	gameInit()
	window.gameInterval && clearInterval(window.gameInterval)
	window.speedInterval && clearInterval(window.speedInterval)
}

const gameInit = () => {
	canvas.init()
	ball.render()
	score.render()
	userRacket.render()
	compRacket.render()
	renderFooter()
	renderInformWindow()
	window.addEventListener('mousemove', event => {
		let rect = document.querySelector('.game__pong')
		if(rect) rect = rect.getBoundingClientRect()
		if(rect) userRacket.posY = event.clientY - rect.top - userRacket.height / 2
	})
}

const game = {
	start() {
		score.comp = 0
		score.user = 0
		window.speedInterval = setInterval(() => {
			window.gameInterval && clearInterval(window.gameInterval)
			window.gameInterval = setInterval(()=> {
				compRacket.posY +=  ((ball.posY + compRacket.height / 2 - (compRacket.posY + compRacket.height / 2))) * 0.08
				ball.move()
				gameInit()
				ball.speed += 0.05
			}, 1000 / ball.speed)
		}, 100)
	},
	missBall(player) {
		player === 'user' ? score.comp++ : score.user++
		this.reset()
		gameInit()
		if(score.user === score.max || score.comp === score.max) this.stop()
	},
	reset() {
		ball.resetBallPos()
		ball.speed = 30
	},
	stop() {
		clearInterval(window.gameInterval)
		clearInterval(window.speedInterval)
		setTimeout(() => {
			score.comp = 0
			score.user = 0
			gameInit()
		}, 1500)
	}
}

const canvas = {
	width: 700,
	height: 400,
	init(){
		document.querySelector('.game').innerHTML = ''
		let canvas = document.createElement('canvas')
		canvas.style.width = this.width + 'px'
		canvas.style.height = this.height + 'px'
		canvas.style.border = '1px solid #222222'
		document.querySelector('.game__pong').append(canvas)

		window.ctx = canvas.getContext('2d')
		ctx.canvas.width = this.width
		ctx.canvas.height =  this.height
		ctx.fillRect(0, 0, this.width, this.height)
		ctx.fillStyle =  '#222222'

		ctx.fillStyle = '#fff';
		for(let i = 5; i<= this.height; i += 41) {
			ctx.fillRect((canvas.width - 5 ) / 2, i, 5, 20)
		}
	}
}
const renderFooter = () => {
	let footer = document.createElement('div')
	footer.classList.add('footer')
	document.querySelector('.game__pong').append(footer)
	let btn = document.createElement('button')
	btn.classList.add('btn','footer__btn')
	btn.innerHTML = 'Start'
	btn.style.marginTop = '10px'
	footer.append(btn)

	btn.addEventListener('click', () => {
		game.start()
	})
}

const renderInformWindow = () => {
	let informWindow = document.createElement('div')
	informWindow.classList.add('inform-window')
	document.querySelector('.game').append(informWindow)
	score.user === score.max ? informWindow.innerHTML = 'You win!' : informWindow.innerHTML = 'You lose!'
	score.max === score.user || score.max === score.comp
		? informWindow.style.display = 'block' : informWindow.style.display = 'none'
}

const ball = {
	color: '#ffffff',
	radius: 10,
	posX: canvas.width / 2,
	posY: canvas.height / 2,
	velocityX: -5,
	velocityY: 5,
	speed: 30,

	render() {
		ctx.fillStyle = this.color
		ctx.beginPath()
		ctx.arc( this.posX, this.posY, this.radius,0,Math.PI*2,true)
		ctx.closePath()
		ctx.fill()
		ctx.lineWidth = -1
		ctx.strokeStyle = "#222222"
		ctx.stroke()

	},
	move() {
		ball.posX += ball.velocityX
		ball.posY += ball.velocityY

		if(ball.posY + ball.radius > canvas.height || ball.posY - ball.radius < 0) ball.velocityY = -ball.velocityY
		if(ball.posX < 0) game.missBall('user')
		if(ball.posX > canvas.width) game.missBall('comp')

		let userRacketTop = userRacket.posY - userRacket.height / 2
		let userRacketBottom = userRacket.posY + userRacket.height / 2

		if(ball.posX - userRacket.width <= userRacket.posX && userRacketTop <= ball.posY && ball.posY <= userRacketBottom){
			ball.velocityX = -ball.velocityX
			changeBallVelocity(userRacketTop, userRacket )
		}

		let compRacketTop = compRacket.posY - compRacket.height / 2
		let compRacketBottom = compRacket.posY + compRacket.height / 2

		if(ball.posX + compRacket.width >= compRacket.posX && compRacketTop <= ball.posY && ball.posY <= compRacketBottom){
			ball.velocityX = -ball.velocityX
			changeBallVelocity(compRacketTop, compRacket )
		}
	},
	resetBallPos() {
		this.posX = canvas.width / 2
		this.posY = canvas.height / 2
	}
}

const score = {
	color: '#ffffff',
	user: 0,
	comp: 0,
	max: 5,
	render() {
		ctx.fillStyle = this.color
		ctx.font = 'bold 50px serif'
		ctx.fillText(this.user, 50 , 50)
		ctx.fillText(this.comp, canvas.width - 75 , 50)
	}
}

class Racket {
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
		ctx.fillRect(this.posX, this.posY - this.height / 2, this.width, this.height)
		ctx.closePath()
	}
}

let userRacket = new Racket(0, canvas.height / 2, 10, 100, '#ffffff' )
let compRacket = new Racket(canvas.width - 10, canvas.height / 2, 10, 100, '#ffffff' )

const changeBallVelocity = (playerRacketTop, racket) => {

	if(playerRacketTop <= ball.posY
		&& ball.posY <= playerRacketTop + racket.height / 6 ) ball.velocityY = -5
	if(playerRacketTop + racket.height / 6  <= ball.posY
		&& ball.posY <= playerRacketTop + racket.height / 6 * 2) ball.velocityY = -3
	if(playerRacketTop + racket.height / 6 * 2 <= ball.posY
		&& ball.posY <= playerRacketTop + racket.height / 6 * 3) ball.velocityY = -1
	if(playerRacketTop + racket.height / 6 * 3 <= ball.posY
		&& ball.posY <= playerRacketTop + racket.height / 6 * 4) ball.velocityY = 1
	if(playerRacketTop + racket.height / 6 * 4 <= ball.posY
		&& ball.posY <= playerRacketTop + racket.height / 6 * 5) ball.velocityY = 3
	if(playerRacketTop + racket.height / 6 * 5 <= ball.posY
		&& ball.posY <= playerRacketTop + racket.height / 6 * 6) ball.velocityY = 5

	if(ball.velocityX > 0 && ball.velocityY > 0) ball.velocityX = 10 - ball.velocityY
	if(ball.velocityX > 0 && ball.velocityY < 0) ball.velocityX = 10 + ball.velocityY
	if(ball.velocityX < 0 && ball.velocityY > 0) ball.velocityX = -10 + ball.velocityY
	if(ball.velocityX < 0 && ball.velocityY < 0) ball.velocityX = -10 - ball.velocityY

}