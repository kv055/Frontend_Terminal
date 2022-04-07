import {useState} from 'react';
import {Alert, Button, Card, Dropdown, DropdownButton,Form, Row ,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function LoginScreen(props) {
    const [BackendSelection, setBackendSelection] = useState({SelectedBackend: 'Abelian Backtesting'})
    const [UserID, setUserID] = useState()
    const [Password, setPassword] = useState()

    return (
        <div>
            <Alert variant="dark">
                <Row >
                    <h1 
                        style={{fontSize: '7rem'}}
                        className='row justify-content-center'
                    >
                        Abelian Capital
                    </h1>
                </Row>
                <Row className='row justify-content-center'>
                    <Card border="light" 
                        style={{
                            width: '55rem',
                            margin: '1rem'
                        }}
                    >
                        <Card.Header className='row justify-content-center'>Select Environement:</Card.Header>
                        <Card.Body>
                            <DropdownButton 
                                variant="dark" 
                                id="dropdown-item-button" 
                                title={BackendSelection.SelectedBackend}
                                className='row justify-content-center'
                            >
                                
                                <Dropdown.Item  
                                    onClick={() => setBackendSelection({SelectedBackend: 'Abelian Analytics'})}>
                                        Abelian Analytics
                                </Dropdown.Item>
                                <Dropdown.Item  
                                    onClick={() => setBackendSelection({SelectedBackend: 'Abelian Backtesting'})}>
                                        Abelian BackTesting
                                </Dropdown.Item>
                                <Dropdown.Item  
                                    onClick={() => setBackendSelection({SelectedBackend: 'Abelian LiveTrading'})}>
                                        Abelian LiveTrading
                                </Dropdown.Item>

                            </DropdownButton>
                        </Card.Body>
                    </Card>
                </Row>
                
                <Row className='row justify-content-center'>
                    <Card border="light" 
                        style={{
                            width: '55rem',
                            margin: '1rem' 
                        }}
                        
                    >
                        <Card.Header className='row justify-content-center'>USER_ID</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Control 
                                        placeholder={'Enter USER_ID'} 
                                        onChange={e => setUserID({User_id: e.target.value})}/>
                                </Form>
                            </Card.Body>
                        
                        <Card.Header className='row justify-content-center'>PASSWORD</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Control 
                                        placeholder={'Enter Password'} 
                                        type={'password'}
                                        onChange={e => setPassword({Password: e.target.value})}/>
                                </Form>
                            </Card.Body> 

                    </Card>
                </Row>
                <Row className='row justify-content-center'>
                    <Spinner variant="secondary"  animation="border" />
                    <Spinner variant="secondary"  animation="border" />
                    <Spinner variant="secondary"  animation="border" />
                </Row>
                {/* size="lg" */}
                <Row className='row justify-content-center'>
                    <Button 
                        variant="success"  
                        style={{
                            width: '55rem',
                            margin: '1rem'
                        }}
                        onClick={() => {
                            props.LogInStatus({
                                isLoggedIn: true,
                                User: UserID,
                                Password: Password
                            })
                            props.Callback(BackendSelection.SelectedBackend)
                            
                        }
                        }
                    >
                        LOGIN
                    </Button>
                </Row>
            </Alert>
        </div>
    )
}
export default LoginScreen