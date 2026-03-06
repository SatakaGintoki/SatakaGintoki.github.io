/* =========================================
   学术 + Mac 风格 - JavaScript
   Academic & Mac Style Theme
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {

  // === 1. 创建柔和粒子背景 ===
  function createParticles() {
    const header = document.getElementById('page-header');
    if (!header || !header.classList.contains('full_page')) return;

    let container = document.getElementById('particles-cyber');
    if (!container) {
      container = document.createElement('div');
      container.id = 'particles-cyber';
      header.appendChild(container);
    }

    const colors = ['#0071e3', '#30d158', '#ff9f0a', '#bf5af2', '#64d2ff'];
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const c = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        background: ${c};
        box-shadow: 0 0 8px ${c};
        opacity: 0.15;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${6 + Math.random() * 6}s`;
      container.appendChild(p);
    }
  }

  // === 2. 创建像素猫咪 - 参考图片设计 ===
  function createPixelCat() {
    const header = document.getElementById('page-header');
    if (!header || !header.classList.contains('full_page')) return;
    if (document.querySelector('.pixel-cat-container')) return;

    const container = document.createElement('div');
    container.className = 'pixel-cat-container';
    container.innerHTML = '<canvas id="pixelCat" width="280" height="320"></canvas><div class="pixel-cat-shadow"></div>';
    header.appendChild(container);

    const canvas = document.getElementById('pixelCat');
    const ctx = canvas.getContext('2d');
    const ps = 5; // 像素大小

    // 参考图片配色
    const C = {
      body: '#2a2a2a',         // 深黑色身体
      bodyLight: '#3a3a3a',    // 身体高光
      eye: '#4ade80',          // 明亮绿色眼睛
      eyeDark: '#22c55e',      // 眼睛暗部
      eyeShine: '#ffffff',     // 眼睛高光
      nose: '#f472b6',         // 粉色鼻子
      earInner: '#f9a8d4',     // 粉色耳朵内部
      whisker: '#9ca3af',      // 灰白胡须
      belly: '#3a3a3a'         // 肚子
    };

    // 像素猫咪图案 - 模拟图片中的坐姿猫咪
    // 0=透明, 1=身体, 2=耳朵内部, 3=眼睛, 4=眼睛高光, 5=鼻子, 6=肚子/高光, 7=浅色身体
    const catPattern = [
      // 左耳 (三角形)
      [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
      [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
      [0,0,0,1,1,2,2,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,2,2,1,1,0,0,0],
      [0,0,1,1,2,2,2,2,1,1,1,1,1,0,0,0,0,1,1,1,1,1,2,2,2,2,1,1,0,0],
      [0,0,1,1,2,2,2,2,1,1,1,1,1,0,0,0,0,1,1,1,1,1,2,2,2,2,1,1,0,0],
      // 头部 (圆润)
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,7,7,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,7,7,1,1,1,0],
      // 眼睛
      [0,1,1,7,7,7,7,1,1,3,3,3,3,1,1,1,1,3,3,3,3,1,1,7,7,7,7,1,1,0],
      [0,1,1,1,1,1,1,1,1,3,4,4,3,1,1,1,1,3,4,4,3,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,3,3,3,3,1,1,1,1,3,3,3,3,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      // 鼻子区域
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      // 身体
      [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
      [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,0,1,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,1,0,0,0],
      [0,0,0,1,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,1,0,0,0],
      [0,0,0,1,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,1,0,0,0],
      [0,0,0,1,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,1,0,0,0],
      [0,0,0,1,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
      // 前爪
      [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,0,1,1,1,1,1,7,7,7,0,0,0,0,0,7,7,7,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,0,0,1,1,1,7,7,7,7,0,0,0,0,0,7,7,7,7,1,1,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
    ];

    const colorMap = {
      0: null,
      1: C.body,
      2: C.earInner,
      3: C.eye,
      4: C.eyeShine,
      5: C.nose,
      6: C.belly,
      7: C.bodyLight
    };

    // 眨眼版本
    const catBlink = JSON.parse(JSON.stringify(catPattern));
    catBlink[10] = [0,1,1,7,7,7,7,1,1,3,3,3,3,1,1,1,1,3,3,3,3,1,1,7,7,7,7,1,1,0];
    catBlink[11] = [0,1,1,1,1,1,1,1,1,3,3,3,3,1,1,1,1,3,3,3,3,1,1,1,1,1,1,1,1,0];
    catBlink[12] = [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0];

    let isBlinking = false;
    let frame = 0;

    function drawCat(blink) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pattern = blink ? catBlink : catPattern;

      // 绘制猫咪
      for (let y = 0; y < pattern.length; y++) {
        for (let x = 0; x < pattern[y].length; x++) {
          const color = colorMap[pattern[y][x]];
          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * ps, y * ps, ps, ps);
          }
        }
      }

      // 尾巴
      ctx.fillStyle = C.body;
      for (let i = 0; i < 7; i++) {
        const ty = 22 - i + Math.sin(frame * 0.06 + i * 0.4) * 0.8;
        ctx.fillRect((25 + i) * ps, ty * ps, ps, ps * 2);
      }

      // 胡须
      ctx.strokeStyle = C.whisker;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      // 左胡须
      ctx.beginPath();
      ctx.moveTo(8 * ps, 14 * ps); ctx.lineTo(3 * ps, 13 * ps);
      ctx.moveTo(8 * ps, 15 * ps); ctx.lineTo(2 * ps, 15 * ps);
      ctx.moveTo(8 * ps, 16 * ps); ctx.lineTo(3 * ps, 17 * ps);
      // 右胡须
      ctx.moveTo(22 * ps, 14 * ps); ctx.lineTo(27 * ps, 13 * ps);
      ctx.moveTo(22 * ps, 15 * ps); ctx.lineTo(28 * ps, 15 * ps);
      ctx.moveTo(22 * ps, 16 * ps); ctx.lineTo(27 * ps, 17 * ps);
      ctx.stroke();
    }

    function animate() {
      frame++;
      if (frame % 100 === 0) {
        isBlinking = true;
        setTimeout(() => { isBlinking = false; }, 120);
      }
      drawCat(isBlinking);
      requestAnimationFrame(animate);
    }

    animate();
  }

  // === 3. 终端命令行 ===
  function createTerminalBar() {
    if (document.querySelector('.terminal-bar')) return;

    const bar = document.createElement('div');
    bar.className = 'terminal-bar';

    const cmds = ['whoami', 'echo "欢迎来到我的博客"', 'cat README.md', 'ls ~/posts/', 'echo "记录学习与生活"', 'python -c "print(\'喵~\')"'];
    let ci = 0, ch = 0, del = false;

    bar.innerHTML = '<span class="terminal-text"></span><span class="terminal-cursor"></span>';
    document.body.appendChild(bar);

    const t = bar.querySelector('.terminal-text');

    function type() {
      const c = cmds[ci];
      if (del) {
        t.textContent = c.substring(0, --ch);
        if (!ch) { del = false; ci = (ci + 1) % cmds.length; setTimeout(type, 500); return; }
        setTimeout(type, 25);
      } else {
        t.textContent = c.substring(0, ++ch);
        if (ch === c.length) { setTimeout(() => { del = true; type(); }, 2500); return; }
        setTimeout(type, 80);
      }
    }
    setTimeout(type, 1000);
  }

  // 初始化
  createParticles();
  createPixelCat();
  createTerminalBar();

  console.log('%c🐱 像素猫咪已加载', 'color: #4ade80; font-size: 14px;');
});