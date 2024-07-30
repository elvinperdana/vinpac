<script setup>
import {ref, computed, onMounted, onUnmounted, toRaw} from 'vue';
import { defineProps } from 'vue';
import { formatDate, thousandFormatter } from '../utils/index.js'

// 👉 - Props
const props = defineProps({
  list: {
    type: Object,
    required: true,
  },
})

const longestInColumn = ref(0)
const widthViewport = ref(0)

const updateWidthViewport = () => {
  widthViewport.value = window.innerWidth
}

const dataList = computed(() => {
  return toRaw(props.list).filter(data => data.option?.rulesShow === undefined || data.option?.rulesShow)
})

const listData = computed(() => {
  const data = dataList.value

  longestInColumn.value = data.reduce((maxLength, obj) => Math.max(maxLength, obj['title'] ? obj['title'].length : 0), 0)

  return data
})

// 👉 - Data
onMounted(() => {
  widthViewport.value = window.innerWidth
  longestInColumn.value = (toRaw(props.list).filter(data => data.option?.rulesShow === undefined || data.option?.rulesShow)).reduce((maxLength, obj) => Math.max(maxLength, obj['title'] ? obj['title'].length : 0), 0)
  window.addEventListener('resize', updateWidthViewport);
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidthViewport);
})
</script>

<template>
  <VRow v-if="widthViewport > 960">
    <VCol
      cols="12"
      class="pb-0 pb-md-3"
    >
      <VTable class="tableStyleViewDetailMdUp">
        <template v-for="data in listData">
          <tr v-if="data.option?.rulesShow === undefined || data.option?.rulesShow">
            <td :style="{ inlineSize: `${2+(0.5*longestInColumn)}rem` }">
              {{ data.title }}
            </td>
            <td>:</td>
            <td v-if="data.option?.chip">
              <VChip
                :label="typeof data.option?.chipLabel === 'function' ? data.option.chipLabel(data.value) : typeof data.option?.chipLabel === 'boolean' ? data.option?.chipLabel : undefined"
                :variant="typeof data.option?.chipVariant === 'function' ? data.option.chipVariant(data.value) : typeof data.option?.chipVariant === 'string' ? data.option?.chipVariant : undefined"
                :color="typeof data.option?.chipColor === 'function' ? data.option.chipColor(data.value) : typeof data.option?.chipColor === 'string' ? data.option?.chipColor : ''"
              >
                {{ data.option?.thousandFormat && !isNaN(data.value) ? thousandFormatter(data.value) : data.option?.formatDate ? formatDate(data.value) : data.value }}
              </VChip>
            </td>
            <td v-else>
              {{ data.option?.thousandFormat && !isNaN(data.value) ? thousandFormatter(data.value) : data.option?.formatDate ? formatDate(data.value) : data.value }}
            </td>
          </tr>
        </template>
      </VTable>
    </VCol>
  </VRow>
  <VRow v-else>
    <VCol
      cols="12"
      class="pb-0 pb-md-3"
    >
      <VTable :class="widthViewport > 600 && widthViewport < 960 ? 'columnTableSM' : 'columnTableXS'">
        <template v-for="data in listData">
          <tr v-if="data.option?.rulesShow === undefined || data.option?.rulesShow">
            <td :style="widthViewport > 600 && widthViewport < 960 ? { 'inline-size': `${1 + (0.5 * longestInColumn)}rem` } : { 'inline-size': `${0.5 + (0.5 * longestInColumn)}rem` }">
              {{ data.title }}
            </td>
            <td>:</td>
            <td v-if="data.option?.chip">
              <VChip
                :label="typeof data.option?.chipLabel === 'function' ? data.option.chipLabel(data.value) : typeof data.option?.chipLabel === 'boolean' ? data.option?.chipLabel : undefined"
                :variant="typeof data.option?.chipVariant === 'function' ? data.option.chipVariant(data.value) : typeof data.option?.chipVariant === 'string' ? data.option?.chipVariant : undefined"
                :color="typeof data.option?.chipColor === 'function' ? data.option.chipColor(data.value) : typeof data.option?.chipColor === 'string' ? data.option?.chipColor : ''"
              >
                {{ data.option?.thousandFormat && !isNaN(data.value) ? thousandFormatter(data.value) : data.option?.formatDate ? formatDate(data.value) : data.value }}
              </VChip>
            </td>
            <td v-else>
              {{ data.option?.thousandFormat && !isNaN(data.value) ? thousandFormatter(data.value) : data.option?.formatDate ? formatDate(data.value) : data.value }}
            </td>
          </tr>
        </template>
      </VTable>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.tableStyleViewDetailMdUp {
  tr {
    td {
      padding-block-end: 12px;
    }

    td:first-child {
      vertical-align: top;
    }

    td:nth-child(2) {
      inline-size: 20px;
      vertical-align: top;
    }
  }
}

.columnTableSM {
  tr {
    td {
      padding-block-end: 10px;
    }

    td:nth-child(2) {
      inline-size: 20px;
      vertical-align: middle;
    }
  }
}

.columnTableXS {
  tr {
    td {
      padding-block-end: 10px;
    }

    td:first-child {
      vertical-align: middle;
    }

    td:nth-child(2) {
      vertical-align: middle;
    }
  }
}

.columnTableXS tr td:nth-child(2)::before{
  content: '\00a0\00a0\00a0';
}

.columnTableXS tr td:nth-child(2)::after{
  content: '\00a0\00a0\00a0';
}
</style>
