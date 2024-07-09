document.getElementById('adset-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const adsetsInput = document.getElementById('adsets');
    const fileInput = document.getElementById('file');
    const submitButton = document.getElementById('submit-button');
    const adsets = adsetsInput.value.trim();
    const file = fileInput.files[0];

    // Validate that either adsets or file is provided, but not both
    if ((adsets && file) || (!adsets && !file)) {
        alert('Please provide either ad set IDs or upload a file, but not both.');
        return;
    }

    submitButton.disabled = true;
    submitButton.innerText = 'Processing...';

    let adsetData = adsets;

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            adsetData = reader.result;
            processAdsets(adsetData);
        };
        reader.readAsText(file);
    } else {
        processAdsets(adsetData);
    }

    async function processAdsets(adsetData) {
        try {
            const response = await fetch('https://ad-links-backend.onrender.com/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ adsets: adsetData })
            });

            if (response.ok) {
                window.location.href = 'success.html';
            } else {
                const errorData = await response.json();
                alert('Failed to process ad sets: ' + errorData.message);
                submitButton.disabled = false;
                submitButton.innerText = 'Submit';
            }
        } catch (error) {
            alert('Failed to connect to the server. Please ensure the backend is running.');
            submitButton.disabled = false;
            submitButton.innerText = 'Submit';
        }
    }
});
