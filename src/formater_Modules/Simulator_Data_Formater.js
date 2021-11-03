let creator = (SimulatorSet)=>{
    console.log(SimulatorSet);
    let plotlyDataSet = {
        x : [], 
        y : [],
        mode : 'markers',
        type : 'scatter',
        marker: {
            color: []
        },
        name: 'Trades',
        text: [],
        hovertemplate:{
        }
    }
    SimulatorSet.AssetPrice.forEach(element => {
        plotlyDataSet.y.push(element)
    })
    SimulatorSet.Trades.forEach(element => {
        plotlyDataSet.x.push(element.Time)
        plotlyDataSet.text.push(
            `Profit/Loss: ${element.Collateral.PnL}<br>Direction: ${element.Direction}<br>Asset amount: ${element.Collateral.Amount}<br>Position: ${element.Collateral.Type}`
        )
        if (element.Direction === 'Short'){
            plotlyDataSet.y.push(element.Collateral.Amount)
        }
        else if (element.Direction === 'Long'){
            plotlyDataSet.y.push(element.Collateral.WorthInCash)    
        }

        if (element.Collateral.PnL < 0) {
            plotlyDataSet.marker.color.push('red')
        } else if (element.Collateral.PnL > 0){
            plotlyDataSet.marker.color.push('green')
            
        }
        
    });

    return plotlyDataSet
}

export default creator