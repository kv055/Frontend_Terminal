import {useState, useEffect} from 'react';
import {Alert, Button, Container, Dropdown, DropdownButton, Col,Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'

let SimulationFetcherHeader = () => {
    const [HeaderData, setHeaderData] = useState({Loading: true})
    const [UserSelection, setUserSelection] = useState({
        selectedStrategy: 'Please Select Strategy',
        selectedPeriod: "Enter Indicator Period"
    })
    
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
            <Dropdown.Item key={element.name} onClick={() => setUserSelection({...UserSelection, selectedStrategy: element.name})}>
                {element.name}
            </Dropdown.Item>
        )
        return Indicators
    }   

    const RenderStrategies = HeaderData.Loading === true ?
        <p>loading Strategies</p> :
        <p>{mapAllStrategies(HeaderData)}</p>

    return(
        <Container className="w-100 p-1">
            <Alert variant="dark">
            <Row>
                <Col>
                <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.selectedStrategy}>
                    {RenderStrategies}
                </DropdownButton>
                
                </Col>

                <Col>
                    <Form>
                        <Form.Control type="number" placeholder={UserSelection.selectedPeriod} 
                        onChange={e => setUserSelection({...UserSelection, selectedPeriod: e.target.value})}/>
                    </Form>
                </Col>
                <Col>
                    <Button variant="success" onClick={() => setUserSelection({...UserSelection, selectedPeriod: 50})}>
                        Render Strategy
                    </Button>
                </Col>
            </Row>
            </Alert>
        </Container>
    )
}

export default SimulationFetcherHeader

// onClick={() => fetchAssetList(element)}