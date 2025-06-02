
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('listingForm');
    const modal = document.getElementById('modal');
  
    form.addEventListener('submit', async function(e) {
      e.preventDefault(); // stops empty form

      
      // Checkign if user is authenticated to post listings
    const { data: { user } } = await supabase.auth.getUser(); // pauses execution until the user is fetched
    if (!user) {
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
      const { error } = await supabase
        .from('residency') 
        .insert([data]);
  
      if (error) {
        alert('Error: ' + error.message);
        return;
      }
  
      modal.classList.remove('hidden'); // removes the hidden class from the modal element
      form.reset(); // resets the form
    });
  });
  
  // modal button function bringing you back to the company dashboard
  function goBack() {
    window.location.href = 'CompanyDashboard.html';
  }