import React, { Component } from 'react';
import { googleMaps } from '../../../sharedComponent/googleMap';

import './NavigationForm.css';


class NavigationForm extends Component {

    fromInput;
    fromInputAutoComplete;
    toInputAutoComplete;
    toInput;


    getRoute = () => {
        let from = this.fromInputAutoComplete.getPlace(),
            to = this.toInputAutoComplete.getPlace();
        if(!from || !to)
            return;

          this.props.getDirections(from, to);
    };

    renderData = async () => {
        const googleMaps = await this.props.googleMaps();

        this.fromInputAutoComplete = new googleMaps.places.Autocomplete(this.fromInput);

        this.toInputAutoComplete = new googleMaps.places.Autocomplete(this.toInput);
    };

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
