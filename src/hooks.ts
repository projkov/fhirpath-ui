import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { toast } from 'react-toastify';
import { reqWrapper } from "./utils/requests";
import { getFromLocalStorage } from "./utils/storage"
import { SettingItem } from './containers/Settings/types'
import {
    addEntity,
    createInitialEntity,
    isExecuteActive,
    isGetResourceActive, isShareActive, isShareResultActive
} from './containers/HistoryContainer/utils'
import { SettingsKey, StorageKey } from './consts';
import { detectFormat, convertYAMLToJSON, convertJSONToYAML } from './utils/format';
import {ServiceEntity} from "./types";

const fhirpath = require('fhirpath');
const fhirpath_r4_model = require('fhirpath/fhir-context/r4');

export function useFHIRPathUI() {
    const [entity, setEntity] = useState<ServiceEntity>(createInitialEntity());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [shareLink, setShareLink] = useState<string>('');
    const [initialRun, setInitialRun] = useState<boolean>(true); // Track initial run

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
            setEntity({
                ...entity,
                ...{
                    response: resultDataStr,
                    status: 'success',
                }
            })
        } else {
            setEntity({
                ...entity,
                ...{
                    error: result.error,
                    status: 'error',
                }
            })
        }
        setIsLoading(false);
    };

    const handleExecute = async (executeResource: string, executeExpression: string) => {
        setIsLoading(true);
        const now = new Date();
        try {
            const parsed = JSON.parse(resourceFormat === 'json' ? executeResource : convertYAMLToJSON(executeResource));
            const result = fhirpath.evaluate(parsed, executeExpression, null, fhirpath_r4_model);
            setEntity({
                ...entity,
                ...{
                    result: result,
                    status: 'success',
                    dateTime: now.toISOString(),
                }
            })
            addEntity(entity);
        } catch (err: any) {
            toast.error(err?.message || String(err));
            console.error('Execution error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (toCopy: string, successMessage: string, errorMessage: string) => {
        navigator.clipboard.writeText(toCopy).then(() => {
            toast.success(successMessage);
        }).catch(err => {
            toast.error(errorMessage + " " + err);
        });
    }

    const handleShare = () => {
        const currentUrl = window.location.href.split('?')[0];
        const shareUrl = `${currentUrl}?url=${encodeURIComponent(entity.url ?? '')}&expression=${encodeURIComponent(entity.expression ?? '')}`;
        setShareLink(shareUrl);
        copyToClipboard(shareUrl, "Link copied to clipboard!", "Could not copy text")
    };

    const handleShareResult = () => {
        const result = entity.result?.map(
            (resItem) => JSON.stringify(resItem)).join(', ') ?? '';

        copyToClipboard(
            result,
            "Result copied to clipboard!",
            "Could not copy result")
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setEntity({...entity, ...{url: e.target.value}});

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

            setEntity({
                ...entity,
                ...{
                    url: decodedUrl,
                    expression: decodedExpression,
                }
            })

            handleFetch(decodedUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (initialRun && entity.response && entity.expression && getUrlParams('url') && getUrlParams('expression')) {
            handleExecute(entity.response, entity.expression);
            setInitialRun(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entity.response, entity.expression, initialRun]);

    const testResource = useMemo(() => {
        const detectedFormat = detectFormat(entity.response ?? '');
        const selectedFormat = resourceFormat

        if (detectedFormat === selectedFormat) {
            return entity.response
        } else {
            if (detectedFormat === 'json') {
                convertJSONToYAML(entity.response ?? '');
            } else {
                convertYAMLToJSON(entity.response ?? '');
            }
        }

    }, [entity.response, resourceFormat])

    return {
        entity,
        setEntity,
        shareLink,
        handleFetch,
        handleExecute,
        handleShare,
        handleUrlChange,
        isLoading,
        isExecuteActive: isExecuteActive(entity),
        isGetResourceActive: isGetResourceActive(entity),
        isShareActive: isShareActive(entity),
        isShareResultActive: isShareResultActive(entity),
        handleShareResult,
        copyToClipboard,
        resourceFormat,
        testResource,
    };
}
