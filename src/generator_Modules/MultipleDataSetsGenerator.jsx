import Plot from 'react-plotly.js';

const Generator = (props) => {
    console.log(props);
    return( 
        <div style={{
            borderStyle: 'solid',
            borderWidth: '2px'
        }}>
            <Plot 
                data={props.dataSet}
                config = {{
                    responsive: true,
                    scrollZoom: true
                }}
                layout={{
                    width: 1900,
                    height: 500,
                    margin: {
                      l: 50,
                      r: 50,
                      b: 100,
                      t: 100,
                      pad: 4
                    }}}
            />
        </div>
    )
}
export default Generator