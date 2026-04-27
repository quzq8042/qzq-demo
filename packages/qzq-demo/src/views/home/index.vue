<template>
  <div class="home-container">
    <div class="resume-container">
      <!-- 顶部个人信息 -->
      <header class="resume-header">
        <div class="header-content">
          <div class="personal-info">
            <h1 class="name">{{ resumeData.name }}</h1>
            <p class="title">{{ resumeData.jobTitle }}</p>
            <div class="contact-info">
              <div class="contact-item">邮箱：{{ resumeData.email }}</div>
              <div class="contact-item">电话：{{ resumeData.phone }}</div>
              <div class="contact-item">地址：{{ resumeData.address }}</div>
              <div class="contact-item">工作年限：{{ resumeData.workExperience }}</div>
            </div>
          </div>
          <!-- <div class="avatar">
            <Avatar :text="resumeData.name" :size="100" />
          </div> -->
        </div>
      </header>

      <!-- 主要内容 -->
      <main class="resume-content">
        <!-- 专业技能 -->
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">🛠️</span>
            综合技能
          </h2>
          <div class="section-content">
            <div v-for="(skill, index) in resumeData.skills" :key="index" class="skill-item">{{ index + 1 }}. {{ skill }}</div>
          </div>
        </section>
        <!-- 工作经验 -->
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">💼</span>
            工作经验
          </h2>
          <div class="section-content">
            <div class="timeline-item" v-for="(exp, index) in resumeData.experience" :key="index">
              <!-- <div class="timeline-date"></div> -->
              <div class="timeline-content">
                <h3>
                  {{ exp.company }}<span>{{ exp.date }}</span
                  ><span>{{ exp.position }}</span>
                </h3>
                <div class="timeline-desc" v-for="(desc, idx) in exp.description" :key="idx">
                  {{ desc }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 项目经历 -->
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">📁</span>
            项目经历
          </h2>
          <div class="section-content">
            <div class="project-item" v-for="(project, index) in resumeData.projects" :key="index">
              <h3>项目{{ numMap[index + 1] }}：{{ project.name }}</h3>
              <p class="project-desc">
                技术栈：<span v-for="(tag, idx) in project.technologies" :key="idx"
                  >{{ tag }}{{ idx < project.technologies.length - 1 ? ' + ' : '' }}</span
                >
              </p>
              <p class="project-desc">项目描述：{{ project.description }}</p>
              <div class="timeline-desc" v-for="(desc, idx) in project.experience" :key="idx">
                {{ desc }}
              </div>
            </div>
          </div>
        </section>

        <!-- 教育背景 -->
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">🎓</span>
            教育背景
          </h2>
          <div class="section-content">
            <div class="timeline-item">
              <div class="timeline-date">{{ resumeData.education.date }}</div>
              <div class="education">
                {{ resumeData.education.institution }}<span>{{ resumeData.education.fieldOfStudy }}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
<script setup>
import Avatar from '@/components/Avatar'
import { resumeData, numMap } from './data'
const handleClick = (link) => {
  window.open(link, '_blank')
}
</script>

<style scoped lang="scss">
.home-container {
  background-image: linear-gradient(135deg, #1d3ee8, #4978df, #4baed5, #17e5c8);
}
.resume-container {
  margin: 0 auto;
  padding: 20px;
  max-width: 1000px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* 头部样式 - 更柔和的紫色渐变 */
.resume-header {
  background: #fff;
  // background: linear-gradient(135deg, #4a69bd 0%, #5f27cd 100%);
  color: #333;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.personal-info {
  flex: 1;
}

.name {
  font-size: 28px;
  margin: 0 0 10px 0;
  font-weight: 700;
}

.title {
  font-size: 16px;
  margin: 0 0 10px 0;
  opacity: 0.9;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  position: relative;
  padding-right: 10px;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 1em;
    width: 2px;
    // background-color: rgba(255, 255, 255, 0.5);
    background-color: #666;
  }

  &:last-child {
    padding-right: 0;

    &::after {
      display: none;
    }
  }
}
.personal-advantage {
  font-size: 14px;
  margin-top: 10px;
}
.avatar {
  margin-left: 40px;
}

.avatar-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.avatar-initial {
  font-size: 48px;
  font-weight: bold;
  color: white;
}

/* 主要内容样式 - 使用柔和的背景色 */
.resume-content {
  display: grid;
  gap: 20px;
}

.section {
  background: #fafbff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e8f0fe;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(74, 105, 189, 0.15);
    border-color: #d6e4ff;
  }
}

/* 标题样式 - 统一柔和的主色调 */
.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  margin: 0 0 10px 0;
  color: #4a69bd;
  font-weight: 600;
  border-bottom: 2px solid #e8f0fe;
  padding-bottom: 10px;
}

.title-icon {
  font-size: 18px;
}

/* 时间线样式 */
.timeline-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.timeline-date {
  font-weight: 600;
  color: #4a69bd;
}

.timeline-content h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  span {
    font-size: 14px;
    color: #666;
  }
}

.timeline-content p {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
}

.timeline-desc {
  margin: 10px 0 0 0;
  padding-left: 20px;
  margin-bottom: 5px;
  color: #666;
  font-size: 14px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #666;
    border-radius: 50%;
  }
}

/* 项目经历样式 */
.project-item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.project-item h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}
.project-item ul {
  margin: 10px 0;
  padding-left: 20px;

  li {
    margin-bottom: 5px;
    color: #666;
    font-size: 14px;
  }
}

/* 链接样式 - 更和谐的颜色 */
.project-desc {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
  .project-link {
    color: #4a69bd;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #5f27cd;
      text-decoration: underline;
    }
  }
  .test-link {
    margin-left: 10px;
  }
}

.education {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  margin-left: 30px;
  span {
    color: #666;
  }
}
</style>
