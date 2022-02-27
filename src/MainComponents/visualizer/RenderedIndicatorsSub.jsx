import {Button, Col, ListGroup, Row } from 'react-bootstrap';

const mapRenderedIndicators = (props) => {
    const deleteTraces = props.delete
    const deletefromRenderedComponent = props.deletefromRenderedComponent

    const Indicators = props.Indicators.map((indicator) =>
        <ListGroup 
            key={indicator.id}
        >
            <ListGroup.Item>
                <Row>
                    <Col>
                        {indicator.selectedIndicator.name}
                    </Col>
                    <Col>
                        {indicator.selectedPeriod}
                    </Col>
                    <Col>
                        <Button variant="dark" onClick={()=> {
                            deleteTraces(indicator.id)
                            deletefromRenderedComponent(indicator.id)
                            }}>Delete
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
   
    )
    return Indicators
}
export default mapRenderedIndicators