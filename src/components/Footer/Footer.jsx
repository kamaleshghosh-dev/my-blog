import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-slate-900 border-t border-slate-700 mt-12 text-gray-300 text-sm">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  &copy; {new Date().getFullYear()} KamaleshDev. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wide mb-4 text-xs font-semibold uppercase text-indigo-400">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Features</Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Pricing</Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Affiliate Program</Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Press Kit</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wide mb-4 text-xs font-semibold uppercase text-indigo-400">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Account</Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Help</Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Contact Us</Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Customer Support</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-wide mb-4 text-xs font-semibold uppercase text-indigo-400">
                Legals
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Terms &amp; Conditions</Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link className="text-gray-300 hover:text-indigo-400 transition" to="/">Licensing</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;