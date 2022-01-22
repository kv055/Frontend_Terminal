import {Alert, Container,ListGroup, Accordion, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

let creator = (props)=>{
    console.log(props.dataSet);

    const listTrades = props.dataSet.Trades.map((element) =>
        
            <Accordion.Item eventKey="0" key={element.Open.toString()}>
                <Accordion.Header>Opened: {element.Open}</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                            <ListGroup.Item>Direction: {element.Direction}</ListGroup.Item>
                            <ListGroup.Item>PnL: {element.PnL}</ListGroup.Item>
                            <ListGroup.Item>From: {element.From}</ListGroup.Item>
                            <ListGroup.Item>To: {element.To}</ListGroup.Item>
                        </ListGroup>
                    </Accordion.Body>
            </Accordion.Item>
    );

    return (
        <Alert variant="dark">
        <Container>
            <Row>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>First Trade: {props.dataSet.Trades[0].Open}</ListGroup.Item>
                        <ListGroup.Item>Start Cash: {props.dataSet.Cash[0]}</ListGroup.Item>
                        <ListGroup.Item>Start Asset: {props.dataSet.AssetAmount[0]}</ListGroup.Item>
                        <ListGroup.Item>End Cash: {props.dataSet.Cash.slice(-1)}</ListGroup.Item>
                        <ListGroup.Item>End Asset: {props.dataSet.AssetAmount.slice(-1)}</ListGroup.Item>
                        <ListGroup.Item>Last Trade: {props.dataSet.Trades.slice(-1)[0].Open}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <Accordion defaultActiveKey="0">
                        {/* <Accordion.Header>Trades History</Accordion.Header> */}
                        {listTrades}
                    </Accordion>
                </Col>
            </Row>
        </Container>
        </Alert>
    )
}

export default creator

