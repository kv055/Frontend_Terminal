let dataFetcherHeader = (props) => {
   //Neue Position erstelle und zurück schicken
   let send = function(choice){
    
     const options = {
       method: 'POST',
       headers: {
       'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        "DataSource": choice
    })
     };
  
     fetch('http://localhost:5001/Posten', options)
   };
   
   
   
    const listDataSources = props.dataSet.Metadata.map((element) => 
        <p onClick={() => send(element)}>{element.name}</p>
    )
    // const listAssetPairs = props.dataSet.Metadata.map((element) => 
    //     element.Assetpair.map((pair) =>
    //         <p>{pair}</p>
    //     )
    // )

    console.log(props.dataSet.Metadata);

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
                    {/* {listAssetPairs} */}
                </li>
                <li>
                    <p style={{textAlign: 'right'}}>Configuration:</p>
                </li>
            </ul>
            
        </div>
    )
}

export default dataFetcherHeader