let canvas = document.createElement('div')
canvas.classList.add('canvas')

export const openPong = () => {
	document.querySelector('.game').innerHTML = ''
	document.querySelector('.pong').append(canvas)
	gameInit()
}

const gameInit = () => {

}