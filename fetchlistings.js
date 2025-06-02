
async function fetchAndDisplayListings() {
    const {data: listings, error} = await window.supabase
        .from('residency')
        .select('*');

    if (error) {
        console.error('Error fetching listings:', error);
        return;
    }

    const listingsContainer = document.querySelector('.listings-content');
    listingsContainer.innerHTML = '';

    const noListingsDiv = document.querySelector('.No-Listings');
    if (!listings || listings.length === 0) {
        if (noListingsDiv) noListingsDiv.style.display = 'block';
        return;
    } else {
        if (noListingsDiv) noListingsDiv.style.display = 'none';
    }

    listings.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.innerHTML = `
          <div class="listing-header">
            <h3>${listing.title}</h3>
          </div>
          <div class="listing-details">
            <p><strong>Location:</strong> ${listing.location || 'N/A'}</p>
            <p><strong>Salary:</strong> ${listing.salary || 'N/A'}</p>
            <p><strong>Accommodation Support:</strong> ${listing.accommodation_support ? 'Yes' : 'No'}</p>
          </div>
          <div class="listing-description">
            <p>${listing.description || ''}</p>
          </div>
          <div class="listing-bio">
            <p><strong>Bio:</strong> ${listing.bio || ''}</p>
          </div>
          <div class="listing-special-conditions">
            <p><strong>Special Conditions:</strong> ${listing.special_conditions || ''}</p>
          </div>
          <div class="listing-actions">
            <button class="apply-button">Apply Now</button>
          </div>
        `;
        listingsContainer.appendChild(card);
      });
    }
    
    window.addEventListener('DOMContentLoaded', fetchAndDisplayListings);
