import { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Button, Space, Select } from "antd";
import { toast } from 'react-toastify';
import { SettingItem, SettingItemValue, NumberSettingItem } from './types'

import { getFromLocalStorage, setToLocalStorage } from '../../utils/storage'
import { SettingsKey, StorageKey } from '../../consts';


export function SettingsContainer() {
    const [settings, setSettings] = useState<Array<SettingItem>>([]);
    const settingsKey =  StorageKey.Settings;

    useEffect(() => {
        const savedSettings = getFromLocalStorage<Array<SettingItem>>(settingsKey);
        if (savedSettings) {
            setSettings(savedSettings);
        } else {
            setSettings([
                { id: SettingsKey.AUTH_HEADER, type: 'string', name: "Authorization header", value: "" },
                { id: SettingsKey.EXECUTIONS_HIST_MAX, type: 'number', name: "Maximum number of executions", value: 100, minValue: 0, maxValue: 1000 },
                {
                    id: SettingsKey.RES_OUTPUT_FORMAT,
                    type: 'choice',
                    name: 'Resource output format',
                    value: {
                        value: 'json',
                        label: 'JSON'
                    },
                    options: [
                        { value: 'json', label: 'JSON' },
                        { value: 'yaml', label: 'YAML' }
                    ]
                }
            ]);
        }
    }, [settingsKey]);

    const handleSave = () => {
        setToLocalStorage(settingsKey, settings);
        toast.success("Saved")
    };

    const handleChange = (index: number, newValue: SettingItemValue) => {
        const updatedSettings = [...settings];
        updatedSettings[index].value = newValue;
        setSettings(updatedSettings);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Value",
            dataIndex: "value",
            key: "value",
            render: (_: string, record: SettingItem, index: number) => {
                if (record.type === 'choice') {
                    return (
                        <Select defaultValue={record.value} options={record.options} onChange={(e) => handleChange(index, e ?? 0)} />
                    );
                }
                if (record.type === 'number') {
                    const currentSetting = record as NumberSettingItem
                    return (
                        <InputNumber
                            value={currentSetting.value}
                            defaultValue={currentSetting.value}
                            min={currentSetting.minValue ?? 0}
                            max={currentSetting.maxValue ?? 1000}
                            onChange={(e) => handleChange(index, e ?? 0)}
                        />
                    );
                }
                return (
                    <Input
                        value={record.value as string}
                        onChange={(e) => handleChange(index, e.target.value)}
                    />
                )
            },
        },
    ];

    return (
        <div>
            <Table
                dataSource={settings}
                columns={columns}
                pagination={false}
                rowKey="name"
            />
            <Space style={{ marginTop: 16 }}>
                <Button type="primary" onClick={handleSave}>
                    Save
                </Button>
            </Space>
        </div>
    );
}
