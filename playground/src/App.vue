<script setup>
import { vinUtil } from '@elvinperdana_vinz/vinpac'

const viewList = () => {
  return[
    {
      title: 'Customer',
      value: 'Customer A',
      option: {},
    },
    {
      title: 'Quantity',
      value: '15.000',
      option: {},
    },
    {
      title: 'Usage',
      value: 'Gudang A',
      option: {},
    },
  ]
}
</script>

<template>
    <v-app>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center" dense>
                <v-col>
                    <VinzViewList1Column :list="viewList()"/>
                </v-col>
                <v-col>
                  {{ vinUtil.thousandFormatter(15000) }}
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
