document.getElementById('adset-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const adsetsInput = document.getElementById('adsets');
    const fileInput = document.getElementById('file');
    const submitButton = document.getElementById('submit-button');
    const adAccountIdInput = document.getElementById('ad_account_id');
    
    const adsets = adsetsInput.value.trim();
    const file = fileInput.files[0];
    const adAccountId = adAccountIdInput.value.trim();

    // Validate that ad account ID is provided
    if (!adAccountId) {
        alert('Please provide an Ad Account ID.');
        return;
    }

    // Validate that either adsets or file is provided, but not both
    if ((adsets && file) || (!adsets && !file)) {
        alert('Please provide either ad set IDs or upload a file, but not both.');
        return;
    }

    submitButton.disabled = true;
    submitButton.innerText = 'Processing...';

    const formData = new FormData();
    formData.append('ad_account_id', adAccountId);
    
    if (adsets) {
        formData.append('adsets', adsets);
    } else if (file) {
        formData.append('file', file);
    }

    try {
        const response = await fetch('https://ad-links-backend.onrender.com/process', {
            method: 'POST',
            body: formData
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
});
