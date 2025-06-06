
function includeHTML() {

  const navContainer = document.getElementById('nav-container');
  const footerContainer = document.getElementById('footer-container');

  if (navContainer) {
    fetch('components/nav.html')
      .then(response => response.text())
      .then(data => {
        navContainer.innerHTML = data;
      });
  }

  if (footerContainer) {
    fetch('components/footer.html')
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
      });
  }
}

// Käivitame kui leht on laetud
window.onload = includeHTML;
