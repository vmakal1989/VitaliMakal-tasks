import './App.scss'
import React from "react"
import {RangeField} from "./components/RangeField/RangeField"
import {Button} from "./components/Button/Button"
import {observer} from "mobx-react"
import store from "./state/mobxState"
import dead from './assets/image/dead.gif'

let timer = store.startGame()

const  App = observer(() => {

    store.pet.health.range <= 0 && clearInterval(timer)

    let {health, thirst, hunger, fatigue} = store.pet

    const renderRangeFields = () => [health, thirst, hunger, fatigue].map(el => <RangeField  key={el.id} label={el.label} range={el.range} className={el.class}/>)
    const renderButtons = () => store.buttons.map(el => <Button key={el.label} label={el.label} className={el.class} onClick={handleClick}/>)

    const handleClick = (el) => {
        el === 'Есть' && store.eat()
        el === 'Пить' && store.drink()
        el === 'Отдохнуть' && store.relax()
        el === 'Работать' && store.work()
    }

    if(store.pet.health.range <= 0) return <div className={'app wrapper'}><img src={dead} alt="dead" /></div>

    return (
        <div className="app">
            <h1 className="title">MiniGame</h1>
            <div className="wrapper">
                <div className={"stats"}>
                    { renderRangeFields() }
                </div>
                <div className={'controls'}>
                    { renderButtons() }
                </div>
            </div>
        </div>
    )
})

export default App;
