import {useState} from 'react';
import {Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


const LineCrossingsController  = (props) => {
    const [Period1, setPeriod1] = useState('Please Select Period')
    const [Period2, setPeriod2] = useState('Please Select Period')
    const [Indicator1, setIndicator1] = useState({name:'Please Select Indicator'})
    const [Indicator2, setIndicator2] = useState({name:'Please Select Indicator'})

    const ListofIndicatorsthatQualify = [
        {'name':'Double Exponential Moving Average','symbol':'DEMA'},        
        {'name':'Exponential Moving Average','symbol':'EMA'},        
        {'name':'Kaufman Adaptive Moving Average','symbol':'KAMA'},        
        {'name':'Moving average','symbol':'MA'},        
        {'name':'MidPoint over period','symbol':'MIDPOINT'},        
        {'name':'Simple Moving Average','symbol':'SMA'},
        {'name':'Triple Exponential Moving Average (T3)','symbol':'T3'},        
        {'name':'Triple Exponential Moving Average','symbol':'TEMA'},        
        {'name':'Triangular Moving Average','symbol':'TRIMA'},        
        {'name':'Weighted Moving Average','symbol':'WMA'}
    ]
    
    let MapAllIndicators1 = (props) => {
        const Indicators = props.input.map((element) =>  
            <Dropdown.Item key={element.name} 
            onClick={() => setIndicator1(element)} 
            >
                {element.name}
            </Dropdown.Item>
        )
        return Indicators
    } 

    let MapAllIndicators2 = (props) => {
        const Indicators = props.input.map((element) =>  
            <Dropdown.Item key={element.name} 
            onClick={() => setIndicator2(element)} 
            >
                {element.name}
            </Dropdown.Item>
        )
        return Indicators
    } 

    return (
        <Row>
            <Col>
                <DropdownButton variant="dark" id="dropdown-item-button" title={Indicator1.name}>
                    <MapAllIndicators1 input={ListofIndicatorsthatQualify}></MapAllIndicators1>
                </DropdownButton>
                <Form>
                    <Form.Control type="number" placeholder={Period1.selectedPeriod} 
                    onChange={e => setPeriod1(e.target.value)}/>
                </Form>
            </Col>
            <Col>
                <DropdownButton variant="dark" id="dropdown-item-button" title={Indicator2.name}>
                <MapAllIndicators2 input={ListofIndicatorsthatQualify}></MapAllIndicators2>
                </DropdownButton>
                <Form>
                    <Form.Control type="number" placeholder={Period2.selectedPeriod} 
                    onChange={e => setPeriod2(e.target.value)}/>
                </Form>
            </Col>
            <Col>
                <Button variant="success" 
                    onClick={() => props.callback({
                        'Strategy': 'Moving Average Crossings',
                        'Indicator1': Indicator1,
                        'Period1' : Period1,
                        'Indicator2': Indicator2,
                        'Period2' : Period2,
                        'id': Math.random()
                    })}
                >
                    Render Strategy
                </Button>
            </Col>
        </Row>
        
    )
}
export default LineCrossingsController