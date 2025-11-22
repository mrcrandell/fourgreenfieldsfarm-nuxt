<script setup>
// Set custom title for rides page
useHead({
  title: "It's Time to Slow Down and Relax - Four Green Fields Farm",
});

// Gallery images data for hay and sleigh rides (including YouTube video first)
const galleryImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/photos/heysleigh-youtube-1.jpg",
    fullImg: "/assets/img/photos/heysleigh-youtube-1.jpg",
    alt: "Hay & Sleigh Rides YouTube Video",
    isVideo: true,
    videoId: "4MDSAb9MyoY",
  },
  {
    id: 2,
    croppedImg: "/assets/img/photos/cropped/heysleigh1.jpg",
    fullImg: "/assets/img/photos/heysleigh1.jpg",
    alt: "Photo of Hay and Sleigh Rides 1",
  },
  {
    id: 3,
    croppedImg: "/assets/img/photos/heysleigh2.jpg",
    fullImg: "/assets/img/photos/heysleigh2.jpg",
    alt: "Photo of Hay and Sleigh Rides 2",
  },
  {
    id: 4,
    croppedImg: "/assets/img/photos/heysleigh4.jpg",
    fullImg: "/assets/img/photos/heysleigh4.jpg",
    alt: "Photo of Hay and Sleigh Rides 3",
  },
  {
    id: 5,
    croppedImg: "/assets/img/photos/cropped/heysleigh5.jpg",
    fullImg: "/assets/img/photos/heysleigh5.jpg",
    alt: "Photo of Hay and Sleigh Rides 4",
  },
  {
    id: 6,
    croppedImg: "/assets/img/photos/heysleigh6.jpg",
    fullImg: "/assets/img/photos/heysleigh6.jpg",
    alt: "Photo of Hay and Sleigh Rides 5",
  },
  {
    id: 7,
    croppedImg: "/assets/img/photos/heysleigh7.jpg",
    fullImg: "/assets/img/photos/heysleigh7.jpg",
    alt: "Photo of Hay and Sleigh Rides 6",
  },
  {
    id: 8,
    croppedImg: "/assets/img/photos/cropped/heysleigh8.jpg",
    fullImg: "/assets/img/photos/heysleigh8.jpg",
    alt: "Photo of Hay and Sleigh Rides 7",
  },
  {
    id: 9,
    croppedImg: "/assets/img/photos/cropped/heysleigh11.jpg",
    fullImg: "/assets/img/photos/heysleigh11.jpg",
    alt: "Photo of Hay and Sleigh Rides 8",
  },
  {
    id: 10,
    croppedImg: "/assets/img/photos/cropped/heysleigh12.jpg",
    fullImg: "/assets/img/photos/heysleigh12.jpg",
    alt: "Photo of Hay and Sleigh Rides 9",
  },
  {
    id: 11,
    croppedImg: "/assets/img/photos/cropped/heysleigh13.jpg",
    fullImg: "/assets/img/photos/heysleigh13.jpg",
    alt: "Photo of Hay and Sleigh Rides 10",
  },
  {
    id: 12,
    croppedImg: "/assets/img/photos/cropped/heysleigh15.jpg",
    fullImg: "/assets/img/photos/heysleigh15.jpg",
    alt: "Photo of Hay and Sleigh Rides 11",
  },
  {
    id: 13,
    croppedImg: "/assets/img/photos/cropped/heysleigh16.jpg",
    fullImg: "/assets/img/photos/heysleigh16.jpg",
    alt: "Photo of Hay and Sleigh Rides 12",
  },
  {
    id: 14,
    croppedImg: "/assets/img/photos/cropped/heysleigh17.jpg",
    fullImg: "/assets/img/photos/heysleigh17.jpg",
    alt: "Photo of Hay and Sleigh Rides 13",
  },
  {
    id: 15,
    croppedImg: "/assets/img/photos/cropped/heysleigh18.jpg",
    fullImg: "/assets/img/photos/heysleigh18.jpg",
    alt: "Photo of Hay and Sleigh Rides 14",
  },
  {
    id: 16,
    croppedImg: "/assets/img/photos/cropped/heysleigh20.jpg",
    fullImg: "/assets/img/photos/heysleigh20.jpg",
    alt: "Photo of Hay and Sleigh Rides 15",
  },
  {
    id: 17,
    croppedImg: "/assets/img/photos/cropped/heysleigh23.jpg",
    fullImg: "/assets/img/photos/heysleigh23.jpg",
    alt: "Photo of Hay and Sleigh Rides 16",
  },
  {
    id: 18,
    croppedImg: "/assets/img/photos/cropped/heysleigh24.jpg",
    fullImg: "/assets/img/photos/heysleigh24.jpg",
    alt: "Photo of Hay and Sleigh Rides 17",
  },
  {
    id: 19,
    croppedImg: "/assets/img/photos/cropped/heysleigh25.jpg",
    fullImg: "/assets/img/photos/heysleigh25.jpg",
    alt: "Photo of Hay and Sleigh Rides 18",
  },
  {
    id: 20,
    croppedImg: "/assets/img/photos/cropped/heysleigh26.jpg",
    fullImg: "/assets/img/photos/heysleigh26.jpg",
    alt: "Photo of Hay and Sleigh Rides 19",
  },
  {
    id: 21,
    croppedImg: "/assets/img/photos/cropped/heysleigh27.jpg",
    fullImg: "/assets/img/photos/heysleigh27.jpg",
    alt: "Photo of Hay and Sleigh Rides 20",
  },
];

