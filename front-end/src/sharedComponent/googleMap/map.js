import GoogleMapsLoader from 'google-maps';

import { googleAPIKey } from '../config';


//initialize the map configuration
const initializeMap = () => {
    GoogleMapsLoader.KEY = googleAPIKey;
    GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
}

let google;
const loadMap = () =>
    new Promise((resolve, reject) => {
        if (google) {
            resolve(google);
        } else {
            GoogleMapsLoader.load(api => {
                google = api;
                resolve(api);
            });
        }
    });

const googleMaps = async () => {
    const google = await loadMap();
    return google.maps;
};

initializeMap();  //initialize map with API key

export { googleMaps };
