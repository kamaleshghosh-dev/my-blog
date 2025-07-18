import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', 
      slug: '/', 
      active: true },

    { name: 'Login', 
      slug: '/login', 
      active: !authStatus },

    { name: 'Signup', 
      slug: '/signup', 
      active: !authStatus },

    { name: 'All Posts', 
      slug: '/all-posts', 
      active: authStatus },

    { name: 'Add Post', 
      slug: '/add-post', 
      active: authStatus },

      {
        name:'My Post',
        slug:'/my-post',
        active:authStatus
      },
   
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-md 
    hover:shadow-xl transition-shadow duration-300 rounded-xl bg-slate-900 bg-opacity-95 backdrop-blur">
      <Container className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo width="70px" />
            <span className="ml-2 text-indigo-400 font-bold text-xl tracking-tight hover:text-indigo-300 transition">
              {Logo}
            </span>
          </Link>

           {/* Menu Toggle (Mobile Only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden text-indigo-400 hover:text-indigo-300 focus:outline-none"
          >
            ☰
          </button>


          {/* Navigation */}
          <ul
  className={`${
    mobileMenuOpen ? 'block' : 'hidden'
  } sm:flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0 text-sm font-medium text-gray-300`}
>
  {navItems.map(
    (item) =>
      item.active && (
        <li key={item.name}>
          <button
            onClick={() => {
              setMobileMenuOpen(false); // Close menu after click
              navigate(item.slug);
            }}
            className="px-4 py-2 rounded hover:text-indigo-400 hover:bg-slate-800 transition duration-200 w-full text-left sm:w-auto sm:text-center"
          >
            {item.name}
          </button>
        </li>
      )
  )}
  {authStatus && (
    <li>
      <LogoutBtn />
    </li>
  )}
</ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;