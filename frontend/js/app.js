const statusMessage = document.querySelector('#api-status');
const checkApiButton = document.querySelector('#check-api-button');

async function checkApiStatus() {
  checkApiButton.disabled = true;
  statusMessage.className = 'status-message';
  statusMessage.textContent = 'Checking the API...';

  try {
    const response = await fetch('/api/health');
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'The API check failed.');
    }

    statusMessage.classList.add('is-success');
    statusMessage.textContent = `Connected: ${data.message}`;
  } catch (error) {
    statusMessage.classList.add('is-error');
    statusMessage.textContent =
      'Could not reach the API. Start the server and try again.';
  } finally {
    checkApiButton.disabled = false;
  }
}

checkApiButton.addEventListener('click', checkApiStatus);
