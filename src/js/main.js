import '../scss/style.scss'
import { openSnake } from './snake/snake'
import { openPong } from './pong/pong'
import { openJumper} from './jumper/jumper'

const games = ['Pong', 'Snake', 'Jumper']

let btnGroup = document.querySelector('.btn-group')

let title = document.createElement('h1')
title.innerHTML = 'Выберите игру'
title.classList.add('title')
btnGroup.append(title)

games.forEach(name => {
	let btn = document.createElement('button')
	btn.classList.add('btn')
	btn.innerHTML = name
	btnGroup.append(btn)
	btn.addEventListener('click',  function() { chooseGame(this, name) })
})

const  chooseGame = (btn, name) => {
	document.querySelectorAll('.btn').forEach(el => el.classList.remove('active'))
	document.querySelector('.game').className = 'game'
	document.querySelector('.game').classList.add('game__' + name.toLowerCase())
	btn.classList.add('active')
	openGame(name)
}

const openGame = (name) => {
	name === 'Snake' && openSnake()
	name === 'Pong' && openPong()
	name === 'Jumper' && openJumper()
}

