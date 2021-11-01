let creator = (SimulatorSet)=>{
    // console.log(SimulatorSet);
    let dataSet = {

    }

    SimulatorSet.Trades.forEach(element => {
        element.
        return (
            <li>
                <div>
                    <h1>{element.Time}</h1>
                    <p>{element.Direction}</p>
                    <p>{element.Collateral.PnL}</p>
                    <p>{element.Collateral.Type}</p>
                    <p>{element.Collateral.Amount}</p>
                    
                </div>
            </li>
        )
    });

    return plotlyDataSe(
        <div>
            <ul>
                
            </ul>
        </div>
    )
}

export default creator