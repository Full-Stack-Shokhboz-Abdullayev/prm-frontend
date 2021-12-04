import Swal from "sweetalert2";

export default pushTo => ({
  methods: {
    fireSwal(success) {
      let options = {
        title: "Ma'lumotlar muvaffaqiyatli ravishda saqlandi.",
        icon: "success"
      };

      if (!success) {
        options = {
          title: "Afsuski ma'lumotlar saqlanmadi.",
          icon: "error"
        };
      }

      Swal.fire(options).then(() => {
        if (success) {
          this.$router.push(pushTo);
        }
      });
    },
    
    sure() {
      return Swal.fire({
        title: "Ishonchingiz Komilmi?",
        text: "Buni ortga qaytarib bo'lmaydi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ha, o'chirish",
        cancelButtonText: "Yo'q, bekor qilish",
        reverseButtons: true
      });
    }
  }
});
