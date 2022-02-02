import Plot from 'react-plotly.js';
import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Generator = (props) => {
    return(   
        <Container fluid="md">

            <Plot 
                data={props.dataSet}
                layout={props.layoutSet}
                config = {{
                    responsive: true,
                    scrollZoom: true
                }}
            />
        </Container>
    )
}
export default Generator