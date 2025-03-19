import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdLogin } from "react-icons/md";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">ThinkAcademy</Link>
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className='flex items-center gap-10'>
                            <Link to="/products" className="hover:text-gray-300 hover:bg-gray-800 p-2 font-bold ">Products</Link>
                            <button className=' flex items-center gap-1 cursor-pointer hover:bg-gray-800 p-2 ' >
                            <FaSignOutAlt onClick={logout} className="cursor-pointer" />LogOut
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-row gap-4 ">

                            <Link to="/login" className="hover:text-gray-300 flex items-center ">
                                <MdLogin />
                                Login
                            </Link>
                            <Link to="/signup" className="hover:text-gray-300 flex items-center ">
                                <MdLogin />
                                Signup
                            </Link>

                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
