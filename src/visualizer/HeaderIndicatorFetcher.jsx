import {useState, useEffect} from 'react';

import {Alert, Button, Container, Dropdown, DropdownButton, Col,Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'

let IndicatorFetcherHeader = (props) => {
    const [HeaderData, setHeaderData] = useState({Loading: true})
    const [UserSelection, setUserSelection] = useState({
        selectedIndicator: {name:'Please Select Indicator'},
        selectedPeriod: "Enter Indicator Period"
    })

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

    const RenderIndicators = HeaderData.Loading === true ?
        <p>loading Indicators</p> :
        <p>{mapAllIndicators(HeaderData)}</p>

    
    const fetchIndicatorData = (indicatorConfig) => {
        props.childData(indicatorConfig)
    }


    return(
        <Container className="w-100 p-1">
            <Alert variant="dark">
            <Row>
                <Col>
                    <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.selectedIndicator.name}>
                        {RenderIndicators}
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
            </Alert>
        </Container>
    )
}

export default IndicatorFetcherHeader

// setUserSelection({...UserSelection, selectedPeriod: 50}