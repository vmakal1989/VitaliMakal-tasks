import '../scss/style.scss'
import { openSnake } from './snake/index'
import { openPong } from './pong/index'

const games = ['Pong', 'Snake']

let btnGroup = document.querySelector('.btn-group')

let title = document.createElement('h1')
title.innerHTML = 'Выберите игру'
title.classList.add('title')
btnGroup.append(title)

const openGame = (name) => {
	name === 'Snake' && openSnake()
	name === 'Pong' && openPong()
}

const  chooseGame = (btn, name) => {
	document.querySelectorAll('.btn').forEach(el => el.classList.remove('active'))
	document.querySelector('.game').className = 'game'
	document.querySelector('.game').classList.add('game__' + name.toLowerCase())
	btn.classList.add('active')
	openGame(name)
}

games.forEach(name => {
	let btn = document.createElement('button')
	btn.classList.add('btn')
	btn.innerHTML = name
	btnGroup.append(btn)
	btn.addEventListener('click',  function() { chooseGame(this, name) })
})


