import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import './Nav.css';




function Nav(props) {
    const [showStore, setShowStore] = useState(false);

    // SHOW STORE COMPONENT
    const triggerShowStore =()=>{
        props.parentCallBack(!showStore)
    }

    //SHOW HOME COMPONENT
    const triggerShowHome = ()=>{
        props.parentCallBack(false)
    }

    //SHOW CHECKOUT COMPONENT
    const triggerCheckOut = ()=>{
        props.parentCallBack2(true)
    }
    return (
        <div className="nav">
            <div className="nav__inner">
                <p onClick={triggerShowHome} className="go_home">Home</p>
                
                    {props.count > 0
                    ? <p className="cart_icon" onClick={triggerCheckOut}><FontAwesomeIcon icon={faShoppingBasket} /><span>{props.count}</span></p>
                    :
                    <p onClick={triggerShowStore} className="cart_icon">
                     <FontAwesomeIcon icon={faShoppingBasket} /><span>{props.count}</span>
                    </p>
                    }
                    
                
            </div>
               
       
        </div>
    )
}
const mapStateToProps = (state) =>({
    count: state.count
})

export default connect(mapStateToProps)(Nav);
