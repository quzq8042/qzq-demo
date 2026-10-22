<template>
  <div class="home-container">
    <div class="resume-container">
      <main class="resume-content">
        <section class="section basic-info-section">
          <h2 class="section-title">
            <span class="title-icon">👤</span>
            基本信息
          </h2>
          <div class="section-content">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">姓名</span><span class="info-value">{{ resumeData.basicInfo.name }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">电话</span><span class="info-value">{{ resumeData.basicInfo.phone }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">邮箱</span><span class="info-value">{{ resumeData.basicInfo.email }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">地址</span><span class="info-value">{{ resumeData.basicInfo.address }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">性别</span><span class="info-value">{{ resumeData.basicInfo.gender }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">年龄</span><span class="info-value">{{ resumeData.basicInfo.age }} 岁</span>
              </div>
              <div class="info-item">
                <span class="info-label">学历</span><span class="info-value">{{ resumeData.basicInfo.education }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">工作年限</span><span class="info-value">{{ resumeData.basicInfo.workExperience }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">🎯</span>
            求职意向
          </h2>
          <div class="section-content">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">应聘岗位</span><span class="info-value highlight">{{ resumeData.jobIntention.position }}</span>
              </div>
              <!-- <div class="info-item">
                <span class="info-label">期望薪资</span><span class="info-value">{{ resumeData.jobIntention.salary }}</span>
              </div> -->
              <div class="info-item">
                <span class="info-label">工作城市</span><span class="info-value">{{ resumeData.jobIntention.city }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">工作性质</span><span class="info-value">{{ resumeData.jobIntention.employmentType }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">到岗时间</span><span class="info-value">{{ resumeData.jobIntention.availableTime }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">🛠️</span>
            职业技能
          </h2>
          <div class="section-content">
            <div v-for="(skill, index) in resumeData.skills" :key="index" class="skill-item">
              <span class="skill-num">{{ index + 1 }}</span>
              <span class="skill-text">{{ skill }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">💡</span>
            自我评价
          </h2>
          <div class="section-content">
            <div v-for="(item, index) in resumeData.selfEvaluation" :key="index" class="eval-item">
              {{ item }}
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">💼</span>
            工作经验
          </h2>
          <div class="section-content">
            <div v-for="(exp, index) in resumeData.experience" :key="index" class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3>
                  <span class="exp-company">{{ exp.company }}</span>
                  <span class="exp-date">{{ exp.date }}</span>
                </h3>
                <div class="exp-position">{{ exp.position }}</div>
                <div v-for="(desc, idx) in exp.description" :key="idx" class="timeline-desc">
                  {{ desc }}
                </div>
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
import { resumeData } from './data'
</script>

<style scoped lang="scss">
.home-container {
  background-image: linear-gradient(135deg, #1d3ee8, #4978df, #4baed5, #17e5c8);
  min-height: 100vh;
  padding: 30px 0;
}

.resume-container {
  margin: 0 auto;
  padding: 20px;
  max-width: 1000px;
  font-family: 'Microsoft YaHei', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

.resume-content {
  display: grid;
  gap: 20px;
}

.section {
  background: #fff;
  border-radius: 12px;
  padding: 24px 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(74, 105, 189, 0.12);
  }
}

.basic-info-section {
  padding-top: 28px;
}

.basic-info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 20px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #eef2f7;
}

.basic-info-main {
  flex: 1;
}

.name {
  font-size: 32px;
  margin: 0 0 16px 0;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 2px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.contact-item {
  font-size: 14px;
  color: #555;
}

.avatar {
  margin-left: 40px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  margin: 0 0 18px 0;
  color: #2c3e50;
  font-weight: 600;
  border-bottom: 2px solid #eef2f7;
  padding-bottom: 12px;
}

.title-icon {
  font-size: 20px;
}

.section-content {
  padding-left: 4px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 32px;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.info-label {
  display: inline-block;
  min-width: 80px;
  color: #888;
  background: #f5f7fa;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  margin-right: 12px;
}

.info-value {
  color: #333;
  font-weight: 500;

  &.highlight {
    color: #4a69bd;
    font-weight: 600;
    font-size: 15px;
  }
}

.skill-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  font-size: 14px;
  color: #555;

  &:last-child {
    margin-bottom: 0;
  }
}

.skill-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #4a69bd, #5f27cd);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
  margin-top: 2px;
}

.skill-text {
  flex: 1;
}

.eval-item {
  position: relative;
  padding-left: 18px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
  line-height: 1.8;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    width: 6px;
    height: 6px;
    background: #4a69bd;
    border-radius: 50%;
  }
}

.timeline-item {
  position: relative;
  padding-left: 24px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-left: 2px solid #eef2f7;

  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-left-color: transparent;
  }
}

.timeline-dot {
  position: absolute;
  left: -7px;
  top: 4px;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #4a69bd, #5f27cd);
  border-radius: 50%;
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #e8ecf5;
}

.timeline-content h3 {
  margin: 0 0 6px 0;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.exp-company {
  color: #2c3e50;
  font-weight: 600;
}

.exp-date {
  color: #888;
  font-size: 13px;
  font-weight: normal;
  white-space: nowrap;
}

.exp-position {
  color: #4a69bd;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.timeline-desc {
  margin: 6px 0 0 0;
  padding-left: 16px;
  color: #666;
  font-size: 14px;
  position: relative;
  line-height: 1.8;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 11px;
    width: 5px;
    height: 5px;
    background: #b0b8c9;
    border-radius: 50%;
  }
}
</style>
