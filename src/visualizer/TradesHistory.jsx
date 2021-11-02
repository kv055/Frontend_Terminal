let creator = (props)=>{
    console.log(props.dataSet.Trades);

    const listTrades = props.dataSet.Trades.map((element) =>
        <li>
            <div style={{
                color:'red',
                height: '500px',
                width: '50px',
                
            }}>
                <h1 style={{color:'blue',fontSize: '5%'}}>{element.Time}</h1>
                <p>{element.Collateral.PnL}</p>
                <p>{element.Direction}</p>
                <p>{element.Collateral.Type}</p>
                <p>{element.Collateral.Amount}</p>
                
            </div>
        </li>
    );

    return (
        <div>
            <ul>
                {listTrades}
            </ul>
        </div>
    )
}

export default creator