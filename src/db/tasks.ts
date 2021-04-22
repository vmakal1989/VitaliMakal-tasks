export const tasks: Array<Task> = [
	{
		id: 0,
		description: "Evaluate the addition and deletion of user IDs.",
		status: "Pending",
		importance: "Minor",
		users: [1, 2, 0]
	},
	{
		id: 1,
		description: "Identify the implementation team.",
		status: "In progress",
		importance: "Normal",
		users: [7,5,2,1,0]
	},
	{
		id: 2,
		description: "Batch schedule download/process.",
		status: "Pending",
		importance: "Critical",
		users: [2,5]
	},
	{
		id: 3,
		description: "Monitor system performance and adjust hardware.",
		status: "Pending",
		importance: "Minor",
		users: [2,5,4]
	},
	{
		id: 4,
		description: "Install console machines and prerequisite software.",
		status: "Completed",
		importance: "Critical",
		users: [7,3,2,4,5]
	},
	{
		id: 5,
		description: "Design a relatively simple business system",
		status: "Completed",
		importance: "Critical",
		users: [2,7]
	},
	{
		id: 6,
		description: "Define users and workflow",
		status: "Canceled",
		importance: "Minor",
		users: [1,0,7]
	}
]