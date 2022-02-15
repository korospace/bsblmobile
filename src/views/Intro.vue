<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="w-full h-full relative flex">
        <img
          class="absolute z-50 top-2 right-2 w-12 xs:w-20"
          src="@/assets/images/banksampah-logo.webp" alt="">

        <!-- page 1 -->
        <div
          class="w-full h-full absolute transition-all duration-1000 transform"
          :class="{'-translate-x-0':showPage1,'-translate-x-full':!showPage1}">
            <div 
              class="page1 w-full h-full flex flex-col justify-center items-center relative z-10">
                <img class="w-full max-w-md" src="@/assets/images/intro-person1.webp" alt="">
                <p class="px-8 py-8 text-sm xss:text-lg xs:text-2xl text-justify text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus illum mollitia in pariatur. Fugiat eius reprehenderit officiis expedita tempora accusantium ratione eos ad qui, amet facere voluptas magnam corporis?
                </p>
                <button
                  @click="showPage1 = !showPage1; showPage2 = !showPage2"
                  class="absolute right-8 bottom-5 xs:bottom-8 rounded-3xl px-6 pt-1.5 pb-2.5 text-sm xss:text-lg xs:text-2xl bg-gray-400 text-gray-600 tracking-wide shadow-md">
                    next
                </button>
            </div>
            <div class="absolute z-0 bottom-0 left-0 right-0 h-1/2 bg-greenbsbl-old">
            </div>
        </div>

        <!-- page 2 -->
        <div
          class="w-full h-full absolute z-10 transition-all duration-1000 transform"
          :class="{'translate-x-0':showPage2,'translate-x-full':!showPage2,'translate-x-0':!showPage3,'-translate-x-full':showPage3}">
            <div 
              class="page2 w-full h-full flex flex-col justify-center items-center relative z-10">
                <img class="w-full max-w-md" src="@/assets/images/intro-person2.webp" alt="">
                <p class="px-8 py-8 text-sm xss:text-lg xs:text-2xl text-justify text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus illum mollitia in pariatur. Fugiat eius reprehenderit officiis expedita tempora accusantium ratione eos ad qui, amet facere voluptas magnam corporis?
                </p>
                <button
                  @click="showPage1 = !showPage1; showPage2 = !showPage2"
                  class="absolute left-8 bottom-5 xs:bottom-8 rounded-3xl px-6 pt-1.5 pb-2.5 text-sm xss:text-lg xs:text-2xl bg-gray-400 text-gray-600 tracking-wide shadow-md">
                    back
                </button>
                <button
                  @click="showPage2 = !showPage2; showPage3 = !showPage3"
                  class="absolute right-8 bottom-5 xs:bottom-8 rounded-3xl px-6 pt-1.5 pb-2.5 text-sm xss:text-lg xs:text-2xl bg-gray-400 text-gray-600 tracking-wide shadow-md">
                    next
                </button>
            </div>
            <div class="absolute z-0 bottom-0 left-0 right-0 h-1/2 bg-greenbsbl-old">
            </div>
        </div>

        <!-- page 3 -->
        <div 
          class="w-full h-full absolute z-10 transition-all duration-1000 transform"
          :class="{'translate-x-0':showPage3,'translate-x-full':!showPage3 }">
            <div 
              class="page3 w-full h-full flex flex-col justify-center items-center px-8 pb-8 relative z-10">
                <div class="px-8">
                  <img class="w-full max-w-sm" src="@/assets/images/intro-person3.webp" alt="">
                </div>
                <p class="py-8 text-sm xss:text-lg xs:text-2xl text-justify text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus illum mollitia in pariatur. Fugiat eius reprehenderit officiis expedita tempora accusantium ratione eos ad qui, amet facere voluptas magnam corporis?
                </p>
                <router-link
                  to="/login" 
                  @click="updateIntroStatus"
                  class="w-full mt-10 py-3 text-center text-sm xss:text-lg xs:text-2xl tracking-widest bg-white active:bg-gray-100 rounded-3xl">
                    <span style="font-family:QuicksandSemiBold;background: linear-gradient(to right, #BFD765, #537629);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                      LOGIN
                    </span>
                </router-link>
                <div class="mt-3 tracking-widest text-center">
                  <a
                    @click.prevent="showPage2 = !showPage2;showPage3 = !showPage3" 
                    href="" 
                    class="text-sm xss:text-lg xs:text-2xl text-gray-100 underline opacity-80">
                      back
                  </a>
                </div>
            </div>
            <div class="absolute z-0 bottom-0 left-0 right-0 h-1/2 bg-greenbsbl-old">
            </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,IonContent,onIonViewWillEnter } from '@ionic/vue';
import { defineComponent } from 'vue'
import { ref,reactive }    from "vue";
import { useRouter }       from 'vue-router';
import { IntroService }    from '@/services/token.service';

export default defineComponent({
  components: { 
    IonPage,
    IonContent,
  },
  setup() {
    const router = useRouter();
    const showPage1 = ref(true);
    const showPage2 = ref(false);
    const showPage3 = ref(false);

    const updateIntroStatus = () => {
      IntroService.saveIntroStatus("finish")
    }

    return {
      showPage1,
      showPage2,
      showPage3,
      updateIntroStatus,
    };
  },
})
</script>

<style scoped>
  ion-content{
    --background: white !important;
  }

  .page1{
    background: url('../assets/images/intro-wave-1.webp') no-repeat center center fixed; 
    background-size: 100% auto;
  }

  .page2{
    background: url('../assets/images/intro-wave-2.webp') no-repeat center center fixed; 
    background-size: 100% auto;
  }

  .page3{
    background: url('../assets/images/intro-wave-3.webp') no-repeat center center fixed; 
    background-size: 100% auto;
  }
</style>