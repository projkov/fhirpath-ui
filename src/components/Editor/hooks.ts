import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { toast } from 'react-toastify';
import { reqWrapper } from "../../utils/requests";
import { getFromLocalStorage } from "../..//utils/storage"
import { SettingItem } from '../../containers/Settings/types'
import { addHistoryItem } from '../../containers/HistoryContainer/utils'
import { SettingsKey, StorageKey } from '../../consts';
import { FHIRPathUIEditorProps } from './types';

const yaml = require('js-yaml');
const fhirpath = require('fhirpath');
const fhirpath_r4_model = require('fhirpath/fhir-context/r4');

const convertJSONToYAML = (jsonString: string): string => {
    try {
        const jsonObject = JSON.parse(jsonString);
        return yaml.dump(jsonObject);
    } catch (error) {
        console.error('Error converting JSON to YAML:', error);
        return '';
    }
};

const convertYAMLToJSON = (yamlString: string): string => {
    try {
        const parsed = yaml.load(yamlString);
        return JSON.stringify(parsed, null, 2);
    } catch (error) {
        console.error('Error converting YAML to JSON:', error);
        return '';
    }
};

type Format = 'json' | 'yaml' | 'invalid';

const detectFormat = (input: string): Format => {
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


export function useFHIRPathUI(): FHIRPathUIEditorProps {
    const [url, setUrl] = useState<string>('');
    const [requestStatus, setRequestStatus] = useState<'success' | 'error' | 'not-asked'>('not-asked')
    const [resource, setResource] = useState<string>('');
    const [expression, setExpression] = useState<string>('');
    const [result, setResult] = useState<any[]>([]);
    const [shareLink, setShareLink] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [initialRun, setInitialRun] = useState<boolean>(true); // Track initial run
    const isGetResourceActive = url !== '';
    const isExecuteActive = resource !== '' && expression !== '';
    const isShareActive = url !== '' && expression !== '';
    const isShareResultActive = result.length > 0
    const showError = (message: string) => toast.error(message)
    const showSuccess = (message: string) => toast.success(message)
    const authorizationHeader = getFromLocalStorage<Array<SettingItem>>(StorageKey.Settings)?.find((settingItem) => settingItem.id === SettingsKey.AUTH_HEADER)?.value as string
    const fetchHeaders = authorizationHeader
        ? { headers: { Authorization: authorizationHeader } }
        : {};
    const resourceFormat = getFromLocalStorage<Array<SettingItem>>(StorageKey.Settings)?.find((settingItem) => settingItem.id === SettingsKey.RES_OUTPUT_FORMAT)?.value as string

    const handleFetch = async (fetchUrl: string) => {
        setIsLoading(true);
        const result = await reqWrapper(axios.get(fetchUrl, fetchHeaders))
        const resultDataStr = resourceFormat === 'json' ? JSON.stringify(result.data, null, 2) : convertJSONToYAML(JSON.stringify(result.data));
        if (result.status === 'success') {
            setResource(resultDataStr)
            setRequestStatus('success');
        } else {
            showError(result.error);
            setRequestStatus('error');
        }
        setIsLoading(false);
    };

    const handleExecute = async (executeResource: string, executeExpression: string) => {
        setIsLoading(true);
        try {
            const parsed = JSON.parse(resourceFormat === 'json' ? executeResource : convertYAMLToJSON(executeResource));
            const result = fhirpath.evaluate(parsed, executeExpression, null, fhirpath_r4_model);
            setResult(result);
            addHistoryItem(url, requestStatus, resource, executeExpression);
        } catch (err: any) {
            showError(err?.message || String(err));
            console.error('Execution error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (toCopy: string, successMessage: string, errorMessage: string) => {
        navigator.clipboard.writeText(toCopy).then(() => {
            showSuccess(successMessage);
        }).catch(err => {
            showError(errorMessage + " " + err);
        });
    }

    const handleShare = () => {
        const currentUrl = window.location.href.split('?')[0];
        const shareUrl = `${currentUrl}?url=${encodeURIComponent(url)}&expression=${encodeURIComponent(expression)}`;
        setShareLink(shareUrl);
        copyToClipboard(shareUrl, "Link copied to clipboard!", "Could not copy text")
    };

    const handleShareResult = () => {
        copyToClipboard(result.map((resItem) => JSON.stringify(resItem)).join(', '), "Result copied to clipboard!", "Could not copy result")
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

    const getUrlParams = (name: string): string | null => {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    };

    useEffect(() => {
        const urlFromParams = getUrlParams('url');
        const expressionFromParams = getUrlParams('expression');

        if (urlFromParams && expressionFromParams) {
            const decodedUrl = decodeURIComponent(urlFromParams);
            const decodedExpression = decodeURIComponent(expressionFromParams);

            setUrl(decodedUrl);
            setExpression(decodedExpression);

            handleFetch(decodedUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (initialRun && resource && expression && getUrlParams('url') && getUrlParams('expression')) {
            handleExecute(resource, expression);
            setInitialRun(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resource, expression, initialRun]);

    const testResource = useMemo(() => {
        const detectedFormat = detectFormat(resource);
        const selectedFormat = resourceFormat

        if (detectedFormat === selectedFormat) {
            return resource
        } else {
            if (detectedFormat === 'json') {
                convertJSONToYAML(resource);
            } else {
                convertYAMLToJSON(resource);
            }
        }

    }, [resource, resourceFormat])

    return {
        resource,
        expression,
        url,
        setUrl,
        result,
        shareLink,
        handleFetch,
        handleExecute,
        handleShare,
        handleUrlChange,
        setResource,
        setExpression,
        isLoading,
        isExecuteActive,
        isGetResourceActive,
        isShareActive,
        isShareResultActive,
        handleShareResult,
        copyToClipboard,
        resourceFormat,
        testResource,
    };
}
