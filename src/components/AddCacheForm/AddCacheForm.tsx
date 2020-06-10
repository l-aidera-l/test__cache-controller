import React, {useEffect, useState} from 'react'
import { Formik, Field, Form} from 'formik'
import * as Yup from 'yup'
import s from './AddCacheForm.module.sass'



type FormType = {
    chosenCachePair: Array<string>
    addNewCachePair: (key: string, value: string) => void
}

const AddCacheForm: React.FC<FormType> = React.memo((props) => {

    const {chosenCachePair, addNewCachePair} = props

    let [cacheKey, setCacheKey] = useState(chosenCachePair[0] || '')
    let [cacheValue, setCacheValue] = useState(chosenCachePair[1] || '')



    useEffect(() => {
        setCacheKey(chosenCachePair[0] || '')
        setCacheValue(chosenCachePair[1] || '')

    }, [chosenCachePair])



    return(
        <section>

            <Formik
                initialValues={{
                    cacheController__inputKey: cacheKey,
                    cacheController__inputValue: cacheValue
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    cacheController__inputKey: Yup.string()
                        .required('Required'),
                    cacheController__inputValue: Yup.string()
                        .required('Required')
                })}

                onSubmit={(values, actions)=>{
                    addNewCachePair(values.cacheController__inputKey, values.cacheController__inputValue)
                    setCacheKey('')
                    setCacheValue('')
                    actions.resetForm()
                    const onFocusField: HTMLInputElement | null = document.querySelector('#cacheController__inputKey')
                    if(onFocusField){
                        onFocusField.focus()
                    }

                }}
            >
                {formik => {
                    return <Form className={s.form}>
                        <fieldset>
                            <label htmlFor="cacheController__inputKey">Key</label>
                            <Field
                                placeholder='Enter key'
                                type='text'
                                id='cacheController__inputKey'
                                name='cacheController__inputKey'
                            />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="cacheController__inputValue">Value</label>
                            <Field
                                placeholder='Enter value'
                                type='text'
                                id='cacheController__inputValue'
                                name='cacheController__inputValue'
                            />
                        </fieldset>

                        {formik.touched && formik.values.cacheController__inputKey && formik.values.cacheController__inputValue &&
                            <button type={'submit'} className='cacheController__button-save'>Save</button>
                        }
                    </Form>
                }}
            </Formik>

        </section>
    )
})

export default AddCacheForm