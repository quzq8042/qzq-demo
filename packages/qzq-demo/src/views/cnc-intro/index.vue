<template>
  <div class="cnc-intro">
    <!-- Hero Section -->
    <div style="background-color: #ffffff">
      <div class="hero-section">
        <div class="hero-content">
          <div class="hero-title">
            <span class="title-icon">⚙️</span>
            <h1>CNC 数控加工助手</h1>
          </div>
          <p class="hero-subtitle">专业的 CNC 编程工具集合，助力高效加工</p>

          <div class="feature-carousel" @mouseenter="showArrows = true" @mouseleave="showArrows = false">
            <button class="carousel-arrow carousel-prev" :class="{ visible: showArrows }" @click.stop="prevFeature">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div class="carousel-track" :style="{ transform: `translateX(-${currentFeatureIndex * 100}%)` }">
              <div v-for="(item, index) in features" :key="index" class="feature-card">
                <div class="feature-icon">{{ item.icon }}</div>
                <div class="feature-name">{{ item.title }}</div>
                <div class="feature-desc">{{ item.description }}</div>
                <div class="feature-highlight">{{ item.highlight }}</div>
              </div>
            </div>
            <button class="carousel-arrow carousel-next" :class="{ visible: showArrows }" @click.stop="nextFeature">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <div class="carousel-dots">
              <button
                v-for="(_, index) in features"
                :key="index"
                class="dot"
                :class="{ active: currentFeatureIndex === index }"
                @click="goToFeature(index)"
              ></button>
            </div>
          </div>

          <div class="hero-actions">
            <button class="action-btn primary" @click="navigateTo('/cnc/cad-shortcut-key')">开始使用</button>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="about-section">
      <div class="about-container">
        <div class="about-text">
          <h2 class="section-title">什么是 CNC 数控加工助手？</h2>
          <p class="about-description">
            CNC 数控加工助手是一款专为 CNC
            编程人员打造的专业工具集合。我们深知数控加工行业的痛点，致力于提供高效、便捷、专业的解决方案，帮助工程师和技术员提升工作效率，降低出错率。
          </p>
          <div class="about-features">
            <div class="about-feature-item">
              <span class="about-feature-icon">✅</span>
              <span class="about-feature-text">个人精心打造</span>
            </div>
            <div class="about-feature-item">
              <span class="about-feature-icon">✅</span>
              <span class="about-feature-text">持续更新维护</span>
            </div>
            <div class="about-feature-item">
              <span class="about-feature-icon">✅</span>
              <span class="about-feature-text">免费使用，无广告</span>
            </div>
            <div class="about-feature-item">
              <span class="about-feature-icon">✅</span>
              <span class="about-feature-text">数据安全保障</span>
            </div>
          </div>
        </div>
        <div class="about-image">
          <div class="image-placeholder">
            <span class="placeholder-icon">🖥️</span>
            <p>CNC 编程工作站</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="features-section">
      <h2 class="section-title">功能模块</h2>
      <p class="section-subtitle">探索我们的核心功能，提升您的工作效率</p>
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="feature.name"
          class="feature-card"
          :class="{ 'delay-1': index === 1, 'delay-2': index === 2 }"
          @click="navigateTo(feature.path)"
        >
          <div class="feature-icon-wrapper">
            <span class="feature-icon">{{ feature.icon }}</span>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <div class="feature-tags">
            <span v-for="tag in feature.tags" :key="tag" class="feature-tag">{{ tag }}</span>
          </div>
          <div class="feature-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Workflow Section -->
    <div class="workflow-section">
      <h2 class="section-title">工作流程</h2>
      <p class="section-subtitle">简单四步，轻松上手</p>
      <div class="workflow-steps">
        <div v-for="(step, index) in workflowSteps" :key="index" class="workflow-step">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-icon">{{ step.icon }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- Tool Preview -->
    <div class="preview-section">
      <h2 class="section-title">工具预览</h2>
      <p class="section-subtitle">体验我们的核心工具界面</p>
      <div class="preview-cards">
        <div class="preview-card">
          <div class="preview-header">
            <span class="preview-icon">⌨️</span>
            <span class="preview-title">快捷命令搜索</span>
          </div>
          <div class="preview-content">
            <div class="preview-search">
              <el-input placeholder="搜索命令..." class="preview-input" readonly disabled />
              <button class="preview-btn" disabled>搜索</button>
            </div>
            <div class="preview-results">
              <div class="result-item">
                <span class="result-command">LINE</span>
                <span class="result-desc">绘制直线</span>
              </div>
              <div class="result-item">
                <span class="result-command">CIRCLE</span>
                <span class="result-desc">绘制圆</span>
              </div>
              <div class="result-item">
                <span class="result-command">TRIM</span>
                <span class="result-desc">修剪</span>
              </div>
            </div>
          </div>
        </div>
        <div class="preview-card">
          <div class="preview-header">
            <span class="preview-icon">📊</span>
            <span class="preview-title">相关代码</span>
          </div>
          <div class="preview-content">
            <div class="preview-code">
              <pre><code>G90 G54 G17
