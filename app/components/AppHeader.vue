<script setup>
const route = useRoute();

console.log(); // My home page

const isOpen = ref(false);
const isMazeMenuOpen = ref(false);

function closeDropdown() {
  if (isMazeMenuOpen.value) {
    isMazeMenuOpen.value = false;
  }
}
</script>

<template>
  <header class="header">
    <div class="header-top">
      <NuxtLink class="logo-container" to="/">
        <AppLogo />
      </NuxtLink>
      <div class="header-slogan">
        <div>From Ireland to America, We Work the Land</div>
        <div>O Eirinn go Mericea, Oibrimid ar an Talamh</div>
        <div>Rodney, MI 49342</div>
        <div><a href="tel:231-580-1463">231-580-1463</a></div>
        <div>
          <a href="mailto:fourgreenfieldsman@yahoo.com"
            >fourgreenfieldsman@yahoo.com</a
          >
        </div>
      </div>
      <button
        class="btn-toggle"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation"
        @click="isOpen = !isOpen"
      >
        <span class="icon-bar top-bar" />
        <span class="icon-bar middle-bar" />
        <span class="icon-bar bottom-bar" />
      </button>
    </div>
    <nav class="navbar" :class="{ 'is-open': isOpen }">
      <ul>
        <li>
          <AppHeaderLink to="/farm-history"> Our History </AppHeaderLink>
        </li>
        <li>
          <AppHeaderLink to="/maple-syrup"> Syrup </AppHeaderLink>
        </li>
        <!-- <li><AppHeaderLink to="/honey">Honey</AppHeaderLink></li> -->
        <li v-outside="closeDropdown">
          <a
            class="dropdown-toggle"
            :class="{
              'router-link-active':
                isMazeMenuOpen || route.meta.activeMenu === 'maze',
            }"
            href="#"
            @click.prevent="isMazeMenuOpen = !isMazeMenuOpen"
            >Corn Maze
            <div class="icon-container"><IconCaret /></div
          ></a>
          <ul
            class="dropdown-menu"
            :class="{ show: isMazeMenuOpen }"
            role="menu"
          >
            <li>
              <AppHeaderLink to="/maze" @click="isMazeMenuOpen = false">
                How to Play
              </AppHeaderLink>
            </li>
            <li>
              <AppHeaderLink
                to="/building-the-maze"
                @click="isMazeMenuOpen = false"
              >
                Building the Maze
              </AppHeaderLink>
            </li>
            <li>
              <AppHeaderLink to="/haunted-maze" @click="isMazeMenuOpen = false">
                Haunted Maze
              </AppHeaderLink>
            </li>
            <li>
              <AppHeaderLink
                to="/pumpkin-patch"
                @click="isMazeMenuOpen = false"
              >
                Pumpkin Patch
              </AppHeaderLink>
            </li>
          </ul>
        </li>
        <li>
          <AppHeaderLink to="/rides"> Hay &amp; Sleigh Rides </AppHeaderLink>
        </li>
        <li>
          <AppHeaderLink to="/event-barn"> Wedding/Event Barn </AppHeaderLink>
        </li>
        <li>
          <AppHeaderLink to="/events">
            Reservations &amp; Events
          </AppHeaderLink>
        </li>
      </ul>
    </nav>

    <div class="corner-art">
      <div class="top-left" />
      <div class="top-right" />
      <div class="bottom-left" />
      <div class="bottom-right" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header.header {
  position: relative;
  background-color: $white;
  padding: 1rem;
  font-family: $font-family-serif;
  @include bp-md-tablet {
    margin: 1rem; // 16px
    @include shadow-2();
  }
  @include bp-lg-laptop {
    padding: 25px 65px 0;
  }
  @include bp-xl-desktop {
    max-width: $max-width;
    margin-right: auto;
    margin-left: auto;
  }
  .logo-container {
    display: block;
    width: 100%;
    max-width: 200px;
    margin-left: 1rem; // 16px
    @include bp-lg-laptop {
      max-width: 400px;
      margin-left: 0;
    }
    svg {
      width: 100%;
      height: auto;
    }
  }
  .header-top {
    display: flex;
    padding-bottom: rem(6);
    .header-slogan {
      display: none;
      @include bp-lg-laptop {
        display: block;
        text-align: right;
        margin-left: auto;
      }
      > div {
        margin-bottom: 2px;
        color: $camarone;
      }
      a {
        color: var(--chicory-flower);
        text-decoration: none;
        &:hover {
          color: var(--balihai);
        }
      }
    }
  }
}
.corner-art div {
  position: absolute;
  height: 25px;
  width: 25px;
  @include bp-lg-laptop {
    height: 50px;
    width: 50px;
  }
  &.top-left {
    top: 5px;
    left: 5px;
    background: url("~/assets/img/corner-art-top-left.svg") no-repeat;
    background-size: contain;
  }
  &.top-right {
    top: 5px;
    right: 5px;
    background: url("~/assets/img/corner-art-top-right.svg") no-repeat;
    background-size: contain;
  }
  &.bottom-left {
    bottom: 5px;
    left: 5px;
    background: url("~/assets/img/corner-art-bottom-left.svg") no-repeat;
    background-size: contain;
  }
  &.bottom-right {
    bottom: 5px;
    right: 5px;
    background: url("~/assets/img/corner-art-bottom-right.svg") no-repeat;
    background-size: contain;
  }
}
.btn-toggle {
  cursor: pointer;
  display: block;
  border: 0;
  padding: 0.25rem 1rem; // 4px 16px
  background-color: transparent;
  margin-left: auto;
  @include bp-lg-laptop {
    display: none;
  }

  .icon-bar {
    display: block;
    background-color: $black;
    position: relative;
    transition: all 0.25s ease-in-out;
    width: 22px;
    height: 2px;
    & + .icon-bar {
      margin-top: 4px;
    }
    &:nth-of-type(2) {
      top: 1px;
    }
    &:nth-of-type(3) {
      top: 2px;
    }
  }

  &[aria-expanded="true"] {
    .icon-bar:nth-of-type(1) {
      top: 6px;
      transform: rotate(45deg);
    }
    .icon-bar:nth-of-type(2) {
      background-color: transparent;
    }
    .icon-bar:nth-of-type(3) {
      top: -6px;
      transform: rotate(-45deg);
    }
  }
}
nav.navbar {
  overflow: hidden;
  max-height: 0;
  transition: all 0.25s ease-in-out;
  position: relative;

  //

  &.is-open {
    height: auto;
    // max-height: 1000px;
    max-height: 475px;
  }
  > ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
    padding-bottom: 1rem; // 16px
    li ul {
      list-style: none;
      padding-left: 0;
      // padding-left: 0.5rem; // 8px
    }
  }
  .dropdown-menu {
    display: flex;
    flex-direction: column;
    position: relative;
    border: 0;
    padding: 0;
    @include bp-lg-laptop {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 10;
      flex-direction: row;
      width: fit-content;
      margin: 0 auto;
    }
  }
  a {
    display: flex;
    padding: 0.625rem 1rem; // 10px 16px
    color: $camarone;
    text-decoration: none;
    align-items: center;
    @include bp-md-tablet {
      // font-size: ;
    }
    @include bp-lg-laptop {
      padding-left: 9px;
      padding-right: 9px;
    }
    &.router-link-active,
    &.router-link-exact-active {
      background-color: $visvis;
    }
    .icon-container {
      display: none;
      @include bp-lg-laptop {
        display: block;
        position: relative;
        top: rem(-1);
        width: 0.75rem; // 12px
        margin-left: 0.25rem; // 4px
        padding-top: 1px;
      }
      @include bp-xl-desktop {
        top: 0;
      }
    }
  }
  > ul li ul a {
    padding-left: rem(28);
    padding-right: rem(28);
  }

  // Desktop View
  @include bp-lg-laptop {
    margin-top: 1rem; // 16px
    border-top: 1px solid $holly;
    max-height: none;
    overflow: visible;
    ul {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0;
      > li {
        > ul {
          // display: none;
          animation: fadeIn 0.25s;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease-in-out, visibility 0.25s ease-in-out;
          display: flex;
          position: absolute;
          left: 0;
          right: 0;
          background-color: $white;
          pointer-events: none;
          @include shadow-2();
          &.show {
            pointer-events: all;
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
  @include bp-xl-desktop {
    padding-left: 1rem; // 16px
    padding-right: 1rem; // 16px
    ul > li > a {
      font-size: 1.125rem; // 18px
      font-weight: bold;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
