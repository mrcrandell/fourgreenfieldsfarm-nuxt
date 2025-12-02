<script setup>
const {
  public: { siteUrl },
} = useRuntimeConfig();

// Set custom title and SEO for directions page
useHead({
  title: "Driving Directions",
  meta: [
    {
      name: "description",
      content:
        "Get driving directions to Four Green Fields Farm at 15693 Wilson Road, Rodney, MI. Located 7 miles east of US 131, exit 139, near Big Rapids. Interactive map included.",
    },
    {
      name: "keywords",
      content:
        "driving directions, Four Green Fields Farm address, 15693 Wilson Road, Rodney Michigan, Big Rapids directions, US 131 exit 139, farm location",
    },
    // Open Graph tags
    {
      property: "og:title",
      content: "Driving Directions | Four Green Fields Farm",
    },
    {
      property: "og:description",
      content:
        "Get driving directions to Four Green Fields Farm at 15693 Wilson Road, Rodney, MI. Located 7 miles east of US 131, exit 139.",
    },
    {
      property: "og:url",
      content: `${siteUrl}/directions`,
    },
    {
      property: "og:image",
      content: `${siteUrl}/assets/img/photos/enterance-sign-pic.jpg`,
    },
    // Twitter Card tags
    {
      name: "twitter:title",
      content: "Driving Directions | Four Green Fields Farm",
    },
    {
      name: "twitter:description",
      content:
        "Get driving directions to Four Green Fields Farm at 15693 Wilson Road, Rodney, MI.",
    },
    {
      name: "twitter:image",
      content: `${siteUrl}/assets/img/photos/enterance-sign-pic.jpg`,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteUrl}/directions`,
    },
  ],
});

const mapContainer = ref(null);
let map = null;

// Farm coordinates from Google Maps
const farmCoordinates = [43.707164, -85.397277];
const googleMapsUrl = "https://maps.google.com/?cid=11947842836509723460";

onMounted(async () => {
  // Only run on client side
  if (import.meta.client) {
    // Dynamically import Leaflet and CSS on client side only
    const [{ default: L }] = await Promise.all([
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]);

    // Fix Leaflet's default icon paths for Vite/Nuxt
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });

    // Initialize the map
    map = L.map(mapContainer.value, {
      center: farmCoordinates,
      zoom: 15,
      scrollWheelZoom: false,
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add marker for the farm
    const marker = L.marker(farmCoordinates).addTo(map);

    // Add popup with farm information
    marker
      .bindPopup(
        `
      <div style="text-align: center;">
        <strong>Four Green Fields Farm</strong><br>
        15693 Wilson Road<br>
        Rodney, MI 49342<br>
        <br>
        <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color: #1976d2;">
          View in Google Maps
        </a>
      </div>
    `
      )
      .openPopup();

    // Enable scroll wheel zoom when clicking on map
    map.on("focus", () => {
      map.scrollWheelZoom.enable();
    });

    map.on("blur", () => {
      map.scrollWheelZoom.disable();
    });
  }
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>

<template>
  <main class="main directions-page">
    <h1>Driving Directions</h1>

    <p>
      We're located at
      <span
        class="inline-address"
        itemprop="address"
        itemscope
        itemtype="http://schema.org/PostalAddress"
      >
        <span itemprop="streetAddress">15693 Wilson Road</span>,
        <span itemprop="addressLocality">Rodney</span>,
        <span itemprop="addressRegion">MI</span>
        <span itemprop="postalCode">49342</span> </span
      >.
    </p>

    <div class="map-container">
      <div id="map" ref="mapContainer" class="map"></div>
    </div>

    <div class="directions-content">
      <div class="direction-group">
        <h2>Coming from the West</h2>
        <p>
          Take M-20 through Big Rapids and turn left onto Colburn, which is
          about 2 blocks south of Maple Street. Take Colburn east approximately
          4 miles to 160th Avenue and turn left. Go 1/2 mile to Wilson Road and
          turn right. Signs will direct you from there.
        </p>
      </div>

      <div class="direction-group">
        <h2>Coming from the East</h2>
        <p>
          Coming from the east on M-20, go straight through the 4 way stop near
          Clear Lake and go north 1 mile on 157th Avenue. Turn left onto
          Chippewa Lake Road and then right onto 160th Avenue, about 3/10ths of
          a mile past 157th. Go 1/2 mile and turn right onto Wilson.
        </p>
      </div>
    </div>

    <div class="info-links">
      <a
        :href="googleMapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
      >
        <span class="icon"><IconMap /></span>
        View in Google Maps
      </a>
      <a
        href="http://www.bigrapids.org/"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-secondary"
      >
        <span class="icon"><IconMarker /></span>
        Mecosta County Visitor Information
      </a>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.directions-page {
  .inline-address {
    font-style: normal;
    font-weight: 600;
    color: var(--primary);
  }
}

.map-container {
  margin: 2rem 0;
  border: 4px solid $camarone;
  overflow: hidden;
  @include shadow-1();
}

.map {
  width: 100%;
  height: rem(400);
  background: #f5f5f5;
  position: relative;

  @include bp-md-tablet {
    height: rem(500);
  }

  // Ensure map controls are visible
  :deep(.leaflet-control-container) {
    font-size: 14px;
  }

  :deep(.leaflet-popup-content) {
    margin: 8px 12px;
    line-height: 1.4;
  }
}

.directions-content {
  margin: 2rem 0;
  display: grid;
  gap: 2rem;

  @include bp-md-tablet {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

.direction-group {
  h2 {
    color: var(--primary);
    font-size: rem(20);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary);
  }

  p {
    line-height: 1.6;
  }
}

.info-links {
  text-align: center;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @include bp-sm-phone-landscape {
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: rem(8);
    text-decoration: none;

    .icon {
      width: rem(24);
      height: rem(24);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: rem(4);
      background-color: $white;
      padding: rem(4);
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

  .btn-secondary .icon svg {
    fill: var(--secondary);
  }
}
</style>
