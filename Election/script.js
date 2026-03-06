// Configuration
const API_BASE = 'https://electionapi.osac.org.np';
// Fallback sample data in case API fails or is CORS-restricted
const SAMPLE_DATA = [
    {
        id: 1,
        name: "Khadga Prasad Oli",
        party: "CPN-UML",
        constituency: "Jhapa 5",
        province: "Province 1",
        district: "Jhapa",
        votes: 35241,
        status: "won",
        image: null
    },
    {
        id: 2,
        name: "Pushpa Kamal Dahal",
        party: "Maoist Centre",
        constituency: "Chitwan 3",
        province: "Bagmati",
        district: "Chitwan",
        votes: 28934,
        status: "leading",
        image: null
    },
    {
        id: 3,
        name: "Sher Bahadur Deuba",
        party: "Nepali Congress",
        constituency: "Dadeldhura 1",
        province: "Sudurpashchim",
        district: "Dadeldhura",
        votes: 26789,
        status: "leading",
        image: null
    },
    {
        id: 4,
        name: "Baburam Bhattarai",
        party: "Naya Shakti",
        constituency: "Gorkha 2",
        province: "Gandaki",
        district: "Gorkha",
        votes: 12456,
        status: "trailing",
        image: null
    }
];

// Helper to generate avatar URL from name
function getAvatarUrl(name) {
    return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(name)}.svg?backgroundColors=%232563eb&fontSize=40`;
}

// Global variables
let candidates = [];
let provinces = new Set();
let districts = [];

// DOM elements
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const gridEl = document.getElementById('candidateGrid');
const provinceFilter = document.getElementById('provinceFilter');
const districtFilter = document.getElementById('districtFilter');
const searchInput = document.getElementById('searchInput');

// Fetch data from API or fallback to sample
async function fetchData() {
    try {
        // Try real API first
        const response = await fetch(`${API_BASE}/candidates`); // adjust endpoint as needed
        if (!response.ok) throw new Error('API response not ok');
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn('Using sample data because API fetch failed:', err);
        errorEl.textContent = '⚠️ Using sample data – live API unreachable.';
        errorEl.classList.remove('hidden');
        return SAMPLE_DATA;
    }
}

// Populate filter dropdowns
function populateFilters() {
    // Provinces
    provinces.clear();
    candidates.forEach(c => c.province && provinces.add(c.province));
    provinceFilter.innerHTML = '<option value="">All Provinces</option>';
    [...provinces].sort().forEach(p => {
        provinceFilter.innerHTML += `<option value="${p}">${p}</option>`;
    });

    // Districts (initially all)
    updateDistrictOptions();
}

function updateDistrictOptions() {
    const selectedProvince = provinceFilter.value;
    let availableDistricts = [];
    if (selectedProvince) {
        availableDistricts = [...new Set(candidates.filter(c => c.province === selectedProvince).map(c => c.district))];
    } else {
        availableDistricts = [...new Set(candidates.map(c => c.district))];
    }
    availableDistricts.sort();

    districtFilter.innerHTML = '<option value="">All Districts</option>';
    availableDistricts.forEach(d => {
        districtFilter.innerHTML += `<option value="${d}">${d}</option>`;
    });
    districtFilter.disabled = false;
}

// Render cards based on filters
function renderCards() {
    const province = provinceFilter.value;
    const district = districtFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = candidates.filter(c => {
        const matchProvince = !province || c.province === province;
        const matchDistrict = !district || c.district === district;
        const matchSearch = !searchTerm || 
            c.name.toLowerCase().includes(searchTerm) || 
            c.party.toLowerCase().includes(searchTerm) ||
            (c.constituency && c.constituency.toLowerCase().includes(searchTerm));
        return matchProvince && matchDistrict && matchSearch;
    });

    if (filtered.length === 0) {
        gridEl.innerHTML = '<p class="no-results">No candidates match your filters.</p>';
        return;
    }

    gridEl.innerHTML = filtered.map(c => {
        const statusClass = 
            c.status === 'won' ? 'status-won' :
            c.status === 'leading' ? 'status-leading' :
            c.status === 'trailing' ? 'status-trailing' : '';
        return `
            <div class="candidate-card">
                <img class="candidate-image" src="${c.image || getAvatarUrl(c.name)}" alt="${c.name}" onerror="this.src='https://avatars.dicebear.com/api/initials/${encodeURIComponent(c.name)}.svg'">
                <h3 class="candidate-name">${c.name}</h3>
                <span class="candidate-party">${c.party}</span>
                <div class="candidate-constituency">${c.constituency || ''}${c.district ? `, ${c.district}` : ''}</div>
                <div class="candidate-votes">🗳️ ${c.votes?.toLocaleString() || 'N/A'} votes</div>
                <div class="candidate-status ${statusClass}">${c.status?.toUpperCase() || 'UNKNOWN'}</div>
            </div>
        `;
    }).join('');
}

// Initialize app
async function init() {
    loadingEl.style.display = 'block';
    errorEl.classList.add('hidden');

    candidates = await fetchData();
    // Ensure each candidate has required fields
    candidates = candidates.map(c => ({
        ...c,
        image: c.image || null,
        status: c.status || (c.votes > 30000 ? 'leading' : 'trailing') // fallback
    }));

    populateFilters();
    renderCards();

    loadingEl.style.display = 'none';

    // Event listeners for filters
    provinceFilter.addEventListener('change', () => {
        updateDistrictOptions();
        renderCards();
    });
    districtFilter.addEventListener('change', renderCards);
    searchInput.addEventListener('input', renderCards);
}

// Start
init();
