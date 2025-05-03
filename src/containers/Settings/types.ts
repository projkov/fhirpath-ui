type ChoiceValue = {
    label: string;
    value: string | number;
}

export type SettingItemValue = string | number | ChoiceValue;

type BaseSettingItem = {
    id: string;
    name: string;
    type: 'string' | 'number' | 'choice';
}

export type StringSettingItem = BaseSettingItem & {
    type: 'string';
    value: string;
}

export type ChoiceSettingItem = BaseSettingItem & {
    type: 'choice';
    value: ChoiceValue;
    options?: ChoiceValue[]
}

export type NumberSettingItem = BaseSettingItem & {
    type: 'number';
    value: number;
    minValue?: number;
    maxValue?: number;
}

export type SettingItem = StringSettingItem | ChoiceSettingItem | NumberSettingItem;
