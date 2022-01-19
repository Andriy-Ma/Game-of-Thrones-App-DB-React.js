import React,{Component} from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/service';




export default class BooksPage extends Component{

    gotService = new gotService();

    state ={
        selectedBook: 3,
        error: false
    }
    onItemSelected = (id) =>{
        this.setState({
            selectedBook: id
            
        })
        
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = ( <ItemList
            getData={this.gotService.getAllBooks}
            onItemSelected={this.onItemSelected}
            renderItem={(item)=> item.name }
            />)

        const itemDetails =(
            <ItemDetails
            getItem={this.gotService.getBook} 
            itemId={this.state.selectedBook}>
                <Field field='numberOfPages' label='NumberOfPages' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>


        )
        return(
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}