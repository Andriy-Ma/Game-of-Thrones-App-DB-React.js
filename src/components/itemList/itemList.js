import React, {Component} from 'react';
import Spinner from '../spinner';
import './itemList.css';


export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount(){
        const {getData} = this.props;


        getData()
            .then((itemList)=> {
                this.setState({
                    itemList
                })
            })
    }

    renderItems(arr){
        return arr.map((item)=>{
            const {id} = item;
            const label = this.props.renderItem(item);
            return(
                <>
                <li 
                key={id}
                className="list-group-item "
                onClick={()=>this.props.onItemSelected(item.url)}
                >
                {label}
                </li>
                </>
            )
        })
    }

    render() {

        const {itemList} = this.state;
        if (!itemList){
            return <Spinner/>
        }

        const items = this.renderItems(itemList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}