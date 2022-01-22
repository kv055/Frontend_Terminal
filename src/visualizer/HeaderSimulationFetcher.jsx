import {useState, useEffect} from 'react';
import {Alert, Button, Container, Dropdown, DropdownButton, Col,Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'

let SimulationFetcherHeader = () => {
    const [HeaderData, setHeaderData] = useState({Loading: true})
    // const [UserSelection, setUserSelection] = useState({})
    
    // Fetch List of DataSources/Exchanges
    let fetchListOfStrategies = async()=>{
        let listOfStrategies = await GET('http://localhost:5001/ListAllStrategies')
        setHeaderData({
            allStrategies: listOfStrategies.Strategies
        })
    }

    useEffect(() => {
        fetchListOfStrategies()
      },[])


    let mapAllStrategies = (props) => {
        const Indicators = props.allStrategies.map((element) =>  
            <Dropdown.Item key={element.name} >{element.name}</Dropdown.Item>
        )
        return Indicators
    }   

    const RenderStrategies = HeaderData.Loading === true ?
        <p>loading Strategies</p> :
        <p>{mapAllStrategies(HeaderData)}</p>

    return(
        <Container>
            <Row>
                <Col>
                <DropdownButton variant="dark" id="dropdown-item-button" title='Select Strategy'>
                    {RenderStrategies}
                </DropdownButton>
                
                </Col>

                <Col>
                    <Form>
                        <Form.Label>Strategy Config</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SimulationFetcherHeader

// onClick={() => fetchAssetList(element)}