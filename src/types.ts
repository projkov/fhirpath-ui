export interface ServiceEntity {
    url?: string;
    response?: string;
    expression?: string;
    result?: any[];
    requestType?: 'get' | 'post';
    dateTime: string;
    status?: 'success' | 'error' | 'not-asked';
    error?: string;
}
