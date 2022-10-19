window.addEventListener("DOMContentLoaded", e => {
    startRecording();
})

async function startRecording() {
    const getPermission = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
    const recorder = new MediaRecorder(getPermission, {mimeType: "video/webm; codecs=vp8"});
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data)

    recorder.onstop = () => {
        const videoTrack = getPermission.getVideoTracks()[0];
        videoTrack.stop();
        
        const blob = new Blob(chunks, {type: chunks[0].type});
        let url = window.URL.createObjectURL(blob)

        const link = window.document.createElement("a");
        link.href = url;
        link.download = "recording.webm"

        document.body.appendChild(link);
        link.click()

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        document.getElementById("close").innerText = "You can close this window now!"
    }

    recorder.start();
}

