document.getElementById('adset-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const adAccountIdInput = document.getElementById('ad_account_id');
    const appIdInput = document.getElementById('app_id');
    const appSecretInput = document.getElementById('app_secret');
    const accessTokenInput = document.getElementById('access_token');
    const adsetsInput = document.getElementById('adsets');
    const fileInput = document.getElementById('file');
    const submitButton = document.getElementById('submit-button');
    
    const adAccountId = adAccountIdInput.value.trim();
    const appId = appIdInput.value.trim();
    const appSecret = appSecretInput.value.trim();
    const accessToken = accessTokenInput.value.trim();
    const adsets = adsetsInput.value.trim();
    const file = fileInput.files[0];

    // Validate that required fields are provided
    if (!adAccountId || !appId || !appSecret || !accessToken) {
        alert('Please provide all required fields.');
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
    formData.append('app_id', appId);
    formData.append('app_secret', appSecret);
    formData.append('access_token', accessToken);
    
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
