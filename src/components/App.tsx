import React from 'react'
import '../assets/styles/global.sass'
import AddCacheForm from './AddCacheForm/AddCacheForm'
import CacheList from './CacheList/CacheList'



type AppType = {
    cacheElements: Array<object>
    chosenCachePair: Array<string>
    setCachePairToForm: (key: string | null) => void
    addNewCachePair: (key: string, value: string) => void
}

const App: React.FC<AppType> = React.memo((props) => {

    const {cacheElements, chosenCachePair, setCachePairToForm, addNewCachePair} = props

    return (
        <main>

            <h1>Cache controller</h1>

            <div id='cacheController'>

                <AddCacheForm
                    chosenCachePair={chosenCachePair}
                    addNewCachePair={addNewCachePair}
                />
                <CacheList
                    cacheElements={cacheElements}
                    setCachePairToForm={setCachePairToForm}
                />

            </div>

        </main>
    )
})

export default App
