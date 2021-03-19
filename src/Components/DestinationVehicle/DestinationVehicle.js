import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './DesninationVehicle.css';

const DestinationVehicle = ({ vehicle }) => {
    const { iconURL, vehicleName, availableSeat, rent } = vehicle;
    return (
        <div className='d-flex align-items-center justify-content-between py-3 selected-card border rounded my-2 p-2'>
            <img className="card-selected-img" src={iconURL} alt="" />
            <p><b>{vehicleName}</b></p>
            <p><FontAwesomeIcon icon={faUserFriends} /> {availableSeat}</p>
            <p>$ {rent}</p>
        </div>
    );
};

export default DestinationVehicle;