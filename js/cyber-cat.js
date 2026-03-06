/* =========================================
   赛博猫咪 + 终端控制台 - JavaScript
   Cyber Cat Terminal Theme
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {

  // === 1. 创建粒子背景 ===
  function createParticles() {
    const header = document.getElementById('page-header');
    if (!header) return;

    // 创建粒子容器
    let particlesContainer = document.getElementById('particles-cyber');
    if (!particlesContainer) {
      particlesContainer = document.createElement('div');
      particlesContainer.id = 'particles-cyber';
      header.style.position = 'relative';
      header.appendChild(particlesContainer);
    }

    // 生成30个粒子
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (5 + Math.random() * 5) + 's';

      // 随机颜色
      const colors = ['#05d9e8', '#ff2a6d', '#7b2cbf', '#00ff9f'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      particle.style.boxShadow = `0 0 6px ${color}, 0 0 12px ${color}`;

      particlesContainer.appendChild(particle);
    }
  }

  // === 2. 创建赛博猫咪 SVG ===
  function createCyberCat() {
    const header = document.getElementById('page-header');
    if (!header) return;

    // 检查是否已存在
    if (document.querySelector('.cyber-cat-container')) return;

    const catContainer = document.createElement('div');
    catContainer.className = 'cyber-cat-container';
    catContainer.innerHTML = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- 猫耳朵 -->
        <polygon points="20,35 30,5 40,35" fill="#1a1a2e" stroke="#05d9e8" stroke-width="1.5"/>
        <polygon points="60,35 70,5 80,35" fill="#1a1a2e" stroke="#05d9e8" stroke-width="1.5"/>

        <!-- 猫头 -->
        <ellipse cx="50" cy="55" rx="35" ry="30" fill="#1a1a2e" stroke="#05d9e8" stroke-width="1.5"/>

        <!-- 内耳 -->
        <polygon points="25,30 30,12 35,30" fill="#ff2a6d" opacity="0.5"/>
        <polygon points="65,30 70,12 75,30" fill="#ff2a6d" opacity="0.5"/>

        <!-- 眼睛 -->
        <ellipse class="cyber-cat-eye" cx="35" cy="50" rx="8" ry="10" fill="#05d9e8"/>
        <ellipse class="cyber-cat-eye" cx="65" cy="50" rx="8" ry="10" fill="#05d9e8"/>

        <!-- 眼睛高光 -->
        <circle cx="38" cy="47" r="3" fill="#fff" opacity="0.8"/>
        <circle cx="68" cy="47" r="3" fill="#fff" opacity="0.8"/>

        <!-- 瞳孔 -->
        <ellipse cx="35" cy="50" rx="3" ry="6" fill="#0a0a0f"/>
        <ellipse cx="65" cy="50" rx="3" ry="6" fill="#0a0a0f"/>

        <!-- 鼻子 -->
        <polygon points="50,60 46,65 54,65" fill="#ff2a6d"/>

        <!-- 嘴巴 -->
        <path d="M 44 68 Q 50 72 56 68" stroke="#05d9e8" stroke-width="1.5" fill="none"/>

        <!-- 胡须 -->
        <line x1="25" y1="58" x2="10" y2="55" stroke="#05d9e8" stroke-width="1"/>
        <line x1="25" y1="62" x2="8" y2="65" stroke="#05d9e8" stroke-width="1"/>
        <line x1="75" y1="58" x2="90" y2="55" stroke="#05d9e8" stroke-width="1"/>
        <line x1="75" y1="62" x2="92" y2="65" stroke="#05d9e8" stroke-width="1"/>

        <!-- 赛博装饰 - 电路纹路 -->
        <path d="M 20 40 L 15 45 L 20 50" stroke="#ff2a6d" stroke-width="1" fill="none" opacity="0.6"/>
        <path d="M 80 40 L 85 45 L 80 50" stroke="#ff2a6d" stroke-width="1" fill="none" opacity="0.6"/>
      </svg>
    `;

    header.appendChild(catContainer);

    // 猫咪眼睛跟随鼠标
    document.addEventListener('mousemove', function(e) {
      const eyes = document.querySelectorAll('.cyber-cat-eye');
      eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = 2;

        const pupil = eye.nextElementSibling?.nextElementSibling;
        if (pupil && pupil.tagName === 'ellipse') {
          // 这里可以添加瞳孔移动效果
        }
      });
    });
  }

  // === 3. 终端命令行动画 ===
  function createTerminalBar() {
    // 检查是否已存在
    if (document.querySelector('.terminal-bar')) return;

    const terminalBar = document.createElement('div');
    terminalBar.className = 'terminal-bar';

    const commands = [
      'whoami && echo "Kuronya"',
      'cat /etc/motd',
      'echo "Welcome to my blog!"',
      'ls ~/posts/',
      'ping github.com/SatakaGintoki',
      'echo "黑猫正在监控中..."',
      'cat /dev/random | grep wisdom',
      'sudo apt-get install creativity',
      'echo "探索代码的无限可能"',
      'git push origin main --force-with-lease'
    ];

    let currentCommand = 0;
    let currentChar = 0;
    let isDeleting = false;

    terminalBar.innerHTML = '<span class="terminal-text"></span><span class="terminal-cursor"></span>';
    document.body.appendChild(terminalBar);

    const terminalText = terminalBar.querySelector('.terminal-text');

    function typeCommand() {
      const command = commands[currentCommand];

      if (isDeleting) {
        terminalText.textContent = command.substring(0, currentChar - 1);
        currentChar--;

        if (currentChar === 0) {
          isDeleting = false;
          currentCommand = (currentCommand + 1) % commands.length;
          setTimeout(typeCommand, 500);
          return;
        }
      } else {
        terminalText.textContent = command.substring(0, currentChar + 1);
        currentChar++;

        if (currentChar === command.length) {
          setTimeout(() => {
            isDeleting = true;
            typeCommand();
          }, 2000);
          return;
        }
      }

      setTimeout(typeCommand, isDeleting ? 30 : 80);
    }

    typeCommand();
  }

  // === 4. 标题打字机效果 ===
  function initTypewriter() {
    const title = document.querySelector('#site-title, .site-title');
    if (!title) return;

    const originalText = title.textContent;
    title.textContent = '';
    title.style.width = 'auto';

    let charIndex = 0;
    function type() {
      if (charIndex < originalText.length) {
        title.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      }
    }

    setTimeout(type, 500);
  }

  // === 初始化所有效果 ===
  createParticles();
  createCyberCat();
  createTerminalBar();

  // 只在首页执行打字机效果
  if (document.querySelector('.layout_home')) {
    initTypewriter();
  }

  console.log('%c🐱 赛博猫咪已加载', 'color: #05d9e8; font-size: 16px; font-weight: bold;');
  console.log('%c欢迎来到 Kuronya 的博客!', 'color: #ff2a6d; font-size: 12px;');
});