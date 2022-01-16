let creator = (OHLCSet)=>{
    let plotlyLayoutSet = 
        {
            title: OHLCSet.config.assetPair,
            width: 1900,
            height: 500,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            xaxis: {
                autorange: true,
                rangeselector: {buttons: [
                    {
                        count: 1,
                        label: '1m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 3,
                        label: '3m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 6,
                        label: '6m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 1,
                        label: '1y',
                        step: 'year',
                        stepmode: 'backward'
                    },
                    {
                        count: 3,
                        label: '3y',
                        step: 'year',
                        stepmode: 'backward'
                    },
                    {
                        count: 5,
                        label: '5y',
                        step: 'year',
                        stepmode: 'backward'
                    },
                    {step: 'all'}
                    ]},
                rangeslider: {range: [OHLCSet.OHLC[0][0], OHLCSet.OHLC[OHLCSet.OHLC.length - 1][0]]},
                type: 'date'
            },
            
            yaxis: {
                autorange: true,
                type: 'linear',
                fixedrange: false
            }
        }
        console.log(plotlyLayoutSet);
    return plotlyLayoutSet

}

export default creator
