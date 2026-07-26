import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Update from './pages/Update'
import{ ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const App = () => {
    return(
        <div>
            <nav className='bg-gray-800'>
                <div className='container mx-auto p-2'>
                    <Link to="/"><h2 className='text-white text-2xl font-bold'>React CRUD</h2></Link>
                </div>
            </nav>

            <div>
                <Routes className="container mx-auto p-2 h-full">
                    <Route index element={<Home/>}></Route>
                    <Route path='/add' element={<Add/>}></Route>
                    <Route path='/update/:id' element={<Update/>}></Route>
                </Routes>
            </div>
            <ToastContainer/>
            
        </div>
    );
}

export default App;