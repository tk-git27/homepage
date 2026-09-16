const projectTrack = document.querySelector(".project-track");
const urlParams = new URLSearchParams(window.location.search);


/* =========================================================
   PROJEKT-SLIDER
   ========================================================= */

if (projectTrack) {

    const projectContainer =
        document.querySelector(".project-container");

    const projects =
        document.querySelectorAll(".project");

    const previousProjectButton =
        document.querySelector(".previous");

    const nextProjectButton =
        document.querySelector(".next");

    const projectDots =
        document.querySelectorAll(".slider-dots button");

    let currentProject =
        Number(urlParams.get("project")) || 0;


    function showProject(index, animate = true) {

        if (animate) {

            projectTrack.style.transition =
                "transform 0.4s ease";

        } else {

            projectTrack.style.transition =
                "none";

        }


        projectTrack.style.transform =
            `translateX(-${index * 100}%)`;


        projectContainer.style.height =
            `${projects[index].offsetHeight}px`;


        projectDots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        });

    }


    function nextProject() {

        currentProject++;

        if (currentProject >= projects.length) {
            currentProject = 0;
        }

        showProject(currentProject);

    }


    function previousProject() {

        currentProject--;

        if (currentProject < 0) {
            currentProject = projects.length - 1;
        }

        showProject(currentProject);

    }


    nextProjectButton.addEventListener(
        "click",
        nextProject
    );


    previousProjectButton.addEventListener(
        "click",
        previousProject
    );


    projectDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentProject = index;

            showProject(currentProject);

        });

    });


    /* =========================================================
       PROJEKT-SWIPE
       ========================================================= */

    let touchStartX = 0;


    projectTrack.addEventListener("touchstart", (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    });


    projectTrack.addEventListener("touchend", (event) => {

        const touchEndX =
            event.changedTouches[0].screenX;

        const swipeDistance =
            touchEndX - touchStartX;


        if (Math.abs(swipeDistance) < 50) {
            return;
        }


        if (swipeDistance < 0) {

            nextProject();

        } else {

            previousProject();

        }

    });

    window.addEventListener("load", () => {

        if (projectTrack) {
            showProject(currentProject, false);
        }

    });

    showProject(currentProject, false);

}


/* =========================================================
   SCREENSHOT-SLIDER
   ========================================================= */

const screenshotTrack =
    document.querySelector(".screenshot-track");


if (screenshotTrack) {

    const screenshots =
        document.querySelectorAll(".screenshot");

    const previousScreenshotButton =
        document.querySelector(".previous-screenshot");

    const nextScreenshotButton =
        document.querySelector(".next-screenshot");

    const screenshotDots =
        document.querySelectorAll(".screenshot-dots button");

    let currentScreenshot = 0;


    function showScreenshot(index) {

        screenshotTrack.style.transform =
            `translateX(-${index * 100}%)`;


        screenshotDots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        });

    }


    function nextScreenshot() {

        currentScreenshot++;

        if (currentScreenshot >= screenshots.length) {
            currentScreenshot = 0;
        }

        showScreenshot(currentScreenshot);

    }


    function previousScreenshot() {

        currentScreenshot--;

        if (currentScreenshot < 0) {
            currentScreenshot = screenshots.length - 1;
        }

        showScreenshot(currentScreenshot);

    }


    nextScreenshotButton.addEventListener(
        "click",
        nextScreenshot
    );


    previousScreenshotButton.addEventListener(
        "click",
        previousScreenshot
    );


    screenshotDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentScreenshot = index;

            showScreenshot(currentScreenshot);

        });

    });


    /* =========================================================
       SCREENSHOT-SWIPE INNERHALB DES CONTAINERS
       ========================================================= */

    let screenshotTouchStartX = 0;


    screenshotTrack.addEventListener(
        "touchstart",
        (event) => {

            screenshotTouchStartX =
                event.changedTouches[0].screenX;

        }
    );


    screenshotTrack.addEventListener(
        "touchend",
        (event) => {

            const screenshotTouchEndX =
                event.changedTouches[0].screenX;

            const swipeDistance =
                screenshotTouchEndX -
                screenshotTouchStartX;


            if (Math.abs(swipeDistance) < 50) {
                return;
            }


            if (swipeDistance < 0) {

                nextScreenshot();

            } else {

                previousScreenshot();

            }

        }
    );


    /* =========================================================
       ZURÜCK-SWIPE AUSSERHALB DES CONTAINERS
       ========================================================= */

    let pageTouchStartX = 0;
    let pageTouchStartY = 0;


    document.addEventListener(
        "touchstart",
        (event) => {

            if (
                event.target.closest(
                    ".screenshot-container"
                )
            ) {
                return;
            }


            pageTouchStartX =
                event.changedTouches[0].screenX;

            pageTouchStartY =
                event.changedTouches[0].screenY;

        }
    );


    document.addEventListener(
        "touchend",
        (event) => {

            if (
                event.target.closest(
                    ".screenshot-container"
                )
            ) {
                return;
            }


            const pageTouchEndX =
                event.changedTouches[0].screenX;

            const pageTouchEndY =
                event.changedTouches[0].screenY;


            const swipeDistanceX =
                pageTouchEndX -
                pageTouchStartX;

            const swipeDistanceY =
                pageTouchEndY -
                pageTouchStartY;


            /* Zu kurze Bewegung */

            if (Math.abs(swipeDistanceX) < 50) {
                return;
            }


            /* Vertikales Scrollen ignorieren */

            if (
                Math.abs(swipeDistanceX) <
                Math.abs(swipeDistanceY)
            ) {
                return;
            }


            /* Nach rechts wischen = zurück */

            if (swipeDistanceX > 0) {

                const backLink =
                    document.querySelector(
                        ".project-navigation .back-link"
                    );


                if (backLink) {

                    window.location.href =
                        backLink.href;

                }

            }

        }
    );


    showScreenshot(currentScreenshot);

}

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let navigationClick = false;


    // Tabtitel setzen
    function updateTitle(section) {
        if (!section) return;

        const title = section.dataset.title;

        if (title) {
            document.title = title;
        }
    }


    // -----------------------------
    // Navigation
    // -----------------------------

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (!targetSection) return;

            // Observer kurzzeitig ignorieren
            navigationClick = true;

            // Sofort richtigen Titel setzen
            updateTitle(targetSection);

            // Nach dem Scrollvorgang Observer wieder aktivieren
            setTimeout(() => {
                navigationClick = false;
            }, 800);
        });

    });


    // -----------------------------
    // Intersection Observer
    // -----------------------------

    const observer = new IntersectionObserver((entries) => {

        // Wenn gerade über Navigation navigiert wurde,
        // nichts am Titel ändern
        if (navigationClick) return;

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                updateTitle(entry.target);
            }

        });

    }, {
        threshold: 0.5
    });


    sections.forEach(section => {
        observer.observe(section);
    });

});