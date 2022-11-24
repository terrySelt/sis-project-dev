import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { useMyContext } from '../context/restaurantContext'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import '../css/catmenuform.css'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export function CatmenuForm() {
    const {createCatmenu ,getCatmenu, updateCatmenu} = useMyContext()
    const navigate = useNavigate()
    const params = useParams()

    const [catmenu, setCatmenu] = useState({
      name: ''
    })

    useEffect(() => {
      (async() => {
        if(params.id){
          const catmenu = await getCatmenu(params.id)
          setCatmenu(catmenu)
        }
      })()
    },[params.id])
    
    return (
      <div className='container'>
        <div className='container-form-catmenu2'>
          <div className='header-form-catmenu'>
            <div className='div-link-catmenu'><Link to='/catmenu' className='form-catmenu-regresar'>Regresar</Link></div>
            <h3>Nueva categoria del menú</h3>
          </div>
          <Formik
            initialValues={catmenu}
            validationSchema={Yup.object({
              name : Yup.string().required("La categoria del menu es requerida"),
            })}
            onSubmit={ async (values, actions)=>{
              if (params.id){
                await updateCatmenu(params.id, values)
              }else{
                await createCatmenu(values)
              }
  
              actions.setSubmitting(false)
              navigate('/Catmenu')
            }}
            enableReinitialize
          >
            {({handleSubmit, isSubmitting}) => (
              <Form className='form-catmenu' onSubmit={handleSubmit}>
              <label htmlFor='name' className='label-form-catmenu'>Nombre</label>
              <Field name='name'/>
              <ErrorMessage className='errormessage-catmenu' component='p' name='name'/>
              <button type='submit' 
                className='btn-guardar-catmenu' 
                disabled={isSubmitting}>{isSubmitting ? (
                  <AiOutlineLoading3Quarters className='btn-guardar-catmenu-icon' />
                ) : 'Guardar'}
              </button>
            </Form>
            )}
          </Formik>
        </div>
      </div>
    )
}
