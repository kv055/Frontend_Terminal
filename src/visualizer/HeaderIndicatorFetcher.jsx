import {useState, useEffect} from 'react';
import {Alert, Button, Container, Dropdown, DropdownButton, Col,Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'

let IndicatorFetcherHeader = () => {
    const [HeaderData, setHeaderData] = useState({Loading: true})
    // const [UserSelection, setUserSelection] = useState({})
    
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
            <Dropdown.Item key={element.name} >{element.name}</Dropdown.Item>
        )
        return Indicators
    }   

    const RenderIndicators = HeaderData.Loading === true ?
        <p>loading Indicators</p> :
        <p>{mapAllIndicators(HeaderData)}</p>

    return(
        <Container>
            <Row>
                <Col>
                    <DropdownButton variant="dark" id="dropdown-item-button" title='Select Indicator'>
                        {RenderIndicators}
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

export default IndicatorFetcherHeader

// onClick={() => fetchAssetList(element)}