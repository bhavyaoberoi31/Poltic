export const captureFrameFromVideo = (videoUrl) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.src = videoUrl;
        video.muted = true;
        video.playsInline = true;

        video.addEventListener('loadeddata', () => {
            const seekTime = Math.min(1, video.duration - 0.1);
            video.currentTime = seekTime;
        });

        video.addEventListener('seeked', () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageUrl = canvas.toDataURL('image/png');
                resolve(imageUrl);
            } catch (err) {
                reject(err);
            }
        });

        video.addEventListener('error', (err) => {
            reject('Failed to load video: ' + err.message);
        });
    });
};
