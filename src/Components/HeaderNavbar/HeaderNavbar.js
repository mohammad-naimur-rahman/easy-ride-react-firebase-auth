import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBusAlt } from '@fortawesome/free-solid-svg-icons'
import './HeaderNavbar.css';
import { UserContext } from '../../App';

const HeaderNavbar = () => {
    const [signedInUser, setSignedInUser, vehicleType, setVehicleType] = useContext(UserContext);
    return (
        <Navbar bg="primary" variant='dark' expand="md" className="p-3 header-nav">
            <Link to='/' className='font-weight-bold h4 text-white'><FontAwesomeIcon icon={faBusAlt} /> Easy Ride</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to='/' className='text-white my-auto mx-3'>Home</Link>
                    <Link to='/destination' className='text-white my-auto mx-3'>Destination</Link>
                    <Link to='/blog' className='text-white my-auto mx-3'>Blog</Link>
                    <Link to='/contact' className='text-white my-auto mx-3'>Contact</Link>
                    {
                        signedInUser.email ? <p className='text-white font-weight-bold my-auto mx-3 bg-success rounded-pill px-4 py-2'>{signedInUser.name}</p> : <Link to='/login' className='text-white bg-success px-4 py-2 rounded my-auto mx-3'>Login</Link>
                    }


                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderNavbar;