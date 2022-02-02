import {useState, useEffect} from 'react';
import {Alert, Button, Col, Container, Dropdown, DropdownButton, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'

import TWOLCCON from './2LineCrossingsSubController'

let SimulationFetcherHeader = (props) => {
    const [HeaderData, setHeaderData] = useState({Loading: true})
    const [UserSelection, setUserSelection] = useState({
        selectedStrategy: 'Please Select Strategy',
        selectedPeriod: "Enter Indicator Period"
    })
    // const [Render2ListCrossingsController,setRender2ListCrossingsController] = useState({Loading: true})
    const [AllRenderedStrategies,setAllRenderedStrategies] = useState([])
    
    
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

    const ListStrategies = HeaderData.Loading === true ?
        <p>loading Strategies</p> :
        <p>{mapAllStrategies(HeaderData)}</p>

    let fetchSimulationData = (SimConfig) => {
        // Give Data Back to App.js 
        props.childData(SimConfig)
        console.log(SimConfig);
        // Write in local State
        setAllRenderedStrategies([SimConfig])
        console.log(AllRenderedStrategies);
    }

    const TWOLCController = UserSelection.selectedStrategy === 'Please Select Strategy' ?
        <p></p>:
        <TWOLCCON callback={fetchSimulationData}/>

  

    const mapRenderedStrategies = (props) => {
        const strategy = props.map((element) =>
            <ListGroup.Item key={element.Indicator1.name}>
                <Row>
                    <Col>{element.Indicator1.name}</Col>
                    <Col>{element.Period1}</Col>
                    <Col>{element.Indicator2.name}</Col>
                    <Col>{element.Period2}</Col>
                    <Button variant="dark">Delete</Button>
                </Row>
            </ListGroup.Item>
        )
        return strategy
    }

    const RenderedStrategies = AllRenderedStrategies.length === 0 ?
        <p></p> :
        <p>{mapRenderedStrategies(AllRenderedStrategies)}</p>

    return(
        <Container className="w-100 p-1">
            <Alert variant="dark">
            <Row>
                    <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.selectedStrategy}>
                        {ListStrategies}
                    </DropdownButton>
            </Row>
            <Row>
                {TWOLCController}
            </Row>
            <Row>
                <ListGroup>
                    {RenderedStrategies}
                </ListGroup>
            </Row>
            </Alert>
        </Container>
    )
}

export default SimulationFetcherHeader