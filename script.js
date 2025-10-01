// --- 設定項目 ---
// 迷路に隠すQRコードのIDを30種類登録します (ここは変更なし)
const STAMP_IDS = [
    'オバケ', 'bat', 'spider', 'cat', 'pumpkin', 'skull', 'witch', 'mummy', 
    'zombie', 'crow', 'vampire', 'werewolf', 'candy', 'potion', 'cauldron', 
    'eyeball', 'bone', 'knife', 'coffin', 'grave', 'candle', 'book', 'key', 
    'door', 'moon', 'web', 'chain', 'scream', 'broom', 'haunted-house'
];
// STAMP_EMOJIS の定義は不要になったので削除します

// --- ここから下は変更しなくてOK ---
document.addEventListener('DOMContentLoaded', () => {
    const stampCard = document.getElementById('stamp-card');
    const stampCountEl = document.getElementById('stamp-count');
    const messageArea = document.getElementById('message-area');
    const teamNameDisplay = document.getElementById('team-name-display');

    let teamName = localStorage.getItem('teamName');
    if (!teamName) {
        teamName = prompt("チーム名（または名前）を入力してください");
        if (teamName) {
            localStorage.setItem('teamName', teamName);
        } else {
            alert("名前が入力されなかったので、やり直してください。");
            return;
        }
    }
    teamNameDisplay.textContent = `ようこそ、${teamName} さん！`;

    const urlParams = new URLSearchParams(window.location.search);
    const newStampId = urlParams.get('id');

    let collectedStamps = JSON.parse(localStorage.getItem('collectedStamps')) || [];
    if (newStampId && STAMP_IDS.includes(newStampId) && !collectedStamps.includes(newStampId)) {
        collectedStamps.push(newStampId);
        localStorage.setItem('collectedStamps', JSON.stringify(collectedStamps));
        // メッセージを少し変更
        messageArea.textContent = `「${newStampId}」のスタンプをゲット！`;
    }

    // ▼▼▼ ここからが画像を表示するための修正箇所です ▼▼▼
    stampCard.innerHTML = '';
    STAMP_IDS.forEach(id => {
        const stampEl = document.createElement('div');
        stampEl.classList.add('stamp');
        
        const imgEl = document.createElement('img');

        if (collectedStamps.includes(id)) {
            // スタンプ取得済みの場合
            stampEl.classList.add('collected');
            imgEl.src = `images/${id}.png`; // 例: images/ghost.png
            imgEl.alt = id;
        } else {
            // スタンプ未取得の場合
            imgEl.src = 'images/question.png'; // 共通の「？」画像
            imgEl.alt = '未取得';
        }
        
        stampEl.appendChild(imgEl);
        stampCard.appendChild(stampEl);
    });
    // ▲▲▲ ここまでが修正箇所です ▲▲▲
    
    stampCountEl.textContent = collectedStamps.length;
    document.getElementById('header-title').textContent = collectedStamps.length >= STAMP_IDS.length ? "🎉コンプリート！🎉" : "お化け迷路スタンプラリー";
});