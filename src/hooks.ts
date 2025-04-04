import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { reqWrapper } from "./utils/requests";
import { getFromLocalStorage } from "./utils/storage"
import { SettingItem } from './containers/Settings/'

const fhirpath = require('fhirpath');
const fhirpath_r4_model = require('fhirpath/fhir-context/r4');

export function useFHIRPathUI() {
    const [url, setUrl] = useState<string>('');
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
    const authorizationHeader = getFromLocalStorage<Array<SettingItem>>("settings")?.find((settingItem) => settingItem.id === 'authorization_header')?.id
    const fetchHeaders = authorizationHeader
        ? { headers: { Authorization: authorizationHeader } }
        : {};

    const handleFetch = async (fetchUrl: string) => {
        setIsLoading(true);
        const result = await reqWrapper(axios.get(fetchUrl, fetchHeaders))
        if (result.status === 'success') {
            setResource(JSON.stringify(result.data, null, 2))
        } else {
            showError(result.error);
        }
        setIsLoading(false);
    };

    const handleExecute = async (executeResource: string, executeExpression: string) => {
        setIsLoading(true);
        try {
            const parsed = JSON.parse(executeResource);
            const result = fhirpath.evaluate(parsed, executeExpression, null, fhirpath_r4_model);
            setResult(result);
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

    return {
        resource,
        expression,
        url,
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
    };
}
