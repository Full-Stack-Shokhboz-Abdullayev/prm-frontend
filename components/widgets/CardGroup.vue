<template>
  <div>
    <div class="row my-3">
      <div class="col-sm-12">
        <form class="card-group-search form-inline">
          <div class="form-group">
            <label for="membersearch-input" class="sr-only">Search</label>
            <i class="ri-search-2-line ri-xl mr-2"></i>
            <input
              v-model="searchInput"
              type="search"
              class="form-control "
              id="membersearch-input"
              placeholder="Qidirish..."
            />
          </div>
        </form>
      </div>
    </div>
    <div class="card-group--custom">
      <div
        class="d-flex justify-content-center mt-3 crgr--custom"
        v-for="(item, index) in paginatedItems"
        :key="item.id"
      >
        <slot :item="item" :index="index"></slot>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <div class="dataTables_paginate paging_simple_numbers float-right">
          <ul class="pagination pagination-rounded mb-0">
            <!-- pagination -->
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
            ></b-pagination>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
    perPage: {
      type: Number,
      default: 12
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.title.toLowerCase().includes(this.searchInput)
      );
    },
    totalRows() {
      return this.filteredItems.length;
    },

    paginatedItems() {
      let items = this.filteredItems || [];
      const currentPage = Math.max(this.currentPage, 1);
      const perPage = Math.max(this.perPage, 0);
      items = items.slice((currentPage - 1) * perPage, currentPage * perPage);
      return items;
    }
  },
  data() {
    return {
      currentPage: 1,
      searchInput: ""
    };
  }
};
</script>
