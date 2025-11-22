<script setup lang="ts">
import type { Swiper } from "swiper";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay, EffectCreative } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-creative";

interface GalleryImg {
  id: string | number;
  croppedImg: string;
  fullImg: string;
  alt?: string;
  isVideo?: boolean;
  videoId?: string;
}

interface Props {
  imgs: GalleryImg[];
}

const props = defineProps<Props>();

const selectedImg = ref<GalleryImg | null>(null);
const isModalOpen = ref(false);
const isVideoModalOpen = ref(false);
const selectedVideoId = ref<string>("");
const swiperInstance = ref<Swiper | null>(null);
const swiperContainer = ref<HTMLElement | null>(null);

const isSingleImage = computed(() => props.imgs.length === 1);

function openModal(image: GalleryImg) {
  if (image.isVideo && image.videoId) {
    selectedVideoId.value = image.videoId;
    isVideoModalOpen.value = true;
  } else {
    selectedImg.value = image;
    isModalOpen.value = true;
  }
}

function closeModal() {
  isModalOpen.value = false;
  selectedImg.value = null;
}

function closeVideoModal() {
  isVideoModalOpen.value = false;
  selectedVideoId.value = "";
}

function startSwiper() {
  if (swiperContainer.value && !swiperInstance.value) {
    swiperInstance.value = new SwiperClass(swiperContainer.value, {
      modules: [Autoplay, EffectCreative],
      slidesPerView: 1,
      loop: true,
      effect: "creative",
      autoplay: {
        delay: 8000,
        disableOnInteraction: true,
      },
      creativeEffect: {
        prev: {
          shadow: false,
          translate: ["-20%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
    });
  }
}

onMounted(() => {
  if (!isSingleImage.value) {
    startSwiper();
  }
});

onUnmounted(() => {
  if (swiperInstance.value) {
    swiperInstance.value.destroy();
    swiperInstance.value = null;
  }
});
</script>

<template>
  <div class="gallery">
    <div ref="swiperContainer" class="swiper">
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

      <!-- Slideshow Controls - only show for multiple images -->
      <div v-if="!isSingleImage" class="swiper-controls">
        <button class="btn-prev" @click="swiperInstance?.slidePrev()">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="m16.67 0 2.83 2.829-9.339 9.175 9.339 9.167L16.67 24 4.5 12.004z"
              />
            </svg>
          </div>
        </button>
        <button class="btn-next" @click="swiperInstance?.slideNext()">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M7.33 24 4.5 21.171l9.339-9.175L4.5 2.829 7.33 0 19.5 11.996z"
              />
            </svg>
          </div>
        </button>
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

    <!-- Modal for YouTube video -->
    <BaseModal
      class="modal-video"
      :is-shown="isVideoModalOpen"
      @closed="closeVideoModal"
    >
      <template #header>
        <h5 class="modal-title sr-only">Video</h5>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeVideoModal"
        >
          <IconClose />
        </button>
      </template>

      <div v-if="selectedVideoId" class="modal-video-container">
        <div class="video-wrapper">
          <iframe
            :src="`https://www.youtube.com/embed/${selectedVideoId}`"
            frameborder="0"
            allowfullscreen
            class="video-iframe"
          />
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<style lang="scss" scoped>
.gallery {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.swiper {
  width: 100%;
  height: auto;
}

.swiper-slide {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-thumbnail {
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
}

.swiper-controls {
  .btn-prev,
  .btn-next {
    position: absolute;
    z-index: 30;
    top: 0;
    bottom: 0;
    margin: auto 0;
    height: rem(40);
    width: rem(40);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: $white;
    border: 2px solid transparent;
    color: $chicory-flower;
    transition: all 0.25s ease-in-out;

    &:hover {
      border-color: $chicory-flower;
    }

    svg {
      display: block;
      fill: currentColor;
    }

    .icon-container {
      width: 50%;
    }
  }

  .btn-prev {
    left: rem(6);

    .icon-container {
      margin-right: rem(4);
    }
  }

  .btn-next {
    right: rem(6);

    .icon-container {
      margin-left: rem(2);
    }
  }
}

.modal-gallery,
.modal-video {
  :deep(.modal-dialog) {
    @include bp-lg-laptop {
      max-width: rem(800);
    }
    @include bp-xl-desktop {
      max-width: rem(1000);
    }
  }
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

.modal-video-container {
  width: 100%;

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;

    .video-iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
