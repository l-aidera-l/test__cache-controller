import React from 'react'
import App from './App'
import CacheController from '../libs/cacheController'



class AppContainer extends React.PureComponent{

    /* Change cache max elements (you can also change start and count prefixes) */
    cacheController = new CacheController(2)



    state = {
        cacheElements: [] as Array<object>,
        chosenCachePair: [] as Array<string>,
    }



    setCachePairToForm = (key: string | null) => {
        if(key !== null){
            const value = this.cacheController.get(key)
            this.setState({'chosenCachePair': [key, value]})
        }
    }

    refreshCacheTable = () => {
        let elements = this.cacheController.getAll()
        this.setState({'cacheElements': elements})
    }

    addNewCachePair = (key: string, value: string) => {
        this.cacheController.set(key,value)
        this.refreshCacheTable()
    }



    componentDidMount(): void {
        this.refreshCacheTable()

        /* Uncomment to see local storage */
        // console.log(localStorage)

        /* Uncomment to clear local storage */
        // localStorage.clear()
    }



    render(){
        return <App
            cacheElements={this.state.cacheElements}
            chosenCachePair={this.state.chosenCachePair}
            setCachePairToForm={this.setCachePairToForm}
            addNewCachePair={this.addNewCachePair}
        />
    }

}

export default AppContainer