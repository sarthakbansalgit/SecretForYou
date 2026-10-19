(function () {
    "use strict";

    var gate = document.getElementById("passcodeGate");
    var form = document.getElementById("passcodeForm");
    var input = document.getElementById("passcode");
    var message = document.getElementById("passcodeMessage");
    var gallery = document.getElementById("loveGallery");
    var song = document.getElementById("loveSong");
    var musicToggle = document.getElementById("musicToggle");
    var musicLabel = document.getElementById("musicLabel");
    var passcode = "24022406";

    if (!gate || !form || !input || !message || !gallery) {
        return;
    }

    input.focus();

    function setMusicState(isPlaying) {
        musicToggle.classList.toggle("music-playing", isPlaying);
        musicToggle.setAttribute("aria-pressed", String(isPlaying));
        musicToggle.setAttribute("aria-label", isPlaying ? "Pause love song" : "Play love song");
        musicLabel.textContent = isPlaying ? "Playing" : "Our song";
    }

    function playSong() {
        if (!song) {
            return;
        }
        window.LoveMusicSync.claim("timeline");
        song.play().then(function () {
            setMusicState(true);
        }).catch(function () {
            window.LoveMusicSync.release("timeline");
            musicLabel.textContent = "Tap to play";
        });
    }

    if (song && musicToggle) {
        song.addEventListener("play", function () {
            window.LoveMusicSync.claim("timeline");
            setMusicState(true);
        });
        song.addEventListener("pause", function () {
            window.LoveMusicSync.release("timeline");
            setMusicState(false);
        });
        musicToggle.addEventListener("click", function () {
            if (song.paused) {
                playSong();
            } else {
                song.pause();
            }
        });
        window.LoveMusicSync.watch("timeline", song);
        window.addEventListener("pagehide", function () {
            song.pause();
            window.LoveMusicSync.release("timeline");
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        message.textContent = "";
        input.classList.remove("passcode-error");

        if (input.value === passcode) {
            gate.classList.add("passcode-gate-hidden");
            document.body.classList.remove("passcode-locked");
            gallery.classList.add("love-gallery-visible");
            playSong();
            window.setTimeout(function () {
                gate.remove();
            }, 500);
            return;
        }

        input.value = "";
        input.classList.add("passcode-error");
        message.textContent = "That secret code is not quite right.";
        input.focus();
    });

    document.querySelectorAll(".tilt-card").forEach(function (card) {
        card.addEventListener("pointermove", function (event) {
            var bounds = card.getBoundingClientRect();
            var x = (event.clientX - bounds.left) / bounds.width - 0.5;
            var y = (event.clientY - bounds.top) / bounds.height - 0.5;
            card.style.transform = "perspective(1000px) rotateY(" + (x * 5) + "deg) rotateX(" + (y * -5) + "deg) translateY(-6px)";
        });
        card.addEventListener("pointerleave", function () {
            card.style.transform = "";
        });
    });

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("timeline-item-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });
        document.querySelectorAll(".timeline-item").forEach(function (item) {
            revealObserver.observe(item);
        });
    } else {
        document.querySelectorAll(".timeline-item").forEach(function (item) {
            item.classList.add("timeline-item-visible");
        });
    }
}());
