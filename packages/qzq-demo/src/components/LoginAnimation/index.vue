<template>
  <div ref="containerRef" class="animation-container">
    <!-- 三个星空小人 -->
    <div class="cylinders">
      <div v-for="i in 3" :key="i" class="cylinder">
        <div class="cylinder-body">
          <div class="glow"></div>
          <div class="eyes">
            <div class="eye left">
              <div class="eye-content" :style="getEyeStyle(i, 'left')">
                <div class="pupil"></div>
                <div class="shine"></div>
              </div>
            </div>
            <div class="eye right">
              <div class="eye-content" :style="getEyeStyle(i, 'right')">
                <div class="pupil"></div>
                <div class="shine"></div>
              </div>
            </div>
          </div>
          <!-- 表情区域 -->
          <div class="face">
            <div class="nose"></div>
            <div class="mouth" :class="`mouth-${i}`"></div>
          </div>
          <div class="arms" :class="{ cover: isPasswordFocused, grab: isUsernameFocused }">
            <div class="arm left"></div>
            <div class="arm right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref(null)
const mousePosition = ref({ x: 0, y: 0 })
const isUsernameFocused = ref(false)
const isPasswordFocused = ref(false)

function handleMouseMove(e) {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    mousePosition.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }
}

function getEyeStyle(cylinderIndex, side) {
  const x = mousePosition.value.x
  const y = mousePosition.value.y
  const containerWidth = containerRef.value?.offsetWidth || 350
  const containerHeight = containerRef.value?.offsetHeight || 280

  const eyeCenterX = containerWidth * 0.18 + (cylinderIndex - 1) * 60
  const eyeCenterY = containerHeight * 0.6

  const dx = x - eyeCenterX
  const dy = y - eyeCenterY
  const distance = Math.sqrt(dx * dx + dy * dy)

  const maxOffset = 3
  const ratio = Math.min(distance / 100, 1)
  const actualOffset = ratio * maxOffset

  let offsetX = 0
  let offsetY = 0

  if (distance > 0) {
    offsetX = (dx / distance) * actualOffset
    offsetY = (dy / distance) * actualOffset
  }

  return {
    transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
  }
}

function handleUsernameFocus() {
  isUsernameFocused.value = true
}

function handleUsernameBlur() {
  isUsernameFocused.value = false
}

function handlePasswordFocus() {
  isPasswordFocused.value = true
}

function handlePasswordBlur() {
  isPasswordFocused.value = false
}

defineExpose({
  handleUsernameFocus,
  handleUsernameBlur,
  handlePasswordFocus,
  handlePasswordBlur,
})

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style lang="scss" scoped>
.animation-container {
  position: fixed;
  right: 7vw;
  top: calc(50% - 360px);
  width: 580px;
  height: 200px;
  z-index: 1;
}

.cylinders {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  align-items: flex-end;
}

