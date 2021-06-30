const axios = require("axios")
const { base_url, app_id, app_key } = require("../../config")

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: `${base_url}`
    })
    instance.defaults.headers.common["app_id"] = app_id;
    instance.defaults.headers.common["app_key"] = app_key;
    return instance
}

module.exports = createAxiosInstance;