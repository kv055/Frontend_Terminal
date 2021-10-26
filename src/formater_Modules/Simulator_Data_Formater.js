let creator = (SimulatorSet)=>{
    console.log(SimulatorSet.Trades);
    let plotlyDataSet = {
        x : [], 
        y : [],
        mode : 'lines',
        type : 'scatter' 
    }
    SimulatorSet.Trades.forEach(element => {
        plotlyDataSet.x.push(element.Time)
        if (element.Direction === 'Short'){
            plotlyDataSet.y.push(element.Collateral.Amount)
        }
        else if (element.Direction === 'Long'){
            plotlyDataSet.y.push(element.Collateral.WorthInCash) 
        }
    });

    return [plotlyDataSet]
}

export default creator