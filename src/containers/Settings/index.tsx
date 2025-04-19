import { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Button, Space } from "antd";
import { toast } from 'react-toastify';
import { SettingItem } from './types'

import { getFromLocalStorage, setToLocalStorage } from '../../utils/storage'



export function SettingsContainer() {
    const [settings, setSettings] = useState<Array<SettingItem>>([]);
    const settingsKey = "FHIRPathUISettings"

    useEffect(() => {
        const savedSettings = getFromLocalStorage<Array<SettingItem>>(settingsKey);
        if (savedSettings) {
            setSettings(savedSettings);
        } else {
            setSettings([
                { id: 'authorization_header', type: 'string', name: "Authorization header", value: "" },
                { id: 'expressions_history_max_items', type: 'number', name: "Maximum number of expressions in history tab", value: 100 },
                { id: 'requests_history_max_items', type: 'number', name: "Maximum number of requests in history tab", value: 100 }
            ]);
        }
    }, []);

    const handleSave = () => {
        setToLocalStorage(settingsKey, settings);
        toast.success("Saved")
    };

    const handleChange = (index: number, newValue: string | number) => {
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
                if (record.type === 'number') {
                    return (
                        <InputNumber
                            value={record.value}
                            defaultValue={record.value}
                            min={0}
                            max={1000}
                            onChange={(e) => handleChange(index, e ?? 0)}
                        />
                    );
                }
                return (
                    <Input
                        value={record.value}
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
