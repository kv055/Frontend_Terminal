import {useState, useEffect} from 'react';
import {Alert, Button, Container, Dropdown, DropdownButton, ListGroup, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import POST from '../fetch_Modules/DataFetchPOST'
import GET from '../fetch_Modules/DataFetchGET'

//Import and configure Environement variables
let baseURL = process.env.NODE_ENV === 'production' ?
  process.env.REACT_APP_DEPLOY_URL:
  process.env.REACT_APP_DEV_URL

let DataFetcherHeader = (props) => {

    const [HeaderData, setHeaderData] = useState({Loading: true, LoadingDataSources : true})
    const [UserSelection, setUserSelection] = useState({ 
        exchange: {name:'Select Exchange'},
        assetPair: {name:'Select Asset'},
        candleSize: 'Select CandleSize'
    })
    const  [DataSetsToFetch,setDataSetsToFetch] = useState([])

    // Fetch List of DataSources/Exchanges
    let fetchDataSources = async()=>{
        let listofDatasources = await GET(baseURL+'/DataSources')
        setHeaderData({
            dataSources: listofDatasources.Metadata,
            Loading: true,
            LoadingDataSources : false
        })
        
    }

    useEffect(() => {
        fetchDataSources()
      },[])
    
    // 
    let fetchAssetList = async(selectedExchange) => {
        let listofAssets = await POST(baseURL+'/AssetPairs',{"DataSource": selectedExchange})
        setHeaderData({
            ...HeaderData,
            assetPairs: listofAssets.AssetPairs.assetPairs,
            candleSizes: listofAssets.AssetPairs.candleSize,
            Loading : false
        })
        setUserSelection({ 
            exchange: selectedExchange,
            assetPair: {name:'Select Asset'},
            candleSize: 'Select CandleSize'
        })
   } 
   
    let listDataSources = (props) => {
        const DataSources = props.dataSources.map((element) =>  
            <Dropdown.Item key={element.name} onClick={() => fetchAssetList(element)}>{element.name}</Dropdown.Item>
        )
        return DataSources
    }   

    const DataSources = HeaderData.LoadingDataSources === true ?
        <p>loading DataSources</p> :
        <p>{listDataSources(HeaderData)}</p>

    let listAssetPairs = (props)=>{
        const AssetPairs = props.assetPairs.map((element) => 
        <Dropdown.Item key={element.symbol} onClick={() => setUserSelection({...UserSelection,'assetPair': element, 'id': Math.random()})}>{element.name}</Dropdown.Item>
        )
        return AssetPairs
    }

    const AssetPairs = HeaderData.Loading === true ? 
        <p>{UserSelection.Asset}</p>  : 
        <p>{listAssetPairs(HeaderData)}</p>
 
    let listCandleSizes = (props)=>{
        const CandleSizes = props.candleSizes.map((element) =>
        <Dropdown.Item key={element} onClick={() => setUserSelection({...UserSelection, 'candleSize':element, 'id': Math.random()})}>{element}</Dropdown.Item> 
        )
        return CandleSizes
    }

    const CandleSizes = HeaderData.Loading === true ? 
        <p>{UserSelection.CandleSize}</p>  : 
        <p>{listCandleSizes(HeaderData)}</p>

    // Rendered PriceDataSets
    const PriceDataSets = DataSetsToFetch.map((PriceData) =>
    <ListGroup 
        key={PriceData.id}
    >
        <ListGroup.Item>
            <Row>
                <Col>
                    {PriceData.exchange.name}
                </Col>
                <Col>
                    {PriceData.assetPair.name}
                </Col>
                <Col>
                    {PriceData.candleSize}
                </Col>
                <Col>
                    <Button variant="dark" onClick={()=> {
                        props.deleteTraces(PriceData.id)
                        // deletefromRenderedComponent(PriceData.id)
                        }}>Delete
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    </ListGroup>
    )

    const FetchedPriceDataSets = DataSetsToFetch.length  <= 0 ? 
    null :
    PriceDataSets

    useEffect(()=>{
        let allConfigSets = [] 
        DataSetsToFetch.forEach(element => {
            let ohlcConfig = { 
                exchange: element.exchange.mic,
                assetPair: element.assetPair.symbol,
                candleSize: element.candleSize 
              }
            allConfigSets.push(ohlcConfig)
        })
        props.childData(allConfigSets)
    },[DataSetsToFetch])   
    
    return(
        <Alert variant="dark">
            <Container>
                <Row>
                    <Col className='justify-content-md-center'>
                        <DropdownButton  variant="dark" id="dropdown-item-button" title={UserSelection.exchange.name}>
                            {DataSources}
                        </DropdownButton>
                    </Col>
                    
                
                    <Col>
                        <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.assetPair.name}>
                            {AssetPairs}
                        </DropdownButton>
                    </Col>
                    
                
                    <Col>
                        <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.candleSize}>
                            {CandleSizes}
                        </DropdownButton>
                    </Col>

                    <Col>
                        <Button variant="dark" onClick={() => 
                            setDataSetsToFetch([...DataSetsToFetch, UserSelection])
                        }>
                            Add
                        </Button>
                    </Col>
                    
                </Row>
                <Row>
                    {FetchedPriceDataSets}
                </Row>

            </Container>
        </Alert>
    )
}
export default DataFetcherHeader