const notificationBtn = document.querySelector('#notification-btn');

notificationBtn.addEventListener("click",async ()=>{
    const permission = await Notification.requestPermission();
    if(permission === "granted"){
        new Notification("Hello World");
    }
})