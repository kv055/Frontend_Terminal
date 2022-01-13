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
   fetch('http://localhost:5001/AssetPairs', options)
}


let creator = (props)=>{
    console.log(props);

    const listTrades = props.AssetPairs.map((element) => 
        <p onClick={() => send(element.ticker)}>{element.assetPair}</p>
    )
    return listTrades
}

export default creator