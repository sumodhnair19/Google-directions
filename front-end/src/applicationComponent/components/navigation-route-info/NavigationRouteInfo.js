import React from 'react';

import './NavigationRouteInfo.css';

const NavigationRouteItems = (props) => (
    <div className="route-info-item">
        <div className="route-info-item-label">{props.title}: </div>
        <div className="route-info-item-value"> {props.value}</div>
    </div>
);

const NavigationRouteInfo = (props) => (
    <div className="route-info">
        <NavigationRouteItems title="Total distance" value={props.total_distance} />
        <NavigationRouteItems title="Total time" value={props.total_time} />
    </div>
);

export default NavigationRouteInfo;
