import { useNavigate } from 'react-router-dom';


export default function ItemsList({shoppingList}) {
    const navigate = useNavigate();

    const handleClick = (item) => {
        navigate('/description', { state: { item } });
      };
    return(
        <ul className='flex'>
            {shoppingList.map( (list,index) =>(
                <li key={index} onClick={() => handleClick(list)} 
                    className='bg-gray-200 ml-2 mr-2 mt-2 mb-2 p-2 rounded-lg
                                            shadow-md flex flex-col items-center'>
                    <div className="w-48 h-48 overflow-hidden flex items-center justify-center">
                        <img src={list.image} alt={list.name} className="object-contain h-full w-full" />
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className="text-lg font-semibold text-gray-800">{list.name}</span>
                        <span className="text-base font-medium text-gray-600">{list.price}</span>
                    </div>
                </li>
            ))}
        </ul>
    )
        
}