export interface HeaderItem {
    id: string;
    key: string;
    value: string;
    enabled: boolean;
}

export interface ServiceEntity {
    id: string;
    url?: string;
    response?: string;
    rawResponse?: string;
    expression?: string;
    result?: any[];
    requestType?: 'get' | 'post';
    dateTime: string;
    status?: 'success' | 'error' | 'not-asked';
    statusCode?: number;
    error?: string;
    headers?: HeaderItem[];
}
