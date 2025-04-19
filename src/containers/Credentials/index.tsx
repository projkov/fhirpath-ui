import version from '../../version';

export function CredentialsContainer() {
    return (
        <div>
            <h1>FHIRPath UI</h1>
            <h2>Version: {version}</h2>
            <p>
                This project is <b>open-source</b>, so you can{' '}
                <b>use it however you like</b>.
            </p>
            <p>
                The <b>inspiration</b> for this project came from my{' '}
                <b>work tasks</b>, where I spent a lot of time retrieving data
                from FHIR implementation guides using FHIRPath expressions.
            </p>
            <p>
                The project has been <b>developed</b> (or will be developed)
                entirely in my <b>free time</b>.
            </p>
            <p>
                If you have any ideas, suggestions, or would like to contribute,
                please reach out via{' '}
                <a
                    href="https://github.com/projkov/fhirpath-ui"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
                .
            </p>
            <p>
                You can find more information <b>about me</b> on this page:{' '}
                <a
                    href="https://projkov.github.io"
                    target="_blank"
                    rel="noreferrer"
                >
                    projkov.github.io
                </a>
            </p>
            <p>
                Best regards, <br />
                Pavel Rozhkov from beda.software
            </p>
        </div>
    );
}
