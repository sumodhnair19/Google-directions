import { API, axiosInstance } from '../../../sharedComponent/config';


const getRoute = async token => {
    let response = await axiosInstance.get( `${API.route}/${token}`);
    return response.data;
};

const getToken = async (from, to) => {
    let response = await axiosInstance.post(API.route, {from, to});
    return response.data.token;
};

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
