
type Task = {
	id: string
	name: string
	description: string
	status: 'Pending' | 'In progress' | 'Completed' | 'Canceled'
	importance: 'Minor' | 'Normal' | 'Critical'
	users: Array<string>
}

type User = {
	id: string
	firstName: string
	lastName: string
	email: string
}