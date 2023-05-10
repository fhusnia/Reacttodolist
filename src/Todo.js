
import {ACTION_TYPES} from './Components/Form'
import { useMemo } from 'react'


export default function Todo({stat,dispatch}){
    const wrong = useMemo(() => {
        const result = new Date(stat.name.date).getTime() < new Date().getTime()
        return result
    }, [stat.name.date])

    return(
            <div className='contain'>
                <div  style={{background: stat.complete ? 'blue'  : ''}} className='answer col-s-12'>
                        <div className='row space-around-x'>
                            <div  className='col-auto'>
                                <div  className='todotitle'>
                                    <span>{stat.name.title}</span>
                                </div>
                            </div>
                            <div style={{backgroundColor: (wrong ? 'red'  : 'blue')}} className='col-auto'>
                                <div className='tododate'>
                                    <span>{stat.name.date}</span>
                                </div>
                            </div>
                        
                            <div className='col-auto'>
                                <div className='todoevent'>
                                        <span style={{visibility: stat.complete ? 'hidden' : ''}}  onClick={() => dispatch({type:ACTION_TYPES.TOGGLE,payload:{id:stat.id}})}><i className="fa fa-check"></i></span>
                                        <span id="delet" onClick={() => dispatch({type:ACTION_TYPES.DELETE,payload:{id:stat.id}})}><i className="fa fa-trash"></i></span>
                                        <span onClick={
                                            () => dispatch({
                                                type:ACTION_TYPES.CLICK,
                                                payload: {
                                                    id: stat.id,
                                                    required: stat.required ? false : true
                                                }
                                            })
                                        } id="toggle"><i className="fa fa-chevron-circle-down"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className={'col-auto '}>
                            <div className='tododesc'>
                                <span>{ stat.required ? stat.name.desc : ''}</span>
                            </div>
                
                        </div>
                 </div>
            
            </div>
       
    )
}