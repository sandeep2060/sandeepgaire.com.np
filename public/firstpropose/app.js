"use strict";

/* =========================================================
   ELEMENTS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const envelope = $("#envelope");
const openLetterButton = $("#openLetter");
const envelopeWrapper = $("#envelopeWrapper");
const letterSection = $("#letterSection");

const yesButton = $("#yesButton");
const noButton = $("#noButton");

const responseSection = $("#responseSection");
const responseIcon = $("#responseIcon");
const responseTitle = $("#responseTitle");
const responseText = $("#responseText");

const responseMessage = $("#responseMessage");
const sendResponse = $("#sendResponse");
const responseSuccess = $("#responseSuccess");

const characterCount = $("#characterCount");

const progress = $("#progress");

const toast = $("#toast");

let currentAnswer = null;
let musicStarted = false;


/* =========================================================
   CHECK DATA
========================================================= */

if (typeof LOVE_DATA === "undefined") {

    console.error(
        "LOVE_DATA is missing. Make sure data.js loads before script.js."
    );

} else {

    initializePage();

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializePage() {

    populateData();

    setupLetterOpening();

    setupProposal();

    setupResponse();

    setupParticles();

    setupScrollProgress();

    setupKeyboardSupport();

    setupMusic();

}


/* =========================================================
   POPULATE DATA
========================================================= */

function populateData() {

    $("#openingEyebrow").textContent =
        LOVE_DATA.opening.eyebrow;

    $("#openingTitle").innerHTML =
        `${escapeHTML(LOVE_DATA.opening.title)}
        <span>✨</span>`;

    $("#openingSubtitle").textContent =
        LOVE_DATA.opening.subtitle;


    /* Letter */

    $("#letterGreeting").textContent =
        LOVE_DATA.letter.greeting;

    const body = $("#letterBody");

    body.innerHTML = "";

    LOVE_DATA.letter.paragraphs.forEach(text => {

        const p = document.createElement("p");

        p.textContent = text;

        body.appendChild(p);

    });

    $("#letterHighlight").textContent =
        LOVE_DATA.letter.highlight;

    $("#letterClosing").textContent =
        LOVE_DATA.letter.closing;

    $("#letterSignature").textContent =
        LOVE_DATA.letter.signature;

    $("#letterSender").textContent =
        LOVE_DATA.letter.sender;


    /* Proposal */

    $("#proposalTitle").textContent =
        LOVE_DATA.proposal.title;

    $("#proposalQuestion").textContent =
        LOVE_DATA.proposal.question;

    yesButton.innerHTML =
        `${escapeHTML(LOVE_DATA.proposal.yesButton)}
        <span>❤️</span>`;

    noButton.innerHTML =
        `${escapeHTML(LOVE_DATA.proposal.noButton)}
        <span>🌷</span>`;


    /* Response */

    $("#messagePrompt").textContent =
        LOVE_DATA.response.prompt;

    $("#messageOptional").textContent =
        LOVE_DATA.response.optional;

    responseMessage.placeholder =
        LOVE_DATA.response.placeholder;

    sendResponse.textContent =
        LOVE_DATA.response.send;


    /* Date */

    const today = new Date();

    $("#letterDate").textContent =
        today.toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

}


/* =========================================================
   SAFE HTML
========================================================= */

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================================
   OPEN LETTER
========================================================= */

function setupLetterOpening() {

    if (!envelope) {

        console.error("Envelope element not found.");

        return;
    }


    /*
        IMPORTANT:

        The event listener is attached directly to
        the envelope.

        This means the letter works even if the
        user taps the envelope itself.
    */

    envelope.addEventListener(
        "click",
        openLetter
    );


    openLetterButton.addEventListener(
        "click",
        openLetter
    );


    envelope.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openLetter();

            }

        }
    );

}


function openLetter() {

    /*
        Prevent opening repeatedly.
    */

    if (
        envelope.classList.contains("open")
    ) {

        scrollToLetter();

        return;

    }


    envelope.classList.add("open");

    envelopeWrapper.classList.add("opened");


    const hint = $("#openHint");

    if (hint) {

        hint.textContent =
            "A little something from my heart...";

        hint.style.opacity = ".7";

    }


    openLetterButton.textContent =
        "Read my letter ↓";


    createHeartBurst();

    startMusic();

    trackAction("letter_opened");


    /*
        Give the envelope animation time to play
        before moving down.
    */

    setTimeout(() => {

        scrollToLetter();

    }, 900);

}


