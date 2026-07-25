import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage";
import { generateId } from "../../utils/id";
import { StorageKey } from '../../consts';
import {ServiceEntity} from "../../types";

const MAX_HISTORY_ITEMS = 100;

function sortHistoryItem(items?: Array<ServiceEntity>) {
    return items ? items.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()) : []
}

export function getExecutionsHistory() {
    return sortHistoryItem(getFromLocalStorage<Array<ServiceEntity>>(StorageKey.Entities));
}

function updateHistory<T>(key: string, newItem: T) {
    const existingData = getFromLocalStorage<Array<T>>(key) || [];
    const dataToSave = [...existingData, newItem];
    const trimmedData = dataToSave.slice(-MAX_HISTORY_ITEMS);
    setToLocalStorage(key, trimmedData);
}

export function createInitialEntity(): ServiceEntity {
    const now = new Date();
    return {
        id: generateId(),
        dateTime: now.toISOString(),
        status: 'not-asked',
        error: '',
        response: '',
        expression: '',
        requestType: 'get',
        headers: [],
    }
}

export function addEntity(entity: ServiceEntity) {
    return updateHistory<ServiceEntity>(StorageKey.Entities, entity);
}

export function removeEntity(dateTime: string) {
    const existingData = getFromLocalStorage<Array<ServiceEntity>>(StorageKey.Entities) || [];
    setToLocalStorage(StorageKey.Entities, existingData.filter((item) => item.dateTime !== dateTime));
}

export const isGetResourceActive = (
    entity: ServiceEntity): boolean => entity.url !== '';
export const isExecuteActive = (
    entity: ServiceEntity): boolean => entity.response !== '' && entity.expression !== '';
export const isShareActive = (
    entity: ServiceEntity): boolean => entity.url !== '' && entity.expression !== '';
export const isShareResultActive= (
    entity: ServiceEntity): boolean => entity.result !== undefined;