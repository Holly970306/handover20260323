(function() {
    var PASS = '@pm970306';
    // Skip auth check if loaded inside an iframe (main.html already gates access)
    if (window.self !== window.top) return;
    if (sessionStorage.getItem('authed') === 'yes') return;

    // Hide page content
    document.documentElement.style.visibility = 'hidden';

    document.addEventListener('DOMContentLoaded', function() {
        document.documentElement.style.visibility = 'hidden';

        // Create overlay
        var overlay = document.createElement('div');
        overlay.id = 'authOverlay';
        overlay.innerHTML =
            '<div style="position:fixed;inset:0;background:linear-gradient(135deg,#0F2854,#1C4D8D);display:flex;align-items:center;justify-content:center;z-index:99999;font-family:Microsoft JhengHei,Segoe UI,sans-serif">' +
                '<div style="background:rgba(255,255,255,0.08);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:48px 40px;text-align:center;max-width:380px;width:90%">' +
                    '<div style="font-size:2.5em;margin-bottom:12px">&#x1F512;</div>' +
                    '<h2 style="color:#fff;font-size:1.3em;margin-bottom:8px">access required</h2>' +
                    '<p style="color:rgba(189,232,245,0.7);font-size:0.88em;margin-bottom:28px">enter password</p>' +
                    '<input id="authPw" type="password" placeholder="password" autocomplete="off" style="width:100%;padding:14px 18px;border:1px solid rgba(255,255,255,0.25);border-radius:12px;background:rgba(255,255,255,0.1);color:#fff;font-size:1em;outline:none;text-align:center;letter-spacing:4px;margin-bottom:16px">' +
                    '<div id="authErr" style="color:#f56565;font-size:0.85em;min-height:20px;margin-bottom:12px"></div>' +
                    '<button id="authBtn" style="width:100%;padding:13px;border:none;border-radius:12px;background:#4988C4;color:#fff;font-size:1em;font-weight:600;cursor:pointer;transition:background 0.2s">enter</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);
        overlay.style.visibility = 'visible';

        var pwInput = document.getElementById('authPw');
        var errMsg = document.getElementById('authErr');
        var btn = document.getElementById('authBtn');

        function tryAuth() {
            if (pwInput.value === PASS) {
                sessionStorage.setItem('authed', 'yes');
                overlay.remove();
                document.documentElement.style.visibility = '';
            } else {
                errMsg.textContent = 'incorrect password';
                pwInput.value = '';
                pwInput.style.borderColor = '#f56565';
                setTimeout(function() {
                    pwInput.style.borderColor = 'rgba(255,255,255,0.25)';
                    errMsg.textContent = '';
                }, 1500);
            }
        }

        btn.addEventListener('click', tryAuth);
        pwInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') tryAuth();
        });
        pwInput.focus();
    });
})();
