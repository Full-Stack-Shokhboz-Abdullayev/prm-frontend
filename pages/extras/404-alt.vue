<script>
export default {
    head() {
        return {
            title: `404 |  PRM - Loyihalar Monitoring Platformasi`
        }
    },
}
</script>
<template>
<div class="row justify-content-center my-5">
    <div class="col-lg-6 col-xl-4 mb-4">
        <div class="error-text-box">
            <svg viewBox="0 0 600 200">
                <!-- Symbol-->
                <symbol id="s-text">
                    <text text-anchor="middle" x="50%" y="50%" dy=".35em">404!</text>
                </symbol>
                <!-- Duplicate symbols-->
                <use class="text" xlink:href="#s-text"></use>
                <use class="text" xlink:href="#s-text"></use>
                <use class="text" xlink:href="#s-text"></use>
                <use class="text" xlink:href="#s-text"></use>
                <use class="text" xlink:href="#s-text"></use>
            </svg>
        </div>
        <div class="text-center">
            <h3 class="mt-0 mb-2">Ups! Shaifa topilmadi...</h3>
            <p class="text-muted mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ipsam quidem at, saepe deleniti, animi impedit placeat labore optio, dolorem maiores consectetur! Recusandae, eaque? Explicabo quod dolor assumenda quisquam nobis?</p>

            <nuxt-link to="/" class="btn btn-success waves-effect waves-light">Bosh sahifaga qaytish</nuxt-link>
        </div>

    </div> <!-- end col -->
</div>
<!-- end row -->
</template>
