import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage"
import { RequestsHistoryItem, ExpressionsHistoryItem } from './types';

const enum StorageKey {
    Requests = "FHIRPathUIRequests",
    Expressions = "FHIRPathUIExpressions"
}

function sortHistoryItem(items?: Array<RequestsHistoryItem | ExpressionsHistoryItem>) {
    return items ? items.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : []
}

export function getRequestsHistory() {
    return sortHistoryItem(getFromLocalStorage<Array<RequestsHistoryItem>>(StorageKey.Requests));
}

export function getExpressionsHistory() {
    return sortHistoryItem(getFromLocalStorage<Array<ExpressionsHistoryItem>>(StorageKey.Expressions));
}

function updateHistory<T>(key: string, newItem: T) {
    const existingData = getFromLocalStorage<Array<T>>(key) || [];
    const dataToSave = [...existingData, newItem];
    setToLocalStorage(key, dataToSave);
}

export function setRequestsHistory(newItem: RequestsHistoryItem) {
    updateHistory(StorageKey.Requests, newItem);
}

export function setExpressionsHistory(newItem: ExpressionsHistoryItem) {
    updateHistory(StorageKey.Expressions, newItem);
}

export function addHistoryItem(url: string, status: string, data: string) {
    const now = new Date();
    return setRequestsHistory({
        dateTime: now.toISOString(),
        url: url,
        status: status,
        response: data
    });
}

export function addExpressionHistoryItem(expression: string) {
    const now = new Date();
    return setExpressionsHistory({
        dateTime: now.toISOString(),
        expression: expression
    });
}
