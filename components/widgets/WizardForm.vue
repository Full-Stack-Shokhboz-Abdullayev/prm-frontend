<template>
  <form-wizard
    color="#3bafda"
    @on-complete="$emit('complete')"
    nextButtonText=""
    backButtonText=""
    finishButtonText=""
    
    errorColor="#f1556c"
  >
    <tab-content
      v-for="(tab, index) in data"
      :title="tab.title"
      :icon="tab.icon"
      :before-change="() => changeGuard(tab)"
      :key="'addproject' + tab.title + index"
      lazy
    >
      <div class="row">
        <div class="col-12">
          <div
            class="form-group row mb-3"
            v-for="(field, i) in tab.fields"
            :key="'addproject' + field.label + i"
          >
            <label class="col-md-4 col-form-label" :for="field.key">{{
              field.label
            }}</label>
            <div class="col-md-8">
              <select
                v-if="field.type === 'select'"
                class="form-control"
                :id="field.key"
                :name="field.key"
                v-model.number="field.value"
              >
                <option
                  v-if="field.hasPlaceholder"
                  value=""
                  key="selected-project-city"
                >
                  -- Tanlang --
                </option>
                <option
                  v-for="(option, optioni) in field.options"
                  :value="option.value"
                  :key="'addproject' + 'option' + optioni"
                >
                  {{ option.label }}
                </option>
              </select>

              <date-picker
                v-else-if="field.type === 'date'"
                :first-day-of-week="1"
                lang="en"
                :format="'DD.MM.YYYY'"
                v-model="field.value"
              ></date-picker>
              <input
                :id="field.key"
                :name="field.key"
                :type="field.type || 'text'"
                :placeholder="
                  `${placeholderPrefix} ${field.label}${
                    field.label.endsWith('i') ? 'ni' : 'ini'
                  } kiriting.`
                "
                v-else-if="field.type === 'number'"
                class="form-control"
                v-model.number="field.value"
              />
              <input
                :id="field.key"
                :name="field.key"
                :type="field.type || 'text'"
                :placeholder="
                  `${placeholderPrefix} ${field.label}${
                    field.label.endsWith('i') ? 'ni' : 'ini'
                  } kiriting.`
                "
                v-else
                class="form-control"
                v-model.trim="field.value"
              />
            </div>
          </div>

          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
    </tab-content>
    <tab-content
      icon="mdi mdi-checkbox-marked-circle-outline"
      title="Saqlash"
      lazy
    >
      <slot></slot>
      <!-- end row -->
    </tab-content>
    <template slot="footer" scope="props">
      <div class="wizard-footer-left">
        <wizard-button
          @click.native="props.prevTab()"
          v-if="props.activeTabIndex > 0"
          :style="props.fillButtonStyle"
          type="button"
        >
          Orqaga qaytish
        </wizard-button>
      </div>
      <div class="wizard-footer-right">
        <wizard-button
          @click.native="props.nextTab()"
          class="wizard-footer-right"
          type="button"
          :style="props.fillButtonStyle"
          :disabled="savingProgress"
        >
          <b-spinner v-if="savingProgress" small></b-spinner>
          <span v-else>
            {{ props.isLastStep ? "Bazaga saqlash" : "Davom etish" }}</span
          >
        </wizard-button>
      </div>
    </template>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent, WizardButton } from "vue-form-wizard";

export default {
  props: ["data", "savingProgress", "placeholderPrefix"],
  components: {
    FormWizard,
    TabContent,
    WizardButton
  },
  methods: {
    changeGuard(tab) {
      if (!tab.required) {
        return true;
      }
      const check = !tab.fields.some(field => field.value === "");
      return check;
    }
  }
};
</script>

<style></style>
