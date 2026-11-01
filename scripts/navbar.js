document.addEventListener("DOMContentLoaded", () => {
    // Shared navbar markup
    const navbarHTML = `
        <nav class="navbar a2-bg p3 b1 bs r1 z10">
            <div class="navbar-header">
                <div class="navbar-brand">
                    <h1>CROMS</h1>
                </div>

                <button class="navbar-toggler"
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                    aria-controls="navbar-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <ul class="navbar-nav" id="navbar-menu">
                <li class="nav-item">
                    <a href="./index.html" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="./about.html" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="./downloads.html" class="nav-link">Downloads</a>
                </li>
                <li class="nav-item">
                    <a href="./documentation.html" class="nav-link">Documentation</a>
                </li>
                <li class="nav-item">
                    <a href="./dmca.html" class="nav-link">DMCA</a>
                </li>
            </ul>
        </nav>
    `;

    // Inject navbar at the beginning of the body
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    // Navbar functionality
    document.querySelectorAll(".navbar").forEach(navbar => {
        const toggler = navbar.querySelector(".navbar-toggler");
        const menu = navbar.querySelector(".navbar-nav");

        if (!toggler || !menu) return;

        let animation = null;
        let isOpen = false;

        function setOpen(open) {
            const startHeight = menu.getBoundingClientRect().height;

            if (animation) {
                animation.cancel();
                animation = null;
            }

            isOpen = open;
            navbar.classList.toggle("is-open", open);
            toggler.setAttribute("aria-expanded", String(open));

            menu.style.height = "auto";
            const endHeight = open ? menu.scrollHeight : 0;

            menu.style.height = `${startHeight}px`;

            animation = menu.animate(
                [
                    { height: `${startHeight}px` },
                    { height: `${endHeight}px` }
                ],
                {
                    duration: 300,
                    easing: "ease-in-out"
                }
            );

            animation.onfinish = () => {
                menu.style.height = open ? "auto" : "0px";
                animation.cancel();
                animation = null;
            };
        }

        toggler.addEventListener("click", () => {
            setOpen(!isOpen);
        });

        menu.addEventListener("click", event => {
            if (event.target.closest(".nav-link")) {
                setOpen(false);
            }
        });

        navbar.addEventListener("keydown", event => {
            if (event.key === "Escape" && isOpen) {
                setOpen(false);
                toggler.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                if (animation) {
                    animation.cancel();
                    animation = null;
                }

                isOpen = false;
                navbar.classList.remove("is-open");
                toggler.setAttribute("aria-expanded", "false");
                menu.style.height = "";
            }
        });
    });
    // Shared footer markup
    const footerHTML = `
        <footer class="footer a1-bg p3 b1 bs r1 z10">
            <p class="text-center">
                &copy; 2026 CROMS. All rights reserved.
            </p>
        </footer>
    `;

    // Inject footer at the end of the body
    document.body.insertAdjacentHTML("beforeend", footerHTML);
});