.cylinder {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50% 50% 10px 10px;
  background: linear-gradient(180deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.6));
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: sparkle 2s ease-in-out infinite;

  .glow {
    position: absolute;
    inset: -8px;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6));
    filter: blur(16px);
    z-index: -1;
    animation: glowPulse 2s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 30%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent);
    border-radius: 50% 50% 0 0;
    pointer-events: none;
  }

  &:nth-child(1) {
    width: 62px;
    height: 130px;
    padding-top: 18px;
    background: linear-gradient(180deg, rgba(78, 205, 196, 0.85), rgba(68, 160, 141, 0.65));
    .glow {
      background: linear-gradient(135deg, rgba(78, 205, 196, 0.5), rgba(68, 160, 141, 0.5));
    }
  }

  &:nth-child(2) {
    width: 85px;
    height: 110px;
    padding-top: 13px;
    background: linear-gradient(180deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.65));
    .glow {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5));
    }
  }

  &:nth-child(3) {
    width: 52px;
    height: 150px;
    padding-top: 21px;
    background: linear-gradient(180deg, rgba(243, 246, 112, 0.798), rgba(91, 180, 119, 0.65));
    .glow {
      background: linear-gradient(135deg, rgba(243, 246, 112, 0.798), rgba(91, 180, 119, 0.65));
    }
  }

  .cylinder-body {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .eyes {
    display: flex;
    margin-bottom: 5px;

    .eye {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

      .eye-content {
        position: absolute;
        top: 50%;
        left: 50%;

        .pupil {
          background: #1a1a2e;
          border-radius: 50%;
        }

        .shine {
          position: absolute;
          top: 15%;
          right: 15%;
          width: 30%;
          height: 30%;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
        }
      }
    }
  }

  .face {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;

    .nose {
      width: 5px;
      height: 4px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 50% 50% 40% 40%;
      margin-bottom: 3px;
    }

    .mouth {
      position: relative;
      border-radius: 50%;
      transition: all 0.3s ease;

      &.mouth-1 {
        /* 微笑表情 */
        width: 18px;
        height: 9px;
        border: 2px solid rgba(255, 255, 255, 0.8);
        border-color: transparent transparent rgba(255, 255, 255, 0.8) transparent;
        border-radius: 0 0 13px 13px;
      }

      &.mouth-2 {
        /* 开心大笑表情 */
        width: 24px;
        height: 13px;
        background: rgba(255, 255, 255, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.8);
        border-top: none;
        border-radius: 0 0 16px 16px;

        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 5px;
          background: rgba(255, 105, 180, 0.8);
          border-radius: 0 0 5px 5px;
        }
      }

      &.mouth-3 {
        /* 害羞抿嘴表情 */
        width: 16px;
        height: 3px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 2px;
        position: relative;

        &::before,
        &::after {
          content: '';
          position: absolute;
          top: -5px;
          width: 7px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 182, 193, 0.6);
        }

        &::before {
          left: -10px;
        }

        &::after {
          right: -10px;
        }
      }
    }
  }

  &:nth-child(1) {
    .eyes {
      gap: 13px;
      .eye {
        width: 16px;
        height: 16px;
        .pupil {
          width: 8px;
          height: 8px;
        }
      }
    }
    .face {
      .nose {
        width: 4px;
        height: 3px;
      }
      .mouth.mouth-1 {
        width: 18px;
        height: 9px;
      }
    }
    .arms {
      top: 45px;
      &.cover {
        .arm.left {
          transform: rotate(-35deg) translateY(-40px) translateX(20px);
          width: 147px;
          height: 18px;
          z-index: 100;
        }
        .arm.right {
          transform: rotate(35deg) translateY(-40px) translateX(-20px);
          width: 147px;
          height: 18px;
          z-index: 100;
        }
      }
    }
  }

  &:nth-child(2) {
    .eyes {
      gap: 18px;
      .eye {
        width: 18px;
        height: 18px;
        .pupil {
          width: 9px;
          height: 9px;
        }
      }
    }
    .face {
      .nose {
        width: 5px;
        height: 4px;
      }
      .mouth.mouth-2 {
        width: 26px;
        height: 14px;
      }
    }
    .arms {
      top: 45px;
      &.cover {
        .arm.left {
          transform: rotate(-35deg) translateY(-40px) translateX(20px);
          width: 157px;
          height: 21px;
          z-index: 100;
        }
        .arm.right {
          transform: rotate(35deg) translateY(-40px) translateX(-20px);
          width: 157px;
          height: 21px;
          z-index: 100;
        }
      }
    }
  }

  &:nth-child(3) {
    .eyes {
      gap: 10px;
      .eye {
        width: 13px;
        height: 13px;
        .pupil {
          width: 6px;
          height: 6px;
        }
      }
    }
    .face {
      .nose {
        width: 4px;
        height: 3px;
      }
      .mouth.mouth-3 {
        width: 13px;
        height: 3px;
      }
    }
    .arms {
      top: 52px;
      &.cover {
        .arm.left {
          transform: rotate(-35deg) translateY(-40px) translateX(20px);
          width: 142px;
          height: 16px;
          z-index: 100;
        }
        .arm.right {
          transform: rotate(35deg) translateY(-40px) translateX(-20px);
          width: 142px;
          height: 16px;
          z-index: 100;
        }
      }
    }
  }

  .arms {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 3px;
    transition: all 0.3s ease;

    &.grab {
      .arm {
        &.left {
          transform: rotate(-20deg) translateY(10px) translateX(-4px);
          border-radius: 6px 6px 10px 10px;
        }
        &.right {
          transform: rotate(20deg) translateY(10px) translateX(4px);
          border-radius: 6px 6px 10px 10px;
        }
      }
    }

    .arm {
      border-radius: 6px;
      transition: all 0.3s ease;
      transform-origin: inner end;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

      &.left {
        transform: rotate(-5deg);
      }
      &.right {
        transform: rotate(5deg);
      }
    }
  }
}

.cylinder:nth-child(1) {
  .arm {
    background: linear-gradient(135deg, rgba(78, 205, 196, 0.9), rgba(68, 160, 141, 0.9));
    width: 34px;
    height: 13px;
  }
}

.cylinder:nth-child(2) {
  .arm {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
    width: 42px;
    height: 16px;
  }
}

.cylinder:nth-child(3) {
  .arm {
    background: linear-gradient(135deg, rgba(255, 182, 193, 0.9), rgba(255, 160, 173, 0.9));
    width: 29px;
    height: 12px;
  }
}

