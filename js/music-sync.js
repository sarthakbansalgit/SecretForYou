(function () {
    "use strict";

    var activeSongKey = "love-site-active-song";

    window.LoveMusicSync = {
        claim: function (songId) {
            try {
                window.localStorage.setItem(activeSongKey, songId);
            } catch (error) {
                return;
            }
        },
        release: function (songId) {
            try {
                if (window.localStorage.getItem(activeSongKey) === songId) {
                    window.localStorage.removeItem(activeSongKey);
                }
            } catch (error) {
                return;
            }
        },
        watch: function (songId, song) {
            window.addEventListener("storage", function (event) {
                if (event.key === activeSongKey && event.newValue !== songId && !song.paused) {
                    song.pause();
                }
            });
        }
    };
}());
