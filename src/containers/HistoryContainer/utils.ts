import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage"
import { SettingItem } from '../Settings/types';
import { StorageKey, SettingsKey } from '../../consts';
import {ServiceEntity} from "../../types";

function sortHistoryItem(items?: Array<ServiceEntity>) {
    return items ? items.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : []
}

export function getExecutionsHistory() {
    return sortHistoryItem(getFromLocalStorage<Array<ServiceEntity>>(StorageKey.Entities));
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

export function createInitialEntity(): ServiceEntity {
    const now = new Date();
    return {
        dateTime: now.toISOString(),
        status: 'not-asked',
        error: '',
        response: '',
        expression: '',
        requestType: 'get'
    }
}

export function addEntity(entity: ServiceEntity) {
    return updateHistory<ServiceEntity>(StorageKey.Entities, entity);
}

export const isGetResourceActive = (
    entity: ServiceEntity): boolean => entity.url !== '';
export const isExecuteActive = (
    entity: ServiceEntity): boolean => entity.response !== '' && entity.expression !== '';
export const isShareActive = (
    entity: ServiceEntity): boolean => entity.url !== '' && entity.expression !== '';
export const isShareResultActive= (
    entity: ServiceEntity): boolean => entity.result !== undefined;