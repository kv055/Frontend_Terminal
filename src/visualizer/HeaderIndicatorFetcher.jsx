import {useState, useEffect} from 'react';

import {Alert, Button, Col, Container, Dropdown, DropdownButton, Form, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'

let IndicatorFetcherHeader = (props) => {
    const [HeaderData, setHeaderData] = useState({Loading: true})
    const [UserSelection, setUserSelection] = useState({
        selectedIndicator: {name:'Please Select Indicator'},
        selectedPeriod: "Enter Indicator Period"
    })
    const [AllRenderedIndicators,setAllRenderedIndicators] = useState([])

    // Fetch List of DataSources/Exchanges
    let fetchListOfIndicators = async()=>{
        let listOfIndicators = await GET('http://localhost:5001/ListAllIndicators')
        console.log(listOfIndicators);
        setHeaderData({
            allIndicators: listOfIndicators.IndicatorsToRender
        })
    }

    useEffect(() => {
        fetchListOfIndicators()
      },[])


    let mapAllIndicators = (props) => {
        const Indicators = props.allIndicators.map((element) =>  
            <Dropdown.Item key={element.name} onClick={() => setUserSelection({...UserSelection, selectedIndicator: element})} >
                {element.name}
            </Dropdown.Item>
        )
        return Indicators
    }   

    const listIndicators = HeaderData.Loading === true ?
        <p></p> :
        <p>{mapAllIndicators(HeaderData)}</p>

    
    const fetchIndicatorData = (indicatorConfig) => {
        props.childData(indicatorConfig)
        setAllRenderedIndicators([...AllRenderedIndicators, indicatorConfig])
    }
    

    const mapRenderedIndicators = (props) => {
        const Indicators = props.map((indicator) =>
            <ListGroup key={(indicator.selectedIndicator.symbol + indicator.selectedPeriod)}>
                <ListGroup.Item>
                    <Row>
                        <Col>   
                            {indicator.selectedIndicator.name}
                        </Col>
                        <Col>
                            {indicator.selectedPeriod}
                        </Col>
                        <Col>
                            <Button variant="dark">Delete</Button>
                        </Col>
                    </Row>
                    {/* {indicator.selectedIndicator.name +' '+ indicator.selectedPeriod}<Button variant="dark">Delete</Button> */}
                </ListGroup.Item>
            </ListGroup>
       
        )
        return Indicators
    }
    console.log(AllRenderedIndicators);
    const RenderedIndicators = AllRenderedIndicators.length === 0 ?
        <p></p> :
        <p>{mapRenderedIndicators(AllRenderedIndicators)}</p>

    return(
        <Container className="w-100 p-1">
            <Alert variant="dark">
                <Row>
                    <Col>
                        <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.selectedIndicator.name}>
                            {listIndicators}
                        </DropdownButton>
                    </Col>

                    <Col>
                        <Form> 
                            <Form.Control type="number" placeholder={UserSelection.selectedPeriod} 
                            onChange={e => setUserSelection({...UserSelection, selectedPeriod: e.target.value})}/>
                        </Form>
                    </Col>

                    <Col>
                        <Button variant="success" onClick={() => fetchIndicatorData(UserSelection)}>
                            Render Indicator
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {RenderedIndicators}
                </Row>
            </Alert>
        </Container>
    )
}

export default IndicatorFetcherHeader

// setUserSelection({...UserSelection, selectedPeriod: 50}