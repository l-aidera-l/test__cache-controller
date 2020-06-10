
export default class CacheController{

    private readonly maxElementsCount: number
    private readonly prefixStart: string
    private readonly prefixCount: string



    constructor(maxElementsCount: number, prefixStart?: string, prefixCount?: string){
        this.maxElementsCount = maxElementsCount
        this.prefixStart = prefixStart || 'CC__'
        this.prefixCount = prefixCount || '__COUNT'
    }



    private withPrefix (key: string) {
        return this.prefixStart+key
    }


    private withCountPrefix (key: string) {
        return this.prefixStart+key+this.prefixCount
    }




    private clearPrefixStart (key: string) {
        const regExp = new RegExp(this.prefixStart)
        return key.replace(regExp, '')
    }

    private clearPrefixCount (key: string) {
        const regExp = new RegExp(this.prefixCount)
        return key.replace(regExp, '')
    }

    private clearAllPrefixes (key: string) {
        const clearStart = this.clearPrefixStart(key)
        return this.clearPrefixCount(clearStart)
    }


    private getKeys () {
        let keys: Array<string> = []

        const regExpCount = new RegExp(this.prefixCount)

        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i)

            if(key) {
                if(key.match(regExpCount) === null){
                    const clearKey = this.clearAllPrefixes(key)
                    keys.push(clearKey)
                }
            }

        }

        return keys
    }


    private getLessUsedElement (keys: Array<string>) {
        let minValueKey = null as string | null

        keys.forEach((key) => {
            if(minValueKey === null){
                minValueKey = key
            }else{
                let currentValue = Number(localStorage.getItem(this.withCountPrefix(key)))
                let prevValue = Number(localStorage.getItem(this.withCountPrefix(minValueKey)))
                if(currentValue<prevValue){
                    minValueKey = key
                }
            }
        })

        return minValueKey
    }


    private isElementExistInStorage (key: string, keys: Array<string>) {
        return keys.some((elem)=>{
            return key === elem
        })
    }


    private addElement (key: string, value: string) {
        localStorage.setItem(this.withPrefix(key), value)
        localStorage.setItem(this.withCountPrefix(key), '0')
    }


    private editElement (key: string, value: string) {
        localStorage.setItem(this.withPrefix(key), value)
    }


    private removeElement (key: string) {
        localStorage.removeItem(this.withPrefix(key))
        localStorage.removeItem(this.withCountPrefix(key))
    }


    private setElementsUsageCount (key: string) {
        const elementValue = localStorage.getItem(this.withCountPrefix(key))
        const isElementExist = !!elementValue

        if(isElementExist){
            const elementCount = Number(elementValue)
            const newValue = String(elementCount + 1)
            localStorage.setItem(this.withCountPrefix(key), newValue)


            console.log('key "'+key + '" updated its count: ' + newValue)
        }

    }



    get (key: string) {
        this.setElementsUsageCount(key)
        return localStorage.getItem(this.withPrefix(key))
    }


    set (key: string, value: string) {
        const keys = this.getKeys()

        if(this.isElementExistInStorage(key, keys)){
            this.editElement(key, value)
        }else{
            if(keys.length >= this.maxElementsCount){
                const lessUsedElement = this.getLessUsedElement(keys)
                if(lessUsedElement !== null){
                    this.removeElement(lessUsedElement)
                }
            }
            this.addElement(key, value)
        }
        this.setElementsUsageCount(key)

    }

    getAll () {
        const keys = this.getKeys()

        let cachedElements = [] as Array<object>
        keys.forEach((key) => {
            const value = localStorage.getItem(this.withPrefix(key))
            cachedElements.push({[key]: value})
        })

        return cachedElements
    }



}












