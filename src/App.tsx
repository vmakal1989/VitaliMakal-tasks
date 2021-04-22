import React from "react"
import Header from "./components/Header"
import Main from "./components/Main"

const App = (): JSX.Element =>  {
	return (
		<div className='app'>
			<div className="wrapper">
				<Header />
				<Main />
			</div>
		</div>
	)
}

export default App