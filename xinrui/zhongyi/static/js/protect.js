/* 防爬虫 + 防复制 — XinRui.TECH */

// 禁止右键
document.addEventListener("contextmenu", function(e) { e.preventDefault(); });

// 禁止选择文字（知识内容区域）
document.addEventListener("selectstart", function(e) {
    if (e.target.closest && e.target.closest(".wiki-content")) {
        e.preventDefault();
    }
});

// 禁止常见快捷键：Ctrl+C, Ctrl+U, Ctrl+S, F12
document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "s" || e.key === "a")) {
        if (e.target.closest && e.target.closest(".wiki-content")) {
            e.preventDefault();
        }
    }
    if (e.key === "F12") {
        e.preventDefault();
    }
});

// 禁止拖拽文字
document.addEventListener("dragstart", function(e) { e.preventDefault(); });

// 打印时加水印提示
window.addEventListener("beforeprint", function() {
    document.title = document.title + " — XinRui.TECH 版权所有";
});

// 检测 DevTools（基础检测）
(function() {
    var threshold = 160;
    setInterval(function() {
        if (window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold) {
            document.body.innerHTML = "<h1 style='text-align:center;margin-top:20%;color:#8B2500;'>请关闭开发者工具</h1>";
        }
    }, 2000);
})();
