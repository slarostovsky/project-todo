import React from 'react';
import axios from 'axios';
import './ItemTodo.css'

class ItemTodo extends React.Component {
    state = {
        inputStateAfterClick: this.props.inputStateAfterClick,
        inputValue: this.props.text
    }

    saveInput = (event) => {
        if(event.key === 'Enter' ) {
            this.setState({
                inputStateAfterClick: true
            })
            this.props.getTask(event.currentTarget.id, this.state.inputValue)
        }
     }


    newValueTask = (event) => {
        let value = event.target.value
        this.setState ({inputValue : value})
    } 

    handlDblClick = () => {     
        this.setState(state => ({
            inputStateAfterClick: !state.inputStateAfterClick
        }))
    }

    

    render() {
        const { _id, completed, completedTask,removeTask } = this.props;
        return( 
            <div className="item-todo">

                <label>
                    <div className="item__check"></div>
                    <div className={`check ${completed && 'active'}`}></div>
                <input  
                className="item-todo__checkbox "
                type="checkbox"
                checked={completed}
                onChange={() => completedTask(_id,completed)}
                />  
                </label>
                <div onDoubleClick={this.handlDblClick}>
                    <input 
                    id={_id}
                    className={`item-todo__input ${completed && 'completed'}`}
                    value={this.state.inputValue} 
                    disabled={this.state.inputStateAfterClick}
                    onKeyPress={this.saveInput}
                    onChange={this.newValueTask}
                    /> 

                </div>              
                <span onClick={() => removeTask(_id)} className="close"></span>
                
            </div>               
        )
    }
}


export default ItemTodo;