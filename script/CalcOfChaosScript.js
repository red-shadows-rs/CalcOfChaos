(function () {
    const exprEl = document.getElementById('expr');
    const outEl = document.getElementById('out');
    const equalsBtn = document.getElementById('equals');
    const overlay = document.getElementById('overlay');
    const modalClose = document.getElementById('modalClose');
    const videoFrame = document.getElementById('videoFrame');

    let alertModal = document.createElement('div');
    alertModal.className = 'alert-modal';
    alertModal.innerHTML = `
        <div class="alert-box">
            <p>Please enter an expression first!</p>
            <button id="alertClose">OK</button>
        </div>
    `;
    document.body.appendChild(alertModal);
    const alertClose = alertModal.querySelector('#alertClose');
    alertClose.addEventListener('click', () => {
        alertModal.classList.remove('active');
    });

    let expression = '';

    function render() {
        exprEl.textContent = expression || '0';
        outEl.textContent = expression || '0';
    }

    document.querySelectorAll('button.key').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const value = btn.dataset.value;
            if (action === 'clear') {
                expression = '';
                render();
                return;
            }
            if (btn === equalsBtn) return;
            expression += value;
            render();
        });
    });

    const videos = [
        "https://www.youtube.com/embed/ujr8N-vFaYg?si=4j9CbMYi6-aKh2Wu",
        "https://www.youtube.com/embed/1PdJPCNoUpU?si=80L01MbqWS4H0Jm0",
    ];

    equalsBtn.addEventListener('click', () => {
        if (expression.trim() === '') {
            showAlert();
            return;
        }
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        videoFrame.src = randomVideo;
        openModal();
    });

    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (key === 'Escape') {
            expression = '';
            render();
            return;
        }

        if (key === '=' || key === 'Enter') {
            if (expression.trim() === '') {
                showAlert();
                return;
            }
            const randomVideo = videos[Math.floor(Math.random() * videos.length)];
            videoFrame.src = randomVideo;
            openModal();
            return;
        }

        if (key === 'Backspace') {
            expression = expression.slice(0, -1);
            render();
            return;
        }

        if (/[\d+\-*/.]/.test(key)) {
            expression += key;
            render();
        }
    });

    function openModal() {
        overlay.classList.add('active');
    }

    function closeModal() {
        overlay.classList.remove('active');
        videoFrame.src = "";
    }

    function showAlert() {
        alertModal.classList.add('active');
    }

    modalClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
    });

    render();
})();
