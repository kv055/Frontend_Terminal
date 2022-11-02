import {useState, useEffect} from 'react';
import {Alert, Button, Container, Dropdown, DropdownButton, Col, Row } from 'react-bootstrap';
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

    // Fetch List of DataSources/Exchanges
    let fetchDataSources = async()=>{
        let listofDatasources = await GET(baseURL+'/Abelian_Terminal_get_selectors')
        setHeaderData({
            dataSources: listofDatasources.all_OHLC_sources,
            Loading: true,
            LoadingDataSources : false
        })
        
    }

    useEffect(() => {
        fetchDataSources()
      },[])
    
    // 
    let fetchAssetList = async(selectedExchange) => {
        let listofAssets = await POST(baseURL+'/Abelian_Terminal_post_asset_selectors',{"DataSource": selectedExchange})
        setHeaderData({
            ...HeaderData,
            assetPairs: listofAssets.assetPairs,
            // candleSizes: listofAssets.AssetPairs.candleSize,
            Loading : false
        })
        setUserSelection({ 
            exchange: selectedExchange,
            assetPair: {name:'Select Asset'},
            // candleSize: 'Select CandleSize'
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
        <Dropdown.Item key={element.ticker} onClick={() => setUserSelection({...UserSelection,'assetPair': element})}>{element.ticker}</Dropdown.Item>
        )
        return AssetPairs
    }

    const AssetPairs = HeaderData.Loading === true ? 
        <p>{UserSelection.Asset}</p>  : 
        <p>{listAssetPairs(HeaderData)}</p>
 
    // let listCandleSizes = (props)=>{
    //     const CandleSizes = props.candleSizes.map((element) =>
    //     <Dropdown.Item key={element} onClick={() => setUserSelection({...UserSelection, 'candleSize':element, 'id': Math.random()})}>{element}</Dropdown.Item> 
    //     )
    //     return CandleSizes
    // }

    // const CandleSizes = HeaderData.Loading === true ? 
    //     <p>{UserSelection.CandleSize}</p>  : 
    //     <p>{listCandleSizes(HeaderData)}</p>

    
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
                    
                
                    {/* <Col>
                        <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.candleSize}>
                            {CandleSizes}
                        </DropdownButton>
                    </Col> */}

                    <Col>
                        <Button variant="success" onClick={() => props.childData(UserSelection)}>
                            Render Graph
                        </Button>
                    </Col>
                    
                </Row>
            </Container>
        </Alert>
    )
}
export default DataFetcherHeader