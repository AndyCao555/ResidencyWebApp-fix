// Initialize EmailJS
(function() {
    emailjs.init("4C8GU28FmBPiW0HNn");
})();

function sendApplication(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const reason = document.getElementById('reason').value;

    const templateParams = {
        from_name: "ISE Residency Portal",
        message: `New Company Application\n\nEmail: ${email}\n\nReason: ${reason}`,
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
} 