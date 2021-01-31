
import './App.css';
import React, { useEffect, useState } from 'react';
import Home from './components/home/Home';
import Nav from '../src/components/nav/Nav';
import Store from '../src/components/store/Store';
import CheckOut from '../src/components/checkout/CheckOut';
import { createStore } from 'redux';
import {Provider} from 'react-redux';

function App() {
  
  const [showHome, setShowHome] = useState(true);
  const [showStore, setShowStore] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(()=>{
    // ONLY FETCH WHEN THERE'S NO DATA IN THE STORE
    if (showStore == true && allData === undefined || allData.length === 0){
      const url = "https://swapi.dev/api/starships/";
      fetch(url)
        .then(res => res.json())
        .then(
          (response) =>{
            console.log(response.results)
            setAllData(response.results)
          },
          (error) =>{
            console.log("error")
          }
        )
    }
  }, [showStore])

  //STORING TO LOCAL STORAGE FOR DATA PERSISTENCE
  const initialState = {
    all_data: allData.length >0 ? allData : '',
    count: localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')).count: 0,
    cart_items: localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')).cart_items: []
  }

  //REDUCER
  function reducer(state = initialState, action) {
    switch(action.type){
      case "INCREMENT":
        return {
          count: state.count + 1,
          cart_items: [...state.cart_items, action.payload]
        }
      case "CLEARCART":
        return {
          count: 0,
          cart_items: []
        }
      default:
        return state;
    }
  }
  //STORE
  const store = createStore(reducer);

  //STORE TO LOCAL STORAGE, WHEN USER ADD ITEM TO CART.
  //WATCHER
  store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })

  // SHOW/HIDE COMPONENTS
  const setReveal = (boolValue) =>{
    if (boolValue === true){
      setShowHome(false);
      setShowStore(boolValue);
      return
    }
    setShowHome(true);
    setShowStore(false);
    setShowCheckOut(false);
  }
   //SHOW CHECKOUT
  const showCheckOutPage = (bool)=>{
    
    if (!bool)return;
    setShowHome(false);
    setShowStore(false);
    setShowCheckOut(true);
  }
  const closeCheckOut = (bool)=>{
    setShowCheckOut(bool);
    setShowStore(true);
  }
  return (
    <Provider store={store}>

      <div className="App">
        <Nav parentCallBack={setReveal}
             parentCallBack2={showCheckOutPage}
        />

        {showHome && <Home parentCallBack={setReveal} /> }
        
        {showStore && <Store  /> }

        {showCheckOut && <CheckOut parentCallBack={closeCheckOut}/> }
      </div>
    </Provider>
  );
}

export default App;
