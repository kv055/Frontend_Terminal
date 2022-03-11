import {useState, useEffect} from 'react';
import {Alert, Container, Dropdown, DropdownButton, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import GET from '../fetch_Modules/DataFetchGET.js'

import TWOLCCON from './2LineCrossingsSubController'
import RenderedStrategiesComponent from './RenderedStrategiesSub'

//Import and configure Environement variables
let baseURL = process.env.NODE_ENV === 'production' ?
  process.env.REACT_APP_DEPLOY_URL:
  process.env.REACT_APP_DEV_URL

let SimulationFetcherHeader = (props) => {
    const [HeaderData, setHeaderData] = useState({Loading: true})
    const [UserSelection, setUserSelection] = useState({
        selectedStrategy: 'Please Select Strategy',
        selectedPeriod: "Enter Indicator Period"
    })

    const [AllRenderedStrategies,setAllRenderedStrategies] = useState([])
    
    
    let fetchListOfStrategies = async()=>{
        let listOfStrategies = await GET(baseURL+'/ListAllStrategies')
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
        // Write in local State
        setAllRenderedStrategies([...AllRenderedStrategies, SimConfig])
    }

    const deletefromRenderedComponent = (id) => {
        let filtered = AllRenderedStrategies.filter(function(traceElement){
            return traceElement.id !== id})
        setAllRenderedStrategies(filtered) 
    }
    const TWOLCController = UserSelection.selectedStrategy === 'Please Select Strategy' ?
        null:
        <TWOLCCON callback={fetchSimulationData}/>

    const RenderedStrategies = AllRenderedStrategies.length === 0 ?
        null :
        <RenderedStrategiesComponent strategies={AllRenderedStrategies} delete={props.deleteTraces} deletefromAllrenderedStrategies={deletefromRenderedComponent}></RenderedStrategiesComponent>

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