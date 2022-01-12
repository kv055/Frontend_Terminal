let creator = (props)=>{
    // console.log(props.dataSet);

    const listTrades = props.dataSet.Trades.map((element) =>
        <li>
            <div style={{
                color:'red',
                height: '50%',
                width: '50%',
                borderStyle: 'solid',
                borderWidth: '2px',
                float: 'right'
                
            }}>
                {/* Change Here for updated Trades Object */}
                <p>Opened: {element.Open}</p>
                <p>Direction: {element.Direction}</p>
                <p>PnL: {element.PnL}</p>
                <p>From: {element.From}</p>
                <p>To: {element.To}</p>
                
            </div>
        </li>
    );

    return (
        <div>
            <ul> 
                <div style={{float: 'left'}}>
                    <p>Start Cash: {props.dataSet.Cash[0]}</p>
                    <p>Start Asset: {props.dataSet.AssetAmount[0]}</p>
                    <p>End Cash: {props.dataSet.Cash.slice(-1)}</p>
                    <p>End Asset: {props.dataSet.AssetAmount.slice(-1)}</p>
                </div>
                
                {listTrades}
           
            </ul>
        </div>
    )
}

export default creator