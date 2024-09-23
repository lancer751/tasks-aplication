import { useNavigate } from "react-router-dom"


export function TaskCard({task}){
    const navigate = useNavigate()

    return(
        <div className="bg-zinc-800 p-4 hover:bg-zinc-700 cursor-pointer transition-colors"
        onClick={() => {
            navigate(`/tasks/${task.id}`)
        }}>
            <h1 className="font-bold uppercase text-3xl">{task.title}</h1>
            <p className="text-lg text-slate-400">{task.description}</p>
        </div>
    )
}