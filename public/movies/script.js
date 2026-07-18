document.addEventListener('DOMContentLoaded', () => {
  // ===== Common utilities =====
  const getMovieById = (id) => window.moviesData.find(m => m.id == id);

  // ===== Page Router =====
  const path = window.location.pathname.split('/').pop();

  if (path === 'index.html' || path === '') {
    initHomePage();
  } else if (path === 'movie.html') {
    initMovieDetailPage();
  } else if (path === 'player.html') {
    initPlayerPage();
  }

  // ===== Back to Top =====
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Mobile Menu =====
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
    // close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // ===== Navbar scroll effect =====
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
      }
    }
  });

  // ===== HOME PAGE =====
  function initHomePage() {
    renderHeroSlider();
    renderMovieRows();
    setupSearch();
    setupHorizontalScroll();
    loadContinueWatching();
  }

  // Hero Slider with movies having "trending" category
  function renderHeroSlider() {
    const slidesContainer = document.getElementById('heroSlides');
    const dotsContainer = document.getElementById('heroDots');
    const trendingMovies = window.moviesData.filter(m => m.categories.includes('trending'));
    if (trendingMovies.length === 0) return;

    slidesContainer.innerHTML = trendingMovies.map((movie, index) => `
      <div class="hero-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${movie.backdrop}')">
        <div class="hero-info">
          <h1>${movie.title}</h1>
          <p>${movie.description.substring(0, 120)}...</p>
          <div class="hero-buttons">
            <a href="player.html?id=${movie.id}" class="btn btn-play"><i class="fas fa-play"></i> Play</a>
            <a href="movie.html?id=${movie.id}" class="btn btn-info"><i class="fas fa-info-circle"></i> More Info</a>
          </div>
        </div>
      </div>
    `).join('');

    dotsContainer.innerHTML = trendingMovies.map((_, i) => `
      <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
    `).join('');

    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    document.getElementById('heroPrev').addEventListener('click', () => {
      const newIndex = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(newIndex);
      resetAutoSlide();
    });
    document.getElementById('heroNext').addEventListener('click', () => {
      const newIndex = (currentSlide + 1) % slides.length;
      goToSlide(newIndex);
      resetAutoSlide();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index));
        resetAutoSlide();
      });
    });

    let autoSlideInterval = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 5000);

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length);
      }, 5000);
    }
  }

  // Render all movie rows using categories
  function renderMovieRows() {
    const rows = {
      trending: { container: 'trendingContainer', category: 'trending' },
      popular: { container: 'popularContainer', category: 'popular' },
      topRated: { container: 'topRatedContainer', category: 'topRated' },
      newReleases: { container: 'newReleasesContainer', category: 'newReleases' },
      recommended: { container: 'recommendedContainer', category: 'recommended' }
    };

    Object.values(rows).forEach(({ container, category }) => {
      const movies = window.moviesData.filter(m => m.categories.includes(category));
      renderRow(container, movies);
    });
  }

  function renderRow(containerId, movies) {
    const container = document.getElementById(containerId);
    if (!container) return;
    // Skeleton loading: show skeletons first, then replace with real cards after a short delay (simulate loading)
    container.innerHTML = '';
    const skeletonCount = 6;
    const skeletonTemplate = document.getElementById('skeletonCard');
    for (let i = 0; i < skeletonCount; i++) {
      const clone = skeletonTemplate.content.cloneNode(true);
      container.appendChild(clone);
    }

    setTimeout(() => {
      container.innerHTML = '';
      movies.forEach(movie => {
        const card = createMovieCard(movie);
        container.appendChild(card);
      });
      // Lazy load images
      lazyLoadImages();
    }, 800); // simulate network delay
  }

  function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img data-src="${movie.poster}" alt="${movie.title}" class="poster lazy-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
      <div class="card-info">
        <div class="card-title">${movie.title}</div>
        <div class="card-meta">
          <span class="rating"><i class="fas fa-star"></i> ${movie.rating}</span>
          <span>${movie.year}</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="favorite-btn" data-id="${movie.id}" aria-label="Add to favorites"><i class="far fa-heart"></i></button>
        <button class="watchlater-btn" data-id="${movie.id}" aria-label="Watch Later"><i class="far fa-clock"></i></button>
      </div>
    `;
    card.addEventListener('click', (e) => {
      // Navigate to detail page if not clicking buttons
      if (!e.target.closest('button')) {
        window.location.href = `movie.html?id=${movie.id}`;
      }
    });
    // Favorite and Watch Later buttons
    const favBtn = card.querySelector('.favorite-btn');
    const wlBtn = card.querySelector('.watchlater-btn');
    setupListButtons(favBtn, wlBtn, movie.id);
    return card;
  }

  // Setup horizontal scroll for each row
  function setupHorizontalScroll() {
    document.querySelectorAll('.movie-row').forEach(row => {
      const container = row.querySelector('.row-container');
      const leftBtn = row.querySelector('.scroll-btn.left');
      const rightBtn = row.querySelector('.scroll-btn.right');
      if (!container || !leftBtn || !rightBtn) return;

      leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
      });
      rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      });
    });
  }

  // Search with live filtering
  function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length === 0) {
        searchResults.classList.remove('active');
        return;
      }
      const filtered = window.moviesData.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.genre.toLowerCase().includes(query) ||
        m.tags.some(t => t.includes(query))
      );
      renderSearchResults(filtered, searchResults);
      searchResults.classList.add('active');
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  }

  function renderSearchResults(movies, container) {
    if (movies.length === 0) {
      container.innerHTML = '<div class="search-result-item">No results found</div>';
      return;
    }
    container.innerHTML = movies.map(movie => `
      <div class="search-result-item" data-id="${movie.id}">
        <img src="${movie.poster}" alt="${movie.title}">
        <div>
          <div style="font-weight:600">${movie.title}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary)">${movie.genre} | ${movie.year}</div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        window.location.href = `movie.html?id=${id}`;
      });
    });
  }

  // Continue Watching from localStorage
  function loadContinueWatching() {
    const stored = localStorage.getItem('continueWatching');
    if (!stored) return;
    const ids = JSON.parse(stored);
    const movies = ids.map(id => getMovieById(id)).filter(Boolean);
    if (movies.length === 0) return;
    document.getElementById('continueWatchingRow').style.display = 'block';
    renderRow('continueWatchingContainer', movies);
  }

  // Favorite / Watch Later buttons (shared)
  function setupListButtons(favBtn, wlBtn, movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const watchLater = JSON.parse(localStorage.getItem('watchLater') || '[]');
    if (favorites.includes(movieId)) favBtn.classList.add('active');
    if (watchLater.includes(movieId)) wlBtn.classList.add('active');

    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favs.includes(movieId)) {
        favs = favs.filter(id => id !== movieId);
        favBtn.classList.remove('active');
      } else {
        favs.push(movieId);
        favBtn.classList.add('active');
      }
      localStorage.setItem('favorites', JSON.stringify(favs));
    });

    wlBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let wl = JSON.parse(localStorage.getItem('watchLater') || '[]');
      if (wl.includes(movieId)) {
        wl = wl.filter(id => id !== movieId);
        wlBtn.classList.remove('active');
      } else {
        wl.push(movieId);
        wlBtn.classList.add('active');
      }
      localStorage.setItem('watchLater', JSON.stringify(wl));
    });
  }

  // Lazy Loading with Intersection Observer
  function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('.lazy-img');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy-img');
            imageObserver.unobserve(img);
          }
        });
      });
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // fallback
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }

  // ===== MOVIE DETAIL PAGE =====
  function initMovieDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if (!movieId) return;
    const movie = getMovieById(movieId);
    if (!movie) {
      document.getElementById('movieDetails').innerHTML = '<h2>Movie not found</h2>';
      return;
    }
    renderMovieDetails(movie);
  }

  function renderMovieDetails(movie) {
    const container = document.getElementById('movieDetails');
    container.innerHTML = `
      <div class="detail-hero">
        <div class="detail-poster">
          <img src="${movie.poster}" alt="${movie.title}">
        </div>
        <div class="detail-info">
          <h1>${movie.title}</h1>
          <div class="detail-meta">
            <span>${movie.year}</span>
            <span>${movie.duration}</span>
            <span><i class="fas fa-star" style="color:var(--cyan)"></i> ${movie.rating}</span>
            <span>${movie.genre}</span>
          </div>
          <p class="detail-description">${movie.description}</p>
          <div class="detail-actions">
            <a href="player.html?id=${movie.id}" class="btn btn-play"><i class="fas fa-play"></i> Play Trailer</a>
            <button class="btn-favorite" id="detailFav"><i class="far fa-heart"></i> Favorite</button>
            <button class="btn-watchlater" id="detailWl"><i class="far fa-clock"></i> Watch Later</button>
          </div>
          <div class="cast-list">
            <strong>Cast:</strong> ${movie.cast.map(c => `<span>${c}</span>`).join('')}
          </div>
          <div style="margin-top:1rem;"><strong>Director:</strong> ${movie.director}</div>
        </div>
      </div>
    `;
    // Setup favorite/watch later
    const favBtn = document.getElementById('detailFav');
    const wlBtn = document.getElementById('detailWl');
    setupListButtons(favBtn, wlBtn, movie.id);
  }

  // ===== PLAYER PAGE =====
  function initPlayerPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if (!movieId) return;
    const movie = getMovieById(movieId);
    if (!movie) return;
    document.getElementById('nowPlayingTitle').textContent = movie.title;
    const video = document.getElementById('videoPlayer');
    video.querySelector('source').src = movie.trailerUrl;
    video.load();
    // Save to continue watching
    const stored = JSON.parse(localStorage.getItem('continueWatching') || '[]');
    if (!stored.includes(movie.id)) {
      stored.unshift(movie.id);
      localStorage.setItem('continueWatching', JSON.stringify(stored));
    }
    // Add favorite/watch later?
    const infoDiv = document.getElementById('playerInfo');
    infoDiv.innerHTML = `
      <h2>${movie.title}</h2>
      <div class="detail-actions">
        <button class="btn-favorite" id="playerFav"><i class="far fa-heart"></i> Favorite</button>
        <button class="btn-watchlater" id="playerWl"><i class="far fa-clock"></i> Watch Later</button>
      </div>
    `;
    const favBtn = document.getElementById('playerFav');
    const wlBtn = document.getElementById('playerWl');
    setupListButtons(favBtn, wlBtn, movie.id);
  }
});