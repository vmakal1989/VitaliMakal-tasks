import { makeAutoObservable } from "mobx"

class State {
	pet = {
		health: {
			id: 0,
			label: 'Здоровье',
			range: 200,
			class: 'health'
		},
		thirst: {
			id: 1,
			label: 'Жажда',
			range: 0,
			class: 'thirst'
		},
		hunger: {
			id: 2,
			label: 'Голод',
			range: 0,
			class: 'hunger'
		},
		fatigue: {
			id: 3,
			label: 'Усталость',
			range: 0,
			class: 'fatigue'
		}
	}
	buttons = [
		{label: 'Есть', class: 'red'},
		{label: 'Пить', class: 'blue'},
		{label: 'Отдохнуть', class: 'orange'},
		{label: 'Работать', class: 'grey'}
	]
	history = []
	healthDeclineUnit = 0.05
	thirstDeclineUnit = 0.7
	hungerDeclineUnit = 0.3
	fatigueDeclineUnit = 0.05
	maxRange = 200
	minRange = 0

	constructor() {
		makeAutoObservable(this);
	}
	startGame() {
		let timer = setInterval(() => {
			if(this.pet.thirst.range <= this.minRange) [this.healthDeclineUnit, this.fatigueDeclineUnit] = [0.05, 0.1]
			if(this.pet.thirst.range >= this.minRange && this.pet.thirst.range <= this.maxRange ) [this.healthDeclineUnit, this.fatigueDeclineUnit] = [0.15, 0.25]
			if(this.pet.thirst.range >= this.maxRange) [this.healthDeclineUnit, this.fatigueDeclineUnit] = [0.25, 0.35]

			if(this.pet.hunger.range >= this.minRange && this.pet.hunger.range <= this.maxRange ) [this.healthDeclineUnit, this.fatigueDeclineUnit] = [0.25, 0.35]
			if(this.pet.hunger.range >= this.maxRange) [this.healthDeclineUnit, this.fatigueDeclineUnit] = [0.45, 0.45]

			if(this.pet.hunger.range >= this.maxRange && this.pet.thirst.range >= this.maxRange) [this.healthDeclineUnit, this.fatigueDeclineUnit] = [1, 1]

			this.pet.health.range -= this.healthDeclineUnit
			if(this.pet.thirst.range < this.maxRange) this.pet.thirst.range += this.thirstDeclineUnit
			if(this.pet.hunger.range < this.maxRange) this.pet.hunger.range += this.hungerDeclineUnit
			if(this.pet.fatigue.range < this.maxRange) this.pet.fatigue.range += this.fatigueDeclineUnit
		}, 200)
		return timer
	}
	eat() {
		this.history.push(`Вы покормили питомца.`)
		if(this.pet.hunger.range > this.minRange) {
			this.pet.hunger.range -= 10
			if(this.pet.hunger.range < this.minRange) this.pet.hunger.range = this.minRange
		}
		if(this.pet.health.range < this.maxRange) {
			this.pet.health.range += 2
			if(this.pet.health.range > this.maxRange) this.pet.health.range = this.maxRange
		}
	}
	drink() {
		this.history.push(`Вы напоили вашего питомца.`)
		if(this.pet.thirst.range > this.minRange) {
			this.pet.thirst.range -= 10
			if(this.pet.thirst.range < this.minRange) this.pet.thirst.range = this.minRange
		}
		if(this.pet.health.range > this.minRange) {
			this.pet.health.range += 1
			if(this.pet.health.range < this.minRange) this.pet.health.range = this.minRange
		}
	}
	relax() {
		this.history.push(`Ваш питомец отдохнул`)
		if(this.pet.health.range < this.maxRange) {
			this.pet.health.range += getRandomIntInclusive(1,10)
			if(this.pet.health.range > this.maxRange) this.pet.health.range = this.maxRange
		}
		if(this.pet.fatigue.range > this.minRange) {
			this.pet.fatigue.range -= getRandomIntInclusive(10,20)
			if(this.pet.fatigue.range < this.minRange) this.pet.fatigue.range = this.minRange
		}

	}
	work() {
		this.history.push(`Ваш питомец немного поработал`)
		if(this.pet.thirst.range < this.maxRange) {
			this.pet.thirst.range += getRandomIntInclusive(30,40)
			if(this.pet.thirst.range > this.maxRange) this.pet.thirst.range = this.maxRange
		}
		if(this.pet.hunger.range < this.maxRange) {
			this.pet.hunger.range += getRandomIntInclusive(10,20)
			if(this.pet.hunger.range > this.maxRange) this.pet.hunger.range = this.maxRange
		}
		if(this.pet.fatigue.range < this.maxRange) {
			this.pet.fatigue.range += getRandomIntInclusive(10,20)
			if(this.pet.fatigue.range > this.maxRange) this.pet.fatigue.range = this.maxRange
		}
		if(this.pet.health.range > this.minRange) {
			this.pet.health.range -= getRandomIntInclusive(10,20)
			if(this.pet.health.range < this.minRange)  this.pet.health.range = this.minRange
		}
	}
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const store = new State()

export default store;