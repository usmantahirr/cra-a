import GET_JSON_SCHEMA from './actionTypes';
import service from '../services/dashboard.service';

const getJsonSchema = () => {
  return async dispatch => {
    try {
      const response = await service.getJsonSchema();
      dispatch({
        type: GET_JSON_SCHEMA,
        payload: response.data,
      });
    } catch (error) {
      // error catched
    }
  };
};
export default getJsonSchema;
