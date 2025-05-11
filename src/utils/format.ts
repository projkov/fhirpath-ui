const yaml = require('js-yaml');

export const convertJSONToYAML = (jsonString: string): string => {
    try {
        const jsonObject = JSON.parse(jsonString);
        return yaml.dump(jsonObject);
    } catch (error) {
        console.error('Error converting JSON to YAML:', error);
        return '';
    }
};

export const convertYAMLToJSON = (yamlString: string): string => {
    try {
        const parsed = yaml.load(yamlString);
        return JSON.stringify(parsed, null, 2);
    } catch (error) {
        console.error('Error converting YAML to JSON:', error);
        return '';
    }
};

type Format = 'json' | 'yaml' | 'invalid';

export const detectFormat = (input: string): Format => {
    try {
        JSON.parse(input);
        return 'json';
    } catch {
        try {
            const result = yaml.load(input);
            if (typeof result === 'object') return 'yaml';
        } catch {
            return 'invalid';
        }
    }
    return 'invalid';
};

export function convertToFormat(targetString: string, targetFormat: 'yaml' | 'json') {
    const targetStringFormat = detectFormat(targetString);

    if (targetStringFormat === 'invalid') {
        return "Invalid string"
    }

    if (targetStringFormat === targetFormat) {
        return targetString
    }

    if (targetFormat === 'yaml') {
        return convertJSONToYAML(targetString);
    }

    return convertYAMLToJSON(targetString);
}
