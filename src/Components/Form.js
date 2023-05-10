import {useEffect, useReducer, useState} from 'react';
import Todo from '../Todo.js';



export const ACTION_TYPES={
    CREATE:'CREATE',
    DELETE:'DELETE',
    TOGGLE:'TOGGLE',
    CLICK:'CLICK',
    LOAD: 'LOAD',
    TEST:'TEST'

}

const createAction = (state, action) => {
    const newTodo =  { 
        id: Date.now(), 
        name: action.payload, 
        complete: false,
        required: false 
    }
    return [...state, newTodo]
}

const toggleAction = (state, action) => {
    return state.map(stat=>{
        if(stat.id === action.payload.id){
            return{...stat,complete: !stat.complete}
        }
        return stat
    })
}

const clickAction1 = (state, action) => {
    
    if ( action.payload.required ) {
        return state.map(stat =>{
            if(stat.id === action.payload.id){
                return{...stat,required: action.payload.required}
            }
            return stat
        })
     
    } else {
        return state.map(stat =>{
            if(stat.id === action.payload.id){
                return{...stat,desc: '', required: action.payload.required}
            }
            
            return stat
        })
    }
}

const loadAction = (state, action) => {
    const todo = localStorage.getItem('todo')
    return (
        JSON.parse(todo) || []
    )

}


const reducer = (state, action) => {
    
    switch (action.type) {
        case ACTION_TYPES.CREATE:
            state = createAction(state, action)
            localStorage.setItem('todo', JSON.stringify(state))
            break;
        case ACTION_TYPES.DELETE:
            state = state.filter(stat => stat.id !== action.payload.id)
            localStorage.setItem('todo', JSON.stringify(state))
            break;
        case ACTION_TYPES.TOGGLE:
            state = toggleAction(state, action)
            localStorage.setItem('todo', JSON.stringify(state))
            break;
        case ACTION_TYPES.CLICK:
            state = clickAction1(state, action)
            break;
        case ACTION_TYPES.LOAD:
            state = loadAction(state, action)
            
       default:
           state = state
    }
    
    return state
}

export default function Form(){

    const [form, setForm] = useState({});
    const [state, dispatch] = useReducer(
        reducer, 
        []
    );

   
    useEffect(() => {
        dispatch({type: ACTION_TYPES.LOAD})
      
    },[])
    

    const appendForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: form
        })
    }

    return(
        <div className="container-fluid">
            <div className="container row">
                <div className="col-6 col-s-12">

                        <div className="todolistname">
                            <h1>My to do's </h1>
                        </div>
                            <form>
                                
                                        <div className="todoname">
                                            <input type="text" placeholder="Tapsirigin adi" name="title" onInput={appendForm}/>
                                        </div>
                                        <div className='todotext'>
                                            <textarea placeholder="Tapsirigin movzusu" name="desc" onInput={appendForm}></textarea>
                                        </div>
                                        <div className='date'>
                                            <input  type="date" name="date" onInput={appendForm}/>
                                        </div>
                                        <div className='add'>
                                            <button onClick={(e) => addTodoHandler(e)}><span>ADD</span></button>
                                        </div>
                                    
                            </form>
                </div>
                
                <div className='col-6 col-s-12'>
                   {
                       state.map(stat=>{
                           return(<Todo key={stat.id} stat={stat} dispatch={dispatch}/>)
                       })
                    } 
               </div>
            </div>
        </div>
    )
}