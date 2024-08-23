import axios, { AxiosInstance } from 'axios';
import { handleApiError } from './errors';
import { RateLimiter } from './rateLimiter';


export class HttpApi {
    private client: AxiosInstance;
    private endpoint: string;
    private rateLimiter: RateLimiter;

    constructor(baseUrl: string, endpoint: string = "/", rateLimiter: RateLimiter) {
        this.endpoint = endpoint;
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.rateLimiter = rateLimiter;
    }

    async makeRequest(payload: any, weight: number = 2, endpoint: string = this.endpoint,): Promise<any> {
        try {

            await this.rateLimiter.waitForToken(weight);

            if (endpoint == "/exchange") {
                console.log("Payload")
                console.log(payload)
                console.log(payload.action.orders[0].t.trigger)
            }

            let response;
            try {
                response = await this.client.post(endpoint, payload);
            } catch (error) {
                console.error('Error in makeRequest:', error);
                throw error; // Re-throw the error to be handled by the outer try-catch
            }
            if (endpoint == "/exchange") {
                console.log(response.status)
                console.log(response.data)
            }

            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
}
