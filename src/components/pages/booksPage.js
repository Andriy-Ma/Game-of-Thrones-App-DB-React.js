import React,{Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/service';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";

  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          element={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

 class BooksPage extends Component{

    gotService = new gotService();

    state ={
        error: false
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

        return(
            <ItemRend/>
        )
    }
}


function ItemRend() {
    const gotServ = new gotService();
    let navigate = useNavigate();
    return(
        <ItemList
            getData={gotServ.getAllBooks}
            onItemSelected={(itemId) => {
                navigate(itemId);
            }}
            renderItem={(item)=> item.name }
            />
    )

    
}


export default withRouter(BooksPage);