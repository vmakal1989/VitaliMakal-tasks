export const openSnake = () => {
	gameInit()
	document.addEventListener('keydown', event => {
		if(snake.direction  !== 'bottom' && event.code === 'ArrowUp' || event.code === 'KeyW')  snake.direction = 'top'
		if(snake.direction  !== 'top' && event.code === 'ArrowDown' || event.code === 'KeyS') snake.direction = 'bottom'
		if(snake.direction  !== 'right' && event.code === 'ArrowLeft' || event.code === 'KeyA') snake.direction = 'left'
		if(snake.direction  !== 'left' && event.code === 'ArrowRight' || event.code === 'KeyD') snake.direction = 'right'
	})
	window.gameInterval && clearInterval(window.gameInterval)
	window.speedInterval && clearInterval(window.speedInterval)
}

const gameInit = () => {
	window.gameInterval && clearInterval(window.gameInterval)
	canvas.init()
	canvas.render()
	snake.render()
	fruit.render()
	renderFooter()
	renderInformWindow()
}

const game = {
	score: 0,

	start() {
		window.gameInterval = setInterval(() => snake.move(snake.direction) , snake.speed)
	},
	stop() {
		clearInterval(window.gameInterval)
		let informWindow = document.querySelector('.inform-window')
		informWindow.innerHTML = `Your score: ${this.score}!`
		informWindow.style.display = 'block'
		snake.snake = []
		snake.speed = 300
		setTimeout(() => {
			informWindow.style.display = 'none'
			this.score = 0
			document.querySelector('.footer__btn').disabled = false
			gameInit()
		}, 2000)
	}
}

const canvas = {
	tilesInWidth: 25,
	tilesInHeight: 20,
	tileSize: 15,
	init(){
		document.querySelector('.game').innerHTML = ''
		let canvas = document.createElement('div')
		document.querySelector('.game__snake').append(canvas)
		canvas.classList.add('canvas')
		canvas.style.width = this.tilesInWidth * this.tileSize + 'px'
		canvas.style.height = this.tilesInHeight * this.tileSize + 'px'
	},
	render() {
		let x = 1
		let y = this.tilesInHeight
		for(let i = 0; i !== this.tilesInWidth * this.tilesInHeight; i++) {
			let tile = document.createElement('div')
			tile.classList.add('tile')
			tile.style.width = this.tileSize + 'px'
			tile.style.height = this.tileSize + 'px'
			tile.setAttribute('posX', `${x}`)
			tile.setAttribute('posY', `${y}`)
			x++
			if(x > this.tilesInWidth) {
				x = 1
				y--
			}
			document.querySelector('.canvas').appendChild(tile)
		}
		let walls = [
			...document.querySelectorAll(`[posX = '1']`),
			...document.querySelectorAll(`[posY = '1']`),
			...document.querySelectorAll(`[posX = '${this.tilesInWidth}']`),
			...document.querySelectorAll(`[posY = '${this.tilesInHeight}']`)
		]
		walls.forEach(el => el.classList.add('wall'))
	}
}

const renderFooter = () => {
	let footer = document.createElement('div')
	footer.classList.add('footer')
	document.querySelector('.game__snake').append(footer)
	let btn = document.createElement('button')
	btn.classList.add('footer__btn', 'btn')
	btn.innerHTML = 'Start'
	footer.append(btn)
	let score = document.createElement('div')
	score.classList.add('footer__score')
	score.innerHTML = `Score: ${game.score}`
	footer.append(score)
	btn.addEventListener('click', () => {
		btn.disabled = true
		game.start()
	})
}

const renderInformWindow = () => {
	let informWindow = document.createElement('div')
	informWindow.classList.add('inform-window')
	document.querySelector('.game__snake').append(informWindow)
}

const snake = {
	snake: [],
	speed: 300,
	direction: 'left',

	init() {
		this.snake = []
		let posX = Math.round(canvas.tilesInWidth / 2 )
		let  posY =  Math.round(canvas.tilesInHeight / 2)
		return [posX, posY]
	},
	render() {
		document.querySelector(`[posX = '${this.init()[0]}'][posY = '${this.init()[1]}']`).classList.add('snake-head', 'snake')
		this.snake.push(document.querySelector('.snake-head'))
	},
	move(val) {
		let snakeHeadPos = [+this.snake[0].getAttribute('posX'), +this.snake[0].getAttribute('posY')]
		let directions = {
			'left': `[posX = '${snakeHeadPos[0] - 1}'][posY = '${snakeHeadPos[1]}']`,
			'right': `[posX = '${snakeHeadPos[0] + 1}'][posY = '${snakeHeadPos[1]}']`,
			'top': `[posX = '${snakeHeadPos[0]}'][posY = '${snakeHeadPos[1] + 1}']`,
			'bottom': `[posX = '${snakeHeadPos[0]}'][posY = '${snakeHeadPos[1] - 1 }']`
		}
		
		let newSnakeHead = document.querySelector(directions[val])

		if(newSnakeHead.classList.contains('wall') || newSnakeHead.classList.contains('snake-body')) game.stop()
		else {
			this.snake.unshift(newSnakeHead)
			if(!this.eatFruit(newSnakeHead)) this.snake.pop().className = 'tile'
			this.snake.map((el, index) => index === 0 ? el.className = 'snake-head snake tile' : el.className = 'snake-body snake tile')
		}
	},
	eatFruit(newSnakeHead) {
		if(newSnakeHead.classList.contains('fruit')) {
			fruit.render()
			let score = document.querySelector('.footer__score')
			score.innerHTML = `Score: ${game.score += 5}`
			if(game.score % 20 === 0) snake.speed -= 20, clearInterval(document.gameInterval), game.start()
			return true
		}
		return false
	}
}

const fruit = {
	init() {
		let posX = Math.round(Math.random() * ((canvas.tilesInWidth - 1) - 2) + 2 )
		let  posY =  Math.round(Math.random() * ((canvas.tilesInHeight - 1) - 2) + 2 )
		return [posX, posY]
	},
	render() {
		let fruit = document.querySelector(`[posX = '${this.init()[0]}'][posY = '${this.init()[1]}']`)
		fruit.classList.contains('snake') && this.render()
		fruit.classList.add('fruit')
	}
}