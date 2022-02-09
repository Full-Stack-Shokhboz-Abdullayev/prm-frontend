<script>
import { mapActions } from "vuex";

import Vertical from "./vertical";
import themeLoaderMixin from "~/mixins/themeLoader.js";

/**
 * Default Layout
 */
export default {
  components: {
    Vertical
  },
  mixins: [themeLoaderMixin],
};
</script>

<template>
  <div>
    <!-- Begin page -->
    <div class="ripple"></div>
    <Vertical>
      <Nuxt />
    </Vertical>
    <!-- END layout-wrapper -->
  </div>
</template>

<style lang="scss">
.ripple {
  position: fixed;
  z-index: 2100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
}
.ripple-anim-dark {
  display: unset;
  animation: rippleAnimationDark 1.6s ease-in-out forwards;
}
.ripple-anim-light {
  display: unset;
  animation: rippleAnimationLight 1.6s ease-in-out forwards;
}
@keyframes rippleAnimationDark {
  0% {
    background: #323b44;

    clip-path: circle(0% at 0% 0%);
  }

  30% {
    background: #323b44;

    clip-path: circle(150% at 0% 0%);
  }
  80% {
    background: #323b44;
  }

  100% {
    background: #323b4400;
  }
}
@keyframes rippleAnimationLight {
  0% {
    background: #FEFEFE;

    clip-path: circle(0% at 0% 0%);
  }

  30% {
    background: #FEFEFE;

        clip-path: circle(150% at 0% 0%);

  }
  80% {
    background: #FEFEFE;

  }

  100% {
    background: #FEFEFE00;
  }
}
</style>
