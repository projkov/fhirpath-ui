export interface FHIRPathUIEditorProps {
    setUrl: (v: string) => void;
    shareLink: string;
    url: string;
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFetch: (v: string) => void;
    resourceFormat: string;
    setResource: (v: string) => void;
    resource: string;
    handleExecute: (r: string, expression: string) => void;
    expression: string;
    isExecuteActive: boolean;
    setExpression: (v: string) => void;
    handleShareResult: () => void;
    isShareResultActive: boolean;
    handleShare: () => void;
    isShareActive: boolean;
    result: any[];
    isLoading: boolean;
    isGetResourceActive: boolean;
    copyToClipboard: (toCopy: string, successMessage: string, errorMessage: string) => void;
    testResource: string | undefined;
}
