import Plot from 'react-plotly.js';

const Generator = (props) => {
    // console.log('props: ',props.plotlyObj);
    
    let time = []
    let open = []
    let high = []
    let low = []
    let close = []

    props.plotlyObj.forEach( element => {
      time.push(element[0])
      open.push(element[1])
      high.push(element[2])
      low.push(element[3])
      close.push(element[4]) 
    })

    return(
        // <p>Test</p>
        <Plot
            data={[{
                //X-Axis
                x: time,
                //Y-Axis
                close : open, 
                high : high, 
                line: {col :'rgba(31,119,180,1)'}, 
                low: low,
                open: close,
                //Config
                type: 'candlestick', 
                xaxis: 'x', 
                yaxis:'y'
            }]} 

            layout= {{
                title: 'BTC/USD',

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
            }}

            config = {{
                responsive: true,
                scrollZoom: true
            }}
        />
    )
}
export default Generator