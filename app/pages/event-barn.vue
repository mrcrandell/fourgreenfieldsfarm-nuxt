<script setup>
// Set custom title for event barn page
useHead({
  title: "Wedding and Event Barn - Four Green Fields Farm",
});

// Gallery images for different sections
const barnExteriorImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/event-barn/cropped/event-barn-para-2-1.jpg",
    fullImg: "/assets/img/event-barn/event-barn-para-2-1.jpg",
    alt: "Event Barn 1",
  },
  {
    id: 2,
    croppedImg: "/assets/img/event-barn/cropped/event-barn-para-2-2.jpg",
    fullImg: "/assets/img/event-barn/event-barn-para-2-2.jpg",
    alt: "Event Barn 2",
  },
  {
    id: 3,
    croppedImg: "/assets/img/event-barn/cropped/event-barn-para-2-3.jpg",
    fullImg: "/assets/img/event-barn/event-barn-para-2-3.jpg",
    alt: "Event Barn 3",
  },
  {
    id: 4,
    croppedImg: "/assets/img/event-barn/cropped/event-barn-para-2-4.jpg",
    fullImg: "/assets/img/event-barn/event-barn-para-2-4.jpg",
    alt: "Event Barn 4",
  },
];

const brideRoomImgs = [
  {
    id: 5,
    croppedImg: "/assets/img/event-barn/cropped/event-barn-para-3.jpg",
    fullImg: "/assets/img/event-barn/event-barn-para-3.jpg",
    alt: "Event Barn 5",
  },
];

const weddingArchImgs = [
  {
    id: 6,
    croppedImg: "/assets/img/event-barn/cropped/event-barn-para-4-1.jpg",
    fullImg: "/assets/img/event-barn/event-barn-para-4-1.jpg",
    alt: "Event Barn 6",
  },
  {
    id: 7,
    croppedImg: "/assets/img/event-barn/cropped/event-barn-para-4-2.jpg",
    fullImg: "/assets/img/event-barn/event-barn-para-4-2.jpg",
    alt: "Event Barn 7",
  },
];
</script>

