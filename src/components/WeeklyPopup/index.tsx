import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";

export const WeeklyPopup: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        const now = new Date();
        const lastPopupDate = localStorage.getItem("lastPopupDate");

        if (lastPopupDate) {
            const lastDate = new Date(lastPopupDate);
            const oneWeekLater = new Date(lastDate);
            oneWeekLater.setDate(lastDate.getDay() + 7);

            if (now >= oneWeekLater) {
                setIsPopupVisible(true);
            }
        } else {
            setIsPopupVisible(true);
        }
    }, []);

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        localStorage.setItem("lastPopupDate", new Date().toISOString());
    };

    const ModalContent = () => {
        return (<div style={{ maxWidth: '500px' }}>
            <h1>Hello</h1>
            <p>
                This project is <b>open-source</b>, so you can <b>use it however you like</b>.
            </p>
            <p>
                The <b>inspiration</b> for this project came from my <b>work tasks</b>, where I spent a lot of time retrieving data from FHIR implementation guides using FHIRPath expressions.
            </p>
            <p>
                The project has been <b>developed</b> (or will be developed) entirely in my <b>free time</b>.
            </p>
            <p>
                If you have any ideas, suggestions, or would like to contribute, please reach out via <a href="https://github.com/projkov/fhirpath-ui" target="_blank" rel="noreferrer">GitHub</a>.
            </p>
            <p>
                You can find more information <b>about me</b> on this page: <a href="https://projkov.github.io" target="_blank" rel="noreferrer">projkov.github.io</a>
            </p>
            <p>
                Best regards, <br />
                Pavel Rozhkov
            </p>
        </div>)
    }

    return <Modal show={isPopupVisible} onClose={handleClosePopup} children={<ModalContent />} />
};