G0 X0 Y0 Z50.
S3000 M03
G0 Z5.
G1 Z-5. F200.
X50.</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2 class="section-title">常见问题</h2>
      <p class="section-subtitle">解答您的疑惑</p>
      <div class="faq-list">
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item" :class="{ active: activeFaq === index }" @click="toggleFaq(index)">
          <div class="faq-header">
            <span class="faq-icon">❓</span>
            <span class="faq-question">{{ faq.question }}</span>
            <span class="faq-arrow">{{ activeFaq === index ? '▼' : '▶' }}</span>
          </div>
          <div v-show="activeFaq === index" class="faq-answer">{{ faq.answer }}</div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">准备好提升效率了吗？</h2>
        <div class="cta-actions">
          <button class="cta-btn primary" @click="navigateTo('/cnc/cad-shortcut-key')">立即开始</button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-section">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="brand-icon">⚙️</span>
          <span class="brand-name">CNC 数控加工助手</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const activeFaq = ref(0)
const currentFeatureIndex = ref(0)
const showArrows = ref(false)

const goToFeature = (index) => {
  currentFeatureIndex.value = index
}

const prevFeature = () => {
  currentFeatureIndex.value = currentFeatureIndex.value === 0 ? features.length - 1 : currentFeatureIndex.value - 1
}

const nextFeature = () => {
  currentFeatureIndex.value = (currentFeatureIndex.value + 1) % features.length
}

let carouselInterval = null

