const CLOUDFRONT_DOMAIN="https://d2ngt11nqy98uh.cloudfront.net"

const downloadResume = async (): Promise<void> => {
    const response = await fetch(`${CLOUDFRONT_DOMAIN}/Dushyant-Resume.pdf`);

    if (!response.ok) {
        throw new Error(`Failed to fetch resume: ${response.status}`);
    }

    const blob = await response.blob();

    if (!blob.type.includes('application/pdf')) {
        throw new Error('Downloaded file is not a PDF');
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Dushyant-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};

export const initResumeDownload = async () => {
    const downloadButton = document.querySelector('.resume-icon');
    if (!downloadButton) return;

    downloadButton.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await downloadResume();
        } catch (error) {
            console.error('Error downloading resume:', error);
            alert('Could not download resume. Please check the console for details.');
        }
    });
};

export default { downloadResume, initResumeDownload };