<template>
  <div class="row">
    <div class="col-12">
      <div class="text-center">
        <h2 class="mt-0">
          <i class="mdi mdi-check-all"></i>
        </h2>
        <h3 class="mt-0">
          {{ dataBaseTitle }} bazasini to'ldirishimizga yordamingiz uchun katta
          rahmat!
        </h3>

        <p class="w-75 mb-2 mx-auto">
          Ma'lumotlarni saqlash uchun <code>Bazaga Saqlash</code> tugmasini
          bosing.
        </p>
      </div>
    </div>
    <!-- end col -->
  </div>
</template>
<script>
export default {
  props: {
    dataBaseTitle: String
  }
};
</script>
