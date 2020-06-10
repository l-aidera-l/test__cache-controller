import React from 'react'



type ElementType = {
    cacheKey: string
    cacheValue: string
    setCachePairToForm: (key: string) => void
}

const CacheElement: React.FC<ElementType> = React.memo((props) => {

    const {cacheKey, cacheValue, setCachePairToForm} = props

    return(

        <tr onClick={() => setCachePairToForm(cacheKey)}>
            <td>{cacheKey}</td>
            <td>{cacheValue}</td>
        </tr>


    )
})

export default CacheElement