/* 分享链接生成 — XinRui.TECH
 *
 * 流程：调用 /api/share 生成签名链接，Worker 端验证。
 * 已登录用户才能看到分享按钮。
 */

function openShareDialog() {
    document.getElementById("share-modal").style.display = "flex";
    document.getElementById("share-result").style.display = "none";
    document.getElementById("share-copied").style.display = "none";
}

function closeShareDialog() {
    document.getElementById("share-modal").style.display = "none";
}

async function generateShare(hours) {
    var path = window.location.pathname;

    try {
        var resp = await fetch("/api/share", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({path: path, hours: hours}),
        });
        if (!resp.ok) throw new Error("生成失败");
        var data = await resp.json();
        var shareUrl = window.location.origin + data.url;

        document.getElementById("share-url").value = shareUrl;
        document.getElementById("share-result").style.display = "block";
        document.getElementById("share-copied").style.display = "none";
    } catch (e) {
        alert("生成分享链接失败: " + e.message);
    }
}

function copyShareUrl() {
    var input = document.getElementById("share-url");
    input.select();
    navigator.clipboard.writeText(input.value).then(function() {
        document.getElementById("share-copied").style.display = "block";
    });
}

// 点击 modal 外部关闭
document.addEventListener("click", function(e) {
    var modal = document.getElementById("share-modal");
    if (e.target === modal) {
        closeShareDialog();
    }
});
