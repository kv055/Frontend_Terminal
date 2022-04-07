import {useState} from 'react'
import { Container, Alert, Dropdown, DropdownButton, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

let Header = (props) => {
    
    const [BackendSelection, setBackendSelection] = useState({SelectedBackend: 'Abelian Backtesting'})
    let setBackend = props.SetBackend

    return(
    <Alert variant="dark">
        <Container>
            <Row>
                <Col>
                    <h3>Abelian-Capital</h3>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <p>Select Environement:</p>
                        </Col>
                        <Col>
                        <DropdownButton variant="dark" id="dropdown-item-button" title={BackendSelection.SelectedBackend}>
                            
                            <Dropdown.Item  onClick={() => {
                                setBackendSelection({SelectedBackend: 'Abelian Analytics'})
                                setBackend('Abelian Analytics')
                                }}>Abelian Analytics</Dropdown.Item>
                            <Dropdown.Item  onClick={() => {
                                setBackendSelection({SelectedBackend: 'Abelian Backtesting'})
                                setBackend('Abelian Backtesting')
                                }}>Abelian BackTesting</Dropdown.Item>
                            <Dropdown.Item  onClick={() => {
                                setBackendSelection({SelectedBackend: 'Abelian LiveTrading'})
                                setBackend('Abelian LiveTrading')
                            }}>Abelian LiveTrading</Dropdown.Item>
                            
                        </DropdownButton>
                        </Col>
                    </Row>
                </Col>
                
                
          
            </Row>
        </Container>
    </Alert>
    )
}

export default Header