function scrollToLetter() {

    if (!letterSection) return;

    letterSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   PROPOSAL
========================================================= */

function setupProposal() {

    yesButton.addEventListener(
        "click",
        () => {

            currentAnswer = "yes";

            showResponse("yes");

            trackAction("proposal_accepted");

            createMassiveHeartBurst();

        }
    );


    noButton.addEventListener(
        "click",
        () => {

            currentAnswer = "no";

            showResponse("no");

            trackAction("proposal_rejected");

        }
    );

}


function showResponse(answer) {

    const proposalSection =
        $("#proposalSection");

    if (proposalSection) {

        proposalSection.style.display =
            "none";

    }


    responseSection.classList.add("active");


    if (answer === "yes") {

        responseIcon.textContent = "❤️";

        responseTitle.textContent =
            LOVE_DATA.proposal.yesTitle;

        responseText.textContent =
            LOVE_DATA.proposal.yesText;

    } else {

        responseIcon.textContent = "🌷";

        responseTitle.textContent =
            LOVE_DATA.proposal.noTitle;

        responseText.textContent =
            LOVE_DATA.proposal.noText;

    }


    setTimeout(() => {

        responseSection.scrollIntoView({
            behavior: "smooth"
        });

    }, 100);

}


/* =========================================================
   RESPONSE MESSAGE
========================================================= */

function setupResponse() {

    responseMessage.addEventListener(
        "input",
        () => {

            characterCount.textContent =
                responseMessage.value.length;

        }
    );


    sendResponse.addEventListener(
        "click",
        async () => {

            const message =
                responseMessage.value.trim();


            /*
                Message is OPTIONAL.
            */

            await saveResponse(
                currentAnswer,
                message
            );

        }
    );

}


/* =========================================================
   SUPABASE
========================================================= */

/*
    Put your Supabase credentials here
    ONLY if you are using Supabase.

    Keep the quotation marks.

    Example:

    const SUPABASE_URL =
        "https://xxxxx.supabase.co";

    const SUPABASE_ANON_KEY =
        "eyJhbGciOi...";

*/

const SUPABASE_URL =
    "YOUR_SUPABASE_URL";

const SUPABASE_ANON_KEY =
    "YOUR_SUPABASE_ANON_KEY";


let supabaseClient = null;


/*
    Load Supabase safely.

    The page will STILL work if Supabase
    isn't configured.
*/

async function initializeSupabase() {

    if (
        SUPABASE_URL === "YOUR_SUPABASE_URL" ||
        SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY"
    ) {

        console.warn(
            "Supabase is not configured."
        );

        return null;

    }


    if (
        typeof window.supabase === "undefined"
    ) {

        console.warn(
            "Supabase library is not loaded."
        );

        return null;

    }


    try {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_ANON_KEY
            );

        return supabaseClient;

    } catch (error) {

        console.error(
            "Supabase initialization failed:",
            error
        );

        return null;

    }

}


async function saveResponse(
    answer,
    message
) {

    sendResponse.disabled = true;

    sendResponse.textContent =
        "Saving...";


    /*
        If Supabase isn't configured,
        don't break the website.
    */

    if (!supabaseClient) {

        await initializeSupabase();

    }


    if (!supabaseClient) {

        /*
            Demo mode.

            The UI still works.
        */

        showSavedMessage();

        trackAction(
            "response_saved_demo",
            {
                answer,
                message
            }
        );

        return;

    }


    try {

        const location =
            await getLocation();


        const payload = {

            answer: answer,

            message:
                message || null,

            location_lat:
                location?.latitude ?? null,

            location_lng:
                location?.longitude ?? null,

            user_agent:
                navigator.userAgent,

            screen_width:
                window.innerWidth,

            screen_height:
                window.innerHeight,

            page_url:
                window.location.href

        };


        const { error } =
            await supabaseClient
                .from("proposal_responses")
                .insert([payload]);


        if (error) {

            console.error(
                "Supabase save failed:",
                error
            );

            showToast(
                "Your answer couldn't be saved, but it still matters. ❤️"
            );

        } else {

            showSavedMessage();

        }

    } catch (error) {

        console.error(
            "Response error:",
            error
        );

        showSavedMessage();

    }

}


function showSavedMessage() {

    responseSuccess.style.display =
        "block";

    sendResponse.textContent =
        "Saved ✓";

    responseMessage.disabled =
        true;

}


/* =========================================================
   LOCATION
========================================================= */

function getLocation() {

    return new Promise(resolve => {

        if (
            !navigator.geolocation
        ) {

            resolve(null);

            return;

        }


        navigator.geolocation.getCurrentPosition(

            position => {

                resolve({

                    latitude:
                        position.coords.latitude,

                    longitude:
                        position.coords.longitude

                });

            },

            error => {

                console.warn(
                    "Location unavailable:",
                    error.message
                );

                resolve(null);

            },

            {
                enableHighAccuracy: false,

                timeout: 7000,

                maximumAge: 300000

            }

        );

    });

}


/* =========================================================
   ACTION TRACKING
========================================================= */

async function trackAction(
    eventType,
    metadata = {}
) {

    console.log(
        "Action:",
        eventType,
        metadata
    );


    if (!supabaseClient) {

        await initializeSupabase();

    }


    if (!supabaseClient) {

        return;

    }


    try {

        const location =
            await getLocation();


        await supabaseClient
            .from("proposal_actions")
            .insert([

                {

                    event_type:
                        eventType,

                    metadata:
                        metadata,

                    location_lat:
                        location?.latitude ?? null,

                    location_lng:
                        location?.longitude ?? null,

                    page_url:
                        window.location.href,

                    user_agent:
                        navigator.userAgent,

                    screen_width:
                        window.innerWidth,

                    screen_height:
                        window.innerHeight

                }

            ]);

    } catch (error) {

        console.warn(
            "Action tracking failed:",
            error
        );

    }

}


