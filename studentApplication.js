// Initialize EmailJS
(function() {
    emailjs.init("4C8GU28FmBPiW0HNn");
})();

async function sendApplication(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const reason = document.getElementById('reason').value;
    const cvFile = document.getElementById('cv').files[0];

    try {
        // Upload CV to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('cvs')
            .upload(`${Date.now()}-${cvFile.name}`, cvFile);

        if (uploadError) throw uploadError;

        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
            .from('cvs')
            .getPublicUrl(uploadData.path);

        const templateParams = {
            from_name: "ISE Residency Portal",
            message: `New Student Application for residency\n\nEmail: ${email}\n\nReason: ${reason}\n\nCV Link: ${publicUrl}`,
            to_email: "rafaeljrokafor@gmail.com"
        };

        emailjs.send('default_service', 'template_vcd7r8p', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                window.location.href = 'confirmation.html';
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to submit application. Please try again.');
            });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload CV. Please try again.');
    }
} 