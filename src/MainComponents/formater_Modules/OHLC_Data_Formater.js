let creator = (OHLCSet, config)=>{
    console.log(config);
    let plotlyDataSet = {
        //X-Axis
        x: [],
        //Y-Axis
        open: [],
        high : [], 
        line: {col :'rgba(31,119,180,1)'}, 
        low: [],
        close : [], 
        //Config
        type: 'candlestick', 
        xaxis: 'x', 
        yaxis:'y',
        name: config.assetPair,
        id: config.id
    }

    OHLCSet.forEach( candleStick => {
      // Time
        plotlyDataSet.x.push(candleStick[0])
        plotlyDataSet.open.push(candleStick[1])
        plotlyDataSet.high.push(candleStick[2])
        plotlyDataSet.low.push(candleStick[3])
        plotlyDataSet.close.push(candleStick[4]) 
    })
    return plotlyDataSet
}

export default creator