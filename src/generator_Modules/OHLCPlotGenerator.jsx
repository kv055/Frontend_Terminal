import Plot from 'react-plotly.js';

const Generator = (props) => {
    return(
        <div style={{
            borderStyle: 'solid',
            borderWidth: '2px'
        }}>
            <Plot 
                data={props.dataSet}
                layout={props.layoutSet}
                config = {{
                    responsive: true,
                    scrollZoom: true
                }}
            />
        </div>
    )
}
export default Generator