import {Button, Col,ListGroup, Row } from 'react-bootstrap';

const mapRenderedStrategies = (props) => {
    const deleteTraces = props.delete
    const deletefromRenderedComponent = props.deletefromAllrenderedStrategies
    const strategy = props.strategies.map((element) =>
        <ListGroup.Item 
        // key={element.Indicator1.name}
            key={element.id}
        >
            <Row>
                <Col>{element.Indicator1.name}</Col>
                <Col>{element.Period1}</Col>
                <Col>{element.Indicator2.name}</Col>
                <Col>{element.Period2}</Col>
                {/* <Col>{element.name}</Col> */}
                <Button variant="dark" onClick={()=> {
                    deleteTraces(element.id) 
                    deletefromRenderedComponent(element.id) 
                    }}>
                    Delete
                </Button>
            </Row>
        </ListGroup.Item>
    )
    return strategy
}
export default mapRenderedStrategies