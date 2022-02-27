let creator = (config)=>{
    let plotlyLayoutSet = 
        {
            autosize: true,
            // title: config.,
            width: window.innerWidth -50,
            height: 200,
            margin: {
                l: 50,
                r: 50,
                b: 5,
                t: 5,
                pad: 4
            },
            // legend: {"orientation": "h"},
            // xaxis: {
            //     autorange: true,
            //     rangeselector: {buttons: [
            //         {
            //             count: 1,
            //             label: '1m',
            //             step: 'month',
            //             stepmode: 'backward'
            //         },
            //         {
            //             count: 3,
            //             label: '3m',
            //             step: 'month',
            //             stepmode: 'backward'
            //         },
            //         {
            //             count: 6,
            //             label: '6m',
            //             step: 'month',
            //             stepmode: 'backward'
            //         },
            //         {
            //             count: 1,
            //             label: '1y',
            //             step: 'year',
            //             stepmode: 'backward'
            //         },
            //         {
            //             count: 3,
            //             label: '3y',
            //             step: 'year',
            //             stepmode: 'backward'
            //         },
            //         {
            //             count: 5,
            //             label: '5y',
            //             step: 'year',
            //             stepmode: 'backward'
            //         },
            //         {step: 'all'}
            //         ]},
            //     rangeslider: {range: [OHLCSet[0][0], OHLCSet[OHLCSet.length - 1][0]]},
            //     type: 'date'
            // },
            
            // yaxis: {
            //     autorange: true,
            //     type: 'linear',
            //     fixedrange: false
            // }
        }
    return plotlyLayoutSet

}

export default creator
