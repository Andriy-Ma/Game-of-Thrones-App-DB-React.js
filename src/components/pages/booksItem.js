import React from 'react';
import gotService from '../../services/service';
import ItemDetails,{Field} from '../itemDetails';
import { useParams } from 'react-router-dom';

const BooksItem =() => {
    const gotServ  = new gotService();
    const {id} = useParams();
        return(
            <ItemDetails
            getItem={gotServ.getBook} 
            itemId={id}>
                <Field field='numberOfPages' label='NumberOfPages' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
}

export default BooksItem;


