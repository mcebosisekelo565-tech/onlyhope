// ============================================
// TRUSTHUB - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- Mobile Menu ----------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ---------- Smooth Scroll ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---------- Form Validation ----------
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('border-red-500');
                    valid = false;
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (!valid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // ---------- File Upload Drag & Drop ----------
    document.querySelectorAll('.border-dashed').forEach(dropzone => {
        dropzone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('border-emerald-400', 'bg-emerald-50');
        });
        
        dropzone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('border-emerald-400', 'bg-emerald-50');
        });
        
        dropzone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('border-emerald-400', 'bg-emerald-50');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                alert(`📎 ${files.length} file(s) uploaded successfully!`);
            }
        });
    });

    // ---------- Auto-hide Alerts ----------
    document.querySelectorAll('.alert').forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s';
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    });

    // ---------- Console ----------
    console.log('🚀 TrustHub loaded successfully!');
    console.log('📌 Built with ❤️ for a trustworthy world');
});