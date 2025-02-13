const notificationBtn = document.querySelector('#notification-btn');
let registration;


if (typeof navigator.serviceWorker !== "undefined") {
    registration = await navigator.serviceWorker.register("./js/sw.js");

    await registration.showNotification("from outside")

    navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data === "activated") {
            window.location.reload();
        }
    });
}

notificationBtn.addEventListener("click",async ()=>{
    const permission = await Notification.requestPermission();
    if(permission === "granted"){
        registration.active.postMessage({
            type: "notification"
        });
    }
})