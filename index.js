const arrayDiff = {
	option_one(arr1, arr2) {
		return arr1.filter(i => !arr2.includes(i))
	},
	option_two(arr1, arr2) {
		return arr1.filter(i => {
			for(let y of arr2)  {
				if(i === y) return false
			}
			return true
		})
	},
	option_three(arr1, arr2) {
		return arr1.filter(x => !arr2.some(y => x === y));
	}
}

console.log(arrayDiff.option_one([1,2],[1]))
console.log(arrayDiff.option_two([1,2,2,2,3,],[2]))
console.log(arrayDiff.option_three([1,2,2,2,3],[2, 9, 99, -1]))

const alphabetPosition = {
	option_one(string) {
		let val = ''
		let arr_en = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
		for (let char of string) {
			let num = arr_en.indexOf(char.toUpperCase()) + 1
			num !== 0 ? val += num + ' ' : null
		}
		return val
	},
	option_two(string) {
		let val = ''
		for (let char of string)
			if(Boolean(char.charAt(0).match(/[a-zA-Z]/))) val += (char.toUpperCase().charCodeAt(0) - 64) + ' '
		return val
	},
	option_three(string) {
		let val = ''
		let arr_en = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
		for (let char of string) {
			arr_en.map((i, index) => char.toUpperCase() === i ? val += index + 1 + ' ' : null )
		}
		return val
	}
}


console.log(alphabetPosition.option_one("The sunset sets at twelve o' clock."))
console.log(alphabetPosition.option_two("The sunset sets at twelve o' clock."))
console.log(alphabetPosition.option_three("The sunset sets at twelve o' clock."))


const squareEveryDigit = {
	option_one(num) {
		let val = ''
		for (let i of String(num)) val += i * i
		return val
	},
	option_two(num) {
		return String(num).split('').map(i => Math.pow(i, 2)).join('')
	},
	option_three(num) {
		return Array.from(num.toString(), i => i * i).join('')
	}
}

console.log(squareEveryDigit.option_one(9119))
console.log(squareEveryDigit.option_two(323))
console.log(squareEveryDigit.option_three(101))