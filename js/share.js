(function () {
  const shareToggle = document.getElementById('share-toggle');
  const shareOptions = document.getElementById('share-options');
  const facebookButton = document.getElementById('share-facebook');
  const xButton = document.getElementById('share-x');
  const emailButton = document.getElementById('share-email');

  const shareUrl = window.location.href;
  const shareMessage =
    'Savings Calculator - Turn Small Steps Into Big Savings. A simple, free tool to help you estimate how much you could save over time. Adjust the amount, interest rate, and duration to see your savings grow. ' +
    shareUrl;

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

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const facebookShareUrl = new URL('https://www.facebook.com/sharer/sharer.php');
  facebookShareUrl.searchParams.set('u', shareUrl);
  facebookShareUrl.searchParams.set('quote', shareMessage);

  facebookButton?.addEventListener('click', () => {
    openShareWindow(facebookShareUrl.toString());
  });

  const xShareUrl = new URL('https://x.com/intent/post');
  xShareUrl.searchParams.set('text', shareMessage);

  xButton?.addEventListener('click', () => {
    openShareWindow(xShareUrl.toString());
  });

  const emailSubject = 'Savings Calculator, a simple tool to help you estimate how much you could save';
  const mailtoUrl = new URL('mailto:');
  mailtoUrl.searchParams.set('subject', emailSubject);
  mailtoUrl.searchParams.set('body', shareMessage);

  emailButton?.addEventListener('click', () => {
    window.location.href = mailtoUrl.toString();
  });
})();
