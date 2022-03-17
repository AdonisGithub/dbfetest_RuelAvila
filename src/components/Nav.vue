<template>
  <nav>
    <div class="cotainer-fluid d-flex flex-wrap align-items-center px-4">
      <a href="#" class="navbar-brand">Dashboard</a>
      <div class="ms-auto d-lg-none d-md-block d-sm-block d-block">
        <button
          class="btn btn-toggler bg-transparent shadow-none"
          @click.prevent="toggleNav()"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div
        class="d-lg-flex d-md-none d-sm-none d-none flex-wrap justify-content-end ms-auto align-items-center"
      >
        <ul
          class="list-unstyled d-flex flex-wrap align-items-center mb-0 position-relative"
        >
          <li class="d-inline-block">
            <a href="#" class="code" @click.prevent="toggleNav()">
              <i class="bi bi-arrow-bar-left"></i>
            </a>
          </li>
          <li class="d-inline-block">
            <div class="dropdown-custom ml-auto">
              <div class="dropdown position-relative">
                <button
                  class="btn dropdown-toggle pe-0"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="bi bi-person-fill"></i>
                </button>
                <ul
                  class="dropdown-menu list-unstyled position-absolute"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li class="d-flex flex-wrap">
                    <router-link
                      to="/"
                      class="dropdown-item w-100"
                      
                      >Sign out</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="overlay-layer d-lg-none" @click="toggleNav()"></div>
    </div>
  </nav>
</template>
<script>
import "@/assets/scss/layout/_nav.scss";

import { useStore } from 'vuex';
export default {
  name: "Nav",
  setup() {
    const store = useStore();
    const logout = async () => {
      await store.dispatch("Auth/logout");
    };

    const toggleNav = () => {
      const menu = document.querySelector("body");
      const menuToggle = document.querySelector(".code");
      if (menu.classList.contains("nav-toggle")) {
        menu.classList.remove("nav-toggle");
        menuToggle.classList.remove("open");
      } else {
        menu.classList.add("nav-toggle");
        menuToggle.classList.add("open");
      }

      const btn_toggler = document.querySelector(".btn-toggler");
      if (btn_toggler.classList.contains("btn_animate")) {
        setTimeout(function () {
          btn_toggler.classList.remove("btn_animate");
        }, 400);
      } else {
        setTimeout(function () {
          btn_toggler.classList.add("btn_animate");
        }, 400);
      }
    };

    return {
      logout,
      toggleNav,
    };
  },
};
</script>