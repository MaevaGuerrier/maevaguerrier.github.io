document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.nav-burger');
  var links = document.querySelector('.nav-links');

  if (burger && links) {
    burger.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Close mobile menu after clicking a link, and smooth-scroll to section
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
