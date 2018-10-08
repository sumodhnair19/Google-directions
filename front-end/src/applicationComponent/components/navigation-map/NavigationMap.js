import React, { Component } from 'react';

import { googleMaps } from '../../../sharedComponent/googleMap';

import './NavigationMap.css';


/**
 * @name NavigationMap
 * @type {Component}
 * @extends Component React component
 * @description This component display the map and routes
 */

class NavigationMap extends Component {
    mapContainer;  // map container which saves the ref
    map;  //map ref
    googleMaps;  //google maps api ref
    /**
       * @name initMap
       * @description Initialize the map
       */

    initMap = async () => {
        this.googleMaps = await this.props.googleMaps();

        this.map = new this.googleMaps.Map(this.mapContainer, {
            zoom: 11,
            center: { lat: 22.372081, lng: 114.107877 }
        });
    };

    /**
   * @description Prepare Map positions from path points
   * @param path Array of points
   */

    preparePositionsFromPath = path => {
        return path.map(([lat, lng]) => new this.googleMaps.LatLng(lat, lng));
    };

    /**
       * @description Plot the received points on map as route directions
       * @param Object Response object returned from the Api containing the path points
       */

    drawDirections = ({ path }) => {
        const directionsService = new this.googleMaps.DirectionsService();
        const directionsRenderer = new this.googleMaps.DirectionsRenderer();

        directionsRenderer.setMap(this.map);

        const positions = this.preparePositionsFromPath(path);
        const waypoints = positions
            .slice(1, positions.length - 1)
            .map(location => ({ location, stopover: false }));

        // request for the google map directions api
        const request = {
            origin: positions[0],
            destination: positions[positions.length - 1],
            waypoints,
            optimizeWaypoints: true,
            travelMode: this.googleMaps.TravelMode.DRIVING
        };

        // get the route from directionService and then plot with the help of directionsRenderer
        directionsService.route(request, (response, status) => {
            if (status === this.googleMaps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Error in direction service response');
            }
        });
    };

    componentDidMount() {
        this.initMap();
    }
     componentDidUpdate() { }
     getSnapshotBeforeUpdate() {
       const { directions } = this.props;
       if (directions) {
           this.drawDirections(directions);
       }
       return null;
    }


    render() {
        return (
            <div className="map-container">
                <div ref={el => (this.mapContainer = el)} />
            </div>
        );
    }
}

NavigationMap.defaultProps = {
    googleMaps
};

export default NavigationMap;
