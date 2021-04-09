export const getCanvas = (game) => {
	document.querySelector('.game').innerHTML = ''
	let canvas = document.createElement('div')
	document.querySelector(`.game__${game}`).append(canvas)
	canvas.classList.add('canvas')
	return canvas
}
export const renderFooter = (game, score, start) => {
	let footer = document.createElement('div')
	footer.classList.add('footer')
	document.querySelector(`.game__${game}`).append(footer)
	let btn = document.createElement('button')
	btn.classList.add('footer__btn', 'btn')
	btn.innerHTML = 'Start'
	footer.append(btn)
	let scoreBlock = document.createElement('div')
	scoreBlock.classList.add('footer__score')
	scoreBlock.innerHTML = `Score: ${score}`
	footer.append(scoreBlock)
	btn.addEventListener('click', () => {
		btn.disabled = true
		start()
	})
}

export const renderInformWindow = (game, text) => {
	let informWindow = document.createElement('div')
	informWindow.classList.add('inform-window')
	document.querySelector(`.wrapper`).append(informWindow)
	informWindow.innerHTML = text
	setTimeout( function removeChild() {
		document.querySelector(`.wrapper`).removeChild(informWindow)
	},3000)
}