import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { reqWrapper } from "./utils/requests";

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
    const showError = (message: string) => toast.error(message)
    const showSuccess = (message: string) => toast.success(message)

    const handleFetch = async (fetchUrl: string) => {
        setIsLoading(true);
        const result = await reqWrapper(axios.get(fetchUrl))
        if (result.status === 'success') {
            setResource(JSON.stringify(result.data, null, 2))
        } else {
            showError(result.error);
        }
        setIsLoading(false);
    };

    const handleExecute = async (executeResource: string, executeExpression: string) => {
        setIsLoading(true);
        setResult(fhirpath.evaluate(JSON.parse(executeResource), executeExpression, null, fhirpath_r4_model));
        setIsLoading(false);
    };

    const handleShare = () => {
        const currentUrl = window.location.href.split('?')[0];
        const shareUrl = `${currentUrl}?url=${encodeURIComponent(url)}&expression=${encodeURIComponent(expression)}`;
        setShareLink(shareUrl);
        navigator.clipboard.writeText(shareUrl).then(() => {
            showSuccess('Link copied to clipboard!');
        }).catch(err => {
            showError('Could not copy text: ' + err);
        });
    };

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
        isShareActive
    };
}
