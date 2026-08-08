/*
|--------------------------------------------------------------------------
| SUPABASE CONFIGURATION
|--------------------------------------------------------------------------
|
| IMPORTANT:
|
| Keep the quotes.
|
| Example:
|
| const SUPABASE_URL = "https://abcdefgh.supabase.co";
|
| const SUPABASE_ANON_KEY =
| "eyJhbGciOiJIUzI1NiIs...";
|
|--------------------------------------------------------------------------
*/

const SUPABASE_URL = "YOUR_SUPABASE_URL";

const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";


/*
|--------------------------------------------------------------------------
| APP
|--------------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", () => {

    initPersonalData();

    initOpening();

    initStars();

    initScrollReveal();

    initProgress();

    initProposal();

    initMessage();

    initMusic();

    initTracking();

    initLocation();

});


/*
|--------------------------------------------------------------------------
| SUPABASE
|--------------------------------------------------------------------------
*/

let supabaseClient = null;

function initSupabase() {

    if (
        typeof window.supabase === "undefined"
    ) {

        console.warn(
            "Supabase library unavailable."
        );

        return null;

    }

    if (
        SUPABASE_URL.includes("YOUR_") ||
        SUPABASE_ANON_KEY.includes("YOUR_")
    ) {

        console.warn(
            "Supabase credentials are not configured."
        );

        return null;

    }

    try {

        return window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );

    } catch (error) {

        console.error(
            "Supabase initialization failed:",
            error
        );

        return null;

    }

}

supabaseClient = initSupabase();


/*
|--------------------------------------------------------------------------
| SESSION
|--------------------------------------------------------------------------
*/

let sessionId =
    localStorage.getItem(
        "love_letter_session"
    );

if (!sessionId) {

    sessionId =
        crypto.randomUUID
            ? crypto.randomUUID()
            : (
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2)
            );

    localStorage.setItem(
        "love_letter_session",
        sessionId
    );

}


/*
|--------------------------------------------------------------------------
| TRACK EVENT
|--------------------------------------------------------------------------
*/

async function trackEvent(
    eventType,
    metadata = {}
) {

    console.log(
        "[TRACK]",
        eventType,
        metadata
    );

    if (!supabaseClient) return;

    try {

        await supabaseClient
            .from("proposal_events")
            .insert({

                session_id: sessionId,

                event_type: eventType,

                metadata: metadata

            });

    } catch (error) {

        console.warn(
            "Tracking failed:",
            error.message
        );

    }

}


/*
|--------------------------------------------------------------------------
| PERSONAL DATA
|--------------------------------------------------------------------------
*/

function initPersonalData() {

    const d = PROPOSAL_DATA;

    document.title =
        `For ${d.person.firstName} ❤️`;

    document.getElementById(
        "openingSmall"
    ).textContent =
        d.opening.smallText;

    document.getElementById(
        "openingTitle"
    ).textContent =
        d.opening.title;

    document.getElementById(
        "openingSubtitle"
    ).textContent =
        d.opening.subtitle;

    document.getElementById(
        "heroTitle"
    ).textContent =
        `For ${d.person.firstName}.`;

    document.getElementById(
        "heroSubtitle"
    ).textContent =
        d.opening.subtitle;

    document.getElementById(
        "letterName"
    ).textContent =
        d.person.firstName;

    document.getElementById(
        "signature"
    ).textContent =
        d.sender.name;

    document.getElementById(
        "finalSignature"
    ).textContent =
        d.sender.name;

    document.getElementById(
        "footerText"
    ).textContent =
        d.footer.text;

    document.getElementById(
        "proposalHeading"
    ).textContent =
        d.proposal.heading;

    document.getElementById(
        "proposalQuestion"
    ).textContent =
        d.proposal.question;

    document.getElementById(
        "yesText"
    ).textContent =
        d.proposal.yesButton;

    document.getElementById(
        "noText"
    ).textContent =
        d.proposal.noButton;


    /*
    | PHOTO
    */

    const image =
        document.getElementById(
            "personPhoto"
        );

    const fallback =
        document.getElementById(
            "photoFallback"
        );

    if (d.person.photo) {

        image.src =
            d.person.photo;

        image.alt =
            d.person.firstName;

        image.onload = () => {

            document
                .querySelector(".photo-frame")
                .classList
                .add("has-image");

            fallback.style.display =
                "none";

        };

        image.onerror = () => {

            console.warn(
                "Photo not found:",
                d.person.photo
            );

        };

    }


    /*
    | LETTER
    */

    const letter =
        document.getElementById(
            "letterContent"
        );

    letter.innerHTML = "";

    d.letter.forEach(
        paragraph => {

            const p =
                document.createElement("p");

            p.textContent =
                paragraph;

            letter.appendChild(p);

        }
    );


    /*
    | REASONS
    */

    const grid =
        document.getElementById(
            "reasonsGrid"
        );

    grid.innerHTML = "";

    d.reasons.forEach(
        (reason, index) => {

            const card =
                document.createElement("article");

            card.className =
                "reason-card reveal";

            card.innerHTML = `

                <div class="reason-icon">
                    ${reason.icon}
                </div>

                <h3>
                    ${escapeHTML(reason.title)}
                </h3>

                <p>
                    ${escapeHTML(reason.text)}
                </p>

            `;

            grid.appendChild(card);

            setTimeout(() => {

                observeReveal(
                    card
                );

            }, index * 80);

        }
    );

}


