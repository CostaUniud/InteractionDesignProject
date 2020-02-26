<template>
  <q-dialog v-model="params.visible" persistent>
    <q-banner rounded>
      <template v-if="params.icon" v-slot:avatar>
        <q-avatar :icon="params.icon" :color="params.color" :text-color="params.textColor" />
      </template>

      {{ params.label }}

      <template v-slot:action>
        <q-btn v-for="(btn, index) in params.actions" :key="index" flat :color="btn.color" :label="btn.label" :icon="btn.icon" @click="btn.action()"/>
      </template>
    </q-banner>
  </q-dialog>
</template>

<script>
export default {
  name: 'bt-dialog',
  props: {
    params: Object
  }
}
</script>
