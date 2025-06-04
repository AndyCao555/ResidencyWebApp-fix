// To authenticate application with EmailJS service
(function() {
    emailjs.init("4C8GU28FmBPiW0HNn"); //sets up the connection between application and EmailJS
})();

async function sendApplication(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const reason = document.getElementById('reason').value;
    const cvFile = document.getElementById('cv').files[0];

    if (!cvFile) {
        alert('Please select a CV file');
        return;
    }

    try {
        // Make sure we have access to the Supabase client
        if (!window.supabase) {
            throw new Error('Supabase client not initialized');
        }

        // Upload CV to Supabase Storage
        const { data: uploadData, error: uploadError } = await window.supabase.storage //access the storage bucket
            .from('cvs') // from the cvs bucket
            .upload(`${Date.now()}-${cvFile.name}`, cvFile); // upload the file to the bucket

        if (uploadError) {
            throw new Error(uploadError.message);
        }

        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = window.supabase.storage
            .from('cvs')
            .getPublicUrl(uploadData.path);

        // templateParams object contains all the information that will be sent in the email
        const templateParams = {
            from_name: "ISE Residency Portal",
            message: `New Student Application for residency\n\nEmail: ${email}\n\nReason: ${reason}\n\nCV Link: ${publicUrl}`,
            to_email: "rafaeljrokafor@gmail.com"
        };

        
        //.send is the method used to send emails using emailjs
        emailjs.send('default_service', 'template_vcd7r8p', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                window.location.href = 'confirmation.html';
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to submit application. Please try again.');
            });
    } catch (error) {
        alert('Failed to upload CV: ' + error.message);
    }
} 