// Individual feature images
const ridesImg1 = {
  id: 22,
  croppedImg: "/assets/img/photos/cropped/rides1.jpg",
  fullImg: "/assets/img/photos/rides1.jpg",
  alt: "Rides",
};

const ridesImg3 = {
  id: 23,
  croppedImg: "/assets/img/photos/cropped/rides3.jpg",
  fullImg: "/assets/img/photos/rides3.jpg",
  alt: "Rocky and Charlie are ready to go, all they need is you",
};
</script>

<template>
  <main class="main rides-page">
    <h1>It's Time to Slow Down and Relax</h1>

    <div class="main-gallery-section">
      <div class="gallery-container">
        <BaseGallery :imgs="galleryImgs" />
      </div>
    </div>

    <div class="content-section">
      <div class="image-left">
        <BaseGallery :imgs="[ridesImg1]" />
      </div>

      <div class="text-content">
        <p>
          We offer private group wagon and sleigh ride opportunities from
          September to March in addition to wagon rides when our Maze is open
          and sleigh rides.* We generally only book one group a day because we
          want you to enjoy the experience and the beauty of our farm at your
          own pace. We can take groups of up to 12 people on the wagon at a time
          (a few more if some are kids or real skinny) and our prices will fit
          the budget of even the most cost conscious group. (Prices are listed
          below.) We can take groups of any size but just understand that only
          12 or so can go on the wagon at once. If you've got a really big
          group, Rocky and Charlie have friends so contact us and we'll try to
          add a second team and sleigh.
        </p>

        <p>
          There are 2.2 miles of trails throughout our farm that cut through
          open fields, woods, and wetlands giving you a chance to see the
          natural diversity of the farm. We have a warming house for your use
          and an area set up for camp fires so there is no need to hurry off at
          the end of your ride. You can bring your own goodies and sit around a
          roaring fire, visit, roast hot dogs, make smores, or just "be." We'll
          do our best to make you comfortable and no one will be pushing you
          down the road so toss another log on the fire and relax. As an old
          Irishman once said, "You'd better slow down boyo or you'll be chasin'
          your own shadow for sure."
        </p>
      </div>
    </div>

    <div class="content-section">
      <div class="text-content">
        <p>
          Here is what you can look forward to seeing in the winter. Think about
          it: A frosty ride through the woods to a roaring bonfire where you can
          laugh talk and realize what beauty Michigan has no matter the season.
          If you book in the winter and there is no snow, don't worry we will
          just use the wheeled wagon.
        </p>
      </div>

      <div class="image-right">
        <BaseGallery :imgs="[ridesImg3]" />
        <p class="image-caption">
          Rocky and Charlie are ready to go,<br />
          all they need is you.
        </p>
      </div>
    </div>

    <HighlightedSection class="pricing-section">
      <p class="pricing-text">
        <strong>
          Wagon/Sleigh Ride with bonfire and use of our warming house is $80.
          Please contact us for pricing options for groups of 40 or more people.
        </strong>
      </p>
    </HighlightedSection>

    <div class="additional-info">
      <p>
        If you'd like to combine the corn maze experience with a wagon ride,
        contact us for details on how you can do that. You can contact us at the
        email link or phone number on our home page.
      </p>

      <p class="disclaimer">
        *We use the sleigh if there is enough snow and if not we used the
        wheeled wagon.
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.rides-page {
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
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @include bp-md-tablet {
    grid-template-columns: rem(300) auto;
    gap: 2rem;
  }

  &:nth-child(4) {
    @include bp-md-tablet {
      grid-template-columns: auto rem(300);
    }
  }

  .image-left,
  .image-right {
    overflow: hidden;

    :deep(.gallery) {
      margin: 0 auto;
      max-width: 100%;
      width: 100%;
      border: 4px solid $camarone;
      @include shadow-1();
    }

    .image-caption {
      margin-top: 0.75rem;
      font-size: rem(14);
      font-style: italic;
      color: var(--text-muted);
      line-height: 1.4;
      text-align: center;
    }
  }

  .image-right {
    @include bp-md-tablet {
      order: 2;
    }
  }

  .text-content {
    p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
  }
}

.pricing-section {
  text-align: center;

  .pricing-text {
    margin: 0;
    font-size: rem(16);
    line-height: 1.6;

    @include bp-md-tablet {
      font-size: rem(18);
    }

    strong {
      color: var(--primary);
    }
  }
}

.additional-info {
  margin: 2rem 0;

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .disclaimer {
    font-style: italic;
    color: var(--text-muted);
    font-size: rem(14);
  }
}
</style>
