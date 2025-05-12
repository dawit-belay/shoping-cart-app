import { useLocation, Link } from 'react-router-dom';
import { useState, } from 'react';
const Description = ({AddToCart}) => {

    const location = useLocation();
    const { item: initialItem } = location.state || {};
  
    // const [currentItem, setCurrentItem] = useState(null);
  

    // useEffect(() => {
    //   if (initialItem) {
    //     const itemWithQuantity = { ...initialItem, quantity: 1, totalprice: parseFloat(initialItem.price.replace('$', ''))};
    //     setCurrentItem(itemWithQuantity);
        
    //   }
    // }, [initialItem]);

  const [currentItem, setCurrentItem] = useState(() => {
    if (!initialItem) return null;
      return {...initialItem,quantity: 1,totalprice: parseFloat(initialItem.price.replace('$', '')),
      };
  });

  
    if (!currentItem) {
      return <div className="text-center mt-10 text-red-500">No item selected.</div>;
    }


    const handleQuantityChange = (action,item) => {
       if(item.quantity === item.avl_quan)
       { alert("you ordered the maximum available quantity") }
       
        const currentQuantity = item.quantity || 1; // start from 1 if not set
        
         
        let newQuantity =  action === "-" ?
        Math.max(currentQuantity - 1,1):
        Math.min(currentQuantity + 1,item.avl_quan)

        let numericPrice = parseFloat(item.price.replace('$', ''));
        let totalprice = newQuantity * numericPrice;

        let updatedItem = {...currentItem,  quantity: newQuantity,totalprice:totalprice }
        setCurrentItem(updatedItem);
    };

    return(
        <div>
            <h2 className='text-center text-xl font-bold bg-gray-400 p-1 mt-2'>cart items</h2>
            <div >
                <h1 className="text-3xl text-center font-semibold text-gray-800 mr-5 mt-10 mr-90">{currentItem.name}</h1>
                <div className='bg-gray-200 ml-2 mr-2 mt-2 mb-2 p-2 rounded-lg shadow-md flex w-130'>
                    <div className="w-80 h-80 overflow-hidden flex items-center justify-center">
                        <img src={currentItem.image} alt={currentItem.name} className="object-contain h-full w-full" />
                    </div>
                    <div className = 'flex flex-col ml-5 mt-24'>
                        <h3 className="text-base font-medium text-gray-600 text-center">{currentItem.price}</h3>
                        <h3 className="text-base font-medium text-gray-600 text-center">{currentItem.avl_quan} in stock</h3>
                        <div className="flex items-center justify-between w-32 border bg-gray-100 rounded-lg border-gray-800 p-2 mt-2">
                            <button onClick={() =>{handleQuantityChange("-",currentItem)}} disabled={currentItem.quantity <= 1}  
                            className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-50 
                            disabled:cursor-not-allowed hover:bg-red-600 transition">-</button>
                            <span>{currentItem.quantity}</span>
                            <span>PCS</span>
                            <button onClick={() =>{handleQuantityChange("+",currentItem)}} disabled={currentItem.quantity >= currentItem.avl_quan}
                            className="px-2 py-1 bg-green-500 text-white rounded disabled:opacity-50
                             disabled:cursor-not-allowed hover:bg-green-600 transition">+</button>
                        </div>
                        <h1>Total Price: {currentItem.totalprice}</h1>
                        <button onClick = {() => AddToCart(currentItem)}
                        className="bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold py-0.5 px-2 mt-2 rounded">
                          Add To Cart
                        </button>
                        <Link to="/carts">
                          <button
                          className="bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold py-0.5 px-2 mt-2 rounded">
                            Go To Cart
                          </button>
                        </Link>
                    </div> 
                </div>
            </div>
        </div>
    )
  };
  
  export default Description;