const startCarousel = () => {
  carouselInterval = setInterval(() => {
    currentFeatureIndex.value = (currentFeatureIndex.value + 1) % features.length
  }, 4000)
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

onMounted(() => {
  startCarousel()
})

onUnmounted(() => {
  stopCarousel()
})

const features = [
  {
    name: 'cad-shortcut-key',
    icon: '⌨️',
    title: '快捷命令搜索',
    description: '收录常用的 CAD 和 UG 快捷命令，支持搜索、导出 Markdown 和 Excel 格式',
    tags: ['CAD', 'UG', '快捷键'],
    path: '/cnc/cad-shortcut-key',
    highlight: '支持搜索、导出 Markdown 和 Excel 格式',
  },
  {
    name: 'cnc-code',
    icon: '📝',
    title: 'CNC代码',
    description: '提供丰富的 CNC 加工代码示例，包含刀具信息、操作面板等参考资料',
    tags: ['G代码', 'M代码', '刀具'],
    path: '/cnc/cnc-code',
    highlight: '包含刀具信息、操作面板等参考资料',
  },
  {
    name: 'cnc-log',
    icon: '📋',
    title: '相关代码',
    description: '记录和管理您的 CNC 编程代码，方便查阅和复用',
    tags: ['记录', '管理', '代码'],
    path: '/cnc/cnc-log',
    highlight: '方便查阅和复用，提升工作效率',
  },
  {
    name: 'calculator',
    icon: '🧮',
    title: '计算器',
    description: '简单的 CNC 材料重量计算工具，方便计算',
    tags: ['计算', '工具'],
    path: '/cnc/calculator',
    highlight: '方便计算，提升工作效率',
  },
  {
    name: 'cnc-cutting-params',
    icon: '🔍',
    title: 'CNC加工参数参考',
    description: '提供常见材料切削参数、刀具选择指南、主轴转速及进给量参考，适用于UG加工模块',
    tags: ['CNC', '加工', '参数', '参考'],
    path: '/cnc/cutting-params',
    highlight: '提供常见材料切削参数、刀具选择指南、主轴转速及进给量参考',
  },
  {
    name: 'ug-machining-strategy',
    icon: '🛠️',
    title: 'UG加工',
    description: 'UG加工模块的加工类型参考，包括平面铣削、带边界面铣、平面铣等多种类型',
    tags: ['UG', '加工', '参数', '参考'],
    path: '/cnc/ug-machining-strategy',
    highlight: 'mill_planar、mill_contour、hole_making、turning等多种类型',
  },
]

const workflowSteps = [
  {
    icon: '📥',
    title: '选择模块',
    description: '根据需求选择相应的功能模块',
  },
  {
    icon: '🔍',
    title: '搜索查询',
    description: '快速搜索所需的命令或代码',
  },
  {
    icon: '📋',
    title: '查看详情',
    description: '查看详细说明和使用示例',
  },
  {
    icon: '✅',
    title: '应用实践',
    description: '将知识应用到实际工作中',
  },
]

const faqs = [
  {
    question: '这个工具是免费的吗？',
    answer: '是的，CNC数控加工助手完全免费使用，没有任何隐藏收费或广告。致力于为CNC编程人员提供免费、专业的工具支持。',
  },
  {
    question: '支持哪些软件的快捷键？',
    answer: '目前支持AutoCAD、UG/NX、等主流CAD/CAM软件的快捷键查询，后续还会不断扩展支持更多软件。',
  },
  {
    question: '代码记录数据会被保存吗？',
    answer: '代码记录数据保存在您的本地浏览器中，不会上传到服务器，确保您的数据安全和隐私。',
  },
  {
    question: '如何获取最新更新？',
    answer: '会定期更新工具内容，包括新增快捷键、代码示例等。刷新页面即可获取最新版本，无需手动更新。',
  },
]

const navigateTo = (path) => {
  router.push(path)
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? -1 : index
}
</script>

<style lang="scss" scoped>
.cnc-intro {
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 50%, #f0f4f8 100%);
}

.hero-section {
  position: relative;
  padding: 80px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  border-radius: 0 0 60px 60px;
  box-shadow: 0 20px 80px rgba(102, 126, 234, 0.3);

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .hero-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    .title-icon {
      font-size: 56px;
      animation: bounce 2s ease-in-out infinite;
    }

    h1 {
      font-size: 52px;
      font-weight: 700;
      color: #fff;
      margin: 0;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
  }

  .hero-subtitle {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 50px;
    font-weight: 400;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 60px;
    margin-bottom: 50px;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 28px 48px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-8px);
        background: rgba(255, 255, 255, 0.25);
      }

      .stat-number {
        font-size: 42px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 10px;
      }

      .stat-label {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.85);
      }
    }
  }

  .feature-carousel {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto 50px;
    overflow: hidden;
    border-radius: 20px;

    &:hover {
      .carousel-track {
        animation-play-state: paused;
      }
    }

    .carousel-track {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }

    .feature-card {
      flex: 0 0 100%;
      padding: 30px 40px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;

      &:not(:last-child) {
        border-right: 1px solid rgba(255, 255, 255, 0.1);
      }

      .feature-icon {
        font-size: 56px;
        margin-bottom: 20px;
        animation: bounce 2s ease-in-out infinite;
      }

      .feature-name {
        font-size: 26px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 12px;
      }

      .feature-desc {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.85);
        margin-bottom: 16px;
      }

      .feature-highlight {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        padding: 12px 24px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 30px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }

    .carousel-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 10;

      &:hover {
        background: rgba(255, 255, 255, 0.35);
        transform: translateY(-50%) scale(1.1);
      }

      &.visible {
        opacity: 1;
        visibility: visible;
      }

      &.carousel-prev {
        left: 15px;
      }

      &.carousel-next {
        right: 15px;
      }
    }

    .carousel-dots {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          width: 32px;
          border-radius: 6px;
          background: #fff;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }

  .hero-actions {
    display: flex;
    justify-content: center;
    gap: 20px;

    .action-btn {
      padding: 16px 40px;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;

      &.primary {
        background: #fff;
        color: #667eea;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
      }

      &.secondary {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        border: 2px solid rgba(255, 255, 255, 0.4);

        &:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }
      }
    }
  }

  .hero-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;

    .floating-icon {
      position: absolute;
      font-size: 56px;
      opacity: 0.12;

      &.icon-1 {
        top: 15%;
        left: 8%;
        animation: float1 6s ease-in-out infinite;
      }
      &.icon-2 {
        top: 65%;
        right: 12%;
        animation: float2 8s ease-in-out infinite;
      }
      &.icon-3 {
        top: 35%;
        right: 28%;
        animation: float3 7s ease-in-out infinite;
      }
      &.icon-4 {
        bottom: 20%;
        left: 22%;
        animation: float4 9s ease-in-out infinite;
      }
      &.icon-5 {
        top: 70%;
        left: 50%;
        animation: float1 7.5s ease-in-out infinite reverse;
      }
      &.icon-6 {
        top: 25%;
        right: 45%;
        animation: float2 6.5s ease-in-out infinite reverse;
      }
    }
  }
}

