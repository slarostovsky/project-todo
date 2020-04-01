import React from 'react';
import './Footer.css'

class Footer extends React.Component {
 

    render() {
       const {setFilter,removeCompletedTask} = this.props
       const amountActiv = this.props.data.arrayOfTask.filter(item => item.completed === false)
        return ( 
            <div className="footer" >
                <div className="footer__total-active">{amountActiv.length}:item left</div>
                <div className="btn__wrap">
                <button className="btn btn_all" onClick={() => setFilter('all')}>All</button>
                <button className="btn btn_active" onClick={() => setFilter('active')}>Active</button>
                <button className="btn btn_completed" onClick={() => setFilter('completed')}
                >Completed</button>
                </div>
                <a href="#"
                className="footer__link" 
                onClick={removeCompletedTask}>Clear completed</a>
            </div>
        )
    }
}

export default Footer;