let Header = () => {
    return(
        <div style={{
            borderBottom: 'solid',
            borderWidth: '2px'
        }}>
            <h1 style={{textAlign: 'left'}}>Abelian Capital</h1>
            
            <ul style={{textAlign: 'right'}}>
                <li>Server Info:</li>
                <li>Abelian BackTesting</li>
                <li>Abelian LiveTesting</li>
            </ul>
        </div>
    )
}

export default Header