.about-section {
  padding: 80px 40px;
  background: #fff;

  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    align-items: center;
    .about-text {
      padding: 20px;
      flex: 1;
    }
  }

  .section-title {
    font-size: 32px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 20px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
  }

  .about-description {
    font-size: 16px;
    color: #718096;
    line-height: 1.8;
    margin-bottom: 30px;
  }

  .about-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    .about-feature-item {
      display: flex;
      align-items: center;
      gap: 10px;

      .about-feature-icon {
        font-size: 20px;
      }

      .about-feature-text {
        font-size: 14px;
        color: #4a5568;
        font-weight: 500;
      }
    }
  }

  .about-image {
    display: flex;
    justify-content: center;

    .image-placeholder {
      width: 400px;
      height: 300px;
      background: linear-gradient(135deg, #f0f4f8 0%, #e4e8ec 100%);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

      .placeholder-icon {
        font-size: 64px;
      }

      p {
        font-size: 16px;
        color: #718096;
        font-weight: 500;
      }
    }
  }
}

.features-section {
  padding: 80px 40px;

  .section-title {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 12px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
  }

  .section-subtitle {
    text-align: center;
    font-size: 16px;
    color: #718096;
    margin-bottom: 50px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 35px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background: #fff;
    border-radius: 24px;
    padding: 36px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-12px);
      box-shadow: 0 25px 50px rgba(102, 126, 234, 0.2);

      &::before {
        transform: scaleX(1);
      }

      .feature-icon-wrapper {
        transform: scale(1.1);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
      }

      .feature-arrow {
        transform: translateX(5px);
        opacity: 1;
      }
    }

    &.delay-1 {
      animation-delay: 0.15s;
    }

    &.delay-2 {
      animation-delay: 0.3s;
    }

    .feature-icon-wrapper {
      width: 75px;
      height: 75px;
      border-radius: 18px;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      transition: all 0.3s ease;

      .feature-icon {
        font-size: 40px;
      }
    }

    .feature-title {
      font-size: 24px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 14px;
    }

    .feature-description {
      font-size: 15px;
      color: #718096;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .feature-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 24px;

      .feature-tag {
        font-size: 12px;
        padding: 5px 14px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        color: #667eea;
        border-radius: 20px;
        font-weight: 500;
      }
    }

    .feature-arrow {
      position: absolute;
      right: 28px;
      bottom: 28px;
      color: #a0aec0;
      transition: all 0.3s ease;
      opacity: 0.5;
    }
  }
}

.workflow-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .section-title {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 12px;
  }

  .section-subtitle {
    text-align: center;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 60px;
  }

  .workflow-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;

    .workflow-step {
      text-align: center;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 30px;
        left: calc(50% + 60px);
        width: calc(100% - 60px);
        height: 2px;
        background: rgba(255, 255, 255, 0.3);
        display: none;
      }

      &:not(:last-child)::after {
        display: block;
      }

      .step-number {
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
      }

      .step-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      .step-title {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 10px;
      }

      .step-description {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
      }
    }
  }
}

