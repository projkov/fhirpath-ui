import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage"
import { RequestsHistoryItem, ExpressionsHistoryItem } from './types';
import { SettingItem } from '../Settings/types';
import { StorageKey, SettingsKey } from '../../consts';

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
    const appSettings = getFromLocalStorage<Array<SettingItem>>(StorageKey.Settings)
    const settingsKey = key === StorageKey.Requests ? SettingsKey.REQ_HIST_MAX : SettingsKey.EXPR_HIST_MAX
    const maxNumberOfHistoryItems = appSettings?.find((settingItem) => settingItem.id === settingsKey)?.value ?? 100;
    const existingData = getFromLocalStorage<Array<T>>(key) || [];
    const dataToSave = [...existingData, newItem];
    const trimmedData = dataToSave.slice(-maxNumberOfHistoryItems);
    setToLocalStorage(key, trimmedData);
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
