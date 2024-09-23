import {useForm} from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/task.api'
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from 'react'
import {toast} from 'react-hot-toast'

export function TasksFormPage(){
    const {register, handleSubmit, formState: {errors}, setValue} = useForm()

    const navigate = useNavigate()
    const params = useParams()
    console.log(params)

    const onSubmit = handleSubmit(async (data) => {

        if(params.id){
            await  updateTask(params.id, data)
            await createTask(data)
            toast.success("Tarea Actualizada", {
                position: 'bottom-right',
                style:{
                    background: '#101010',
                    color: '#fff'
                }
            })
        }else{
            await createTask(data)
            toast.success("Tarea creada", {
                position: 'bottom-right',
                style:{
                    background: '#101010',
                    color: '#fff'
                }
            })
        }

        navigate('/tasks')
    })

    useEffect(() => {
        async function loadTask() {
            if(params.id){
                const {data: {title, description}} = await getTask(params.id)
                setValue('title', title)
                setValue('description', description)
            }
        }
        
        loadTask()
    }, [params.id, setValue])

    return(
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="title" 
                    {...register("title", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {
                    errors.title && <span>Title is required</span>
                }

                <textarea 
                    rows="3" 
                    placeholder="Description"
                    {...register("description", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {
                    errors.description && <span>This Field is required</span>
                }

                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3 text-lg font-semibold hover:bg-indigo-800 transition-colors'>Save</button>
            </form>

                {
                    params.id && 
                        <div className='flex justify-end'>
                            <button 
                                className='bg-red-500 hover:bg-red-700 p-3 rounded-lg w-48 mt-3'
                                onClick={async() => {
                                    const accepted = window.confirm("Estas seguro?")
                                        if(accepted) {
                                            await deleteTask(params.id)
                                            navigate('/tasks')

                                            toast.success("Tarea Eliminada", {
                                                position: 'bottom-right',
                                                style:{
                                                    background: '#101010',
                                                    color: '#fff'
                                                }
                                            })
                                        }
                                }}>
                                Delete
                            </button>   
                        </div>
                }
                
        </div>
    )
}