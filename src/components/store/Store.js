import React, { useEffect, useState } from 'react'
import './Store.css';
import StoreItems from './StoreItems';
import bg from '../assets/1183672.jpg'
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import errorIcon from '../assets/error-icon.svg';

function Store(props) {
   
    const [tempStore, setTempStore] = useState([]);
    const [showSingleItem, setShowSingleItem] = useState({shouldShow: false, dataToShow: {}})

     //STORING REDUX STORE DATA HERE TEMPOARY, TO AVOID "UNDEFINED"
     //WHEN USER CLICKS "ADD TO CART BUTTON"
    useEffect(()=>{
        if (props.store){
            setTempStore(props.store)
        } 
    },[props.store])

    // ADD TO CART BUTTON FROM CHILD COMPONENT
    const addToCart = (id)=>{
            const singleItem = tempStore.find((data)=>{
               return  data.model === id
            })
             props.dispatch({type: 'INCREMENT', payload:singleItem});
       
    }

    // VIEW SINGLE BUTTON FROM CHILD COMPONENT
    const viewSingleItem = (id)=>{
        const singleItem = tempStore.find((data)=>{
            return  data.model === id
         })
        setShowSingleItem({shouldShow: true, dataToShow: singleItem});
    }
    //CLOSE SINGLE ITEM DATA PAGE
    const cancelShowSingle = ()=>{
        setShowSingleItem({shouldShow:false, dataToShow:{}})
    }
    //STRUCTING DATA FROM STATE
    const allData =  tempStore.length>0 && tempStore.map((data, key)=>{
                        return <StoreItems
                            parentCallBack={addToCart}
                            parentCallBack2={viewSingleItem}
                            key={key}
                            id={data.model}

                            itemName={data.name}
                            itemCost={data.cost_in_credits}
                            
                            />
                    })
    const style = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
        backgroundPosition: 'center !important',
    }
    return (
        <>
            {showSingleItem.shouldShow === false ?
            <>
                <div className="bg-img"></div>
                <div className="container-store"  style={ allData ? style : {}}>
                    <div className="store">
                        {allData 
                        ? allData 
                        : <div className="store-error">
                            <img src={errorIcon} alt="error" />
                            <p>Sorry there was an error, please try refreshing the page.</p>
                        </div>
                        }
                    </div>
                </div>
            </>
            :
            <div className="single-item" style={style}>
                <div className="single-item__inner">
                    <div className="single-item-cancel" onClick={cancelShowSingle}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className="single-item-content">
                        <p>Name : {showSingleItem.dataToShow.name}</p>
                        <p>Crew : {showSingleItem.dataToShow.crew}</p>
                        <p>Model : {showSingleItem.dataToShow.model}</p>
                        <p>Cost : {showSingleItem.dataToShow.cost_in_credits}</p>
                        <p>Length : {showSingleItem.dataToShow.length}</p>
                        <p>Manufactured by : {showSingleItem.dataToShow.manufacturer}</p>
                        <p>Passengers : {showSingleItem.dataToShow.passengers} </p>
                        <p>Max. Atmosphering Speed : {showSingleItem.dataToShow.max_atmosphering_speed}</p>
                        <p>Consumables : {showSingleItem.dataToShow.consumables}</p>
                        <p>Cargo Capacity : {showSingleItem.dataToShow.cargo_capacity}</p>
                        <p>Hyperdrive Rating : {showSingleItem.dataToShow.hyperdrive_rating}</p>
                    </div>
                </div>
                
            </div>}
        </>
    )
}
const mapStateToProps = (state)=>({
    store: state.all_data
})

export default connect(mapStateToProps)(Store)
