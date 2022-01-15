import {useState, useEffect} from 'react';
import POST from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchPOST.js'
import GET from '/home/hackerboi/Dokumente/terminalUIReact/src/fetch_Modules/DataFetchGET.js'
// Execute Fetch function and set State 

let DataFetcherHeader = (props) => {
   //Neue Position erstelle und zurück schicken
   const [HeaderData, setHeaderData] = useState({Loading: true})
   const [UserSelection, setUserSelection] = useState({ 
        exchange: null,
        assetPair:null,
        candleSize:null
    })
//     let GetPlotData = async () => {
//         let DataFetcherModule = await DataFetch('http://localhost:5001/DataSources')
//         // let IndicatorFetched = await DataFetch('http://127.0.0.1:5001/Indicators')
//         // let OHLCFetched = await DataFetch('http://127.0.0.1:5001/OHLC')
//         // let SimulationFetched = await DataFetch('http://127.0.0.1:5000/Simulation')
//       setPlotData({
//         HeaderDataFetcher: DataFetcherModule,

//         // Loading : false
//       })
//     }
//    useEffect(() => {
//     // GetHeaderData()
//   },[])
  
   let fetchAssetList = async(selectedExchange) => {
    let listofAssets = await POST('http://localhost:5001/AssetPairs',{"DataSource": selectedExchange})
    setHeaderData({
        assetPairs: listofAssets.AssetPairs.assetPairs,
        candleSizes: listofAssets.AssetPairs.candleSize,
        Loading : false
    })
    setUserSelection({ 
        exchange: selectedExchange.mic,
        assetPair:null,
        candleSize:null
    })
   };

   let fetchOHLCdata = async(selectedAssetNCandlesize) => {
    let ohlc = await POST('http://localhost:5001/OHLC',selectedAssetNCandlesize)
    console.log(ohlc);
   } 
   
    const listDataSources = props.dataSet.Metadata.map((element) => 
        <p onClick={() => fetchAssetList(element)}>{element.name}</p>
    )

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
        console.log(UserSelection);
        fetchOHLCdata({'ohlcConfig':UserSelection})
    }

    return(
        <div style={{
            borderBottom: 'solid',
            borderWidth: '2px'
        }}>
            <h2 style={{}}>Data Fetcher</h2>
            <ul>
                <li style={{textAlign: 'left'}}>
                    <p>Data-Source:</p>
                    <div>{listDataSources}</div>
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