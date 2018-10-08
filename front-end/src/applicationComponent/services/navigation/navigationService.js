import { API, axiosInstance } from '../../../sharedComponent/config';

/**
 * @name getRoute
 * @description This method gets the route from the server based on token
 * @param token
 * @returns Route Info
 */

const getRoute = async token => {
    let response = await axiosInstance.get( `${API.route}/${token}`);
    return response.data;
};


/**
 * @name getToken
 * @description This method gets the token from the server based on the starting and drop-off point
 * @param from Starting Point
 * @param to Drop-off Point
 */

const getToken = async (from, to) => {
    let response = await axiosInstance.post(API.route, {from, to});
    return response.data.token;
};
/**
 * @name getDirectionService
 * @description Fetch the directions based on the starting and drop-off point
 * This method first gets the token and after based on token gets the routing info
 * @param from Starting Point
 * @param to Drop-off Point
 */
const getDirectionService = async (from, to) => {
    let token = await getToken(from, to);
    let result = await getRoute(token);

    // if status is 'in progress' then retry the request again
    if (
        result &&
        result.status &&
        result.status.toLowerCase() === 'in progress'
    ) {
        result = await getDirectionService(from, to);
    }

    return result;
};

export { getDirectionService , getRoute, getToken };
