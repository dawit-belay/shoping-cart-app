import { useState,useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import {ShoppingCartIcon} from '@heroicons/react/24/outline';
import ItemsList from './Components/ItemsList'
import Description from "./Components/Description"
import Carts from "./Components/Carts"
import './App.css'

function App() {

  const [shoppingList,setShoppingList] = useState([]);
  const [cartList, setCartList] = useState([]);


  const newShoppingList = [
    {image:'/images/nike-shoe.jpg', name:"Nike-Shoes", price:"$200",avl_quan:20 },
    {image:'/images/jeans-pant.jpg', name:"jeans pantes", price:"$70",avl_quan:20 },
    {image:'/images/t-shirt.jpg', name:"T-shirts", price:"$20",avl_quan:20 }
  ];
  
  

  useEffect(() => {
    setShoppingList(newShoppingList);
  }, []);

  function AddToCart(item){
    let itemexists = cartList.some(cartitem => cartitem.name === item.name);

    const selectedItem = cartList.find(selecteditem => selecteditem.name ===item.name );

    if(itemexists){
      if(Number(item.quantity) === Number(selectedItem.quantity)){
      alert("Selected item is already in the cart with the same quantity. Add more if you want.")
      } 

      else{
        let updattedcart = cartList.map(cartitem =>
          cartitem.name === item.name ?
          {...cartitem,quantity:item.quantity}
          :cartitem
        );
        setCartList(updattedcart);
      }
    }
    else{
    setCartList([...cartList,item]);
    }
};


function setQuantity(action,item){
  {item.quantity === item.avl_quan ?
    (alert("you ordered the maximum available quantity"))
    : ""
  }
  const currentQuantity = item.quantity || 1; // start from 1 if not set
  const newQuantity =
    action === '+'
      ? Math.min(currentQuantity + 1, item.avl_quan)
      : Math.max(currentQuantity - 1, 1);

  let numericPrice = parseFloat(item.price.replace('$', ''));
  let TotalPrice = numericPrice * newQuantity;

  let updatedCart = cartList.map(cartitem =>
    cartitem.name === item.name ?
    {...cartitem,quantity: newQuantity, totalprice: TotalPrice}
    : cartitem
  );
  setCartList(updatedCart);
}


function RemoveFromCart(itemName){
  setCartList(prevItems => prevItems.filter(item =>item.name !== itemName))
  }


function GetCheckoutPrice() {
  let CheckoutPrice = 0
  cartList.forEach((item) =>{
    CheckoutPrice +=item.totalprice;
  })
  return CheckoutPrice;
}

//  handle clear cart
function ClearCart () {
  const confirmClear = window.confirm("Are you sure you want to clear the cart?");
  if(confirmClear){
    setCartList([]);
    alert("Cart has been cleared.");
  }
  
}

// handle checkout



  return(
    <div>
      <div className='flex justify-between items-center bg-gray-400 p-3'>
          <Link to="/">
            <h1 className="text-center text-xl font-bold bg-gray-400 p-1 ">Shopping-Cart-App</h1>
          </Link>

          <Link to="/carts">
          <div className="relative">
            <button className="p-2 rounded-full bg-blue-600 hover:bg-emerald-700 text-white shadow-md transition duration-200">
              <ShoppingCartIcon className="h-5 w-5" />
              {cartList.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">
                {cartList.length}
              </span>
  )}
            </button>
            </div>
          </Link>
      </div>
      
      <Routes>
        <Route path="/" element={<ItemsList shoppingList = {shoppingList} />} />
        <Route path="/description" element={<Description AddToCart = {AddToCart} />} />
        <Route path="/carts" element={<Carts cartList = {cartList} setCartList = {setCartList} setQuantity = {setQuantity} RemoveFromCart = {RemoveFromCart} GetCheckoutPrice = {GetCheckoutPrice} ClearCart = {ClearCart} />} />
      </Routes>
    </div>
  )
}

export default App