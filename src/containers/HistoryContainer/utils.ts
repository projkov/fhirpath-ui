import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage"
import { ExecutionItem } from './types';
import { SettingItem } from '../Settings/types';
import { StorageKey, SettingsKey } from '../../consts';

function sortHistoryItem(items?: Array<ExecutionItem>) {
    return items ? items.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : []
}

export function getExecutionsHistory() {
    return sortHistoryItem(getFromLocalStorage<Array<ExecutionItem>>(StorageKey.Executions));
}

function updateHistory<T>(key: string, newItem: T) {
    const appSettings = getFromLocalStorage<Array<SettingItem>>(StorageKey.Settings)
    const settingsKey = SettingsKey.EXECUTIONS_HIST_MAX
    const maxNumberOfHistoryItems = appSettings?.find((settingItem) => settingItem.id === settingsKey)?.value ?? 100;
    const existingData = getFromLocalStorage<Array<T>>(key) || [];
    const dataToSave = [...existingData, newItem];
    const trimmedData = dataToSave.slice(-maxNumberOfHistoryItems);
    setToLocalStorage(key, trimmedData);
}

export function addHistoryItem(url: string, status: string, data: string, expression: string) {
    const now = new Date();
    return updateHistory(StorageKey.Executions, {
        dateTime: now.toISOString(),
        url: url,
        status: status,
        response: data,
        expression: expression,
        requestType: 'get'
    });
}

