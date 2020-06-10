import React from 'react'
import CacheElement from './CacheElement/CacheElement'
import s from './CacheList.module.sass'



type CacheList = {
    cacheElements: Array<object>
    setCachePairToForm: (key: string | null) => void
}

const CacheList: React.FC<CacheList> = React.memo((props) => {

    const {cacheElements, setCachePairToForm} = props

    return(
        <section>

            <table className={s.table}>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>

                    {cacheElements.map((element: object) => {
                        return (
                            <CacheElement
                                key={Object.keys(element)[0]}
                                cacheKey={Object.keys(element)[0]}
                                cacheValue={Object.values(element)[0]}
                                setCachePairToForm={setCachePairToForm}
                            />
                        )
                    })}

                </tbody>
            </table>

        </section>
    )
})

export default CacheList