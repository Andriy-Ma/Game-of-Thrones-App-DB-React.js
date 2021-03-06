import React,{Component} from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/service';




export default class CharacterPage extends Component{

    gotService = new gotService();

    state ={
        selectedChar: 130,
        error: false
    }
    onItemSelected = (id) =>{
        this.setState({
            selectedChar: id
            
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
            getData={this.gotService.getAllCharacters}
            onItemSelected={this.onItemSelected}
            renderItem={(item)=> `${item.name} (${item.gender})`}
            />)

        const itemDetails =(
            <ItemDetails 
            getItem={this.gotService.getCharacter}
            itemId={this.state.selectedChar}>
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>


        )
        return(
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}