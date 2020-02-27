<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-green">
        <q-list class="flex flex-center absolute-center bg-green text-white text-center">
          <q-item>
            <q-item-section>
              <img src="@/assets/icona.png" style="height: 180px; max-width: 180px" />
              <q-item-label class="text-weight-light" style="font-size: 3rem">Vyca</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="q-gutter-y-md" style="width: 70vw">
              <q-input label-color="white" borderless v-model="username" label="Usarname..." @input="setNome(username)" input-class="text-white"/>
              <q-input label-color="white" borderless v-model="password" label="Password..." :type="isPwd ? 'password' : 'text'" input-class="text-white">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                    color="white"
                  />
                </template>
              </q-input>
              <q-btn rounded class="btn bg-white text-green text-weight-bold" label="Login" @click="$router.push({ path: '/' })"/>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section style="width: 70vw">
              <q-item-label class="text-weight-light q-mt-md" style="font-size: 1rem">Forgot password?</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="bg-green q-mt-xl" style="width: 92.3vw">
              <q-item-label class="text-weight-light" style="font-size: 1.5rem" @click="$router.push({ path: '/' })">Create Account</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { setNome } from '@/utils/bt.js'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      isPwd: true
    }
  },
  mounted () {
    this.setTab('home')
  },
  methods: {
    ...mapMutations({
      'setTab': 'conf/setTab'
    }),
    setNome
  }
}
</script>

<style lang="sass" scoped>
.btn
  border-radius: 35px
  padding: 13px 20px
.q-input
  border: 1px solid white
  border-radius: 35px
  padding: 5px 20px
</style>
