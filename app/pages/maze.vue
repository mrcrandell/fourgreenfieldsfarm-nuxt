<script setup>
// Set custom title for maze page
useHead({
  title: "How To Play - Corn Maze - Four Green Fields Farm",
});

// Gallery images data for the maze slideshow
const mazeGalleryImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/photos/maze-pic1.jpg",
    fullImg: "/assets/img/photos/maze-pic1@2x.jpg",
    alt: "Photo of Maze 1",
  },
  {
    id: 2,
    croppedImg: "/assets/img/photos/maze-pic4.jpg",
    fullImg: "/assets/img/photos/maze-pic4.jpg",
    alt: "Photo of Maze 2",
  },
  {
    id: 3,
    croppedImg: "/assets/img/photos/maze-pic5.jpg",
    fullImg: "/assets/img/photos/maze-pic5.jpg",
    alt: "Photo of Maze 3",
  },
  {
    id: 4,
    croppedImg: "/assets/img/photos/maze-pic6.jpg",
    fullImg: "/assets/img/photos/maze-pic6.jpg",
    alt: "Photo of Maze 4",
  },
  {
    id: 5,
    croppedImg: "/assets/img/photos/maze-pic7.jpg",
    fullImg: "/assets/img/photos/maze-pic7.jpg",
    alt: "Photo of Maze 5",
  },
  {
    id: 6,
    croppedImg: "/assets/img/photos/maze-pic8.jpg",
    fullImg: "/assets/img/photos/maze-pic8.jpg",
    alt: "Photo of Maze 6",
  },
  {
    id: 7,
    croppedImg: "/assets/img/photos/cropped/maze-pic9.jpg",
    fullImg: "/assets/img/photos/maze-pic9.jpg",
    alt: "Photo of Maze 7",
  },
  {
    id: 8,
    croppedImg: "/assets/img/photos/cropped/maze-pic10.jpg",
    fullImg: "/assets/img/photos/maze-pic10.jpg",
    alt: "Photo of Maze 8",
  },
  {
    id: 9,
    croppedImg: "/assets/img/photos/cropped/maze-pic11.jpg",
    fullImg: "/assets/img/photos/maze-pic11.jpg",
    alt: "Photo of Maze 9",
  },
  {
    id: 10,
    croppedImg: "/assets/img/photos/cropped/maze-pic12.jpg",
    fullImg: "/assets/img/photos/maze-pic12.jpg",
    alt: "Photo of Maze 10",
  },
  {
    id: 11,
    croppedImg: "/assets/img/photos/cropped/maze-pic13.jpg",
    fullImg: "/assets/img/photos/maze-pic13.jpg",
    alt: "Photo of Maze 11",
  },
  {
    id: 12,
    croppedImg: "/assets/img/photos/cropped/maze-pic14.jpg",
    fullImg: "/assets/img/photos/maze-pic14.jpg",
    alt: "Photo of Maze 12",
  },
  {
    id: 13,
    croppedImg: "/assets/img/photos/cropped/maze-pic15.jpg",
    fullImg: "/assets/img/photos/maze-pic15.jpg",
    alt: "Photo of Maze 13",
  },
  {
    id: 14,
    croppedImg: "/assets/img/photos/cropped/maze-pic16.jpg",
    fullImg: "/assets/img/photos/maze-pic16.jpg",
    alt: "Photo of Maze 14",
  },
];

// Individual feature images
const kidGirlsImg = {
  id: 15,
  croppedImg: "/assets/img/photos/kid-girls-pic.jpg",
  fullImg: "/assets/img/photos/kid-girls-pic.jpg",
  alt: "This guy brought his Mom and his date!",
};

const japanImg = {
  id: 16,
  croppedImg: "/assets/img/photos/japan_in_the_maze.jpg",
  fullImg: "/assets/img/photos/japan_in_the_maze.jpg",
  alt: "Our Maze is so much fun people came all the way from Tokyo to go through it!",
};
</script>

