
const Carts = ({cartList ,setQuantity, RemoveFromCart, GetCheckoutPrice, ClearCart}) => {
    
    return(
        <div>
            <h2 className='text-center text-xl font-bold bg-gray-400 p-1 mt-2'>cart items</h2>
            <ul className='flex flex-col'>
            {cartList.map((item,index) =>(
                <li key={index} >
                    <h1 className="text-3xl text-center font-semibold text-gray-800 mr-5 mt-10 mr-90">{item.name}</h1>
                    <div className='bg-gray-200 ml-2 mr-2 mt-2 mb-2 p-2 rounded-lg shadow-md flex w-130'>
                        <div className="w-80 h-80 overflow-hidden flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="object-contain h-full w-full" />
                        </div>
                        <div className = 'flex flex-col ml-5 mt-25'>
                            <h3 className="text-base font-medium text-gray-600 text-center">{item.price}</h3>
                            <h3 className="text-base font-medium text-gray-600 text-center">{item.avl_quan} in stock</h3>
                            <div className="flex items-center justify-between p-2">
                                <span className="mr-1">{item.quantity}</span>
                                <span> PCS ordered</span>
                            </div>
                            <div className="flex items-center justify-between w-32 border bg-gray-100 rounded-lg border-gray-800 p-2 mt-2">
                                <button onClick={() =>{setQuantity("-",item)}}  className="px-2 py-1">-</button>
                                <span>{item.quantity}</span>
                                <span>PCS</span>
                                <button onClick={() =>{setQuantity("+",item)}} className="px-2 py-1">+</button>
                            </div>
                            
                            <h1 className = "mt-2">Total Price: {item.totalprice}</h1>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-0.5 px-2 mt-2 rounded" 
                                    onClick={() => RemoveFromCart(item.name)}>Remove</button>
                        </div> 
                    </div>
                </li>
            ) )}
            </ul>
            
            {cartList.length > 0 ? (
                <div  className="flex flex-col items-center justify-center mt-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200 max-w-sm mx-auto">
                    <h1 className="text-lg font-semibold text-gray-800 mb-4">
                        Checkout Price: <span className="text-green-600">{GetCheckoutPrice()}</span> </h1>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300" 
                            onClick = {() =>ClearCart()} >Clear Cart</button>
                </div>
            ): null}
           
            
        </div>
    )
  };
  
  export default Carts;