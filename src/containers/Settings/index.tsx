import { useState, useEffect } from 'react';
import { Table, Input, Button, Space } from "antd";
import { toast } from 'react-toastify';

import { getFromLocalStorage, setToLocalStorage } from '../../utils/storage'

export interface SettingItem {
    id: string;
    name: string;
    value: string;
}

export function SettingsContainer() {
    const [settings, setSettings] = useState<Array<SettingItem>>([]);
    const settingsKey = "FHIRPathUISettings"

    useEffect(() => {
        const savedSettings = getFromLocalStorage<Array<SettingItem>>(settingsKey);
        if (savedSettings) {
            setSettings(savedSettings);
        } else {
            setSettings([{ id: 'authorization_header', name: "Authorization header", value: "" }]);
        }
    }, []);

    const handleSave = () => {
        setToLocalStorage(settingsKey, settings);
        toast.success("Saved")
    };

    const handleChange = (index: number, newValue: string) => {
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
            render: (_: string, record: SettingItem, index: number) => (
                <Input
                    value={record.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                />
            ),
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
