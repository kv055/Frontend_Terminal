import {useState, useEffect} from 'react';
// Execute Fetch function and set State 

let DataFetcherHeader = (props) => {
   //Neue Position erstelle und zurück schicken
   const [HeaderData, setHeaderData] = useState({Loading: true})
   const [UserSelection, setUserSelection] = useState({Asset: 'Select Exchange first', CandleSize: 'Select Asset first'})

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
        assetPairs: lel.AssetPairs.assetPairs,
        candleSizes: lel.AssetPairs.candleSize,
        Loading : false
    })
     // Set Header Data Here

   };
   
    const listDataSources = props.dataSet.Metadata.map((element) => 
        <p onClick={() => send(element)}>{element.name}</p>
    )
    
    let listAssetPairs = (props)=>{
        const AssetPairs = props.assetPairs.map((element) => 
            <p onClick={() => setUserSelection({Asset: element})}>{element}</p>
        )
        return AssetPairs
    }

    const AssetPairs = HeaderData.Loading === true ? 
        <p>{UserSelection.Asset}</p>  : 
        <p>{listAssetPairs(HeaderData)}</p>
 
    let listCandleSizes = (props)=>{
        const CandleSizes = props.candleSizes.map((element) => 
            <p onClick={() => setUserSelection({CandleSize: element})}>{element}</p>
        )
        return CandleSizes
    }

    const CandleSizes = HeaderData.Loading === true ? 
        <p>{UserSelection.CandleSize}</p>  : 
        <p>{listCandleSizes(HeaderData)}</p>


    console.log(UserSelection);

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