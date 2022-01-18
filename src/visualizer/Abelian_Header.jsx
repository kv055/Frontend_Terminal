import {useState} from 'react'
import { Container,Alert, Dropdown, DropdownButton, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
let Header = () => {
    const [BackendSelection, setBackendSelection] = useState({SelectedBackend: 'Abelian Backtesting'})
    return(
    <Alert variant="dark">
        <Container>
            <Row>
                <Col>
                    <h1>Abelian Capital</h1>
                </Col>
           
                <Col>
                    <Row>
                        <Col>
                            <p>Server Info:</p>
                        </Col>
                        <Col>
                        <DropdownButton variant="dark" id="dropdown-item-button" title={BackendSelection.SelectedBackend}>
                            <Dropdown.Item  onClick={() => setBackendSelection({SelectedBackend: 'Abelian Backtesting'})}>Abelian BackTesting</Dropdown.Item>
                            <Dropdown.Item  onClick={() => setBackendSelection({SelectedBackend: 'Abelian LiveTesting'})}>Abelian LiveTesting</Dropdown.Item>
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