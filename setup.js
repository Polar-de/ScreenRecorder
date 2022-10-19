window.addEventListener('DOMContentLoaded', (event) => {
    let record_btn = document.getElementById("record_btn");
    record_btn.addEventListener("click", e => {
        var popup =  window.open("record.html", "Recording...", "width=800, height=600");
        window.close();
    })
});