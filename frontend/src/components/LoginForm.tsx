import axios from 'axios';


function LoginForm() {
   

    const handleSubmit = (e:any) => {
        e.preventDefault();

        axios.post('http://localhost:8080/login', {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(response => {
            if (response.data.token != null) {
                console.log("Success!");
                localStorage.setItem("token", response.data.token);
                window.location.href = "/list";
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    
    return (
        <>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );

}

export default LoginForm;