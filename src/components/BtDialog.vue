<template>
  <q-dialog v-model="params.visible" persistent>
    <q-banner rounded>
      <template v-if="params.icon" v-slot:avatar>
        <q-avatar :icon="params.icon" :color="params.color" :text-color="params.textColor" />
      </template>

      <template>
        <q-item-label :class="params.class">{{ params.label }}</q-item-label>
      </template>

      <template v-slot:action>
        <q-btn-group outline>
          <q-btn v-for="(btn, index) in params.actions" :key="index" flat :align="btn.align" :color="btn.color" :label="btn.label" :icon="btn.icon" @click="btn.action()"/>
        </q-btn-group>
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
