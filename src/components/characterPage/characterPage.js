import React,{Component} from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/service';




export default class CharacterPage extends Component{

    gotService = new gotService();

    state ={
        selectedChar: 130,
        error: false
    }
    onCharSelected = (id) =>{
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
            onCharSelected={this.onCharSelected}
            renderItem={(item)=> `${item.name} (${item.gender})`}
            />)

        const charDetails =(
            <CharDetails 
            charId={this.state.selectedChar}/>
        )
        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}