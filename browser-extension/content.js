(function () {
  function getTitle() {
    const el = document.querySelector('h1.title, h1.ytd-video-primary-info-renderer, h1');
    return el ? el.textContent.trim() : document.title || '';
  }

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg && msg.type === 'GET_TITLE') {
      sendResponse({ title: getTitle() });
    }
  });
})();