/*
|--------------------------------------------------------------------------
| OPENING
|--------------------------------------------------------------------------
*/

function initOpening() {

    const opening =
        document.getElementById(
            "opening"
        );

    const begin =
        document.getElementById(
            "beginButton"
        );

    setTimeout(() => {

        trackEvent(
            "page_opened"
        );

    }, 300);


    begin.addEventListener(
        "click",
        () => {

            opening.classList.add(
                "hide"
            );

            document
                .getElementById("main")
                .classList
                .remove("hidden");

            trackEvent(
                "letter_opened"
            );

            setTimeout(() => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 100);

        }
    );

}


/*
|--------------------------------------------------------------------------
| REVEAL
|--------------------------------------------------------------------------
*/

let revealObserver;

function initScrollReveal() {

    revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            const id =
                                entry.target
                                    .closest("section")
                                    ?.id;

                            if (id) {

                                trackEvent(
                                    "section_view",
                                    {
                                        section: id
                                    }
                                );

                            }

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: .15,
                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    document
        .querySelectorAll(".reveal")
        .forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

}


function observeReveal(element) {

    if (revealObserver) {

        revealObserver.observe(
            element
        );

    }

}


/*
|--------------------------------------------------------------------------
| PROGRESS
|--------------------------------------------------------------------------
*/

function initProgress() {

    const progress =
        document.getElementById(
            "progress"
        );

    window.addEventListener(
        "scroll",
        () => {

            const top =
                window.scrollY;

            const height =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;

            const percent =
                height > 0
                    ? (top / height) * 100
                    : 0;

            progress.style.width =
                `${Math.min(
                    100,
                    percent
                )}%`;

        },
        {
            passive: true
        }
    );

}


/*
|--------------------------------------------------------------------------
| PROPOSAL
|--------------------------------------------------------------------------
*/

let selectedAnswer = null;

function initProposal() {

    const yes =
        document.getElementById(
            "yesButton"
        );

    const no =
        document.getElementById(
            "noButton"
        );


    yes.addEventListener(
        "click",
        () => {

            selectedAnswer = "yes";

            trackEvent(
                "proposal_yes_clicked"
            );

            celebrate();

            showResponse(
                "yes"
            );

        }
    );


    no.addEventListener(
        "click",
        () => {

            selectedAnswer = "no";

            trackEvent(
                "proposal_no_clicked"
            );

            showResponse(
                "no"
            );

        }
    );

}


/*
|--------------------------------------------------------------------------
| RESPONSE
|--------------------------------------------------------------------------
*/

function showResponse(answer) {

    const proposal =
        document.getElementById(
            "proposalSection"
        );

    const response =
        document.getElementById(
            "responseSection"
        );

    const title =
        document.getElementById(
            "responseTitle"
        );

    const text =
        document.getElementById(
            "responseText"
        );

    const icon =
        document.getElementById(
            "responseIcon"
        );


    proposal.style.display =
        "none";

    response.classList.add(
        "show"
    );


    if (answer === "yes") {

        title.textContent =
            PROPOSAL_DATA.response.yesTitle;

        text.textContent =
            PROPOSAL_DATA.response.yesText;

        icon.textContent =
            "♥";

        document.getElementById(
            "sendButton"
        ).textContent =
            PROPOSAL_DATA
                .optionalMessage
                .yesButton;

    } else {

        title.textContent =
            PROPOSAL_DATA.response.noTitle;

        text.textContent =
            PROPOSAL_DATA.response.noText;

        icon.textContent =
            "🌷";

        document.getElementById(
            "sendButton"
        ).textContent =
            PROPOSAL_DATA
                .optionalMessage
                .noButton;

    }


    response.scrollIntoView({
        behavior: "smooth"
    });

}


