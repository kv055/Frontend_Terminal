import Plot from 'react-plotly.js';

const Generator = (props) => {
    console.log('props: ',props);
    return(
        // <p>Test</p>
        <Plot
            data={[{
                x: props.plotlyObj.time,
                y: props.plotlyObj.TradeCash,
                mode: "line",
                type: "scatter"
            }]} 

            config = {{
                responsive: true,
                scrollZoom: true
            }}
        /> 

    )
}
export default Generator