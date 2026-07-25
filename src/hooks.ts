import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { toast } from 'react-toastify';
import { reqWrapper } from "./utils/requests";
import { getFromLocalStorage, setToLocalStorage } from "./utils/storage"
import {
    addEntity,
    createInitialEntity,
    isExecuteActive,
    isGetResourceActive, isShareActive, isShareResultActive
} from './containers/HistoryContainer/utils'
import { StorageKey } from './consts';
import { detectFormat, convertYAMLToJSON, convertJSONToYAML } from './utils/format';
import {ServiceEntity} from "./types";

const fhirpath = require('fhirpath');
const fhirpath_r4_model = require('fhirpath/fhir-context/r4');

interface Workspace {
    tabs: ServiceEntity[];
    activeTabId: string;
}

function dedupeTabsById(tabs: ServiceEntity[]): ServiceEntity[] {
    const seen = new Set<string>();
    return tabs.filter((tab) => {
        if (!tab.id || seen.has(tab.id)) {
            return false;
        }
        seen.add(tab.id);
        return true;
    });
}

function createInitialWorkspace(): Workspace {
    const saved = getFromLocalStorage<Workspace>(StorageKey.Workspace);
    const dedupedTabs = saved?.tabs?.length ? dedupeTabsById(saved.tabs) : [];
    if (dedupedTabs.length) {
        const activeTabId = dedupedTabs.some((t) => t.id === saved!.activeTabId)
            ? saved!.activeTabId
            : dedupedTabs[0].id;
        return { tabs: dedupedTabs, activeTabId };
    }
    const initial = createInitialEntity();
    return { tabs: [initial], activeTabId: initial.id };
}

export function useFHIRPathUI() {
    const [workspace, setWorkspace] = useState<Workspace>(createInitialWorkspace);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [shareLink, setShareLink] = useState<string>('');
    const [initialRun, setInitialRun] = useState<boolean>(true); // Track initial run

    const { tabs, activeTabId } = workspace;
    const entity = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

    useEffect(() => {
        setToLocalStorage(StorageKey.Workspace, workspace);
    }, [workspace]);

    const setEntity = (updated: ServiceEntity) => {
        setWorkspace((prev) => ({
            ...prev,
            tabs: prev.tabs.map((t) => (t.id === prev.activeTabId ? updated : t)),
        }));
    };

    const addTab = () => {
        const newEntity = createInitialEntity();
        setWorkspace((prev) => ({
            tabs: [...prev.tabs, newEntity],
            activeTabId: newEntity.id,
        }));
    };

    const closeTab = (id: string) => {
        setWorkspace((prev) => {
            if (prev.tabs.length <= 1) {
                return prev;
            }
            const index = prev.tabs.findIndex((t) => t.id === id);
            const newTabs = prev.tabs.filter((t) => t.id !== id);
            if (newTabs.length === 0) {
                return prev;
            }
            let newActiveTabId = prev.activeTabId;
            if (prev.activeTabId === id) {
                const fallbackIndex = Math.min(Math.max(index - 1, 0), newTabs.length - 1);
                newActiveTabId = newTabs[fallbackIndex]?.id ?? newTabs[0].id;
            }
            return { tabs: newTabs, activeTabId: newActiveTabId };
        });
    };

    const switchTab = (id: string) => {
        setWorkspace((prev) => ({ ...prev, activeTabId: id }));
    };

    const resourceFormat: 'json' | 'yaml' = 'json';

    const customHeaders = (entity.headers ?? [])
        .filter((header) => header.enabled && header.key.trim() !== '')
        .reduce<Record<string, string>>((acc, header) => {
            acc[header.key] = header.value;
            return acc;
        }, {});
    const fetchHeaders = Object.keys(customHeaders).length > 0 ? { headers: customHeaders } : {};

    const handleFetch = async (fetchUrl: string) => {
        setIsLoading(true);
        const result = await reqWrapper(axios.get(fetchUrl, fetchHeaders))
        const rawResponseStr = JSON.stringify(result.data, null, 2);
        const resultDataStr = resourceFormat === 'json' ? rawResponseStr : convertJSONToYAML(JSON.stringify(result.data));
        if (result.status === 'success') {
            setEntity({
                ...entity,
                ...{
                    response: resultDataStr,
                    rawResponse: rawResponseStr,
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
        if (detectedFormat === resourceFormat) {
            return entity.response
        }
        return convertYAMLToJSON(entity.response ?? '');
    }, [entity.response])

    return {
        entity,
        setEntity,
        tabs,
        activeTabId,
        addTab,
        closeTab,
        switchTab,
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