.cat {
  position: absolute;
  right: 10px;
  bottom: 30px;

  .cat-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    transition: transform 0.3s ease;

    &.peek {
      animation: peek 0.6s ease-in-out;
      .cat-head {
        transform: translateX(20px);
      }
      .cat-neck {
        height: 40px;
        animation: stretch 0.4s ease-out;
      }
    }

    .cat-head {
      position: relative;
      transition: transform 0.3s ease;

      .cat-glow {
        position: absolute;
        inset: -5px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
        filter: blur(10px);
        z-index: -1;
      }

      .ears {
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 28px;

        .ear {
          width: 0;
          height: 0;
          border-left: 18px solid transparent;
          border-right: 18px solid transparent;
          border-bottom: 28px solid rgba(102, 126, 234, 0.85);
          position: relative;

          &::after {
            content: '';
            position: absolute;
            top: 9px;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 16px solid rgba(138, 147, 212, 0.9);
          }

          &.left {
            transform: rotate(-8deg);
          }
          &.right {
            transform: rotate(8deg);
          }
        }
      }

      .cat-face {
        width: 75px;
        height: 65px;
        background: linear-gradient(180deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.8));
        border-radius: 50% 50% 45% 45%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 18px;
        border: 1px solid rgba(255, 255, 255, 0.15);

        .cat-eyes {
          display: flex;
          gap: 18px;
          margin-bottom: 6px;

          .cat-eye {
            width: 16px;
            height: 18px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            transition: transform 0.15s ease;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);

            .cat-pupil {
              width: 9px;
              height: 11px;
              background: #1a1a2e;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }

            .cat-shine {
              position: absolute;
              top: 2px;
              right: 2px;
              width: 4px;
              height: 4px;
              background: rgba(255, 255, 255, 0.9);
              border-radius: 50%;
            }
          }
        }

        .cat-nose {
          width: 7px;
          height: 4px;
          background: rgba(255, 105, 180, 0.9);
          border-radius: 50% 50% 40% 40%;
          margin-bottom: 4px;
        }

        .cat-mouth {
          display: flex;
          gap: 10px;

          .mouth-line {
            width: 14px;
            height: 7px;
            border: 1.5px solid rgba(255, 255, 255, 0.7);
            border-color: transparent transparent rgba(255, 255, 255, 0.7) transparent;
            border-radius: 0 0 12px 12px;

            &.left {
              transform: rotate(-8deg);
            }
            &.right {
              transform: rotate(8deg);
            }
          }
        }

        .cat-whiskers {
          position: absolute;
          top: 36px;
          width: 110%;
          display: flex;
          justify-content: space-between;
          left: -5%;

          .whisker {
            width: 28px;
            height: 1.5px;
            background: rgba(255, 255, 255, 0.6);

            &.left-top {
              transform: rotate(-3deg);
            }
            &.left-middle {
              transform: rotate(0deg);
              margin-top: 4px;
            }
            &.left-bottom {
              transform: rotate(3deg);
              margin-top: 4px;
            }
            &.right-top {
              transform: rotate(3deg);
            }
            &.right-middle {
              transform: rotate(0deg);
              margin-top: 4px;
            }
            &.right-bottom {
              transform: rotate(-3deg);
              margin-top: 4px;
            }
          }
        }
      }
    }

    .cat-neck {
      width: 22px;
      height: 22px;
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.8), rgba(138, 147, 212, 0.9), rgba(102, 126, 234, 0.8));
      border-radius: 11px;
      transition: height 0.3s ease;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.1);

      &::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: 12px;
        height: 6px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 6px;
      }
    }

    .cat-body-main {
      width: 60px;
      height: 50px;
      background: linear-gradient(180deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.75));
      border-radius: 50% 50% 45% 45%;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.1);

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 42px;
        height: 16px;
        background: rgba(102, 126, 234, 0.8);
        border-radius: 0 0 21px 21px;
      }
    }

    .cat-tail {
      width: 12px;
      height: 45px;
      background: linear-gradient(180deg, rgba(102, 126, 234, 0.9), rgba(138, 147, 212, 0.8));
      border-radius: 6px;
      transform: rotate(25deg) translateX(-18px) translateY(-15px);
      position: absolute;
      bottom: 30px;
      right: -10px;
      transform-origin: top center;
      animation: wag 1.5s ease-in-out infinite;
    }
  }
}

@keyframes peek {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-6px);
  }
  60% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes stretch {
  0% {
    height: 20px;
  }
  50% {
    height: 50px;
  }
  100% {
    height: 40px;
  }
}

@keyframes wag {
  0%,
  100% {
    transform: rotate(25deg) translateX(-18px) translateY(-15px);
  }
  50% {
    transform: rotate(35deg) translateX(-18px) translateY(-15px);
  }
}
</style>
