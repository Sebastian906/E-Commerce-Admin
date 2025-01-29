import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'

const Add = () => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestSeller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async () => {
        e.preventDefault();
        try {
            const formData = new FormData()
            formData.append("name",name)
            formData.append("description",description)
            formData.append("price",price)
            formData.append("category",category)
            formData.append("subCategory",subCategory)
            formData.append("bestSeller",bestSeller)
            formData.append("sizes",JSON.stringify(sizes))

            image1 && formData.append("image1",image1)
            image2 && formData.append("image2",image2)
            image3 && formData.append("image3",image3)
            image4 && formData.append("image4",image4)
        
            const response = await axios.post(backendUrl + "/api/product/add",formData)

            console.log(responde.data);

        } catch (error) {
            
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 text-stone-800'>
            <div>
                <p className='mb-2'>Subir Imagen</p>
                <div className='flex gap-2'>
                    <label htmlFor="image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
                    </label>
                    <label htmlFor="image2">
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
                    </label>
                    <label htmlFor="image3">
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
                    </label>
                    <label htmlFor="image4">
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
                    </label>
                </div>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Nombre del Producto</p>
                <input onClick={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 bg-transparent' type="text" placeholder='Escriba aquí' required/>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Descripción del Producto</p>
                <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 bg-transparent' type="text" placeholder='Escriba aquí' required/>
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Categoría del Producto</p>
                    <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Men">Hombres</option>
                        <option value="Women">Mujeres</option>
                        <option value="Kids">Niños</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Subcategoría del Producto</p>
                    <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Topwear">Ropa Superior</option>
                        <option value="Bottomwear">Ropa Inferior</option>
                        <option value="Winterwear">Ropa de Invierno</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Precio del Producto</p>
                    <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
                </div>
            </div>
            <div>
                <p className='mb-2'>Tamaño del Producto</p>
                <div className='flex gap-3 text-zinc-800'>
                    <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S" ) : [...prev])}>
                        <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                    </div>
                    <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M" ) : [...prev])}>
                        <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                    </div>
                    <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L" ) : [...prev])}>
                        <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                    </div>
                    <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL" ) : [...prev])}>
                        <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                    </div>
                    <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL" ) : [...prev])}>
                        <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
                    </div>
                </div>
            </div>
            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestSeller(prev = !prev)} checked={bestSeller} type="checkbox" id='bestseller' />
                <label className='cursor-pointer' htmlFor="bestseller">Agregar a más vendidos</label>
            </div>
            <button type="submit" className='w-28 py-3 mt-4 bg-gray-800 text-white'>AGREGAR</button>
        </form>
    )
}

export default Add