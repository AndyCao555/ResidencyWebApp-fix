// fetches and displays the listings 
async function fetchAndDisplayListings() { 
    const {data: listings, error} = await window.supabase // pauses execution until the data is fetched
        .from('residency') // fetches the data from the residency table
        .select('*'); // selects all columns from the residency table
        

    if (error) { // handles any errors that occur during the fetch
        console.error('Error fetching listings:', error); 
        return;
    }

    const listingsContainer = document.querySelector('.listings-content'); // finds html element with class listings-content
    listingsContainer.innerHTML = ''; // clears the content of the listings-content element

    const noListingsDiv = document.querySelector('.No-Listings'); // finds html element with class No-Listings
    if (!listings || listings.length === 0) { // if no listings are found
        if (noListingsDiv) noListingsDiv.style.display = 'block'; // displays the No-Listings element
        return;
    } else { // if listings are found
        if (noListingsDiv) noListingsDiv.style.display = 'none'; // hides the No-Listings element
    }

    listings.forEach(listing => { // iterates over each listing and creates a card for it
        const card = document.createElement('div'); // creates a new div element
        card.className = 'listing-card'; // adds the class listing-card to the div
        // html template for the listing card, fills it in with the listing data and default values if no data is available
        card.innerHTML = `
          <div class="listing-header">
            <h3>${listing.title}</h3>
          </div>
          <div class="listing-details">
            <p><strong>Location:</strong> ${listing.location || 'N/A'}</p>
            <p><strong>Salary:</strong> ${listing.salary || 'N/A'}</p>
            <p><strong>Accommodation Support:</strong> ${listing.accommodation_support || 'N/A'}</p>
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
          <button onclick="window.location.href='StudentApplication.html'" class="apply-button">Apply Now</button>
          </div>
        `;
        listingsContainer.appendChild(card); // adds the card to the listings-content element
      });
    }
    
    window.addEventListener('DOMContentLoaded', fetchAndDisplayListings); // fetches and displays the listings when the page loads
