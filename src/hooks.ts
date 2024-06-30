import axios from "axios";
import { useEffect, useState } from "react";
import { EvaluateResponse } from "./interfaces";

export function useFHIRPathUI() {
    const fhirPathServiceURL = process.env.REACT_APP_FHIRPATH_URL || 'http://localhost:5000';
    const evaluateURL = fhirPathServiceURL + '/evaluate';
    const [url, setUrl] = useState<string>('');
    const [resource, setResource] = useState<string>('');
    const [expression, setExpression] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [shareLink, setShareLink] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [initialRun, setInitialRun] = useState<boolean>(true); // Track initial run
    const isGetResourceActive = url !== '';
    const isExecuteActive = resource !== '' && expression !== '';
    const isShareActive = url !== '' && expression !== '';

    const handleFetch = async (fetchUrl: string) => {
        setIsLoading(true);
        try {
            const response = await axios.get(fetchUrl);
            setResource(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };

    const handleExecute = async (executeResource: string, executeExpression: string) => {
        setIsLoading(true);
        try {
            const parsedResource = JSON.parse(executeResource);
            const response = await axios.post<EvaluateResponse>(evaluateURL, {
                resource: parsedResource,
                expression: executeExpression,
            });
            setResult(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error('Error executing expression:', error);
        }
        setIsLoading(false);
    };

    const handleShare = () => {
        const currentUrl = window.location.origin;
        const shareUrl = `${currentUrl}?url=${encodeURIComponent(url)}&expression=${encodeURIComponent(expression)}`;
        setShareLink(shareUrl);
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
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
    }, []);

    useEffect(() => {
        if (initialRun && resource && expression) {
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
