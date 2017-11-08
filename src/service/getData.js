import { getInfo } from '../config/axios';
import { appGetInfo } from '../config/appAxios';
import { url,wxapiUrl } from '../config/env'

/**
 * lalala
 * @param { }
 */
export const getMovieList= (params) => getInfo('https://github.com/huyongyong1992/python_study/blob/master/movie.json',{},'get');
