function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('#theme-toggle-icon');
    if (icon) {
        const isDark = document.documentElement.classList.contains('dark');
        icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    updateThemeIcon();
    const btn = document.querySelector('#theme-toggle-btn');
    if (btn) {
        btn.addEventListener('click', toggleTheme);
    }

    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const mobileSubmenuToggle = document.getElementById('mobile-submenu-toggle');
    const mobileSubmenu = document.getElementById('mobile-submenu');
    const submenuChevron = document.getElementById('submenu-chevron');

    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');

            // Hamburger to X animation for the main toggle
            line1.classList.add('rotate-45', 'translate-y-[4px]');
            line2.classList.add('-rotate-45', '-translate-y-[4px]');

            // Hide the main toggle button when menu is open as we now have the close button inside
            mobileMenuToggle.style.opacity = '0';
            mobileMenuToggle.style.pointerEvents = 'none';

            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');

            // X back to Hamburger for the main toggle
            line1.classList.remove('rotate-45', 'translate-y-[4px]');
            line2.classList.remove('-rotate-45', '-translate-y-[4px]');

            // Show the main toggle button back
            mobileMenuToggle.style.opacity = '1';
            mobileMenuToggle.style.pointerEvents = 'auto';

            document.body.style.overflow = '';
        }
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMenu);
    }

    mobileSubmenuToggle.addEventListener('click', () => {
        const isOpen = mobileSubmenu.style.maxHeight && mobileSubmenu.style.maxHeight !== '0px';
        if (isOpen) {
            mobileSubmenu.style.maxHeight = '0px';
            mobileSubmenu.classList.remove('opacity-100');
            mobileSubmenu.classList.add('opacity-0');
            submenuChevron.classList.remove('rotate-180');
        } else {
            mobileSubmenu.style.maxHeight = mobileSubmenu.scrollHeight + 'px';
            mobileSubmenu.classList.remove('opacity-0');
            mobileSubmenu.classList.add('opacity-100');
            submenuChevron.classList.add('rotate-180');
        }
    });

    // Close menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });


    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const scriptURL = "https://contact.cleaningduties.ro/";
    if (document.querySelector('form')) {
        const form = document.querySelector('form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const phone = form.phone.value.trim();
            const message = form.message.value.trim();

            // Field Error Helpers
            let isValid = true;
            const setError = (fieldName, message) => {
                const errorEl = document.getElementById(`${fieldName}-error`);
                if (errorEl) {
                    errorEl.textContent = message;
                    errorEl.classList.remove('hidden');
                }
            };

            const clearErrors = () => {
                ['name', 'email', 'phone', 'message'].forEach(field => {
                    const errorEl = document.getElementById(`${field}-error`);
                    if (errorEl) {
                        errorEl.textContent = '';
                        errorEl.classList.add('hidden');
                    }
                });
            };

            clearErrors();

            // Validation Rules
            if (!name) {
                setError('name', 'Acest câmp este obligatoriu.');
                isValid = false;
            }

            if (!email) {
                setError('email', 'Acest câmp este obligatoriu.');
                isValid = false;
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    setError('email', 'Vă rugăm să introduceți o adresă de email validă.');
                    isValid = false;
                }
            }

            if (!phone) {
                setError('phone', 'Acest câmp este obligatoriu.');
                isValid = false;
            } else {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
                    setError('phone', 'Vă rugăm să introduceți un număr de telefon valid.');
                    isValid = false;
                }
            }

            if (!message) {
                setError('message', 'Acest câmp este obligatoriu.');
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            const payload = {
                name: name,
                email: email,
                phone: phone,
                message: message
            };

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Set loading state
            submitBtn.innerHTML = 'Se trimite...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');



            const submitMessage = document.getElementById('submit-message');
            if (submitMessage) {
                submitMessage.className = 'hidden text-center text-sm font-semibold mt-6';
                submitMessage.textContent = '';
            }

            try {
                await fetch(scriptURL, {
                    method: 'POST',
                    body: new FormData(e.target),
                    mode: 'no-cors',
                });

                // show success message
                if (submitMessage) {
                    submitMessage.textContent = 'Mesajul dumneavoastră a fost trimis cu succes! Vă vom contacta în curând.';
                    submitMessage.classList.remove('hidden');
                    submitMessage.classList.add('text-green-500', 'dark:text-green-400');
                }
                form.reset();
            } catch (error) {
                if (submitMessage) {
                    submitMessage.textContent = 'A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou mai târziu.';
                    submitMessage.classList.remove('hidden');
                    submitMessage.classList.add('text-red-500', 'dark:text-red-400');
                }
                console.error('Error submitting form:', error);
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                lucide.createIcons(); // Re-initialize icons just in case
            }
        });
    }

    // Cookie Consent Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');


    const checkCookieConsent = () => {
        if (!getCookie('isReturningVisitor')) {
            if (cookieBanner) {
                cookieBanner.classList.remove('hidden');
                setTimeout(() => {
                    cookieBanner.classList.remove('opacity-0', 'translate-y-4');
                    cookieBanner.classList.add('opacity-100', 'translate-y-0');
                }, 100);
            }
            if (window.lucide) window.lucide.createIcons();
        }
    };

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            setCookie('isReturningVisitor', 'true', 365);
            cookieBanner.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => {
                cookieBanner.classList.add('hidden');
            }, 300);
        });
    }

    checkCookieConsent();

    // Cookie Status Toggle Logic (for cookies.html)
    const statusToggle = document.getElementById('cookie-status-toggle');
    if (statusToggle) {
        // Init state: if _c_duties_no is NOT set, toggle is ON (checked)
        const isCookiesDisabled = getCookie('_c_duties_no');
        statusToggle.checked = !isCookiesDisabled;

        statusToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                // Enabled: remove the refusal cookie and enable GA
                deleteCookie('_c_duties_no');
                if (window.enableGa) window.enableGa();
            } else {
                // Disabled: set the refusal cookie and disable GA
                setCookie('_c_duties_no', 'true', 365);
                if (window.disableGa) window.disableGa();
            }
        });
    }

    updateThemeIcon();
});