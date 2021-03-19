import React from 'react';
import './MainArea.css';
import data from '../../data/data.json';
import VehicleBox from '../VehicleBox/VehicleBox';

const MainArea = () => {
    return (

        <div className='main-area d-flex flex-column align-items-center justify-content-around'>
            <div className="wrapper d-flex flex-wrap align-items-center justify-content-around">
                {
                    data.map(vehicle => <VehicleBox key={vehicle.id} vehicle={vehicle} />)
                }
            </div>
        </div>
    );
};

export default MainArea;