<script setup lang="ts">
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";

interface GalleryImg {
  id: string | number;
  croppedImg: string;
  fullImg: string;
  alt?: string;
}

interface Props {
  imgs: GalleryImg[];
}

defineProps<Props>();

const selectedImg = ref<GalleryImg | null>(null);
const isModalOpen = ref(false);

function openModal(image: GalleryImg) {
  selectedImg.value = image;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  selectedImg.value = null;
}
</script>

<template>
  <div class="gallery">
    <div class="swiper">
      <div class="swiper-wrapper">
        <a
          v-for="img in imgs"
          :key="img.id"
          class="swiper-slide"
          :href="img.fullImg"
          @click.prevent="openModal(img)"
          ><img
            :src="img.croppedImg"
            :alt="img.alt || 'Gallery image'"
            class="gallery-thumbnail"
        /></a>
      </div>
    </div>

    <!-- Modal for full-size image -->
    <BaseModal
      class="modal-gallery"
      :is-shown="isModalOpen"
      @closed="closeModal"
    >
      <template #header>
        <h5 class="modal-title sr-only">{{ selectedImg?.alt || "Image" }}</h5>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        >
          <IconClose />
        </button>
      </template>

      <div v-if="selectedImg" class="modal-image-container">
        <img
          :src="selectedImg.fullImg"
          :alt="selectedImg.alt || 'Gallery image'"
          class="modal-image"
        />
      </div>
    </BaseModal>
  </div>
</template>

<style lang="scss" scoped>
.gallery-thumbnail {
  width: 100%;
  height: auto;
  display: block;
}
.modal-gallery {
  :deep(.modal-header) {
    padding: 0;
  }
  .btn-close {
    position: absolute;
    z-index: 30;
    top: rem(16);
    right: rem(16);
    height: rem(32);
    width: rem(32);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: $white;
    color: $chicory-flower;
    transition: all 0.25s ease-in-out;
    padding: rem(10);
    border: 0;
    &:hover {
      border-color: $chicory-flower;
    }

    svg {
      width: 100%;
      fill: currentColor;
    }
  }
}
.modal-image-container {
  width: 100%;
  > img {
    width: 100%;
    height: auto;
    display: block;
  }
}
</style>
