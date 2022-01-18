import {useState, useEffect} from 'react';
import {Alert, Container, Dropdown, DropdownButton, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

let DataFetcherHeader = (props) => {

   const [HeaderData, setHeaderData] = useState({Loading: true, initialLoading : true})
   const [UserSelection, setUserSelection] = useState({ 
        exchange: null,
        assetPair:null,
        candleSize:null
    })

    let fetchDataSources = async()=>{
        let listofDatasources = await GET('http://localhost:5001/DataSources')
        setHeaderData({
            dataSources: listofDatasources.Metadata,
            Loading: true,
            initialLoading : false
        })
    }

    useEffect(() => {
        fetchDataSources()
      },[])
    
   let fetchAssetList = async(selectedExchange) => {
    let listofAssets = await POST('http://localhost:5001/AssetPairs',{"DataSource": selectedExchange})
    setHeaderData({
        ...HeaderData,
        assetPairs: listofAssets.AssetPairs.assetPairs,
        candleSizes: listofAssets.AssetPairs.candleSize,
        Loading : false
    })
    setUserSelection({ 
        exchange: selectedExchange.mic,
        assetPair:null,
        candleSize:null
    })
   }

//    let fetchOHLCdata = async(selectedAssetNCandlesize) => {
//     let fetchedohlc = await POST('http://localhost:5001/OHLC',selectedAssetNCandlesize)
//     props.childData({'ohlcConfig':UserSelection})
//     setHeaderData({
//         ...HeaderData,
//         ohlc: fetchedohlc.OHLC
//     })
//     setUserSelection({ 
//         exchange: null,
//         assetPair:null,
//         candleSize:null,
//         selection: fetchedohlc.config
//     })
//    } 
   
    let listDataSources = (props) => {
        const DataSources = props.dataSources.map((element) =>  
            <Dropdown.Item onClick={() => fetchAssetList(element)}>{element.name}</Dropdown.Item>
        )
        return DataSources
    }   

    const DataSources = HeaderData.initialLoading === true ?
        <p>loading</p> :
        <p>{listDataSources(HeaderData)}</p>

    let listAssetPairs = (props)=>{
        const AssetPairs = props.assetPairs.map((element) => 
        <Dropdown.Item onClick={() => setUserSelection({...UserSelection,'assetPair': element})}>{element}</Dropdown.Item>
        )
        return AssetPairs
    }

    const AssetPairs = HeaderData.Loading === true ? 
        <p>{UserSelection.Asset}</p>  : 
        <p>{listAssetPairs(HeaderData)}</p>
 
    let listCandleSizes = (props)=>{
        const CandleSizes = props.candleSizes.map((element) =>
        <Dropdown.Item onClick={() => setUserSelection({...UserSelection, 'candleSize':element})}>{element}</Dropdown.Item> 
        )
        return CandleSizes
    }

    const CandleSizes = HeaderData.Loading === true ? 
        <p>{UserSelection.CandleSize}</p>  : 
        <p>{listCandleSizes(HeaderData)}</p>


    if(UserSelection.assetPair != null && UserSelection.candleSize != null){
        props.childData({'ohlcConfig':UserSelection})
        setUserSelection({ 
            exchange: null,
            assetPair:null,
            candleSize:null
        })
    }
    
    return(
        <Alert variant="dark">
            <Container>
            {/* <div style={{
                borderBottom: 'solid',
                borderWidth: '2px'
            }}> */}
                {/* <Row>
                    <Col>
                        <h2>Data Fetcher</h2>
                    </Col>
                </Row> */}
                <Row>
                
                    <Col>
                        <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.exchange}>
                            {DataSources}
                        </DropdownButton>
                    </Col>
                    
                
                    <Col>
                        <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.assetPair}>
                            {AssetPairs}
                        </DropdownButton>
                    </Col>
                    
                
                    <Col>
                        <DropdownButton variant="dark" id="dropdown-item-button" title={UserSelection.candleSize}>
                            {CandleSizes}
                        </DropdownButton>
                    </Col>
                    
                </Row>
                
                
            {/* </div> */}
            </Container>
        </Alert>
    )
}
export default DataFetcherHeader