<template>
  <main class="main event-barn-page">
    <h1>Wedding and Event Barn</h1>

    <p>
      We are happy to now offer a wedding and event barn for those looking for
      something a little out of the ordinary for their wedding or event. Our
      barn has a capacity of 100 people. You can increase the number of guests
      by adding a tent if you wish. The grounds around the barn are very
      expansive. The barn will be a wonderful setting for your wedding or event
      and give you life-long memories. The barn is a "warm weather" venue so we
      anticipate our season will be from around the first of June until the
      first of October.
    </p>

    <p>
      The barn is sheeted on the outside with pine lumber logged off from our
      farm and the inside walls are covered with oak also logged off here on the
      farm. We have done our very best to make this a real barn to give you a
      true "out in the country" experience. Naturally, we have added some Irish
      touches and our famous Irish hospitality will be front and center at the
      barn.
    </p>

    <div class="photo-container">
      <BaseGallery :imgs="[barnExteriorImgs[0]]" />
      <BaseGallery :imgs="[barnExteriorImgs[1]]" />
      <BaseGallery :imgs="[barnExteriorImgs[2]]" />
      <BaseGallery :imgs="[barnExteriorImgs[3]]" />
    </div>

    <p>
      We have a room for the bride and her attendants, a room for caterers to
      use to get their food ready (no cooking), and a spot for the groom and his
      groomsmen. There is also a bar and we furnish accessory tables for gifts
      and a guest book.
    </p>

    <div class="photo-container">
      <BaseGallery :imgs="brideRoomImgs" />
    </div>

    <p>
      We have also constructed a wedding arch so that you can conduct your
      ceremony here on the farm just a short walk from the wedding barn
      surrounded by the beauty of nature if you'd like. Want to make a dramatic
      entrance? Add our horse drawn wedding carriage to your big day and make it
      even more memorable. We can keep the cost reasonable because we don't have
      to transport our horse and carriage off the farm.
    </p>

    <div class="photo-container">
      <BaseGallery :imgs="[weddingArchImgs[0]]" />
      <BaseGallery :imgs="[weddingArchImgs[1]]" />
    </div>

    <p>
      Our barn also makes a great place to conduct corporate and government
      training, hold organizational meetings, have a family reunion, host a
      graduation party, or do a fundraising event. Come out in the fall when our
      corn maze, pumpkin patch, and horse drawn wagon rides are in full swing
      for an unforgettable employee picnic or appreciation day.
    </p>

    <h2>Food and Catering</h2>
    <p>
      We have a list of local caterers that you can select from and design your
      event menu however you like. We do not receive any money from these
      caterers but have selected them because of their reputations for
      reliability and quality. We don't want to see your event ruined by a
      caterer who doesn't show up or fails to provide a quality meal and
      service. You do have the option to provide your own caterer we just ask to
      have the name in advance so we can be sure they are reputable.
    </p>

    <h2>Music and Entertainment</h2>
    <p>
      The responsibility of arranging the music and entertainment falls on your
      shoulders. It's up to you to decide what kind of atmosphere you want to
      create for your guests. Whether you choose live music, a DJ, or a
      playlist, make sure it's something that will keep your guests entertained.
      Remember, the right choice of music and entertainment can make or break
      your event.
    </p>

    <h2>Alcohol</h2>
    <p>
      Alcohol is permitted on the premises however it can not be sold without a
      special one day State liquor license. This is only required if you are
      going to have a cash bar. The purchase of beer, wine and spirits is the
      responsibility of the person booking the barn. We require the use of a
      TIPS certified bartender. TIPS is the State of Michigan approved training
      program required of all people who serve alcohol. We have a list of
      bartenders who meet the criteria you can choose from if you don't have a
      person who is TIPS trained. Bookings that will be providing alcohol must
      obtain a one day liquor liability insurance policy for the event. These
      policies are available from a variety of insurance agencies.
    </p>

    <hr />

    <p>
      We have kept our pricing reasonable so that you can have a wonderful
      experience without breaking the bank. We also only book one wedding a
      weekend so the barn will be available from Friday evening till Sunday at
      Noon to those who book it. We also have a small pavilion with picnic
      tables and grill area that you may utilize if you wish free of charge. It
      makes a nice spot for a low key rehearsal dinner or just relaxing after
      decorating for your wedding.
    </p>

    <p>
      Give us a call and arrange a tour of our barn and see for yourself what we
      have to offer. We love visitors and showing off our property even if you
      don't book with us.
    </p>

    <h2>Contact Us Today</h2>
    <p class="contact-phone">
      <a href="tel:231-580-1463">231-580-1463</a>
    </p>
    <p class="contact-email">
      <a href="mailto:fourgreenfieldsman@yahoo.com"
        >fourgreenfieldsman@yahoo.com</a
      >
    </p>

    <hr />

    <div class="prices">
      <h2 class="prices-title">
        Four Green Fields Farm<br />Wedding Venue Price List
      </h2>

      <table class="prices-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reception Barn</td>
            <td>$2800.00</td>
          </tr>
          <tr>
            <td>Reception Barn and Wedding Site</td>
            <td>$3000.00</td>
          </tr>
          <tr>
            <td>Wedding Carriage</td>
            <td>$150.00</td>
          </tr>
          <tr>
            <td>Damage Deposit (Refundable)</td>
            <td>$500.00</td>
          </tr>
        </tbody>
      </table>

      <p class="pricing-details">
        Price includes the use of the venue from 4:00 pm to 9:00 pm on
        Friday.<br />
        Event time on Saturday.<br />
        Clean up on Sunday to be completed by 12:00 pm.
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.event-barn-page {
  h1,
  h2,
  p {
    max-width: rem(900);
    margin-left: auto;
    margin-right: auto;
  }

  p {
    margin-bottom: rem(16);
    line-height: 1.6;
  }

  hr {
    max-width: rem(900);
    margin: 2rem auto;
    border: 0;
    border-top: 1px solid var(--border-color);
  }

  // Special photo container styling for side-by-side images
  .photo-container {
    border: 4px solid $camarone;
    width: fit-content;
    display: flex;
    margin: rem(16) auto;
    overflow: hidden;
    @include shadow-1();

    // Add borders between images
    > :deep(.gallery):not(:last-child) {
      border-right: 4px solid $camarone;
    }

    // Ensure images fit properly
    :deep(.gallery) {
      border: none;
      box-shadow: none;
      // @include shadow-none();

      .gallery-thumbnail {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }

  // Contact styling
  .contact-phone,
  .contact-email {
    // text-align: center;
    font-size: rem(24);
    font-weight: 300;

    a {
      color: var(--primary);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  // Pricing section
  .prices {
    max-width: rem(750);
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    .prices-title {
      text-align: center;
      margin-bottom: 2rem;
      color: var(--primary);
    }
  }

  .prices-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto 2rem;
    background: $white;
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

      td {
        text-align: right;
        font-weight: 600;
        color: var(--primary);
      }
    }

    tbody tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }

  .pricing-details {
    font-size: rem(14);
    color: var(--text-muted);
    font-style: italic;
    text-align: center;
    line-height: 1.5;
  }
}
</style>
