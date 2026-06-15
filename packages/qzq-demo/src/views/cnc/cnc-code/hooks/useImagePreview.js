import { ref } from 'vue'

export function useImagePreview() {
  const previewVisible = ref(false)
  const previewImage = ref('')
  const previewFileName = ref('')

  const openImagePreview = (img, fileName) => {
    previewImage.value = img
    previewFileName.value = fileName
    previewVisible.value = true
    document.body.style.overflow = 'hidden'
  }

  const closePreview = () => {
    previewVisible.value = false
    document.body.style.overflow = ''
  }

  return {
    previewVisible,
    previewImage,
    previewFileName,
    openImagePreview,
    closePreview,
  }
}
