import {useState, useEffect} from 'react';
import Asset_List from './Asset_List'


// Execute Fetch function and set State 

let DataFetcherHeader = (props) => {
   //Neue Position erstelle und zurück schicken
   const [HeaderData, setHeaderData] = useState({Loading: true})
//    let GetHeaderData = async () => {
//     setHeaderData({
//         // HeaderDataFetcher: DataFetcherModule,
//         // Indicators: IndicatorFetched.Indicators,
//         // OHLC: OHLCFetched.OHLC,
//         // Simulation: SimulationFetched.Simulation,
//         // Loading : false
//     })
// }
//    useEffect(() => {
//     GetHeaderData()
//   },[])
  
   let send = async (choice) => {
    
     const options = {
       method: 'POST',
       headers: {
       'Content-Type': 'application/json'
        },
       body: JSON.stringify({
        "DataSource": choice
        })
    };
  
    let lol = await fetch('http://localhost:5001/AssetPairs', options)
    let lel = await lol.json()
    setHeaderData({
        AssetPairs: lel.AssetPairs.assetPairs,
        Loading : false
    })
     // Set Header Data Here

   };
   
   
   
    const listDataSources = props.dataSet.Metadata.map((element) => 
        <p onClick={() => send(element)}>{element.name}</p>
    )
    
    const listAssetPairs = HeaderData.Loading === true ? 
        <p>Loading</p>  : 
        <p>{Asset_List(HeaderData)}</p>
 

    console.log(HeaderData);

    return(
        <div style={{
            borderBottom: 'solid',
            borderWidth: '2px'
        }}>
            <h2 style={{}}>Data Fetcher</h2>
            <ul>
                <li>
                    <p style={{textAlign: 'left'}}>
                        Data-Source: 
                    </p>
                    {listDataSources}
                </li>
                <li>
                    <p style={{textAlign: 'center'}}>Asset-Pair:</p>
                    {listAssetPairs}
                </li>
                <li>
                    <p style={{textAlign: 'right'}}>Configuration:</p>
                </li>
            </ul>
            
        </div>
    )
}

export default DataFetcherHeader