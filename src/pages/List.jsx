import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}});
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    },[])

    return (
        <>
            <p className='mb-2'>Todos los Productos</p>
            <div className='flex flex-col gap-2'>
                {/* Título de la Tabla de Productos */}
                <div className='md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-200 text-sm'>
                    <b>Imagen</b>
                    <b>Nombre</b>
                    <b>Categoría</b>
                    <b>Precio</b>
                    <b className='text-center'>Acciones</b>
                </div>
                {/* Lista de Productos */}
                {
                    list.map((item,index)=> (
                        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                            <img className='w-12' src={item.image[0]} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <button onClick={()=>removeProduct(item._id)} className='bg-red-700 text-right md:text-center cursor-pointer text-md rounded-md w-24 py-1 items-center justify-center font-bold text-slate-50'>Eliminar</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default List