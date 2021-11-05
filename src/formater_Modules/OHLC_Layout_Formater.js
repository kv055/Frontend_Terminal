let creator = ()=>{
    let plotlyLayoutSet = 
        {
            title: 'BTC/USD',
            width: 1900,
            height: 500,
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
                rangeslider: {range: ['2019-02-17', '2019-02-16']},
                type: 'date'
            },
            
            yaxis: {
                autorange: true,
                type: 'linear',
                fixedrange: false
            }
        }

    return plotlyLayoutSet
}

export default creator
