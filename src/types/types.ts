export type Task = {
	id: string
	name: string
	description: string
	status: 'Pending' | 'In progress' | 'Completed' | 'Canceled'
	importance: 'Minor' | 'Normal' | 'Critical'
	users: Array<string>
}

export type User = {
	id: string
	firstName: string
	lastName: string
	email: string
	avatar: string | null
}

export type notice = {
	id: string
	recipient: string
}

export type CommentType = {
	id: string
	author: User
	body: string
	taskId: string
}

