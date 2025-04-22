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
declare class CrudLibrary {
    private apiKey;
    private apiUrl;
    constructor(apiKey: string, apiUrl: string);
    private makeRequest;
    create(data: CreateData): Promise<CreateResponse>;
    get(id: string): Promise<GetResponse>;
    update(id: string, data: UpdateData): Promise<UpdateResponse>;
    delete(id: string): Promise<DeleteResponse>;
}
export declare function createCrudLibrary(apiKey: string, apiUrl: string): CrudLibrary;
export {};
