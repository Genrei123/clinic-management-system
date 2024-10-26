import axios from 'axios';

function ListGroup() {
    const post = () => {
        axios.post('http://localhost:8080/login', {
            username: "Username1",
            password: "Password1"
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    
    
    

    
    
    return (
        <>
            <button onClick={post}>Get Quote</button>
        </>
    );
}

export default ListGroup