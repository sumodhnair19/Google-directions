import React, { Component } from 'react';
import { googleMaps } from '../../../sharedComponent/googleMap';

import './NavigationForm.css';
/**
 * @name NavigationForm
 * @type {Component}
 * @extends Component React component
 * @description This component contains the auto complete form
 */

class NavigationForm extends Component {

    fromInput;   //starting pt input
    fromInputAutoComplete;  //google autocomplete starting pt will render ref in this
    toInputAutoComplete;   //google autocomplete ending pt will render ref in this
    toInput;  //ending pt input

    /**
     * @name getRoute
     * @description call the parent 'getDirections' method and supply current Starting and drop-off points
     */

    getRoute = () => {
        let from = this.fromInputAutoComplete.getPlace(),
            to = this.toInputAutoComplete.getPlace();
        if(!from || !to)
            return;

          this.props.getDirections(from, to);
    };
    /**
       * @name renderData
       * @description Attaches the google places autocomplete to the inputs
       */
    renderData = async () => {
        const googleMaps = await this.props.googleMaps();

        this.fromInputAutoComplete = new googleMaps.places.Autocomplete(this.fromInput);

        this.toInputAutoComplete = new googleMaps.places.Autocomplete(this.toInput);
    };
    /**
       * @name resetRoute
       * @description resets the inputs to default
       */
    resetRoute = () =>  {
      window.location.reload();
    }


    componentDidMount() {
        this.renderData();
    }

    render() {
        return (
            <div className="form-container">
                <div>
                    <label>Starting Location</label>
                    <input type="text" className="form-input" ref={el => (this.fromInput = el)} />
                </div>
                <div>
                    <label>Drop-off point</label>
                    <input type="text"  className="form-input" ref={el => (this.toInput = el)}/>
                </div>
                <div className="btn-container">
                    <button className="form-input" onClick={this.getRoute.bind(this)}>Submit</button>
                    <button className="form-input" onClick={this.resetRoute.bind(this)}>Reset</button>
                </div>
            </div>
        );
    }
}

NavigationForm.defaultProps = {
    googleMaps
};

export default NavigationForm;
