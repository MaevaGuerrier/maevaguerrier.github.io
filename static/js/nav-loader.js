// static/js/nav-loader.js
fetch('/static/partials/nav.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('navbar-placeholder').innerHTML = html;
  })
  .catch(error => console.error('Failed to load navbar:', error));