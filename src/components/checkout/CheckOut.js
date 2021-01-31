import React, { useState } from 'react';
import '../checkout/CheckOut.css';
import robotCheckOut from '../assets/robotCheckOut.svg';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function CheckOut(props) {
    const [closeCheckOut, setCloseCheckOut] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [blur, setBlur] = useState(false);
    if (!props.allCart) return;

    //ONLY RETURN ITEMS THAT HAVE VALID ITEM COST
    const getOnlyAvailableCostValue =  props.allCart.filter((item)=>{
        return item.cost_in_credits !== 'unknown';
    })

    //ADD ALL ITEMS PRICE 
    const getCartTotalPrice = getOnlyAvailableCostValue.reduce((currentTotal,item)=>{
             return (item.cost_in_credits + currentTotal)
    },0);

    //SHOW AMOUNT DIGITS WITH COMMAS
    const formattedAmount=getCartTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    //CLEAR & CLOSE CHECKOUT
    const triggerCloseCheckOut = ()=>{
        localStorage.removeItem('reduxState');

        props.dispatch({type:"CLEARCART" });
        setCloseCheckOut(true);

        props.parentCallBack(closeCheckOut)
    }

    //WHEN USER CLICKS PAY
    const triggerPay = ()=>{
        setBlur(true);
        setShowModal(true);
    }

    // const triggerCloseModal = ()=>{
    //     setShowModal(false);
    //     setBlur(false);
    //     triggerCloseCheckOut()


    // }

    return (<>
        {!closeCheckOut && 
            <div className="check-out" >
               
                <div className="check-out__inner" style={blur ? {filter: 'blur(3px)'} : {filter: ''}}>
                    <div className="check-out_img">
                        <img src={robotCheckOut} alt="check-out_img"/>
                    </div>
                    <div className="check-out_info">
                        <div className="cost">
                                <h1>Total Cost</h1>
                                <p>${formattedAmount}</p>
                        </div>
                        <div className="check-out_button">
                            <button onClick={triggerPay}>Pay</button>
                        </div>
                        <div className="clear-cart">
                            <button onClick={triggerCloseCheckOut}>Clear Cart</button>
                        </div>
                    </div>

                    
                   
                    
                </div>
                {showModal && 
                        <div className='container-model'>
                            <div className="Modal">
                                <div className="modal_inner">
                                    <div className="cancel_modal" onClick={triggerCloseCheckOut}><FontAwesomeIcon icon={faTimes}/></div>
                                    <p>Thank you for purchasing an item worth ${formattedAmount}.
                                        we hope to continue to serve you better.
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
            
            
            </div>
        }
        </>
    )
}
const mapStateToProps = (state)=>({
    allCart: state.cart_items
})
export default connect(mapStateToProps) (CheckOut)
