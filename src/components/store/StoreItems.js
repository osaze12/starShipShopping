import React, { useState } from 'react';
import './StoreItems.css';
import {connect} from 'react-redux';

function StoreItems(props) {
    const [hoverStyle, setHoverStyle] = useState(false)
   
    // SEND TRIGGER TO PARENT(Store.js)
    const triggerAddCart = ()=>{
        props.parentCallBack(props.id)
    }
    //SEND SINGLE DATA TO PARENT
    const triggerViewSingle = ()=>{
        props.parentCallBack2(props.id)
    }
    const style = {
        background: '#886e40',
        padding:' 4px',
        transform: 'scale(1.3)',
        zIndex:' 999',
        
    }

    
    return (
        <div className="storeItem" 
            style={hoverStyle ? style : {fontSize: 'normal'}} 
            onMouseOver={()=>{setHoverStyle(true)}} 
            onMouseOut={()=>{setHoverStyle(false)}}>
                
            <h1>{props.itemName}</h1>
            <p>Cost : {props.itemCost}</p>
            <div className="addC">
                <button className="addCart" onClick={triggerAddCart}>Add to Cart</button>
            </div>
            <div className="viewD">
                 <button className="viewDetails" onClick={triggerViewSingle}>View Details</button>
            </div>
        </div>
    )
    
}
export default connect()(StoreItems)
