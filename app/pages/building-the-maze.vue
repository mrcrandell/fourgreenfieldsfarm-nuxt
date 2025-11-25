<script setup>
// Set custom title for building the maze page
useHead({
  title: "Building the Maze",
});

// Gallery images data for building the maze
const galleryImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/photos/cropped/building_a_maze_img_0.jpg",
    fullImg: "/assets/img/photos/building_a_maze_img_0.jpg",
    alt: "The farmer's daughters measuring out a portion of the maze",
  },
  {
    id: 2,
    croppedImg: "/assets/img/photos/cropped/building_a_maze_img_1.jpg",
    fullImg: "/assets/img/photos/building_a_maze_img_1.jpg",
    alt: "John Deere 850 tractor and brush hog mowing the maze pattern",
  },
  {
    id: 3,
    croppedImg: "/assets/img/photos/cropped/building_a_maze_img_2.jpg",
    fullImg: "/assets/img/photos/building_a_maze_img_2.jpg",
    alt: "The same path after rotto-tilling",
  },
  {
    id: 4,
    croppedImg: "/assets/img/photos/cropped/building_a_maze_img_3.jpg",
    fullImg: "/assets/img/photos/building_a_maze_img_3.jpg",
    alt: "One of the farmers daughters at work picking up rocks",
  },
];
</script>

<template>
  <main class="main building-maze-page">
    <h1>Building the Maze</h1>

    <div class="intro-section">
      <p>
        Many of you might wonder how the Maze is created so here is everything
        you ever wanted to know about corn mazes but were afraid to ask. The
        first step in making the maze is to draw it out. Now you may have seen
        pictures of other Corn Mazes made in the shape of a pirate ship, rocket,
        President's face, or all sorts of things. Well those are great but they
        are very expensive to have designed and so admission prices of 8 to 12
        bucks are common at those mazes.
      </p>

      <p>
        We like the idea of keeping our fun affordable ($3) so we go the "do it
        yourself" route. Plus, every farmer in the world hates to pay for
        something they think they can do themselves. We lay out the Maze using
        the dimensions of the field trying to make sure we keep enough space
        between paths. We also try to design a pattern that presents as many
        multiple choice situations as possible. Our attitude is the more times
        you have 3 choices of directions to go the more times you'll be wrong.
      </p>

      <p>
        The next step is to plant a field of corn. We do it a little different
        for a maze than we would for a non-maze field in that we plant rows both
        north and south and east and west. That is to make the corn as thick as
        possible which makes a better maze. We also use limited herbicides and
        fertilizer along with rotating our crops to make sure the corn is nice
        and thick. The result is the field is pretty environmentally friendly
        (full of weeds).
      </p>

      <p>
        The actual making of the maze is done around the first part of July when
        the corn is just above knee height. We layout the Maze using a 100ft
        tape and laser range finder. Paths are marked using reflective poles
        made for marking driveway edges. These poles are what the person mowing
        the paths with the tractor follows to cut the maze into the field.
      </p>
    </div>

    <div class="featured-image-section">
      <BaseGallery :imgs="[galleryImgs[0]]" />
      <p class="image-caption">
        The farmer's daughters measuring out a portion of the maze.
      </p>
    </div>

    <div class="content-section">
      <div class="image-left">
        <BaseGallery :imgs="[galleryImgs[1]]" />
      </div>

      <div class="text-content">
        <p>
          Once the Maze is laid out we use the farm's John Deere 850 tractor and
          brush hog pictured to the left to mow the pattern into the corn. This
          picture shows one of the farm owners working on the south end of the
          2008 maze. His family thinks this photo shows his best side.
        </p>

        <p>
          We then go over the paths with a rotto-tiller that fits on the same
          small tractor. This smoothes the trails and chews up the corn stalks
          so they don't grow back.
        </p>
      </div>
    </div>

    <div class="content-section">
      <div class="text-content">
        <p>
          A final leveling of the trails is done with a drag (old wood pallet)
          pulled by a four wheeled ATV, the loose rocks are picked up, and all
          that is left is to wait for the corn to finish growing.
        </p>
      </div>

      <div class="image-right">
        <BaseGallery :imgs="[galleryImgs[2]]" />
        <p class="image-caption">The same path after rotto-tilling.</p>
      </div>
    </div>

    <div class="final-image-section">
      <BaseGallery :imgs="[galleryImgs[3]]" />
      <p class="image-caption">
        One of the farmers daughters at work picking up rocks. Great workout and
        cheaper than any of the local health clubs. The rocks get used to
        prevent erosion along a drainage ditch so we get double value out of the
        work.
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.building-maze-page {
  h1 {
    margin-bottom: 2rem;
  }
}

.intro-section {
  margin: 2rem 0;

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
}

.featured-image-section,
.final-image-section {
  margin: 3rem 0;
  text-align: center;

  :deep(.gallery) {
    // max-width: rem(650);
    margin: 0 auto;
    border: 4px solid $camarone;
    @include shadow-1();
  }

  .image-caption {
    margin-top: 1rem;
    font-style: italic;
    color: var(--text-muted);
    font-size: rem(14);
    line-height: 1.4;

    @include bp-md-tablet {
      font-size: rem(16);
    }
  }
}
.featured-image-section :deep(.gallery) {
  max-width: rem(800);
}
.final-image-section {
  max-width: rem(650);
  margin: rem(48) auto;
  :deep(.gallery) {
    max-width: rem(575);
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

  &:nth-of-type(even) {
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
</style>
