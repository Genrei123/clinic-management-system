import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const isActiveLink = (path: string) => {
        return location.pathname === path;
    };

    const getLinkClassName = (path: string) => {
        const baseClasses = "block rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200";
        return isActiveLink(path)
            ? `${baseClasses} bg-blue-100 text-blue-700`
            : `${baseClasses} text-gray-500 hover:bg-gray-100 hover:text-gray-700`;
    };

    return (
        <div className="flex h-screen flex-col justify-between border-e bg-white">
            <div className="px-4 py-6">
                {/* Logo */}
                <span className="grid h-32 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                    <img src={logo} alt="logo" />
                </span>

                {/* Navigation Links */}
                <ul className="mt-6 space-y-1">
                    <li>
                        <Link
                            to="/home"
                            className={getLinkClassName('/home')}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/patient"
                            className={getLinkClassName('/patient')}
                        >
                            Patient
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/inventory"
                            className={getLinkClassName('/inventory')}
                        >
                            Inventory
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/employees"
                            className={getLinkClassName('/employees')}
                        >
                            Employees
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reports"
                            className={getLinkClassName('/reports')}
                        >
                            Reports
                        </Link>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary 
                                className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                                    (isActiveLink('/account/details') || isActiveLink('/account/security'))
                                    ? 'bg-blue-100 text-blue-700'
                                    : ''
                                }`}
                            >
                                <span className="text-sm font-medium"> Account </span>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link
                                        to="/account/details"
                                        className={getLinkClassName('/account/details')}
                                    >
                                        Details
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/account/security"
                                        className={getLinkClassName('/account/security')}
                                    >
                                        Security
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>

            {/* Footer with User Info */}
            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <img
                        alt="User avatar"
                        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="size-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-xs">
                            <strong className="block font-medium">username</strong>
                            <span> Lorem ipsum </span>
                        </p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;