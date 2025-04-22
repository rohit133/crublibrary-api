import axios from 'axios';

interface CrudResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface CreateData {
  value: number;
  txHash: string;
}

interface UpdateData {
  value?: number;
  txHash?: string;
}

interface CreateResponse {
  id: string;
  status: string;
}

interface GetResponse {
  value: number;
  txHash: string;
}

interface UpdateResponse {
  status: string;
}

interface DeleteResponse {
  status: string;
}

class CrudLibrary {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl: string) {
    if (!apiKey || !apiUrl) {
      throw new Error('API Key and API URL are required');
    }
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  private async makeRequest<T>(method: string, endpoint: string, data?: any): Promise<T> {
    try {
      const url = `${this.apiUrl}${endpoint}`;
      const headers = { 
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json'
      };

      let response;
      switch (method.toUpperCase()) {
        case 'GET':
          response = await axios.get(url, { headers });
          break;
        case 'POST':
          response = await axios.post(url, data, { headers });
          break;
        case 'PUT':
          response = await axios.put(url, data, { headers });
          break;
        case 'DELETE':
          response = await axios.delete(url, { headers });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      // Direct return of response data since the API is already formatting it correctly
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        throw new Error('Request limit exceeded. Please recharge credits.');
      }

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Request failed';
        throw new Error(errorMessage);
      }

      throw new Error(`Request failed: ${error.message}`);
    }
  }

  async create(data: CreateData): Promise<CreateResponse> {
    if (!data || typeof data.value !== 'number' || typeof data.txHash !== 'string') {
      throw new Error('Invalid input: value must be a number, txHash must be a string');
    }

    try {
      // Direct response handling without wrapping in CrudResponse
      return await this.makeRequest<CreateResponse>('POST', '/items', data);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to create item');
    }
  }

  async get(id: string): Promise<GetResponse> {
    if (!id) {
      throw new Error('ID is required');
    }

    try {
      // Direct response handling without wrapping in CrudResponse
      return await this.makeRequest<GetResponse>('GET', `/items/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to retrieve item');
    }
  }

  async update(id: string, data: UpdateData): Promise<UpdateResponse> {
    if (!id) {
      throw new Error('ID is required');
    }

    if (Object.keys(data).length === 0) {
      throw new Error('Update data is required');
    }

    try {
      // Direct response handling without wrapping in CrudResponse
      return await this.makeRequest<UpdateResponse>('PUT', `/items/${id}`, data);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to update item');
    }
  }

  async delete(id: string): Promise<DeleteResponse> {
    if (!id) {
      throw new Error('ID is required');
    }

    try {
      // Direct response handling without wrapping in CrudResponse
      return await this.makeRequest<DeleteResponse>('DELETE', `/items/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to delete item');
    }
  }
}

// Create and export a function to create new instances
export function createCrudLibrary(apiKey: string, apiUrl: string) {
  return new CrudLibrary(apiKey, apiUrl);
}
