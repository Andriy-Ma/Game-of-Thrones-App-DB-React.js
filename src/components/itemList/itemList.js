import React, {Component} from 'react';
import gotService from '../../services/service';
import Spinner from '../spinner';
import './itemList.css';


export default class ItemList extends Component {

    gotService = new gotService();
    state = {
        charList: null
    }

    componentDidMount(){
        this.gotService.getAllCharacters()
            .then((charList)=> {
                this.setState({
                    charList
                })
            })
    }

    renderItems(arr){
        return arr.map((item)=>{
            let key = Math.random().toString(36).substr(2, 9);;
            return(
                <>
                <li 
                key={key}
                className="list-group-item "
                onClick={()=>this.props.onCharSelected(item.url)}
                >
                {item.name}
                </li>
                </>
            )
        })
    }

    render() {

        const {charList} = this.state;
        if (!charList){
            return <Spinner/>
        }

        const items = this.renderItems(charList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}