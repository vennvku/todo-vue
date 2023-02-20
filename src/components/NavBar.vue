<template>
  <header class="header" id="header">
    <nav class="nav container">
      <a href="#home" class="nav_logo"> Venn </a>

      <div class="nav_menu" id="nav-menu">
        <ul class="nav_list">
          <li class="nav-item">
            <router-link
              :to="{ name: 'overview-route' }"
              class="nav_link active_link"
              >Overview</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'transaction-route' }" class="nav_link"
              >Transactions</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav_link">Budgets</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav_link">Reports</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav_link">Settings</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'react-timer-game' }" class="nav_link"
              >Game React timer</router-link
            >
          </li>
        </ul>

        <div class="nav_close" id="nav-close">
          <i class="uil uil-times nav_close" id="nav-close"></i>
        </div>
      </div>

      <div class="nav_btns">
        <!--===== THEME CHANGE BUTTON =====-->
        <i class="uil uil-moon change_theme" id="theme-button"></i>

        <div class="nav_toogle" id="nav-toggle">
          <i class="uil uil-bars"></i>
        </div>
      </div>
    </nav>
  </header>
</template>

<script></script>

<style scoped>
@media screen and (min-width: 968px) {
  :root {
    --big-font-size: 3rem;
    --h1-font-size: 2.25rem;
    --h2-font-size: 1.5rem;
    --h3-font-size: 1.25rem;
    --normal-font-size: 1rem;
    --small-font-size: 0.875rem;
    --smaller-font-size: 0.813rem;
  }
}

/*==================== LAYOUT ====================*/
.container {
  max-width: 968px;
  margin-left: var(--mb-1-5);
  margin-right: var(--mb-1-5);
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.header {
  width: 100%;
  background-color: #e7eff6;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-fixed);
  transition: 0.4s; /*For animation dark mode*/
}

/*==================== NAV ====================*/
.nav {
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav_logo,
.nav_toggle,
.nav_close {
  color: var(--title-color);
}

.nav_logo {
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: -1px;
  display: inline-flex;
  align-items: center;
  column-gap: 0.5rem;
  transition: 0.3s;
}

.nav_logo:hover {
  color: #4b86b4;
}

.nav_toggle {
  display: inline-flex;
  font-size: 1.25rem;
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  .nav_menu {
    position: fixed;
    background-color: var(--container-color);
    width: 80%;
    height: 100%;
    top: 0;
    right: -100%;
    box-shadow: -2px 0 4px hsla(var(--hue-color), 24%, 15%, 0.1);
    padding: 4rem 0 0 3rem;
    border-radius: 1rem 0 0 1rem;
    transition: 0.3s;
    z-index: var(--z-fixed);
  }
}

.nav_close {
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  cursor: pointer;
}

.nav_list {
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
}

.nav_link {
  color: var(--title-color);
  font-weight: var(--font-medium);
  transition: 0.3s;
}

.nav_link:hover {
  color: #4b86b4;
}

/* show menu */
.show_menu {
  right: 0;
}

/* Active link */
.active_link {
  position: relative;
  color: #4b86b4;
}

.active_link::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 50%;
  height: 2px;
  background-color: #4b86b4;
}

@media screen and (min-width: 767px) {
  body {
    margin: 0;
  }

  .nav {
    height: calc(var(--header-height) + 1.5rem);
    column-gap: 3rem;
  }
  .nav_toggle,
  .nav_close {
    display: none;
  }
  .nav_list {
    flex-direction: row;
    column-gap: 3rem;
  }
  .nav_menu {
    margin-left: auto;
  }

  .nav_toogle {
    visibility: hidden;
  }
}

/* For large devices */
@media screen and (min-width: 768px) {
  .container {
    margin-left: auto;
    margin-right: auto;
  }

  body {
    margin: 0;
  }

  .section {
    padding: 6rem 0 2rem;
  }

  .section__subtitle {
    margin-bottom: 4rem;
  }

  .header {
    top: 0;
    bottom: initial;
  }

  .header,
  .main,
  .footer_container {
    padding: 0 1rem;
  }

  .nav {
    height: calc(var(--header-height) + 1.5rem);
    column-gap: 1rem;
  }

  .nav_icon,
  .nav_close,
  .nav_toggle {
    display: none;
  }

  .nav_list {
    display: flex;
    column-gap: 2rem;
  }

  .nav_list {
    display: flex;
    column-gap: 2rem;
  }

  .nav_menu {
    margin-left: auto;
  }

  .nav_toogle {
    visibility: hidden;
  }

  .change_theme {
    margin: 0;
  }

  .home_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    padding-top: 3.5rem;
  }

  .home_data {
    justify-self: center;
    padding-top: 50px;
  }

  .home_img {
    justify-self: center;
    background-color: var(--first-color);
    width: 340px;
    height: 340px;
    border-radius: 50%;
    overflow: hidden;
    padding-left: 80px;
    order: 1;
  }
}
</style>
