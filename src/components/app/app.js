import React,{Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage/characterPage';
import BooksPage from '../pages';
import { HousesPage } from '../pages';
import gotService from '../../services/service';


export default class App extends Component{

        gotService = new gotService();
        state={
           toggle: true ,
           error: false
        }

        componentDidCatch(){
            console.log('error');
            this.setState({
                error: true
            })
        }

        deleteChar =(toggle) =>{
            return this.setState({
                toggle: !toggle
            })
        }
    

        

    
    render(){
        const {toggle} = this.state;
        const toggleCharacter = toggle?  <ToggleChar/> : null;

        if(this.state.error){
            return <ErrorMessage/>
        }
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    {toggleCharacter}
                    <div>
                        <Button
                            color="primary"
                            onClick={()=> this.deleteChar(toggle)}
                        >
                            Toggle randome character
                        </Button>
                    </div>
                   <CharacterPage/>
                   <BooksPage/>
                   <HousesPage/>
                        

                </Container>
            </>
        );
    }
    
}

const ToggleChar= () =>{
    return (
        <>
        <Row>
                <Col lg={{size: 5, offset: 0}}>
                    <RandomChar/>
                </Col>
            </Row>
        </>
    )
}

