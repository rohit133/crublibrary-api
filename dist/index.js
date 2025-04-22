"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrudLibrary = createCrudLibrary;
const axios_1 = __importDefault(require("axios"));
class CrudLibrary {
    constructor(apiKey, apiUrl) {
        if (!apiKey || !apiUrl) {
            throw new Error('API Key and API URL are required');
        }
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }
    makeRequest(method, endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiUrl}${endpoint}`;
                const headers = {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json'
                };
                let response;
                switch (method.toUpperCase()) {
                    case 'GET':
                        response = yield axios_1.default.get(url, { headers });
                        break;
                    case 'POST':
                        response = yield axios_1.default.post(url, data, { headers });
                        break;
                    case 'PUT':
                        response = yield axios_1.default.put(url, data, { headers });
                        break;
                    case 'DELETE':
                        response = yield axios_1.default.delete(url, { headers });
                        break;
                    default:
                        throw new Error(`Unsupported method: ${method}`);
                }
                // Direct return of response data since the API is already formatting it correctly
                return response.data;
            }
            catch (error) {
                if (error.response && error.response.status === 403) {
                    throw new Error('Request limit exceeded. Please recharge credits.');
                }
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.message || error.response.data.error || 'Request failed';
                    throw new Error(errorMessage);
                }
                throw new Error(`Request failed: ${error.message}`);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data || typeof data.value !== 'number' || typeof data.txHash !== 'string') {
                throw new Error('Invalid input: value must be a number, txHash must be a string');
            }
            try {
                // Direct response handling without wrapping in CrudResponse
                return yield this.makeRequest('POST', '/items', data);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                throw new Error('Failed to create item');
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error('ID is required');
            }
            try {
                // Direct response handling without wrapping in CrudResponse
                return yield this.makeRequest('GET', `/items/${id}`);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                throw new Error('Failed to retrieve item');
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error('ID is required');
            }
            if (Object.keys(data).length === 0) {
                throw new Error('Update data is required');
            }
            try {
                // Direct response handling without wrapping in CrudResponse
                return yield this.makeRequest('PUT', `/items/${id}`, data);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                throw new Error('Failed to update item');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error('ID is required');
            }
            try {
                // Direct response handling without wrapping in CrudResponse
                return yield this.makeRequest('DELETE', `/items/${id}`);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                throw new Error('Failed to delete item');
            }
        });
    }
}
// Create and export a function to create new instances
function createCrudLibrary(apiKey, apiUrl) {
    return new CrudLibrary(apiKey, apiUrl);
}
