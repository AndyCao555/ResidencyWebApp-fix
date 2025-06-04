
document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('listingForm'); // gets the form element
    const modal = document.getElementById('modal'); // gets the modal element
  
    form.addEventListener('submit', async function(e) { // listens for the submit event on the form
      e.preventDefault(); // stops empty form

      
      // Checkign if user is authenticated to post listings
    const { data: { user } } = await supabase.auth.getUser(); // pauses execution until the user is fetched
    if (!user) { // if the user is not authenticated
      alert('Please sign in first'); 
      return; // Stops listing submission if not signed in
    }

    
    // stores form data in an object
      const data = { 
        title: form.title.value, 
        description: form.description.value,
        special_conditions: form.special_conditions.value,
        salary: form.salary.value,
        location: form.location.value,
        accommodation_support: form.accommodation_support.value,
        bio: form.bio.value
      };
  
      // inserts listing into Supabase
      const { error } = await supabase // waits for the insertion to complete
        .from('residency') // inserts the data into the residency table
        .insert([data]); // inserts the data into the table
  
      if (error) {
        alert('Error: ' + error.message);
        return; // stops listing submission if there is an error
      }
  
      modal.classList.remove('hidden'); // removes the hidden class from the modal element
      form.reset(); // resets the form
    }); 
  });
  
  // modal button function bringing you back to the company dashboard
  function goBack() { 
    window.location.href = 'CompanyDashboard.html';
  }