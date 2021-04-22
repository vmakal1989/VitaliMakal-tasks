
type Task = {
	id: number
	description: string
	status: 'Pending' | 'In progress' | 'Completed' | 'Canceled'
	importance: 'Minor' | 'Normal' | 'Critical'
	users: Array<number>
}

type User = {
	id: number
	name: string
	photoURL: string
}