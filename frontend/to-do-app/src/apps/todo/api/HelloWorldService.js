const axios = require('axios');

class WelcomeService {

    executeWelcomeService(name) {
        const msg = axios.get(`http://localhost:8080/basicAuth`);
        return msg + name;
    }
}

export default new WelcomeService();