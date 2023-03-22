function scrollToBottom() {
    // for some reason, the scroll to bottom doesn't work without the setTimeout (even if the timeout is 0)
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }, 0)
}

export { scrollToBottom };