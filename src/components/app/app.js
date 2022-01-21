import React,{Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage/characterPage';
import BooksPage from '../pages';
import { HousesPage } from '../pages';
import gotService from '../../services/service';
import { BooksItem } from '../pages';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
            <Router>
                <div className='app'>
                <Container>
                    <Header/>
                </Container>
                <Container>
                    {toggleCharacter}
                    <div>
                        <Button
                            className="mb-4"
                            color="primary"
                            onClick={()=> this.deleteChar(toggle)}
                        >
                            Toggle randome character
                        </Button>
                    </div>
                    <Routes>
                        <Route  path="/" exact element={<h1>Hello</h1>}/>  
                        <Route  path="/characters" element={<CharacterPage/>}/>
                        <Route  path="/houses" element={<HousesPage/>}/>
                        <Route  path="/books" exact element={<BooksPage/>}/>
                        <Route  path="/books/:id" element={ <BooksItem />}/>
                    </Routes>               
                </Container>
                </div>
            </Router>
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

