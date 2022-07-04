import axios from "axios";
import { url } from "../api/baseUrl";

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    /*executeBasicAuthenticationService(username, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);
        return axios.get(url + `/basicauth`, {headers: {authorization: basicAuthHeader}});
    }*/

    executeJWTAuthenticationService(username, password) {
        return axios.post(url + `/authenticate`, {
            username,
            password
        });
    }

    /*registerSuccessfulLogin(username, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(basicAuthHeader);
    }*/

    registerSuccessfulLoginForJWT(username, token) {
        let JWTToken = 'Bearer ' + token;
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(JWTToken);
    }

    removeLoginInfo() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user === null) return false;
        return true;
    }
    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user === null) return '';
        return user;
    }
    setupAxiosInterceptors(AuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = AuthHeader;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService(); // export an instance not a class