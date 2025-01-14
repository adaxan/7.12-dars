import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar({children}) {
    let token = localStorage.getItem('token');
    return (
        <div>
            <nav className="bg-purple-600 text-white p-4">
                <div className="container mx-auto flex justify-around items-center">
                    <Link to="/" className="text-2xl font-bold">Articles</Link>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:text-yellow-300">Card</Link>
                        </li>
                        <li>
                            <Link to="/createart" className="hover:text-yellow-300">Create Article</Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-yellow-300">{token ? "Log out" : "Login"}</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container mx-auto mt-8">
                {children}
            </div>
        </div>
    );
}

export default Navbar;
