<script>
/**
 * Footer Component
 */
export default {}
</script>

<template>
<!-- Footer Start -->
<footer class="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
               {{ new Date().getFullYear() }} &copy; PRM Platformasi | <a target="_blank" href="https://beliefy.agency">Beliefy</a> tomonidan ishlab chiqildi.
            </div>
            <div class="col-md-6">
                <div class="text-md-right footer-links d-none d-sm-block">
                    <nuxt-link to="/developers">Developers</nuxt-link>
                    <a target="_blank" href="https://beliefy.agency">Biz haqimizda</a>
                    <a target="_blank" href="https://beliefy.agency">Yordam</a>
                    <a target="_blank" href="https://beliefy.agency">Biz bilan bog'laning</a>
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- end Footer -->
</template>
