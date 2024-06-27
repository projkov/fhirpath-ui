import axios from "axios";
import { useEffect, useState } from "react";
import { EvaluateResponse } from "./interfaces";

export function useFHIRPathUI() {
    const [url, setUrl] = useState<string>('');
    const [resource, setResource] = useState<string>('');
    const [expression, setExpression] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [shareLink, setShareLink] = useState<string>('');

    const handleFetch = async () => {
        try {
            const response = await axios.get(url);
            setResource(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleExecute = async () => {
        try {
            const parsedResource = JSON.parse(resource);
            const response = await axios.post<EvaluateResponse>('http://localhost:5000/evaluate', {
                resource: parsedResource,
                expression: expression,
            });
            setResult(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error('Error executing expression:', error);
        }
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
    const handleResourceChange = (value: string) => setResource(value);
    const handleExpressionChange = (value: string) => setExpression(value);

    const getUrlParams = (name: string): string | null => {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    };

    useEffect(() => {
        setUrl(decodeURIComponent(getUrlParams('url') ?? ''))
        setExpression(decodeURIComponent(getUrlParams('expression') ?? ''));
    }, []);

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
        handleResourceChange,
        handleExpressionChange,
    }
}