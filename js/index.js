const notificationBtn = document.querySelector('#notification-btn');
const alertParagraph = document.querySelector('p');
alertParagraph.innerHTML = document.visibilityState;
alertParagraph.innerHTML += "     " + "Notification is =" + ("Notification" in window)


const permission = await Notification.requestPermission();
const registration = await navigator.serviceWorker.register("./js/sw.js");

navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data === "activated") {
        window.location.reload();
    }
});


try {
    await registration.showNotification("from outside sw")
    const n = new Notification("from outside notif api");
    setTimeout(() => {
        n.close();
    }, 3000)
} catch (err) {
    alertParagraph.innerHTML += "  we got serious errors--" + err.message;
    console.log(err)
}

notificationBtn.addEventListener("click", async () => {

    if (permission === "granted") {
        alertParagraph.innerHTML += "    granted";
        registration.active.postMessage({
            type: "notification"
        });

    }
})