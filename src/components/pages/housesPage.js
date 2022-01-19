import React,{Component} from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/service';




export default class HousesPage extends Component{

    gotService = new gotService();

    state ={
        selectedHouse: 3,
        error: false
    }
    onItemSelected = (id) =>{
        this.setState({
            selectedHouse: id
            
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
            getData={this.gotService.getAllHouses}
            onItemSelected={this.onItemSelected}
            renderItem={(item)=> item.name}
            />)

        const itemDetails =(
            <ItemDetails
            getItem={this.gotService.getHouse} 
            itemId={this.state.selectedHouse}>
                <Field field='region' label='Region' />
                <Field field='words' label='Words' />
                <Field field='titles' label='Titles' />
                <Field field='ancestralWeapons' label='AncestralWeapons' />
            </ItemDetails>


        )
        return(
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}