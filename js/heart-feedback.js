(function () {
    "use strict";

    var nextButton = document.getElementById("nextButton");
    var modal = document.getElementById("feedbackModal");
    var closeButton = document.getElementById("feedbackClose");
    var actions = document.getElementById("feedbackActions");
    var feelingForm = document.getElementById("feelingForm");
    var feelingInput = document.getElementById("feelingInput");
    var result = document.getElementById("feedbackResult");
    var title = document.getElementById("feedbackTitle");
    var text = document.getElementById("feedbackText");
    var previousFocus;

    if (!nextButton || !modal || !closeButton || !actions || !feelingForm || !feelingInput || !result) {
        return;
    }

    function openModal() {
        previousFocus = document.activeElement;
        title.textContent = "Did you like it, Aayushi?";
        text.textContent = "This little universe was made just for you.";
        actions.innerHTML = "<button class=\"feedback-choice\" type=\"button\" data-answer=\"yes\">Yes, I loved it</button>" +
            "<button class=\"feedback-choice feedback-choice-soft\" type=\"button\" data-answer=\"no\">No</button>";
        actions.hidden = false;
        feelingForm.hidden = true;
        result.textContent = "";
        modal.hidden = false;
        document.body.classList.add("feedback-open");
        window.setTimeout(function () {
            closeButton.focus();
        }, 0);
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove("feedback-open");
        if (previousFocus) {
            previousFocus.focus();
        }
    }

    function chooseAnswer() {
        title.textContent = "Really, are you sure?";
        text.textContent = "Choose once more, from your heart.";
        actions.innerHTML = "<button class=\"feedback-choice\" type=\"button\" data-confirm=\"yes\">Yes, I am sure</button>" +
            "<button class=\"feedback-choice feedback-choice-soft\" type=\"button\" data-confirm=\"no\">No</button>";
        actions.hidden = false;
        feelingForm.hidden = true;
        result.textContent = "";
    }

    function confirmAnswer(confirm) {
        actions.hidden = true;
        if (confirm === "yes") {
            text.textContent = "That makes my heart so happy. One last little thing...";
            feelingForm.hidden = false;
            feelingInput.focus();
        } else {
            text.textContent = "Aww babe, I will try better next time.";
            result.textContent = "I will keep making every chapter more beautiful for you ♡";
            closeButton.focus();
        }
    }

    nextButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    actions.addEventListener("click", function (event) {
        var choice = event.target.closest("[data-answer], [data-confirm]");
        if (choice && choice.hasAttribute("data-answer")) {
            chooseAnswer(choice.getAttribute("data-answer"));
        } else if (choice) {
            confirmAnswer(choice.getAttribute("data-confirm"));
        }
    });
    feelingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        result.textContent = feelingInput.value.trim()
            ? "Thank you. Text me on Insta what you felt ♡"
            : "Text me on Insta what you felt ♡";
        feelingForm.hidden = true;
        feelingInput.value = "";
        closeButton.focus();
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });
}());