/* =========================================================
   PARTICLES
========================================================= */

function setupParticles() {

    const canvas =
        document.getElementById("particles");

    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    let particles = [];


    function resize() {

        canvas.width =
            window.innerWidth *
            devicePixelRatio;

        canvas.height =
            window.innerHeight *
            devicePixelRatio;

        canvas.style.width =
            window.innerWidth + "px";

        canvas.style.height =
            window.innerHeight + "px";

        ctx.scale(
            devicePixelRatio,
            devicePixelRatio
        );


        particles =
            Array.from(
                {
                    length:
                        window.innerWidth < 600
                            ? 55
                            : 100
                },
                createParticle
            );

    }


    function createParticle() {

        return {

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            r:
                Math.random() *
                    1.5 +
                .3,

            speed:
                Math.random() *
                    .35 +
                .05,

            alpha:
                Math.random() *
                    .7 +
                .2

        };

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        particles.forEach(p => {

            p.y -= p.speed;


            if (p.y < -5) {

                p.y =
                    window.innerHeight + 5;

                p.x =
                    Math.random() *
                    window.innerWidth;

            }


            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.r,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255,190,220,${p.alpha})`;

            ctx.fill();

        });


        requestAnimationFrame(
            animate
        );

    }


    window.addEventListener(
        "resize",
        resize
    );


    resize();

    animate();

}


/* =========================================================
   HEART EFFECT
========================================================= */

function createHeartBurst() {

    const hearts = [
        "❤️",
        "💗",
        "💕",
        "✨",
        "🌸"
    ];


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const heart =
            document.createElement("div");

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.position =
            "fixed";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.zIndex =
            "999";

        heart.style.pointerEvents =
            "none";

        heart.style.fontSize =
            `${12 + Math.random() * 18}px`;


        document.body.appendChild(
            heart
        );


        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            80 +
            Math.random() *
            220;


        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        heart.animate(

            [

                {
                    transform:
                        "translate(-50%,-50%) scale(.3)",

                    opacity: 0

                },

                {

                    transform:
                        "translate(-50%,-50%) scale(1)",

                    opacity: 1

                },

                {

                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(.5)`,

                    opacity: 0

                }

            ],

            {

                duration:
                    1200 +
                    Math.random() * 700,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"

            }

        );


        setTimeout(
            () => heart.remove(),
            2000
        );

    }

}


function createMassiveHeartBurst() {

    createHeartBurst();

    createHeartBurst();


    if (
        typeof confetti !==
        "undefined"
    ) {

        confetti({

            particleCount: 180,

            spread: 100,

            startVelocity: 35,

            origin: {
                y: .55
            },

            colors: [
                "#ff4f91",
                "#ff9fc4",
                "#ffffff",
                "#a855f7"
            ]

        });

    }

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function setupScrollProgress() {

    window.addEventListener(
        "scroll",
        () => {

            const scrollTop =
                window.scrollY;

            const height =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            const percent =
                height > 0
                    ? (scrollTop / height) * 100
                    : 0;


            progress.style.width =
                `${percent}%`;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   KEYBOARD
========================================================= */

function setupKeyboardSupport() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                envelope.blur();

            }

        }
    );

}


/* =========================================================
   MUSIC
========================================================= */

let audioContext = null;
let masterGain = null;
let oscillators = [];


function setupMusic() {

    const button =
        $("#musicButton");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            if (!musicStarted) {

                startMusic();

            } else {

                stopMusic();

            }

        }
    );

}


function startMusic() {

    if (musicStarted) return;


    try {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        masterGain =
            audioContext.createGain();


        masterGain.gain.value =
            0.025;


        masterGain.connect(
            audioContext.destination
        );


        const notes = [
            174,
            220,
            261.63,
            329.63
        ];


        notes.forEach(
            (frequency, index) => {

                const oscillator =
                    audioContext.createOscillator();

                const gain =
                    audioContext.createGain();


                oscillator.type =
                    "sine";

                oscillator.frequency.value =
                    frequency;


                gain.gain.value =
                    0.025;


                oscillator.connect(gain);

                gain.connect(
                    masterGain
                );


                oscillator.detune.value =
                    index * 3;


                oscillator.start();


                oscillators.push(
                    oscillator
                );

            }
        );


        musicStarted = true;

        $("#musicButton")
            .classList.add("playing");

    } catch (error) {

        console.warn(
            "Music unavailable:",
            error
        );

    }

}


function stopMusic() {

    if (!audioContext) return;


    try {

        oscillators.forEach(
            oscillator => {

                oscillator.stop();

            }
        );

        oscillators = [];

        audioContext.close();

        audioContext = null;

        masterGain = null;

        musicStarted = false;

        $("#musicButton")
            .classList.remove("playing");

    } catch (error) {

        console.warn(
            error
        );

    }

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const text =
        toast.querySelector("p");

    text.textContent =
        message;

    toast.classList.add("show");


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        3500
    );

}