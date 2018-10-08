import React from 'react';

import './NavigationRouteInfo.css';
/**
 * @name NavigationRouteItems
 * @type {Component}
 * @description Route info item component
 * @param props are the passed values from parent to stateless component
 * @returns {JSX}
 */

const NavigationRouteItems = (props) => (
    <div className="route-info-item">
        <div className="route-info-item-label">{props.title}: </div>
        <div className="route-info-item-value"> {props.value}</div>
    </div>
);
/**
 * @name NavigationRouteInfo
 * @type {Component}
 * @description Route info component. Display the route params like distance and time
 * @param props are the passed values from stateless to stateless component
 * @returns {JSX}
 */
const NavigationRouteInfo = (props) => (
    <div className="route-info">
        <NavigationRouteItems title="Total distance" value={props.total_distance} />
        <NavigationRouteItems title="Total time" value={props.total_time} />
    </div>
);

export default NavigationRouteInfo;
