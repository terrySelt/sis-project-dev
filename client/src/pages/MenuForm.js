import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { useMyContext } from '../context/restaurantContext'
import {Link, useNavigate,useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import '../css/menuform.css'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export function MenuForm() {
  
  const {createMenu, catmenus, getMenu, updateMenu} = useMyContext()
  const navigate = useNavigate()
  const params = useParams()

  const [menu, setMenu] = useState({
    name:'',
    short_description:'',
    price:'',
    discount:'',
    points:'',
    image: null
  })

  useEffect(() => {
    (async() => {
      if(params.id){
        const menu = await getMenu(params.id)
        setMenu(menu)
      }
    })()
  },[params.id])

  return (
    <div className='container'>
      <div className='container-form-menuform2'>
        <div className='header-form-menuform'>
          <div className='div-link-menuform'>
            <Link to='/menulist' className='form-catmenu-regresar'>Regresar</Link>
          </div>
          <div className='div-link-menuform'>
            <Link to='/catmenuform' className='form-catmenu-regresar'>Nueva Categoria</Link>
          </div>
            <h3>Nueva categoria del menú</h3>
        </div>
        <Formik
          initialValues={menu}
          validationSchema={Yup.object({
            name : Yup.string().required("El nombre es requerido"),
            short_description : Yup.string(),
            price : Yup.number().required("El precio es requerido"),
            category : Yup.string().required('La categoria es requerida'),
            discount : Yup.number(),
            points: Yup.number()
          })}
          onSubmit={ async (values, actions)=>{
            if (params.id){
              await updateMenu(params.id, values)
            }else{
              await createMenu(values)
            }
            
            actions.setSubmitting(false)
            navigate('/MenuList')
          }}
          enableReinitialize
        >
          {({handleSubmit, isSubmitting, setFieldValue}) => (
            <Form className='form-menuform' onSubmit={handleSubmit}>
            <label htmlFor='name' className='label-form-menuform'>Nombre</label>
            <Field name='name' className='input-menufrom'/>
            <ErrorMessage component='p' name='name' className='errormessage-menuform'/>
            <label htmlFor='short_description' className='label-form-menuform'>Descripción corta</label>
            <Field name='short_description' className='input-menufrom'/>
            <ErrorMessage component='p' name='short_description' className='errormessage-menuform'/>
            <label htmlFor='price' className='label-form-menuform'>Precio</label>
            <Field name='price' className='input-menufrom'/>
            <ErrorMessage component='p' name='price' className='errormessage-menuform'/>
            <label htmlFor='category' className='label-form-menuform'>Categoria</label>
            <Field name='category' as='select' className='select-form-menuform' defaultValue={'DEFAULT'}>
              <option value="DEFAULT" disabled>Seleccione una categoria</option>
                {catmenus.map(catmenu => (
                  <option key={catmenu._id}>{catmenu.name}</option>
                ))}
            </Field>
            <ErrorMessage component='p' name='category' className='errormessage-menuform'/>
            <label htmlFor='discount' className='label-form-menuform'>Descuento</label>
            <Field name='discount' className='input-menufrom'/>
            <ErrorMessage component='p' name='discount' className='errormessage-menuform'/>
            <label htmlFor='points' className='label-form-menuform'>Puntos</label>
            <Field name='points' className='input-menufrom'/>
            <ErrorMessage component='p' name='points' className='errormessage-menuform'/>
            <label htmlFor='image' className='label-form-menuform'>Imagen</label>
            <input type='file' name='image' className='input-image-menuform' onChange={(e) => setFieldValue('image', e.target.files[0])}/>
            <button type='submit' 
                className='btn-guardar-menuform' 
                disabled={isSubmitting}>{isSubmitting ? (
                  <AiOutlineLoading3Quarters className='btn-guardar-menuform-icon' />
                ) : 'Guardar'}
              </button>
          </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

