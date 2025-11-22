<script setup>
// Set custom title for farm history page
useHead({
  title: "Farm History - Four Green Fields Farm",
});

// Gallery images data
const galleryImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/photos/bald-eagle-pic.jpg",
    fullImg: "/assets/img/photos/bald-eagle-pic.jpg",
    alt: "The Guard over our gate one fine spring day",
  },
  {
    id: 2,
    croppedImg: "/assets/img/photos/enterance-sign-pic.jpg",
    fullImg: "/assets/img/photos/enterance-sign-pic.jpg",
    alt: "Four Green Fields Farm Entrance Sign",
  },
];
</script>

<template>
  <main class="main farm-history-page">
    <h1>Farm History</h1>

    <header class="irish-banner">
      <h2 class="text-center irish-greeting">
        Cead Mile Falte Ceithre Phairc Ghlasa<br />
        <small>Pronounced: "Keed Me-la fall-sha Kara fork gla-sa"</small>
      </h2>

      <p class="text-center irish-translation">
        That's Irish for:<br />
        "One Hundred Thousand Welcomes to Four Green Fields"
      </p>
    </header>

    <div class="content-section">
      <div class="image-left">
        <BaseGallery :imgs="[galleryImgs[0]]" />
      </div>

      <div class="text-content">
        <p>
          Four Green Fields Farm was established in 2003 and is comprised of 162
          acres of diverse land including crop land, wooded area, wetlands and
          it partially borders a pond. We farm primarily hay to feed our two
          Belgian draft horse geldings - Rocky and Charlie - and to sell. We
          also plant a small amount of other crops such as corn, soybeans,
          wheat, and rye. The farm is home to a variety of wildlife including
          deer, turkeys, bobcats, coyotes, fox, Sandhill cranes, bald eagles, 4
          varieties of turtles, at least 4 varieties of non-poisonous snakes
          (although we aren't real active in looking for them), squirrels,
          rabbits, grouse and assorted waterfowl. There has even been a sighting
          of a wandering black bear. Keep your eyes open as you never know what
          you might see.
        </p>
      </div>
    </div>

    <div class="content-section">
      <div class="image-right">
        <BaseGallery :imgs="[galleryImgs[1]]" />
      </div>

      <div class="text-content">
        <p>
          We try to be good stewards of the land and have undertaken selective
          timber cutting under a renewable forest approach that helps maintain
          and improve wildlife habitat. We are also careful how we use
          commercial fertilizers and herbicides so as to have as little impact
          on the environment as possible. That's why you may see a few more
          weeds. We ask that you take part in respecting the land while you are
          here by not littering. Enjoy the beauty God created and show your
          appreciation by leaving it that way.
        </p>
      </div>
    </div>

    <HighlightedSection>
      <p>
        The name of the farm comes from our pride in our Irish heritage and
        gratitude for the sacrifices our ancestors made to give us the chance to
        live in the greatest nation on earth. The term "Four Green Fields"
        refers to the 4 provinces of Ireland. It is also the title of a popular
        Irish folk song. You'll notice a shield on the farm sign inside the
        outline of Ireland. On it is the crest of each of the 4 provinces of
        Ireland. (Clockwise from the top left: Connaught, Ulster, Leinster and
        Munster). On the bottom of the sign are the locations "Big Rapids
        Michigan, County Kerry, Ireland." That is because while we farm here, we
        are still in contact with the Courtneys "on the land" in County Kerry,
        Ireland, where my Great Grandfather was born. (We have a Rodney mailing
        address but are actually closer to Big Rapids.) Our farm motto that you
        see on our home page and on the bottom of the farm sign both reminds us
        of who we are at the core and of the sacrifices those that came before
        us made to give us the opportunities we enjoy today in this great
        Country. I almost forgot, the motto in Irish is pronounced "O Erin go
        mer-i-caw, say-ree-i-meed on toliv" and it means "From Ireland to
        America We work the Land."
      </p>
    </HighlightedSection>

    <div class="closing-section">
      <p>Thank you for coming to our farm and we hope you enjoy your visit.</p>
      <p class="signature">The Courtney Family</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.farm-history-page {
  .irish-banner {
    text-align: center;
  }
  .irish-greeting {
    color: $pirategold;
    font-size: rem(24);
    margin: 2rem 0 1rem 0;

    @include bp-md-tablet {
      font-size: rem(28);
    }

    small {
      font-size: 65%;
      font-style: italic;
      color: var(--secondary);
      display: block;
      margin-top: 0.5rem;
    }
  }

  .irish-translation {
    font-size: rem(18);
    font-weight: 600;
    // color: var(--secondary);
    margin-bottom: 2rem;
  }
}

.content-section {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @include bp-md-tablet {
    grid-template-columns: rem(350) auto;
    gap: 2rem;
  }

  &:nth-child(even) {
    @include bp-md-tablet {
      grid-template-columns: auto rem(300);
    }
  }

  .image-left,
  .image-right {
    :deep(.gallery) {
      margin: 0 auto;
      max-width: rem(300);
      border: 4px solid $camarone;
      @include shadow-1();

      @include bp-md-tablet {
        max-width: rem(350);
      }
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

.closing-section {
  margin: 3rem 0;
  text-align: center;

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .signature {
    font-weight: 600;
    font-size: rem(18);
    color: var(--primary);
    margin-bottom: 0;
    font-style: italic;
  }
}
</style>