.preview-section {
  padding: 80px 40px;

  .section-title {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 12px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
  }

  .section-subtitle {
    text-align: center;
    font-size: 16px;
    color: #718096;
    margin-bottom: 50px;
  }

  .preview-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .preview-card {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.12);
    }

    .preview-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 24px;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
      border-bottom: 1px solid #e2e8f0;

      .preview-icon {
        font-size: 28px;
      }

      .preview-title {
        font-size: 17px;
        font-weight: 600;
        color: #2d3748;
      }
    }

    .preview-content {
      padding: 24px;

      .preview-search {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;

        .preview-input {
          flex: 1;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          padding: 12px 16px;
          font-size: 14px;
          cursor: default;
          pointer-events: none;
        }

        .preview-btn {
          padding: 12px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: default;
          pointer-events: none;
        }
      }

      .preview-results {
        .result-item {
          display: flex;
          justify-content: space-between;
          padding: 14px 16px;
          background: #f7fafc;
          border-radius: 10px;
          margin-bottom: 10px;
          transition: all 0.2s ease;

          &:hover {
            background: #edf2f7;
          }

          &:last-child {
            margin-bottom: 0;
          }

          .result-command {
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
            font-weight: 600;
            color: #667eea;
          }

          .result-desc {
            font-size: 14px;
            color: #718096;
          }
        }
      }

      .preview-code {
        background: #2d3748;
        border-radius: 10px;
        padding: 20px;
        overflow-x: auto;

        pre {
          margin: 0;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 13px;
          line-height: 1.7;
          color: #e2e8f0;

          code {
            color: inherit;
          }
        }
      }

      .log-list {
        .log-item {
          display: flex;
          justify-content: space-between;
          padding: 14px 16px;
          background: #f7fafc;
          border-radius: 10px;
          margin-bottom: 10px;
          transition: all 0.2s ease;

          &:hover {
            background: #edf2f7;
          }

          &:last-child {
            margin-bottom: 0;
          }

          .log-date {
            font-size: 12px;
            color: #a0aec0;
          }

          .log-name {
            font-size: 14px;
            color: #4a5568;
            font-weight: 500;
          }
        }
      }
    }
  }
}

.testimonials-section {
  padding: 80px 40px;
  background: #fff;

  .section-title {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 12px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
  }

  .section-subtitle {
    text-align: center;
    font-size: 16px;
    color: #718096;
    margin-bottom: 50px;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .testimonial-card {
    background: #f8fafc;
    border-radius: 20px;
    padding: 32px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .testimonial-stars {
      margin-bottom: 20px;

      .star {
        font-size: 18px;
      }
    }

    .testimonial-text {
      font-size: 15px;
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 24px;
      font-style: italic;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 16px;

      .author-avatar {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }

      .author-info {
        display: flex;
        flex-direction: column;

        .author-name {
          font-size: 15px;
          font-weight: 600;
          color: #2d3748;
        }

        .author-title {
          font-size: 13px;
          color: #718096;
        }
      }
    }
  }
}

.faq-section {
  padding: 80px 40px;

  .section-title {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 12px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
  }

  .section-subtitle {
    text-align: center;
    font-size: 16px;
    color: #718096;
    margin-bottom: 50px;
  }

  .faq-list {
    max-width: 800px;
    margin: 0 auto;

    .faq-item {
      background: #fff;
      border-radius: 16px;
      margin-bottom: 16px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &.active {
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
      }

      .faq-header {
        display: flex;
        align-items: center;
        padding: 24px;
        cursor: pointer;
        gap: 12px;

        .faq-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .faq-question {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
        }

        .faq-arrow {
          font-size: 12px;
          color: #a0aec0;
          transition: transform 0.3s ease;
        }
      }

      .faq-answer {
        padding: 0 24px 24px;
        font-size: 15px;
        color: #718096;
        line-height: 1.7;
        animation: fadeIn 0.3s ease;
      }
    }
  }
}

.cta-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 40px;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);

  .cta-content {
    text-align: center;

    .cta-title {
      font-size: 36px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 16px;
    }

    .cta-subtitle {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 40px;
    }

    .cta-actions {
      display: flex;
      justify-content: center;
      gap: 20px;

      .cta-btn {
        padding: 18px 48px;
        border-radius: 30px;
        font-size: 17px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;

        &.primary {
          background: #fff;
          color: #667eea;

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
          }
        }

        &.secondary {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.4);

          &:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px);
          }
        }
      }
    }
  }
}

.footer-section {
  padding: 50px 40px;
  background: #2d3748;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;

    .footer-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;

      .brand-icon {
        font-size: 32px;
      }

      .brand-name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }
    }
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes float1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(35px, -25px);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-30px, 35px);
  }
}

@keyframes float3 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(25px, 30px);
  }
}

@keyframes float4 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-35px, -20px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
