import axios from 'axios';

class HTTP {
    constructor() {
        this.authString = "";
    }
    handleError(reject) {
        return function (err) {
            if (err.response) {
                reject(err.response.data);
            }
        };
    }

    handleSuccess(resolve) {
        return function (result) {
            // debugger;
            resolve(result.data);
        };
    }

    setAuthorization(authString) {
        this.authString = authString;
    }
    sendGetRestRequest(url, method) {
        let response = new Promise((resolve, reject) => {
           
            if (method === undefined || method === null) {
                method = "GET"
            }
            axios({
                url: url,
                method: method,
                responseType: "json",
                headers: {
                    'Authorization': this.authString
                }
            }).then(
                this.handleSuccess(resolve),
                this.handleError(reject)
            );
        });

        return response;
    }
    sendPostRestRequest(url, method, data) {
        let response = new Promise((resolve, reject) => {
            if (method === undefined || method === null) {
                method = "GET"
            }
            axios({
                url: url,
                data: data,
                method: method,
                responseType: "json",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                this.handleSuccess(resolve),
                this.handleError(reject)
            );
        });

        return response;
    }
}
let API = new HTTP();
export default API;