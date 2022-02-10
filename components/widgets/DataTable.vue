<script>
import statusColors from "~/utils/data-blueprints/statuses.blueprint.js";
export default {
  props: {
    tableData: Array,
    title: { type: String, required: false },
    pageOptions: Array,
    sortBy: String,
    filterOn: Array,
    fields: Array,
    actions: { type: Boolean, default: false },
    onEdit: { type: Function, default: () => {} },
    onDelete: { type: Function, default: () => {} },
    stickyHeader: { type: Boolean, default: false },
    disabledActionIf: { type: Function, default: () =>  false },
    disabledActionMessage: { type: String, default: "Tahrirlab bo'lmaydi!" },
  },
  data() {
    const state = {
      tableFields: this.fields,
      totalRows: this.tableData.length,
      currentPage: 1,
      perPage: this.pageOptions[0],
      filter: "",
      sortDesc: false,
      statusColors
    };
    if (this.actions) {
      state.tableFields.push({
        label: "Tahrirlash",
        key: "actions",
        sortable: false
      });
    }
    return state;
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  middleware: "router-auth"
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 v-if="title" class="header-title">{{ title }}</h4>
      <div class="row mb-md-2">
        <div class="col-sm-12 col-md-6">
          <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center">
              <b-form-select
                v-model="perPage"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </label>
            &nbsp;tadan ko'rsatish
          </div>
        </div>
        <!-- Search -->
        <div class="col-sm-12 col-md-6">
          <div
            id="tickets-table_filter"
            class="dataTables_filter text-md-right"
          >
            <label class="d-inline-flex align-items-center">
              <i class="ri-search-2-line ri-lg"></i>
              <b-form-input
                v-model="filter"
                type="search"
                placeholder="Qidirish..."
                class="form-control form-control-sm ml-2"
              ></b-form-input>
            </label>
          </div>
        </div>
        <!-- End search -->
      </div>
      <!-- Table -->
      <div class="table-responsive mb-0">
        <b-table
          :items="tableData"
          :fields="fields"
          :sticky-header="stickyHeader"
          hover
          :dark="$themeManager.theme === 'dark'"
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <template v-if="actions" #cell(actions)="{item}">
            <b-tooltip v-if="disabledActionIf(item)" :target="'action-container' + item.id" placement="top"
              
              >
              {{disabledActionMessage}}
              </b-tooltip
            >

          <div class="d-flex justify-content-center align-items-center" :id="'action-container'+item.id">
            <b-button
              variant="success"
              @click="onEdit(item.id)"
              :disabled="disabledActionIf(item)"
              class="mr-2"
              :id="'edit' + item.id"
            >
              <i class="fe-edit-1"></i>
            </b-button>
            <b-tooltip :target="'edit' + item.id" placement="left"
              >Tahrirlash</b-tooltip
            >
            <b-button
              :disabled="disabledActionIf(item)"
              variant="danger"
              :id="'delete' + item.id"
              @click="onDelete(item.id)"
            >
              <i class="fe-delete align-middle"></i>
            </b-button>
            <b-tooltip :target="'delete' + item.id" placement="top"
              >O'chirish</b-tooltip
            >

            </div>
          </template>
          <template #cell(status)="data">
            <span :class="`badge bg-${statusColors[data.item.status]}`">
              <span :class="`h5 text-white`">
                {{ data.item.status }}
              </span>
            </span>
          </template>
        </b-table>
      </div>
      <div class="row mt-2">
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
  </div>
</template>
