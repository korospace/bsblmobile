<template>
    <ion-page>
        <ion-content>
            <div class="flex h-screen bg-gradient-to-r from-lime-600 to-lime-400 px-5">
                <div class="m-auto text-center">
                    <h3 class="text-center text-white text-2xl sm320:text-3xl mb-3" style="font-family:QuicksandSemiBold;">VERIFIKASI AKUN</h3>
                    <p class="text-center text-white mb-8 text-xs sm320:text-lg">masukan kode OTP yang anda terima <br> dari email</p>
                    <div class="text-center px-10">
                        <input class="text-center text-gray-800 text-xl sm320:text-3xl tracking-widest border-solid border-b-4 focus:outline-none border-lime-400 bg-transparent py-2 mb-5 w-3/4 sm320:w-44" type="text" name="otp"/>
                    </div>
                    <a href="https://wa.me/6281287200602?text=Hallo%20Admin,%20saya%20ada%20kendala%20mengenai%20password" class="text-center text-white mb-8 text-xs sm320:text-lg underline underline-offset-8">Hubungi Admin</a>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, loadingController } from '@ionic/vue';
import axios                         from 'axios';
import { computed, defineComponent } from 'vue'
import { ref,reactive }              from "vue";
import { useRouter }                 from 'vue-router';
import { useStore }                  from "vuex"

export default defineComponent({
    components: {
        IonPage,
        IonContent,
    },
    setup(){
        const router = useRouter();
        const store  = useStore();

        return{
            router,
            store
        }
    },
    beforeMount() {
        if (this.store.state.dataLogin.username_or_email == '' && this.store.state.dataLogin.password == '') {
            // this.router.push({path: '/login'} );
        }
    },
})
</script>

<style scoped>
    
</style>