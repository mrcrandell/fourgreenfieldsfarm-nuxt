<script setup>
// Set custom title for pumpkin patch page
useHead({
  title: "Pumpkin Patch - Four Green Fields Farm",
});

// Gallery images data for pumpkin patch
const galleryImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/photos/cropped/pumpkin_patch1.jpg",
    fullImg: "/assets/img/photos/pumpkin_patch1.jpg",
    alt: "Pumpkin Patch 1",
  },
  {
    id: 2,
    croppedImg: "/assets/img/photos/cropped/pumpkin_patch2.jpg",
    fullImg: "/assets/img/photos/pumpkin_patch2.jpg",
    alt: "Pumpkin Patch 2",
  },
  {
    id: 3,
    croppedImg: "/assets/img/photos/cropped/pumpkin_patch3.jpg",
    fullImg: "/assets/img/photos/pumpkin_patch3.jpg",
    alt: "Pumpkin Patch 3",
  },
  {
    id: 4,
    croppedImg: "/assets/img/photos/cropped/pumpkin_patch4.jpg",
    fullImg: "/assets/img/photos/pumpkin_patch4.jpg",
    alt: "Pumpkin Patch 4",
  },
  {
    id: 5,
    croppedImg: "/assets/img/photos/cropped/pumpkin_patch5.jpg",
    fullImg: "/assets/img/photos/pumpkin_patch5.jpg",
    alt: "Pumpkin Patch 5",
  },
  {
    id: 6,
    croppedImg: "/assets/img/photos/cropped/pumpkin_patch6.jpg",
    fullImg: "/assets/img/photos/pumpkin_patch6.jpg",
    alt: "Pumpkin Patch 6",
  },
  {
    id: 7,
    croppedImg: "/assets/img/photos/cropped/pumpkin_patch7.jpg",
    fullImg: "/assets/img/photos/pumpkin_patch7.jpg",
    alt: "Pumpkin Patch 7",
  },
  {
    id: 8,
    croppedImg: "/assets/img/photos/cropped/pumpkin_patch8.jpg",
    fullImg: "/assets/img/photos/pumpkin_patch8.jpg",
    alt: "Pumpkin Patch 8",
  },
  {
    id: 9,
    croppedImg: "/assets/img/photos/cropped/pumpkin_patch9.jpg",
    fullImg: "/assets/img/photos/pumpkin_patch9.jpg",
    alt: "Pumpkin Patch 9",
  },
];
</script>

<template>
  <main class="main pumpkin-patch-page">
    <h1>Pumpkin Patch</h1>

    <div class="main-gallery-section">
      <div class="gallery-container">
        <BaseGallery :imgs="galleryImgs" />
      </div>
    </div>

    <div class="content-section">
      <p>
        We had lots of folks in our first year ask us to plant a Pumpkin Patch
        so they could do some of their Halloween shopping while enjoying the
        Maze. That sounded like a good idea so we have started planting a patch
        every year. Hopefully the weather, deer, and bugs will cooperate and we
        will have a nice crop of pumpkins for you to pick.
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.pumpkin-patch-page {
  h1 {
    margin-bottom: 2rem;
  }
}

.main-gallery-section {
  margin: 2rem 0;
  text-align: center;

  .gallery-container {
    max-width: rem(800);
    margin: 0 auto;
    border: 4px solid $camarone;
    overflow: hidden;
    @include shadow-1();
  }
}

.content-section {
  margin: 2rem 0;

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    font-size: rem(16);

    @include bp-md-tablet {
      font-size: rem(17);
    }
  }
}
</style>
