import {Link} from 'react-router-dom'

export function Navigation(){

    return(
        <div className='flex items-center justify-between py-8'>
            <Link to={'/tasks'}>
                <h1 className='text-5xl font-extrabold mb-4'>Task App</h1>
            </Link>
            <Link to="/tasks-create" className=''>
                    <button className='text-lg bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors hover:bg-indigo-600'>
                    Create Task
                </button>
            </Link>
            
        </div>
    )
}