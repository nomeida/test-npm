"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpApi = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("./errors");
class HttpApi {
    constructor(baseUrl, endpoint = "/", rateLimiter) {
        this.endpoint = endpoint;
        this.client = axios_1.default.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.rateLimiter = rateLimiter;
    }
    async makeRequest(payload, weight = 2, endpoint = this.endpoint) {
        try {
            await this.rateLimiter.waitForToken(weight);
            if (endpoint == "/exchange") {
                console.log("Payload");
                console.log(payload);
                console.log(payload.action.orders[0].t.trigger);
            }
            let response;
            try {
                response = await this.client.post(endpoint, payload);
            }
            catch (error) {
                console.error('Error in makeRequest:', error);
                throw error; // Re-throw the error to be handled by the outer try-catch
            }
            if (endpoint == "/exchange") {
                console.log(response.status);
                console.log(response.data);
            }
            return response.data;
        }
        catch (error) {
            (0, errors_1.handleApiError)(error);
        }
    }
}
exports.HttpApi = HttpApi;
//# sourceMappingURL=helpers.js.map