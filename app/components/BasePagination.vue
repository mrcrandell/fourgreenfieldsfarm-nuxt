<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  label: { type: String, default: "Page navigation" },
});
const emit = defineEmits(["goToPage"]);
const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("goToPage", page);
  }
};
const maxPagesVisible = 10;

const pages = computed(() => {
  if (props.totalPages <= maxPagesVisible) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  }

  const pageNumbers = [];
  const halfVisible = Math.floor(maxPagesVisible / 2);
  let start = Math.max(1, props.currentPage - halfVisible);
  let end = Math.min(props.totalPages, start + maxPagesVisible - 1);

  // Adjust start if we're near the end
  if (end === props.totalPages) {
    start = Math.max(1, end - maxPagesVisible + 1);
  }
  // Adjust end if we're near the start
  if (start === 1) {
    end = Math.min(props.totalPages, maxPagesVisible);
  }

  // Add ellipsis at the start if needed
  if (start > 1) {
    pageNumbers.push(1);
    if (start > 2) pageNumbers.push("...");
  }

  // Add page numbers
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  // Add ellipsis at the end if needed
  if (end < props.totalPages) {
    if (end < props.totalPages - 1) pageNumbers.push("...");
    pageNumbers.push(props.totalPages);
  }

  return pageNumbers;
});
</script>
<template>
  <nav v-if="totalPages > 1" :aria-label="label">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          href="#"
          class="page-link"
          :aria-disabled="currentPage === 1"
          @click.prevent="goToPage(currentPage - 1)"
        >
          Previous
        </a>
      </li>
      <template v-for="page in pages" :key="page">
        <li
          v-if="page !== '...'"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <a
            href="#"
            class="page-link"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click.prevent="goToPage(page)"
          >
            {{ page }}
          </a>
        </li>
        <li v-else class="page-item disabled">
          <span class="page-link">...</span>
        </li>
      </template>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          href="#"
          class="page-link"
          :aria-disabled="currentPage === totalPages"
          @click.prevent="goToPage(currentPage + 1)"
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.pagination {
  // scss-docs-start pagination-css-vars
  --pagination-padding-x: #{$pagination-padding-x};
  --pagination-padding-y: #{$pagination-padding-y};
  @include rfs($pagination-font-size, --pagination-font-size);
  --pagination-color: #{$pagination-color};
  --pagination-bg: #{$pagination-bg};
  --pagination-border-width: #{$pagination-border-width};
  --pagination-border-color: #{$pagination-border-color};
  --pagination-border-radius: #{$pagination-border-radius};
  --pagination-hover-color: #{$pagination-hover-color};
  --pagination-hover-bg: #{$pagination-hover-bg};
  --pagination-hover-border-color: #{$pagination-hover-border-color};
  --pagination-focus-color: #{$pagination-focus-color};
  --pagination-focus-bg: #{$pagination-focus-bg};
  --pagination-focus-box-shadow: #{$pagination-focus-box-shadow};
  --pagination-active-color: #{$pagination-active-color};
  --pagination-active-bg: #{$pagination-active-bg};
  --pagination-active-border-color: #{$pagination-active-border-color};
  --pagination-disabled-color: #{$pagination-disabled-color};
  --pagination-disabled-bg: #{$pagination-disabled-bg};
  --pagination-disabled-border-color: #{$pagination-disabled-border-color};
  // scss-docs-end pagination-css-vars

  display: flex;
  padding-left: 0;
  list-style: none;
}

.page-link {
  position: relative;
  display: block;
  padding: var(--pagination-padding-y) var(--pagination-padding-x);
  @include font-size(var(--pagination-font-size));
  color: var(--pagination-color);
  text-decoration: if($link-decoration == none, null, none);
  background-color: var(--pagination-bg);
  border: var(--pagination-border-width) solid var(--pagination-border-color);
  @include transition($pagination-transition);

  &:hover {
    z-index: 2;
    color: var(--pagination-hover-color);
    text-decoration: if($link-hover-decoration == underline, none, null);
    background-color: var(--pagination-hover-bg);
    border-color: var(--pagination-hover-border-color);
  }

  &:focus {
    z-index: 3;
    color: var(--pagination-focus-color);
    background-color: var(--pagination-focus-bg);
    outline: $pagination-focus-outline;
    box-shadow: var(--pagination-focus-box-shadow);
  }

  &.active,
  .active > & {
    z-index: 3;
    color: var(--pagination-active-color);
    background-color: var(--pagination-active-bg);
    border-color: var(--pagination-active-border-color);
  }

  &.disabled,
  .disabled > & {
    color: var(--pagination-disabled-color);
    pointer-events: none;
    background-color: var(--pagination-disabled-bg);
    border-color: var(--pagination-disabled-border-color);
  }
}

.page-item {
  &:not(:first-child) .page-link {
    margin-left: $pagination-margin-start;
  }

  @if $pagination-margin-start == calc(-1 * #{$pagination-border-width}) {
    &:first-child {
      .page-link {
        @include border-start-radius(var(--pagination-border-radius));
      }
    }

    &:last-child {
      .page-link {
        @include border-end-radius(var(--pagination-border-radius));
      }
    }
  } @else {
    // Add border-radius to all pageLinks in case they have left margin
    .page-link {
      @include border-radius(var(--pagination-border-radius));
    }
  }
}
</style>
