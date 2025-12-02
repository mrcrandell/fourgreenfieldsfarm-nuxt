<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const props = defineProps({
  error: Object,
});

const {
  public: { siteUrl },
} = useRuntimeConfig();

// Set SEO meta tags for 404 page
useHead({
  title: "Page Not Found",
  meta: [
    {
      name: "description",
      content:
        "The page you're looking for at Four Green Fields Farm doesn't exist. Visit our corn maze, pumpkin patch, and farm activities in Rodney, MI.",
    },
    {
      name: "robots",
      content: "noindex, nofollow",
    },
    // Open Graph tags
    {
      property: "og:title",
      content: "Page Not Found | Four Green Fields Farm",
    },
    {
      property: "og:description",
      content:
        "The page you're looking for doesn't exist. Visit our corn maze, pumpkin patch, and farm activities.",
    },
    {
      property: "og:url",
      content: siteUrl,
    },
    // Twitter Card tags
    {
      name: "twitter:title",
      content: "Page Not Found | Four Green Fields Farm",
    },
    {
      name: "twitter:description",
      content:
        "The page you're looking for doesn't exist. Visit our corn maze, pumpkin patch, and farm activities.",
    },
  ],
});

const currentUrl = computed(() => {
  const base = config.public.siteUrl; // You define this in .env
  return base + route.fullPath;
});

// Handle different error types
const errorTitle = computed(() => {
  if (props.error?.statusCode === 404) return "Page Not Found";
  if (props.error?.statusCode === 500) return "Server Error";
  return "Something Went Wrong";
});

const errorMessage = computed(() => {
  if (props.error?.statusCode === 404) {
    return `Sorry, the page you are looking for (${currentUrl.value}) can't be found.`;
  }
  if (props.error?.statusCode === 500) {
    return "We're experiencing some technical difficulties. Please try again later.";
  }
  return "An unexpected error occurred. Please try again.";
});
</script>

<template>
  <NuxtLayout name="default">
    <main class="main error-page">
      <div class="error-container">
        <!-- Error Header -->
        <div class="error-header">
          <h1 class="error-title">{{ errorTitle }}</h1>
          <p class="error-message">{{ errorMessage }}</p>

          <div v-if="props.error?.statusCode === 404" class="contact-info">
            <p>
              If you think you are receiving this page in error, please email
              <a
                href="mailto:fourgreenfieldsman@yahoo.com"
                class="contact-link"
              >
                fourgreenfieldsman@yahoo.com
              </a>
              about the issue.
            </p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <NuxtLink to="/" class="btn btn-primary"> Back to Home </NuxtLink>
        </div>

        <!-- Error Details (for development) -->
        <div v-if="props.error && $config.public.dev" class="error-details">
          <details>
            <summary>Error Details (Development)</summary>
            <pre>{{ props.error }}</pre>
          </details>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: rem(20);
}

.error-container {
  max-width: rem(600);
  width: 100%;
  text-align: center;
}

.error-header {
  margin-bottom: rem(40);

  .error-title {
    font-size: rem(36);
    font-weight: 700;
    color: var(--primary);
    margin-bottom: rem(16);

    @include bp-md-tablet {
      font-size: rem(48);
    }
  }

  .error-message {
    font-size: rem(18);
    color: var(--text-secondary);
    margin-bottom: rem(20);
    line-height: 1.5;

    @include bp-md-tablet {
      font-size: rem(20);
    }
  }

  .contact-info {
    margin-top: rem(20);

    p {
      color: var(--text-muted);
      font-size: rem(16);
      margin: 0;
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
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: rem(12);
  align-items: center;
  margin-bottom: rem(40);

  @include bp-sm-phone-landscape {
    flex-direction: row;
    justify-content: center;
    gap: rem(20);
  }

  .btn {
    display: flex;
    align-items: center;
  }
}

.error-details {
  margin-top: rem(40);
  text-align: left;

  details {
    background: #f8f9fa;
    border-radius: rem(6);
    padding: rem(16);

    summary {
      cursor: pointer;
      font-weight: 600;
      margin-bottom: rem(12);
    }

    pre {
      background: $white;
      border: 1px solid var(--border-color);
      border-radius: rem(4);
      padding: rem(12);
      overflow-x: auto;
      font-size: rem(12);
      margin: 0;
    }
  }
}
</style>
