<script setup>
// Set custom title for home page without template
useHead({
  title: "Four Green Fields Farm",
  titleTemplate: null, // This disables the global template for this page
});

// Gallery images data
const galleryImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/photos/enterance-sign-pic.jpg",
    fullImg: "/assets/img/photos/enterance-sign-pic.jpg",
    alt: "Four Green Fields Farm Entrance Sign",
  },
];
</script>

<template>
  <main class="main home-page">
    <h1>Welcome to the Four Green Fields Farm</h1>

    <BaseGallery :imgs="galleryImgs" />

    <p>
      We are located about 7 miles east of US 131 off exit 139 and about 5 miles
      east of the City of Big Rapids.
    </p>

    <div class="btn-container">
      <router-link class="btn btn-primary" to="/directions">
        <span class="icon"><IconMap /></span>
        Driving &amp; Directions
      </router-link>
      <a
        class="btn btn-tertiary"
        href="https://www.facebook.com/people/Four-Green-Fields-Farm/100067042143292/"
        target="_blank"
      >
        <span class="icon"><IconFacebook /></span>
        Find Us on Facebook</a
      >
    </div>
    <hr />
    <p class="text-center">
      <strong
        >Check the calendar on
        <router-link to="/events">Group Bookings/Events</router-link> for
        weather related cancellations.</strong
      >
    </p>
    <hr />

    <p>
      Every year we are open, we have more fun than the year before. This is the
      17th anniversary of the Corn Maze. Our maze, pumpkin patch, and horse
      drawn wagon rides are all waiting for you still at the same low prices as
      the day we opened in 2007 (see details below). Don't forget that on Friday
      and Saturday nights in October we haunt the maze for those brave souls not
      afraid of what lurks in a dark corn field. Want the Maze all to yourself?
      We love doing private group bookings. They are great for scouts, church
      youth groups, family outings, friends, and birthday parties. We offer you
      use of our picnic area, pavilion, field stone grill, and bonfire pit too.
      We can also accommodate groups during regular business hours so give us a
      call.
    </p>

    <hr />

    <h2>
      Four Green Fields Farm Corn Maze<br /><small>FUN FOR ALL AGES</small>
    </h2>

    <div class="hours-prices">
      <div>
        <h3>Corn Maze</h3>
        <p>Sunday, September 28 to October 29</p>
        <h4>Hours</h4>
        <table class="table">
          <tbody>
            <tr>
              <th>Saturday</th>
              <td>Noon to 5:30pm</td>
            </tr>
            <tr>
              <th>Sundays</th>
              <td>2pm to 5pm</td>
            </tr>
          </tbody>
        </table>
        <h4>Prices</h4>
        <table class="table">
          <tbody>
            <tr>
              <th>Admission</th>
              <td>$3</td>
            </tr>
            <tr>
              <th>Kids under 5</th>
              <td>Free!</td>
            </tr>
            <tr>
              <th>Horse Drawn Wagon Rides</th>
              <td>$2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>Haunted Maze</h3>
        <p>October 10 to October 25</p>
        <h4>Hours</h4>
        <table class="table">
          <tbody>
            <tr>
              <th>Friday</th>
              <td>8pm to 10:30pm</td>
            </tr>
            <tr>
              <th>Saturday</th>
              <td>8pm to 10:30pm</td>
            </tr>
          </tbody>
        </table>
        <h4>Prices</h4>
        <table class="table">
          <tbody>
            <tr>
              <th>Admission</th>
              <td>$5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <section class="contact-section">
      <h2>Contact</h2>
      <div class="contact-info">
        <div class="contact-details">
          <ul class="contact-list">
            <li>
              <span class="icon"><IconPhone /></span>
              231-580-1463 and ask for Kevin
            </li>
            <li>
              <span class="icon"><IconEmail /></span>
              <a href="mailto:fourgreenfieldsman@yahoo.com"
                >fourgreenfieldsman@yahoo.com</a
              >
            </li>
            <li>
              <span class="icon"><IconMarker /></span>
              <address
                itemprop="address"
                itemscope
                itemtype="http://schema.org/PostalAddress"
              >
                <span itemprop="streetAddress">15693 Wilson Road</span><br />
                <span itemprop="addressLocality">Rodney</span>,
                <span itemprop="addressRegion">MI</span>
                <span itemprop="postalCode">49342</span>
              </address>
            </li>
          </ul>
        </div>
        <div class="contact-form-wrapper">
          <ContactForm />
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.gallery {
  margin: 0 auto 1rem auto; // 16px
  text-align: center;
  max-width: rem(300);
  border: 4px solid $camarone;
  @include shadow-1();
  @include bp-sm-phone-landscape {
    float: right;
    margin: 0 0 1rem 1rem; // 16px
  }
}

.btn-container {
  .btn {
    display: flex;
    align-items: center;
    width: fit-content;
    margin: 0 auto 1rem auto; // 16px
    gap: rem(8);
    .icon {
      width: rem(24);
      height: rem(24);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: rem(4);
      background-color: $white;
      // color: $black;
      padding: rem(4);
      margin-right: rem(8);
      flex-shrink: 0;
      svg {
        width: rem(16);
        height: rem(16);
        fill: currentColor;
      }
    }
  }
  .btn-primary .icon svg {
    fill: var(--primary);
  }
  .btn-tertiary .icon svg {
    fill: var(--tertiary);
  }
}

.hours-prices {
  @include bp-md-tablet {
    display: flex;
    justify-content: space-between;
    gap: rem(32);
  }
  > div {
    min-width: rem(300);
    @include bp-lg-laptop {
      min-width: rem(400);
    }
  }
  .table {
    margin-bottom: rem(24);
    > tbody > tr > th {
      width: 50%;
    }
    > tbody > tr > td {
      white-space: nowrap;
    }
  }
}

.contact-section {
  margin-top: 2rem;
}

.contact-info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.contact-form-wrapper {
  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
}

.contact-list {
  list-style: none;
  padding-left: 0;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  address {
    margin-bottom: 0;
  }
  .icon {
    width: rem(24);
    height: rem(24);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: rem(4);
    background-color: $black;
    color: $white;
    padding: rem(4);
    margin-right: rem(8);
    flex-shrink: 0;
    svg {
      width: rem(16);
      height: rem(16);
      fill: currentColor;
    }
  }
}
</style>
