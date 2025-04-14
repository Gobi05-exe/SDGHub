document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const paymentSection = document.getElementById('payment-section');
    const donationForm = document.getElementById('donation-form');
    const projectNameInput = document.getElementById('project-name');

    // Simulate progress bar animation
 function animateProgressBar() {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const fundingInfo = bar.closest('.project-details').querySelector('.funding-info');
            if (fundingInfo) {
                const raisedText = fundingInfo.querySelector('.raised')?.textContent.replace(/[^0-9]/g, '') || '0';
                const goalText = fundingInfo.querySelector('.goal')?.textContent.replace(/[^0-9]/g, '') || '1';

                const raised = parseInt(raisedText, 10);
                const goal = parseInt(goalText, 10);

                if (goal > 0) {
                    const percentage = Math.min((raised / goal) * 100, 100);
                    bar.style.width = `${percentage}%`;
                    bar.setAttribute('aria-valuenow', percentage.toFixed(2));
                }
            }
        });
    }

    // Project selection
    projectCards.forEach(card => {
        card.querySelector('.select-project').addEventListener('click', () => {
            const projectName = card.querySelector('h3').textContent;
            projectNameInput.value = projectName;
            paymentSection.style.display = 'block';
            window.scrollTo({
                top: paymentSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Payment method selection
    const paymentMethodButtons = document.querySelectorAll('.payment-method');
    paymentMethodButtons.forEach(button => {
        button.addEventListener('click', () => {
            paymentMethodButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    // Form submission
    donationForm.addEventListener('submit', (e) => {
        alert('Thank you for your support! Your donation is processing.');
        paymentSection.style.display = 'none';
    });

    // Initial progress bar animation
    animateProgressBar();
});