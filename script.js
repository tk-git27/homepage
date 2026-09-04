/* =========================================================
   PROJEKT-SLIDER
   ========================================================= */

const projectTrack = document.querySelector(".project-track");

if (projectTrack) {

    const projects = document.querySelectorAll(".project");
    const previousProjectButton = document.querySelector(".previous");
    const nextProjectButton = document.querySelector(".next");
    const projectDots = document.querySelectorAll(".slider-dots button");

    let currentProject = 0;


    function showProject(index) {

        projectTrack.style.transform =
            `translateX(-${index * 100}%)`;


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


    showProject(currentProject);

}


/* =========================================================
   SCREENSHOT-SLIDER
   ========================================================= */

const screenshotTrack = document.querySelector(".screenshot-track");

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


    showScreenshot(currentScreenshot);

}