/*
|--------------------------------------------------------------------------
| MESSAGE
|--------------------------------------------------------------------------
*/

function initMessage() {

    const input =
        document.getElementById(
            "messageInput"
        );

    const count =
        document.getElementById(
            "characterCount"
        );

    const button =
        document.getElementById(
            "sendButton"
        );


    input.addEventListener(
        "input",
        () => {

            count.textContent =
                input.value.length;

        }
    );


    button.addEventListener(
        "click",
        async () => {

            await submitResponse();

        }
    );

}


async function submitResponse() {

    const button =
        document.getElementById(
            "sendButton"
        );

    const message =
        document.getElementById(
            "messageInput"
        ).value.trim();


    button.disabled = true;

    button.textContent =
        "Saving...";


    const payload = {

        session_id:
            sessionId,

        answer:
            selectedAnswer,

        message:
            message || null

    };


    let success = false;


    if (supabaseClient) {

        try {

            const {
                error
            } =
                await supabaseClient
                    .from(
                        "proposal_responses"
                    )
                    .insert(
                        payload
                    );

            if (error) {

                console.error(
                    error
                );

            } else {

                success = true;

            }

        } catch (error) {

            console.error(
                error
            );

        }

    } else {

        /*
        | Demo mode.
        |
        | If Supabase is not configured,
        | the website still works.
        */

        success = true;

        console.warn(
            "Demo mode: response not saved to database."
        );

    }


    if (success) {

        trackEvent(
            "response_submitted",
            {
                answer:
                    selectedAnswer,

                message_length:
                    message.length
            }
        );


        document.getElementById(
            "messageArea"
        ).style.display =
            "none";


        document.getElementById(
            "responseDone"
        ).style.display =
            "block";


        celebrate();

    } else {

        button.disabled = false;

        button.textContent =
            selectedAnswer === "yes"
                ? "Send my message ✨"
                : "Send message 🌷";

        alert(
            "Something went wrong while saving your message. Please try again."
        );

    }

}


/*
|--------------------------------------------------------------------------
| STARS
|--------------------------------------------------------------------------
*/

