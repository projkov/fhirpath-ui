import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage"
import { RequestsHistoryItem } from './types';

export function addHistoryItem(url: string, status: string, data: string) {
    const existingRequestsHistory = getFromLocalStorage<Array<RequestsHistoryItem>>("FHIRPathUIRequests")
    const now = new Date();
    const requestsHistoryItem = {
        dateTime: now.toISOString(),
        url: url,
        status: status,
        response: data
    }

    const isHistoryElementsExists = existingRequestsHistory && existingRequestsHistory.length > 0
    const dataToSave = isHistoryElementsExists ? [...existingRequestsHistory, requestsHistoryItem] : [requestsHistoryItem]

    setToLocalStorage("FHIRPathUIRequests", dataToSave)
}

export function addExpressionHistoryItem(expression: string) {
    const existingExpressionsHistory = getFromLocalStorage<Array<RequestsHistoryItem>>("FHIRPathUIExpressions")
    const now = new Date();
    const expressionsHistoryItem = {
        dateTime: now.toISOString(),
        expression: expression
    }

    const isExpressionsHistoryElementsExists = existingExpressionsHistory && existingExpressionsHistory.length > 0
    const dataToSave = isExpressionsHistoryElementsExists ? [...existingExpressionsHistory, expressionsHistoryItem] : [expressionsHistoryItem]

    setToLocalStorage("FHIRPathUIExpressions", dataToSave)
}
