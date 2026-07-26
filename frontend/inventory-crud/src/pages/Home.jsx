import { useEffect, useState } from "react"
import axios from "axios"
import Product from "../components/Product"
import { VITE_BACKEND_URL } from "../App"
import { Link } from 'react-router-dom'

const Home = () => {
    const [inventory, setInventory] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getInventory = async () => {
        try {
            setIsLoading(true) 
            const response = await axios.get(`${VITE_BACKEND_URL}/api/inventory`)
            console.log(response.data)
            setInventory(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error("Failed to fetch inventory:", error)
        }
    }
    useEffect(() =>{
        getInventory()
    }, [])
    return(
        <div>
            <div>
                <Link to="/add" className="inline-block mt-4 shadow-md bg-blue-400 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                    Add Inventory
                </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {isLoading ?(
                    "Loading"
                ): (
                    <>
                    {inventory.length > 0 ? ( 
                        <>
                            {
                                inventory.map((product, index) =>{
                                    return(
                                        <Product key={index} product={product} getInventory={getInventory}/>
                                    )
                                }) 
                            }
                        </>
                    ): (
                        <div>
                            There is no inventory
                        </div>
                    )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Home