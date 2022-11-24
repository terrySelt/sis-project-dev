import {MenuList, MenuForm, NotFoundPage, CatMenu, CatmenuForm} from './pages'
import {Routes, Route} from 'react-router-dom'
import './App.css';
import { RestaurantProvider } from './context/restaurantContext';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <RestaurantProvider>
      <Routes>
        <Route path='*' element={<NotFoundPage/>} />

        <Route path='/CatMenu' element={<CatMenu/>} />
        <Route path='/CatmenuForm' element={<CatmenuForm/>} />
        <Route path='/Catmenus/:id' element={<CatmenuForm/>} />

        <Route path='/MenuList' element={<MenuList/>} />
        <Route path='/MenuForm' element={<MenuForm/>} />
        <Route path='/Menus/:id' element={<MenuForm/>} />
      </Routes>
      <Toaster />
    </RestaurantProvider>
  )
}

export default App
