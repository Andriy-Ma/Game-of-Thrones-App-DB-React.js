import React, {useState,useEffect} from 'react';
import Spinner from '../spinner';
import './itemList.css';
import PropTypes from 'prop-types';


function ItemList ({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data)=> {
               updateList(data)
            })
    },[])

    
    function renderItems(arr){
        return arr.map((item, i)=>{
            const label = renderItem(item);
            return(
                <>
                <li 
                key={item.url*++i}
                className="list-group-item "
                onClick={()=>onItemSelected(item.url)}
                >
                {label}
                </li>
                </>
            )
        })
    }

    if (!itemList){
        return <Spinner/>
    }
    
    const items = renderItems(itemList)

    return (
        <ul 
        className="item-list list-group">
            {items}
        </ul>
    );
    
}

ItemList.defaultProps = {
    onItemSelected: () =>{}
}
ItemList.propTypes = {
    onItemSelected:PropTypes.func
}

export default ItemList;