
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('listingForm');
    const modal = document.getElementById('modal');
  
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please sign in first');
      return; // Stop form submission if not signed in
    }

      const data = {
        title: form.title.value,
        description: form.description.value,
        special_conditions: form.special_conditions.value,
        salary: form.salary.value,
        location: form.location.value,
        accommodation_support: form.accommodation_support.value,
        bio: form.bio.value
      };
  
      // Insert into Supabase
      const { error } = await supabase
        .from('residency') // Use your actual table name
        .insert([data]);
  
      if (error) {
        alert('Error: ' + error.message);
        return;
      }
  
      modal.classList.remove('hidden');
      form.reset();
    });
  });
  
  // Modal button function
  function goBack() {
    window.location.href = 'CompanyDashboard.html';
  }