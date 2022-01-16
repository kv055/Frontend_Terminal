import {useState, useEffect} from 'react';
import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'

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
            <p onClick={() => fetchAssetList(element)}>{element.name}</p>
        )
        return DataSources
    }   

    const DataSources = HeaderData.initialLoading === true ?
        <p>loading</p> :
        <p>{listDataSources(HeaderData)}</p>

    let listAssetPairs = (props)=>{
        const AssetPairs = props.assetPairs.map((element) => 
            <p onClick={() => setUserSelection({...UserSelection,'assetPair': element})}>{element}</p>
        )
        return AssetPairs
    }

    const AssetPairs = HeaderData.Loading === true ? 
        <p>{UserSelection.Asset}</p>  : 
        <p>{listAssetPairs(HeaderData)}</p>
 
    let listCandleSizes = (props)=>{
        const CandleSizes = props.candleSizes.map((element) =>
        <p onClick={() => setUserSelection({...UserSelection, 'candleSize':element})}>{element}</p> 
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
    console.log(HeaderData);
    return(
        <div style={{
            borderBottom: 'solid',
            borderWidth: '2px'
        }}>
            <h2 style={{}}>Data Fetcher</h2>
            <ul>
                <li style={{textAlign: 'left'}}>
                    <p>Data-Source:</p>
                    <div>{DataSources}</div>
                </li>
                <li style={{textAlign: 'center'}}>
                    <p>Asset-Pair:</p>
                    <div>{AssetPairs}</div>
                </li>
                <li style={{textAlign: 'right'}}>
                    <p>Candlesize Timeframe:</p>
                    <div>{CandleSizes}</div>
                </li>
            </ul>
            
        </div>
    )
}
export default DataFetcherHeader