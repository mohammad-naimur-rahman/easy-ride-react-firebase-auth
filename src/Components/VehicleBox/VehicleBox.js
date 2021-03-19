import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './VehicleBox.css';

const VehicleBox = ({ vehicle }) => {
    const { id, iconURL, vehicleName } = vehicle;
    const [signedInUser, setSignedInUser, vehicleType, setVehicleType] = useContext(UserContext);
    return (
        <Link to='/destination'>
            <div onClick={() => setVehicleType(id)} className="bg-primary text-white p-4 box m-3 rounded">
                <div className="d-flex flex-column text-center">
                    <img src={iconURL} alt="" className="icon-image d-block mx-auto py-3" />
                    <h3>{vehicleName}</h3>
                </div>
            </div>
        </Link>
    );
};

export default VehicleBox;