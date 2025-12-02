<script setup>
const {
  public: { siteUrl },
} = useRuntimeConfig();

// Set custom title and SEO for maple syrup page
useHead({
  title: "Making Maple Syrup",
  meta: [
    {
      name: "description",
      content:
        "Learn about maple syrup production at Four Green Fields Farm in Rodney, MI. Pure maple syrup for sale in glass and plastic containers. Order online with shipping available.",
    },
    {
      name: "keywords",
      content:
        "maple syrup, pure maple syrup, maple syrup for sale, making maple syrup, Michigan maple syrup, Four Green Fields Farm syrup, maple syrup production",
    },
    // Open Graph tags
    {
      property: "og:title",
      content: "Making Maple Syrup | Four Green Fields Farm",
    },
    {
      property: "og:description",
      content:
        "Learn about maple syrup production at Four Green Fields Farm. Pure maple syrup for sale in glass and plastic containers with shipping available.",
    },
    {
      property: "og:url",
      content: `${siteUrl}/maple-syrup`,
    },
    {
      property: "og:image",
      content: `${siteUrl}/assets/img/photos/syrup2.jpg`,
    },
    // Twitter Card tags
    {
      name: "twitter:title",
      content: "Making Maple Syrup | Four Green Fields Farm",
    },
    {
      name: "twitter:description",
      content:
        "Learn about maple syrup production at Four Green Fields Farm. Pure maple syrup for sale with shipping available.",
    },
    {
      name: "twitter:image",
      content: `${siteUrl}/assets/img/photos/syrup2.jpg`,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteUrl}/maple-syrup`,
    },
  ],
});

// Gallery images data for maple syrup production
const galleryImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/photos/cropped/syrup2.jpg",
    fullImg: "/assets/img/photos/syrup2.jpg",
    alt: "Making Maple Syrup 1",
  },
  {
    id: 2,
    croppedImg: "/assets/img/photos/cropped/syrup5.jpg",
    fullImg: "/assets/img/photos/syrup5.jpg",
    alt: "Making Maple Syrup 2",
  },
  {
    id: 3,
    croppedImg: "/assets/img/photos/cropped/syrup3.jpg",
    fullImg: "/assets/img/photos/syrup3.jpg",
    alt: "Making Maple Syrup 3",
  },
  {
    id: 4,
    croppedImg: "/assets/img/photos/cropped/syrup4.jpg",
    fullImg: "/assets/img/photos/syrup4.jpg",
    alt: "Making Maple Syrup 5",
  },
];

// Pricing data for maple syrup
const pricingData = [
  { size: "4 oz", glass: "$3.50 + shipping", plastic: "yes" },
  { size: "8 oz", glass: "$5 + shipping", plastic: "yes" },
  { size: "Pint", glass: "$8.50 + shipping", plastic: "yes" },
  { size: "Quart", glass: "$15 + shipping", plastic: "yes" },
  { size: "Half Gallon", glass: "not available", plastic: "$25 + shipping" },
  { size: "Gallon", glass: "not available", plastic: "$44 + shipping" },
];
</script>

<template>
  <main class="main maple-syrup-page">
    <h1>Making Maple Syrup</h1>

    <div class="intro-section">
      <p>
        We love the taste of real maple syrup here on the farm and so decided to
        make our own. We quickly realized that if we were going to put in the
        effort to make some for ourselves, we might as well make enough for
        others to enjoy. That is how we got into the syrup business. It doesn't
        hurt that making syrup is fun and a great way to get out in the woods as
        the seasons transition from winter to spring.
      </p>

      <p>
        We started out producing our syrup with our good friend Andy Yoder, a
        local Amish farmer. Kevin and Andy get together on quite a few projects
        throughout the year and so getting together to make syrup was pretty
        easy. (It is interesting to note that Amish and non-Amish wives roll
        their eyes in the very same fashion at things their husbands say and
        do.) Andy's Dad Robert took over boiling the syrup for a couple of years
        and then decided to concentrate on his wood working business. We
        purchased his equipment in 2014 and will be sole operators in the spring
        of 2015. Fortunately, Andy and Robert are still our good friends and we
        see them often.
      </p>

      <p>
        The process of making syrup is pretty simple. The sap from maple trees
        is collected and boiled down into syrup. Maple syrup is a truly
        wonderful delicious all natural product with no preservatives or
        additives. Besides using it on pancakes, waffles, and French toast, it
        can be used in baking, cooking, on top of ice cream, and as a sweetener
        in coffee and tea.
      </p>
    </div>

    <div class="process-section">
      <p>
        The first step in the process is to tap maple trees so that the sap from
        the trees can be gathered. We use the tried and true method of drilling
        a small hole into the tree and then inserting the "tap" which is a small
        hollow metal tube through which the sap from the tree will flow into a
        bucket which is hung on the tree. In large operations, plastic tubes can
        be attached to the taps and run to a large holding container or even
        pumped great distances to holding containers. Trees are tapped towards
        the end of winter when daytime temperatures begin to stay above freezing
        while night time temps stay below freezing. These conditions cause the
        sap to start to "flow".
      </p>

      <div class="gallery-row">
        <div class="gallery-left">
          <BaseGallery :imgs="[galleryImgs[0], galleryImgs[1]]" />
        </div>
        <div class="gallery-right">
          <BaseGallery :imgs="[galleryImgs[2]]" />
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="text-content">
        <p>
          Next is the collection of the sap which is done on a daily basis. We
          go to each tree and dump the contents of the buckets into a container
          or drum so that it can be hauled to the "sugar house" where it will be
          boiled down into syrup. It takes anywhere from 35 to 50 gallons of sap
          to make a gallon of syrup depending on the sugar content of the sap.
          The higher the sugar content the less sap needed to make a gallon of
          syrup, the lower the sugar content the more sap that is needed.
        </p>

        <p>
          Once the sap is collected and hauled to the "Sugar House" the process
          of boiling it down can begin. The sap is poured into a pan usually
          over a wood fire contained in an "arch". The combination of arch and
          pan is called an evaporator and often includes a hood which captures
          the rising steam to preheat the sap before it goes into the pan for
          boiling. How fast the sap is converted into syrup is based on the
          amount of sap being boiled and the surface area of the pan. The
          greater the surface area of the pan the faster the excess water is
          evaporated and syrup is created. Once all the excess water is boiled
          off what is left is pure maple syrup.
        </p>
      </div>

      <div class="image-right">
        <BaseGallery :imgs="[galleryImgs[3]]" />
      </div>
    </div>

    <div class="grading-section">
      <p>
        Syrup, like many other products, is graded. I won't bore you with an
        explanation of grading other than to tell you we try to produce a nice
        table grade of syrup. It is not too light and not too dark. It is what
        Goldilocks called "just right" for putting to any use you can think of.
      </p>
    </div>

    <HighlightedSection class="contact-section">
      <h2>Purchase Our Syrup</h2>
      <p>
        If you would like to purchase some of our syrup, you can contact Kevin
        at
        <a href="tel:231.580.1463">231.580.1463</a> or via email at
        <a href="mailto:fourgreenfieldsman@yahoo.com"
          >fourgreenfieldsman@yahoo.com</a
        >. We will ship syrup anywhere in the world and can make arrangements
        for local pickup and delivery in our area. We will ship either glass or
        plastic and while we do our best we can't guarantee glass won't get
        broken in transit. Contact us for details.
      </p>
    </HighlightedSection>

    <div class="pricing-section">
      <h3>Our price list is below.</h3>
      <div class="table-responsive">
        <table class="pricing-table">
          <thead>
            <tr>
              <th></th>
              <th>Glass Bottle</th>
              <th>Plastic Container</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pricingData" :key="item.size">
              <td>{{ item.size }}</td>
              <td>{{ item.glass }}</td>
              <td>{{ item.plastic }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="visitor-info">
      <p>
        <a
          href="http://www.bigrapids.org/"
          target="_blank"
          rel="noopener noreferrer"
          >Mecosta County Visitor Information</a
        >
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.maple-syrup-page {
  h1 {
    margin-bottom: 2rem;
  }

  h2 {
    color: var(--primary);
    margin: 2rem 0 1rem 0;
    font-size: rem(24);
  }

  h3 {
    color: var(--secondary);
    margin: 1.5rem 0 1rem 0;
    font-size: rem(20);
  }
}

.intro-section,
.process-section,
.grading-section,
.contact-section,
.pricing-section,
.visitor-info {
  margin: 2rem 0;

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
}

.gallery-row {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @include bp-md-tablet {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .gallery-left,
  .gallery-right {
    overflow: hidden;

    :deep(.gallery) {
      margin: 0 auto;
      max-width: 100%;
      width: 100%;
      border: 4px solid $camarone;
      @include shadow-1();
    }
  }
}

.content-section {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @include bp-md-tablet {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .text-content {
    p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
  }

  .image-right {
    :deep(.gallery) {
      margin: 0 auto;
      // max-width: rem(350);
      border: 4px solid $camarone;
      @include shadow-1();
    }

    @include bp-md-tablet {
      order: 2;
    }
  }
}

.contact-section {
  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
}

.pricing-section {
  .table-responsive {
    overflow-x: auto;
    margin: 1rem 0;
  }

  .pricing-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: rem(8);
    overflow: hidden;
    @include shadow-1();

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background: $camarone;
      color: white;
      font-weight: 600;
    }

    tbody tr {
      &:nth-child(even) {
        background: #f9f9f9;
      }

      &:hover {
        background: rgba($camarone, 0.05);
      }
    }

    tbody tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
}

.visitor-info {
  text-align: center;
  margin: 3rem 0 2rem 0;

  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    font-size: rem(16);

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
