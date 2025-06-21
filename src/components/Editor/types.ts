import {ServiceEntity} from "../../types";

export interface FHIRPathUIEditorProps {
    entity: ServiceEntity;
    setEntity: (v: ServiceEntity) => void;
    shareLink: string;
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFetch: (v: string) => void;
    resourceFormat: string;
    handleExecute: (r: string, expression: string) => void;
    isExecuteActive: boolean;
    handleShareResult: () => void;
    isShareResultActive: boolean;
    handleShare: () => void;
    isShareActive: boolean;
    isLoading: boolean;
    isGetResourceActive: boolean;
    copyToClipboard: (toCopy: string, successMessage: string, errorMessage: string) => void;
    testResource: string | undefined;
}
