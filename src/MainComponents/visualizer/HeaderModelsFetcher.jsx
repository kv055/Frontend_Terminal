import {useState, useEffect} from 'react';

import { Alert, Button, Col, Container, Dropdown, DropdownButton, Form, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import GET from '../fetch_Modules/DataFetchGET'
import POST from '../fetch_Modules/DataFetchPOST'

//Import and configure Environement variables
let baseURL = process.env.NODE_ENV === 'production' ?
  process.env.REACT_APP_DEPLOY_URL:
  process.env.REACT_APP_DEV_URL

const ModelsFetcherHeader = (props) => {

    const [HeaderData, setHeaderData] = useState({Loading: true})
    const [UserSelection, setUserSelection] = useState({
        Selected_Model: 'Please Select Model'
    })
    const [AllRenderedModels,setAllRenderedModels] = useState([])

    let fetchListOfModels = async()=>{
        let listOfModels = await GET(baseURL+'/Abelian_Terminal_get_selectors')
        setHeaderData({
            allModels: listOfModels.all_Models,
            Loading: false
        })
    }

    useEffect(() => {
        fetchListOfModels()
      },[])

    const fetchModelsData = (ModelsConfig) => {
        props.childData(ModelsConfig)
        setAllRenderedModels([...AllRenderedModels, ModelsConfig])
    }
    
    const mapAllModels = (props) => {
        const Models = props.allModels.map((element) =>
        <Dropdown.Item key={element.name} onClick={() => setUserSelection({Selected_Model:element.name, id: Math.random()})} >
            {element.name}
        </Dropdown.Item>
        )
        return Models
    }
    
    const ListAllModels = HeaderData.Loading === true ?
    null :
    <p>{mapAllModels(HeaderData)}</p>

    // // Rendered RenderedModels
    // const RenderedModels = props.traces.map((PriceData) =>
    // <ListGroup 
    //     key={PriceData.id}
    // >
    //     <ListGroup.Item>
    //         <Row>
    //             <Col>
    //                 {PriceData.exchange.name}
    //             </Col>

    //             {/* <Col>
    //                 {PriceData.assetPair.name}
    //             </Col>
    //             <Col>
    //                 {PriceData.candleSize}
    //             </Col> */}

    //             <Col>
    //                 <Button variant="dark" onClick={()=> {
    //                     props.deleteTraces(PriceData.id)
    //                     // deletefromRenderedComponent(PriceData.id)
    //                     }}>Delete
    //                 </Button>
    //             </Col>
    //         </Row>
    //     </ListGroup.Item>
    // </ListGroup>
    // )

    // const ListRenderedModels = props.traces.length  <= 0 ? 
    // null :
    // RenderedModels
    
    return(
        <Container className="w-100 p-1">
        <Alert variant="dark">
            <Row>
                <Col>
                    <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.Selected_Model}>
                        {ListAllModels}
                    </DropdownButton>
                </Col>
                <Col>
                    <Button variant="success" onClick={() => fetchModelsData(UserSelection)}>
                        Render Graph
                    </Button>
                </Col>
            </Row>
            <Row>
               {/* {ListRenderedModels} */}
            </Row>
        </Alert>
        </Container> 
    )
}

export default ModelsFetcherHeader