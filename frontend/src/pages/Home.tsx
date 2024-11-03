import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { jwtDecode } from 'jwt-decode';


function Home () {

    // const token = localStorage.getItem("token");
    // const decoded:string = jwtDecode(token!);
    
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 p-6">
                <h1>Home Content</h1>
                <p>This is the main content area on the right.</p>
            </div>
        </div>
    );

}

export default Home;