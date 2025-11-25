<script setup>
// Set custom title for haunted maze page
useHead({
  title: "Haunted Maze",
});

// Gallery images data for haunted maze
const galleryImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/photos/cropped/haunted1.jpg",
    fullImg: "/assets/img/photos/haunted1.jpg",
    alt: "Photo of Haunted Maze 1",
  },
  {
    id: 2,
    croppedImg: "/assets/img/photos/cropped/haunted2.jpg",
    fullImg: "/assets/img/photos/haunted2.jpg",
    alt: "Photo of Haunted Maze 2",
  },
  {
    id: 3,
    croppedImg: "/assets/img/photos/cropped/haunted3.jpg",
    fullImg: "/assets/img/photos/haunted3.jpg",
    alt: "Photo of Haunted Maze 3",
  },
  {
    id: 4,
    croppedImg: "/assets/img/photos/cropped/haunted4.jpg",
    fullImg: "/assets/img/photos/haunted4.jpg",
    alt: "Photo of Haunted Maze 4",
  },
  {
    id: 5,
    croppedImg: "/assets/img/photos/cropped/haunted5.jpg",
    fullImg: "/assets/img/photos/haunted5.jpg",
    alt: "Photo of Haunted Maze 5",
  },
];
</script>

<template>
  <main class="main haunted-maze-page">
    <h1>Haunted Maze</h1>

    <div class="main-gallery-section">
      <div class="gallery-container">
        <BaseGallery :imgs="galleryImgs" />
      </div>
    </div>

    <div class="content-section">
      <p>
        It is a pleasant fall evening and there is not a star in the sky. You
        hear the faint rustling of the corn stalks and you walk down a very dark
        path with just a small flashlight to guide you and your friends. You
        don't know why but your heart is beating just a little faster and you
        can feel a bead of sweat on your forehead. Suddenly from behind you
        comes a blood chilling scream and your first instinct is to run, but
        where? After all what's in front of you might be worse than what's
        behind you.
      </p>

      <p>
        This is what you'll face when the Maze at Four Green Fields is haunted
        on Friday and Saturday nights in October. Check our
        <NuxtLink to="/events" class="events-link">Events</NuxtLink> page for
        dates and times. Ghosts, ghouls, and monsters wander through the Maze,
        hide among the corn, and generally do their best to make sure you have a
        good time running for your life and screaming at the top of your lungs.
        Walking through the Maze at night presents a new challenge and when you
        add a little fear to the mixture it becomes a real "interesting"
        experience.
      </p>

      <p>
        The shadows cast along the paths on a moonlight night gives the "spooks"
        a few more places to hide but also makes finding your way a little
        easier. Looking up at a star filled sky with no artificial lights to
        interfere reminds you of the beauty that God has blessed us with. Almost
        makes you forget what's waiting just around the corner for you.
      </p>
    </div>

    <HighlightedSection class="community-section">
      <p>
        Our "haunters" are members of local community groups like 4H and
        volunteer Fire Departments who get 50% of the night's income for their
        work so while you're having fun you are also helping out the local
        community. If you are a member of a community organization that would be
        interested in having some fun and raising funds for your organization,
        give us a call at
        <a href="tel:231.580.1463" class="contact-link">231.580.1463</a> or drop
        us an email using the link on the home page.
      </p>
    </HighlightedSection>

    <div class="pricing-section">
      <p class="pricing-highlight">
        The cost of the Haunted Maze is just <strong>$5</strong>. You won't find
        this much fun at this price anywhere in Big Rapids.
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.haunted-maze-page {
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
    // border-radius: rem(8);
    overflow: hidden;
    @include shadow-1();
  }
}

.content-section {
  margin: 2rem 0;

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .events-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
}

.community-section {
  p {
    margin-bottom: 0;
    line-height: 1.6;
  }

  .contact-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
}

.pricing-section {
  margin: 2rem 0;
  text-align: center;

  .pricing-highlight {
    font-size: rem(18);
    font-weight: 500;
    color: var(--secondary);
    margin: 0;

    @include bp-md-tablet {
      font-size: rem(20);
    }

    strong {
      color: var(--primary);
      font-size: rem(24);
      font-weight: 700;

      @include bp-md-tablet {
        font-size: rem(28);
      }
    }
  }
}
</style>
