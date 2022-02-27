// import {useState, useEffect} from 'react';
import {Alert, Button, Container, DropdownButton, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// import POST from '../fetch_Modules/DataFetchPOST'
// import GET from '../fetch_Modules/DataFetchGET'


let NewDeployment = (props) => {
    
    return(
        <Alert variant="dark">
            <Container>
                <Row>
                    <Col className='justify-content-md-center'>
                        <DropdownButton  variant="dark" id="dropdown-item-button" title={'Choose Configuration'}>
                        </DropdownButton>
                    </Col>
                  
                    <Col>
                        <Button variant="success" 
                        // onClick={
                        //     () => 
                        //     }
                        >
                            Deploy New Strategy
                        </Button>
                    </Col>
                    
                </Row>
            </Container>
        </Alert>
    )
}
export default NewDeployment