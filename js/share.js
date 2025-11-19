(function () {
  const shareToggle = document.getElementById('share-toggle');
  const shareOptions = document.getElementById('share-options');

  if (!shareToggle || !shareOptions) {
    return;
  }

  const renderButton = (isOpen) => {
    shareToggle.setAttribute('aria-expanded', String(isOpen));
    shareToggle.classList.toggle('is-open', isOpen);

    if (isOpen) {
      shareToggle.innerHTML = '<i class="ph ph-x-circle" aria-hidden="true"></i><span>Close</span>';
      shareOptions.removeAttribute('hidden');
    } else {
      shareToggle.innerHTML = '<i class="ph ph-share-network" aria-hidden="true"></i><span>Share this page</span>';
      shareOptions.setAttribute('hidden', '');
    }
  };

  shareToggle.addEventListener('click', () => {
    const isOpen = shareToggle.getAttribute('aria-expanded') === 'true';
    renderButton(!isOpen);
  });
})();
