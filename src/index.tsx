import React from 'react'
import ReactDOM from 'react-dom'
import App from 'src/App'
import './styles'
import {BrowserRouter} from "react-router-dom"
import firebase from 'firebase/app'

const  firebaseConfig = {
	apiKey: "AIzaSyDQtGPtMwnhfozW-9D4MqpHly4fbuBBT8Y",
	authDomain: "todolist-740d7.firebaseapp.com",
	databaseURL: "https://todolist-740d7-default-rtdb.firebaseio.com",
	projectId: "todolist-740d7",
	storageBucket: "todolist-740d7.appspot.com",
	messagingSenderId: "594520439375",
	appId: "1:594520439375:web:2fbaf3ad97b4a3752a483a"
}
firebase.initializeApp(firebaseConfig)


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('app')
);