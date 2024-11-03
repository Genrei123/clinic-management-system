// Sidebar.tsx
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
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
                            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="text-sm font-medium"> Patient </span>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            {/* Dropdown Links for Patient */}
                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link
                                        to="/patients/banned-users"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Banned Users
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/patients/calendar"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Calendar
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <Link
                            to="/inventory"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Inventory
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/employees"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Employees
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/reports" // Link to the Report page
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            Reports
                        </Link>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
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
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a 1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            {/* Dropdown Links for Account */}
                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link
                                        to="/account/details" // Link to Account Details page
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Details
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/account/security" // Link to Account Security page
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
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