<template>
  <main class="main maze-page">
    <h1>How To Play</h1>

    <div class="main-gallery-section">
      <div class="gallery-container">
        <BaseGallery :imgs="mazeGalleryImgs" />
      </div>
      <p class="gallery-caption">
        We love operating the maze and meeting all the wonderful folks that
        visit our farm.
      </p>
    </div>

    <div class="content-section">
      <div class="feature-image">
        <BaseGallery :imgs="[kidGirlsImg]" />
        <p class="image-caption">
          This guy brought his Mom<br />
          and his date!
        </p>
      </div>

      <div class="text-content">
        <p>
          The maze is typically cut into the field in early July. Hopefully we
          make it better based on suggestions customers have given us the
          previous year. The Maze is still set up to be fun and not too
          challenging if you don't want it to be. If that is the case, just take
          your time, look around and solve the maze. It will take you about 15
          minutes. Just like last year if you want more of a challenge we can
          give you that too. We are just like a video game in that you can play
          the Maze on level 1, 2, or 3 with level 3 being the hardest.
        </p>
      </div>
    </div>

    <div class="levels-section">
      <div class="levels-content">
        <dl class="levels-list">
          <dt>Level 1</dt>
          <dd>Pretty simple: Walk in the entrance and try to find the exit.</dd>

          <dt>Level 2</dt>
          <dd>
            A little tougher: Walk in the entrance and not only do you have to
            try and find the exit but you must also find the 6 treasure chests
            (wire baskets with different colored plastic chips) hidden
            throughout the maze. We do our best to keep our costs down so sorry
            no pirates' chest full of gold. Collect all 5 colors and we'll have
            a little bonus for you when you finish.
          </dd>
        </dl>
      </div>

      <div class="feature-image">
        <BaseGallery :imgs="[japanImg]" />
        <p class="image-caption">
          Our Maze is so much fun people came all the way from Tokyo to go
          through it!
        </p>
      </div>
    </div>

    <HighlightedSection class="rules-section">
      <h3>Rules of the Corn Maze</h3>
      <ol class="rules-list">
        <li>Have Fun!!!!!</li>
        <li>
          Give other people a chance to enjoy the maze. Stay on the paths and
          don't knock down the corn. God only let us grow one crop of corn a
          year.
        </li>
        <li>
          Play the maze the way you want. Do level 1 and pat yourself on the
          back. Do level 2 and give yourself 2 pats on the back. Do level 3 and
          shout "I AM THE GREATEST!" Spend the next week telling everyone you
          are truly a-MAZING!
        </li>
        <li>Remember - the most important thing is TO HAVE FUN!!!!!</li>
      </ol>
    </HighlightedSection>

    <div class="feedback-section">
      <p>
        Let us know what you think. We are already planning next year's maze so
        your ideas will help us make it more fun.
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.maze-page {
  h1 {
    margin-bottom: 2rem;
  }

  h3 {
    color: var(--primary);
    margin: 2rem 0 1rem 0;
    font-size: rem(24);
  }
}

.main-gallery-section {
  margin: 2rem 0;
  text-align: center;

  .gallery-container {
    max-width: rem(650);
    margin: 0 auto;
    border: 4px solid $camarone;
    overflow: hidden;
    @include shadow-1();
  }

  .gallery-caption {
    margin-top: 1rem;
    font-style: italic;
    color: var(--text-muted);
    font-size: rem(14);

    @include bp-md-tablet {
      font-size: rem(16);
    }
  }
}

.content-section {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;

  @include bp-md-tablet {
    grid-template-columns: rem(300) auto;
    gap: 2rem;
  }

  .text-content {
    p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
  }
}

.levels-section {
  margin: 3rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;

  @include bp-md-tablet {
    grid-template-columns: auto rem(300);
    gap: 2rem;
  }

  .levels-content {
    .levels-list {
      dt {
        font-weight: 600;
        color: var(--primary);
        margin: 1.5rem 0 0.5rem 0;
        font-size: rem(18);

        &:first-child {
          margin-top: 0;
        }
      }

      dd {
        margin-left: 0;
        margin-bottom: 1rem;
        line-height: 1.6;
        color: var(--text);
      }
    }
  }
}

.feature-image {
  text-align: center;

  :deep(.gallery) {
    max-width: rem(300);
    margin: 0 auto;
    border: 4px solid $camarone;
    overflow: hidden;
    @include shadow-1();
  }

  .image-caption {
    margin-top: 0.75rem;
    font-size: rem(14);
    font-style: italic;
    color: var(--text-muted);
    line-height: 1.4;
  }
}

.rules-section {
  h3 {
    margin-top: 0;
    color: $camarone;
  }

  .rules-list {
    margin: 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: 1rem;
      line-height: 1.6;

      &:last-child {
        margin-bottom: 0;
      }

      &:first-child,
      &:last-child {
        font-weight: 600;
        color: var(--primary);
      }
    }
  }
}

.feedback-section {
  margin: 3rem 0 2rem 0;
  text-align: center;

  p {
    font-size: rem(16);
    font-weight: 500;
    color: var(--secondary);
    margin: 0;

    @include bp-md-tablet {
      font-size: rem(18);
    }
  }
}
</style>
