window.addEventListener('DOMContentLoaded', (event) => {
    let record_btn = document.getElementById("record_btn");
    record_btn.addEventListener("click", startRecording)
});

async function startRecording() {
    const getPermission = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
    const recorder = new MediaRecorder(getPermission, {mimeType: "video/webm; codecs=vp8"});
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);

    recorder.onstop = () => {
        const videoTrack = getPermission.getVideoTracks()[0];
        videoTrack.stop();
        
        const blob = new Blob(chunks, {type: chunks[0].type});

        const link = window.document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "recording.webm"

        document.body.appendChild(link);
        link.click()
    }

    recorder.start();  
}