function initStars() {

    const canvas =
        document.getElementById(
            "stars"
        );

    const ctx =
        canvas.getContext("2d");

    let stars = [];

    function resize() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

        stars =
            Array.from(
                {
                    length:
                        Math.min(
                            180,
                            Math.floor(
                                window.innerWidth /
                                6
                            )
                        )
                },
                () => ({

                    x:
                        Math.random() *
                        canvas.width,

                    y:
                        Math.random() *
                        canvas.height,

                    radius:
                        Math.random() *
                        1.5 + .2,

                    speed:
                        Math.random() *
                        .25 + .05,

                    alpha:
                        Math.random() *
                        .7 + .2

                })
            );

    }


    resize();

    window.addEventListener(
        "resize",
        resize
    );


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        stars.forEach(
            star => {

                star.y -=
                    star.speed;


                if (
                    star.y < 0
                ) {

                    star.y =
                        canvas.height;

                }


                ctx.beginPath();

                ctx.arc(
                    star.x,
                    star.y,
                    star.radius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(
                        255,
                        225,
                        240,
                        ${star.alpha}
                    )`;

                ctx.fill();

            }
        );


        requestAnimationFrame(
            animate
        );

    }


    animate();

}


/*
|--------------------------------------------------------------------------
| CONFETTI
|--------------------------------------------------------------------------
*/

function celebrate() {

    const canvas =
        document.getElementById(
            "confetti"
        );

    const ctx =
        canvas.getContext("2d");


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    const pieces =
        [];


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        pieces.push({

            x:
                canvas.width / 2,

            y:
                canvas.height * .45,

            vx:
                (Math.random() - .5) * 12,

            vy:
                Math.random() * -12 - 4,

            size:
                Math.random() * 6 + 3,

            life:
                1,

            rotation:
                Math.random() * 6

        });

    }


    function frame() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        let alive = false;


        pieces.forEach(
            p => {

                p.x += p.vx;

                p.y += p.vy;

                p.vy += .25;

                p.rotation += .1;

                p.life -= .008;


                if (p.life > 0) {

                    alive = true;

                    ctx.save();

                    ctx.translate(
                        p.x,
                        p.y
                    );

                    ctx.rotate(
                        p.rotation
                    );

                    ctx.fillStyle =
                        [
                            "#ff4f91",
                            "#ffb5d1",
                            "#a855f7",
                            "#ffffff"
                        ][
                            Math.floor(
                                Math.random() * 4
                            )
                        ];

                    ctx.fillRect(
                        -p.size / 2,
                        -p.size / 2,
                        p.size,
                        p.size * 1.8
                    );

                    ctx.restore();

                }

            }
        );


        if (alive) {

            requestAnimationFrame(
                frame
            );

        } else {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        }

    }


    frame();

}


/*
|--------------------------------------------------------------------------
| MUSIC
|--------------------------------------------------------------------------
*/

let audioContext = null;

let musicPlaying = false;

let musicNodes = [];


function initMusic() {

    const button =
        document.getElementById(
            "musicButton"
        );

    button.addEventListener(
        "click",
        toggleMusic
    );

}


function toggleMusic() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }


    if (musicPlaying) {

        stopMusic();

    } else {

        startMusic();

    }

}


function startMusic() {

    const frequencies =
        [
            174,
            220,
            261.63,
            329.63
        ];


    const gain =
        audioContext.createGain();

    gain.gain.value =
        .025;

    gain.connect(
        audioContext.destination
    );


    frequencies.forEach(
        (frequency, index) => {

            const oscillator =
                audioContext
                    .createOscillator();

            oscillator.type =
                "sine";

            oscillator.frequency.value =
                frequency;

            oscillator.detune.value =
                index * 3;

            oscillator.connect(
                gain
            );

            oscillator.start();

            musicNodes.push(
                oscillator
            );

        }
    );


    musicNodes.push(
        gain
    );


    musicPlaying = true;


    document
        .getElementById(
            "musicButton"
        )
        .classList
        .add("playing");

    document
        .getElementById(
            "musicIcon"
        )
        .textContent =
        "♫";


    trackEvent(
        "music_started"
    );

}


function stopMusic() {

    musicNodes.forEach(
        node => {

            try {

                node.stop
                    ? node.stop()
                    : node.disconnect();

            } catch (_) {}

        }
    );


    musicNodes = [];

    musicPlaying = false;


    document
        .getElementById(
            "musicButton"
        )
        .classList
        .remove("playing");

    document
        .getElementById(
            "musicIcon"
        )
        .textContent =
        "♪";


    trackEvent(
        "music_stopped"
    );

}


/*
|--------------------------------------------------------------------------
| OPTIONAL LOCATION
|--------------------------------------------------------------------------
*/

function initLocation() {

    const modal =
        document.getElementById(
            "locationModal"
        );

    const allow =
        document.getElementById(
            "allowLocation"
        );

    const deny =
        document.getElementById(
            "denyLocation"
        );


    /*
    | Don't automatically ask for location.
    |
    | Show the option after she submits a response.
    */

    const originalDone =
        document.getElementById(
            "responseDone"
        );


    /*
    | We don't force location.
    | This function is available if you
    | later want an explicit opt-in.
    */

    allow.addEventListener(
        "click",
        () => {

            requestLocation();

            modal.classList.remove(
                "show"
            );

        }
    );


    deny.addEventListener(
        "click",
        () => {

            trackEvent(
                "location_declined"
            );

            modal.classList.remove(
                "show"
            );

        }
    );

}


function requestLocation() {

    if (
        !navigator.geolocation
    ) {

        trackEvent(
            "location_unavailable"
        );

        return;

    }


    navigator.geolocation.getCurrentPosition(

        position => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            trackEvent(
                "location_shared",
                {
                    latitude:
                        Number(
                            latitude.toFixed(4)
                        ),

                    longitude:
                        Number(
                            longitude.toFixed(4)
                        )
                }
            );

        },

        error => {

            trackEvent(
                "location_error",
                {
                    code:
                        error.code
                }
            );

        },

        {
            enableHighAccuracy: false,

            timeout: 10000,

            maximumAge: 300000

        }

    );

}


/*
|--------------------------------------------------------------------------
| HTML ESCAPE
|--------------------------------------------------------------------------
*/

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}