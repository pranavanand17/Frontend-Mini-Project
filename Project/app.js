const projects = [
  'Local Web Server', 'Welcome to VIT', 'Personal Portfolio', 'Travel Bucket List',
  'Science and Technology', 'Employee Profile', 'Travel Destinations', 'Employee ID Card',
  'Computer Science Department', 'Website Layout', 'Employee Management System',
  'Div Layout', 'Hospital Header', 'CityCare Hospital', 'Smart Search Engine', 'GameZone',
  'Company Profile', 'Library Management System', 'Hospital Footer', 'Employee Registration',
  'Student Login', 'Registration Form', 'Patient Registration', 'Checkout and Payment',
  'Employee Form with JavaScript', 'Login Validation', 'Student Registration',
  'Course Registration', 'Mouse Events', 'Interactive Product Card', 'Traffic Signal',
  'Weather Status', 'Welcome Button', 'Student Search', 'ATM PIN Entry', 'Product Search',
  'Online Exam', 'Campus Image Viewer', 'Travel Photo Gallery', 'College Events 2026',
  'User Authentication'
];

function sourcePath(number) {
  return `sites/${String(number).padStart(2, '0')}.html`;
}

function projectCategory(number) {
  if (number <= 14) return 'Foundations & layouts';
  if (number <= 19) return 'Site experiences';
  if (number <= 28 || number === 41) return 'Forms & checkout';
  if (number <= 39) return 'JavaScript interactions';
  return 'Bootstrap sites';
}

function frame(number, title, height) {
  return `<iframe src="${sourcePath(number)}" title="${number}. ${title}" width="100%" height="${height}" loading="lazy"></iframe>`;
}

function renderAllInOne() {
  const root = document.getElementById('project-list');
  root.innerHTML = projects.map((title, index) => {
    const number = index + 1;
    const preview = number === 24
      ? `<h4>Customer details</h4>${frame(24, 'Customer Details', 450)}<h4>Payment details</h4><iframe src="sites/24-payment.html" title="24. Checkout and Payment — Payment Details" width="100%" height="450" loading="lazy"></iframe><h4>Cart summary</h4><iframe src="sites/24-summary.html" title="24. Checkout and Payment — Cart Summary" width="100%" height="450" loading="lazy"></iframe>`
      : frame(number, title, 450);
    return `<section id="site-${number}"><h2>${number}. ${title}</h2><p><a href="site.html?id=${number}">Open this site separately</a></p>${preview}<hr></section>`;
  }).join('');
}

function renderGallery() {
  const root = document.getElementById('project-list');
  const search = document.getElementById('gallery-search');
  const filters = document.getElementById('gallery-filters');
  const count = document.getElementById('visible-count');
  const empty = document.getElementById('empty-message');

  if (!search || !filters || !count || !empty) {
    root.innerHTML = projects.map((title, index) => {
      const number = index + 1;
      return `<section><h2><a href="site.html?id=${number}">${number}. ${title}</a></h2><a href="site.html?id=${number}">${frame(number, title, 220)}</a><p><a href="site.html?id=${number}">Open original site</a></p><hr></section>`;
    }).join('');
    return;
  }

  root.innerHTML = projects.map((title, index) => {
    const number = index + 1;
    const category = projectCategory(number);
    return `<article class="site-card" data-number="${number}" data-category="${category}" data-search="${number}. ${title} ${category}">
      <div class="thumbnail">
        ${frame(number, title, 220)}
        <span class="site-rank">${String(number).padStart(2, '0')}</span>
        <a class="thumbnail-link" href="site.html?id=${number}" aria-label="Open ${number}. ${title}"><span aria-hidden="true">▶</span></a>
      </div>
      <h2 class="site-title"><a href="site.html?id=${number}">${number}. ${title}</a></h2>
      <p class="site-category">${category}</p>
    </article>`;
  }).join('');

  const categories = ['All sites', 'Foundations & layouts', 'Site experiences', 'Forms & checkout', 'JavaScript interactions', 'Bootstrap sites'];
  filters.innerHTML = categories.map((category, index) => `<button class="genre-chip${index === 0 ? ' active' : ''}" type="button" data-category-filter="${category}">${category}</button>`).join('');
  const cards = [...root.querySelectorAll('.site-card')];
  let activeCategory = 'All sites';

  const update = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const matchesCategory = activeCategory === 'All sites' || card.dataset.category === activeCategory;
      const matchesQuery = !query || card.dataset.search.toLowerCase().includes(query);
      card.hidden = !(matchesCategory && matchesQuery);
      if (!card.hidden) visible += 1;
    });
    count.textContent = String(visible);
    empty.hidden = visible > 0;
  };

  search.addEventListener('input', update);
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category-filter]');
    if (!button) return;
    activeCategory = button.dataset.categoryFilter;
    filters.querySelectorAll('[data-category-filter]').forEach((chip) => chip.classList.toggle('active', chip === button));
    update();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !event.target.matches('input, textarea, select')) {
      event.preventDefault();
      search.focus();
    }
  });
}

function renderSingleSite() {
  const root = document.getElementById('site-view');
  const number = Number(new URLSearchParams(window.location.search).get('id'));
  if (!Number.isInteger(number) || number < 1 || number > projects.length) {
    root.innerHTML = '<h1>Site not found</h1><p>Choose a site from <a href="gallery.html">the gallery</a>.</p>';
    return;
  }

  const title = projects[number - 1];
  document.title = `${number}. ${title}`;
  let previews = frame(number, title, 900);
  if (number === 24) {
    previews = `<h2>Customer details</h2>${frame(24, 'Customer Details', 600)}<h2>Payment details</h2><iframe src="sites/24-payment.html" title="24. Checkout and Payment — Payment Details" width="100%" height="600"></iframe><h2>Cart summary</h2><iframe src="sites/24-summary.html" title="24. Checkout and Payment — Cart Summary" width="100%" height="600"></iframe>`;
  }

  const previous = number > 1 ? `<a href="site.html?id=${number - 1}">← ${number - 1}. ${projects[number - 2]}</a>` : '';
  const next = number < projects.length ? `<a href="site.html?id=${number + 1}">${number + 1}. ${projects[number]} →</a>` : '';
  root.innerHTML = `<h1>${number}. ${title}</h1><p><a href="gallery.html">← Back to all sites</a></p>${previews}<p>${previous} ${next}</p>`;
}

const page = document.body.dataset.page;
if (page === 'combined') renderAllInOne();
if (page === 'gallery') renderGallery();
if (page === 'site') renderSingleSite();
