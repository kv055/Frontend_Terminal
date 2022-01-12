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
    // SimulatorSet.forEach(element => {
        
    // })
    SimulatorSet.Trades.forEach(element => {
        plotlyDataSet.x.push(element.Open)
        plotlyDataSet.y.push(element.AssetPrice)
        plotlyDataSet.text.push(
            `Profit/Loss: ${element.PnL}<br>Direction: ${element.Direction}<br>From: ${element.From}<br>Position: ${element.To}`
        )
        
        if (element.PnL <= 0) {
            plotlyDataSet.marker.color.push('red')
        } else if (element.PnL > 0){
            plotlyDataSet.marker.color.push('green')   
        }
    });
    console.log(plotlyDataSet);
    return plotlyDataSet
}
export default creator