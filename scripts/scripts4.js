$(document).ready(function() {
    let currentAudio = document.getElementById('audio-1');
    let isPlaying = false;
    const playBtn = $('.play-btn');
    const progressBar = $('.progress-bar');
    const progress = $('.progress');

    $('input').on('change', function() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            isPlaying = false;
            playBtn.attr('src', './imgs/play.png');
        }
        
        const songId = $('input[name="music"]:checked').attr('id');
        const audioId = songId.replace('item', 'audio');
        currentAudio = document.getElementById(audioId);
    });

    playBtn.on('click', function() {
        if (!isPlaying) {
            const playPromise = currentAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    playBtn.attr('src', './imgs/pause.png');
                })
                .catch(error => {
                    console.error('播放失败:', error);
                });
            }
        } else {
            currentAudio.pause();
            playBtn.attr('src', './imgs/play.png');
        }
        isPlaying = !isPlaying;
    });

    function updateProgress() {
        if (currentAudio && !currentAudio.paused) {
            const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
            progress.css('width', percentage + '%');
            
            const currentTime = formatTime(currentAudio.currentTime);
            const duration = formatTime(currentAudio.duration);
            const timeDisplay = currentTime + ' / ' + duration;
            
            const songId = $('input[name="music"]:checked').attr('id');
            const songIndex = songId.split('-')[1];
            $(`#song-info-${songIndex} .time`).text(timeDisplay);
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    progressBar.on('click', function(e) {
        if (currentAudio) {
            const clickPosition = (e.offsetX / progressBar.width());
            currentAudio.currentTime = clickPosition * currentAudio.duration;
            progress.css('width', (clickPosition * 100) + '%');
        }
    });

    setInterval(updateProgress, 100);

    $('audio').on('ended', function() {
        isPlaying = false;
        playBtn.attr('src', './imgs/play.png');
        progress.css('width', '0%');
    });

    $('audio').on('error', function(e) {
        console.error('音频加载错误:', this.id);
        console.error('错误详情:', e.target.error);
    });
});