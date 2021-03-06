import React, { Component } from 'react';

import { NavigationForm, NavigationMap, NavigationRouteInfo } from './components';
import { getDirectionService } from './services';
import {ERROR_MESSAGE} from '../sharedComponent/config';
import { Loader } from '../sharedComponent/loader';

import './Navigator.css';

/**
 * @type {Component}
 * @name Directions
 * @description Directions is the main component
 */


class Directions extends Component {

    constructor() {
        super();

        // initial state
        this.state = {
            mapData: null,
            showLoader : false
        };
    }

    /**
         * @description Fetch the directions
         * This method call the Directions service to fetch the data
         * @param from Starting Location
         * @param to Drop-off point
         */

    getDirections = async (from, to) => {
          this.showHideLoader(true);
        //  if error then show error messgae
        const response = await getDirectionService(from, to).catch(e => {
            let msg = e.response && e.response.status &&  ERROR_MESSAGE[e.response.status] ?  ERROR_MESSAGE[e.response.status] : ERROR_MESSAGE[500] ;
            this.showErrorMessage(msg);
        });

          this.showHideLoader(false);
        // check for response error
        if (response && response.error) {
            this.showErrorMessage(response.error);
            return;
        }

        // check for directions data, if available then set the data to state
        if (response && response.path) {
            this.setState(() => ({
                mapData: response
            }));
        }
    };
    /**
       * @description Hide and show loader
       * @param isVisible Boolean indicating that loader is shown or not
       */

    showHideLoader = ( isVisible) => {
        this.setState({
            showLoader : isVisible
        });
    };

    /**
       * @name showErrorMessage
       * @description This method display the error message
       * @param message Message to be displayed
       */
       
    showErrorMessage = message => {
        this.setState({
            mapData: null
        });
       alert(message);
    };

    render() {
        return (
            <div className="directions-container">
              <Loader showLoader = { this.state.showLoader}/>
                <div className="directionform-container">
                    <NavigationForm getDirections={this.getDirections} />
                    <div className="directions-route-info">
                        {this.state.mapData && (
                            <NavigationRouteInfo { ...this.state.mapData} />
                        )}
                    </div>
                </div>
              <NavigationMap directions={this.state.mapData} />

            </div>
        );
    }
}

export default Directions;
