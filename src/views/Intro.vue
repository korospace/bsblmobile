<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <!-- Logo Animation -->
      <div
        class="fixed z-50 top-0 right-0 flex flex-col justify-center items-center justify-center transition-all duration-1000"
        :class="{'bg-white':removeLogo2==false,'bg-transparent':removeLogo2==true,'w-full h-full':removeLogo3==false,'w-12 xs:w-20 h-auto':removeLogo3==true,}">
          <img
            class="transition-all duration-1000"
            :class="{'w-3/4 relative top-auto right-auto animate-pulse':removeLogo1==false,' w-12 xs:w-20 absolute top-2 right-2':removeLogo1==true}" 
            src="@/assets/images/banksampah-logo.webp" alt="">
      </div>

      <div class="w-full h-full relative flex">
        <!-- page 1 -->
        <div
          class="w-full h-full absolute transition-all duration-1000 transform"
          :class="{'-translate-x-0':showPage1,'-translate-x-full':!showPage1}">
            <div 
              class="page1 w-full h-full flex flex-col justify-center relative z-10">
                <img class="w-full" src="@/assets/images/intro-person1.webp" alt="">
                <p class="text-justify px-8 py-8 text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus illum mollitia in pariatur. Fugiat eius reprehenderit officiis expedita tempora accusantium ratione eos ad qui, amet facere voluptas magnam corporis?
                </p>
                <button
                  @click="showPage1 = !showPage1; showPage2 = !showPage2"
                  class="absolute right-8 bottom-5 rounded-3xl px-4 py-2 bg-gray-500 text-gray-300 shadow-md">
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
              class="page2 w-full h-full flex flex-col justify-center relative z-10">
                <img class="w-full" src="@/assets/images/intro-person2.webp" alt="">
                <p class="text-justify px-8 py-8 text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus illum mollitia in pariatur. Fugiat eius reprehenderit officiis expedita tempora accusantium ratione eos ad qui, amet facere voluptas magnam corporis?
                </p>
                <button
                  @click="showPage1 = !showPage1; showPage2 = !showPage2"
                  class="absolute left-8 bottom-5 rounded-3xl px-4 py-2 bg-gray-500 text-gray-300 shadow-md">
                    back
                </button>
                <button
                  @click="showPage2 = !showPage2; showPage3 = !showPage3"
                  class="absolute right-8 bottom-5 rounded-3xl px-4 py-2 bg-gray-500 text-gray-300 shadow-md">
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
              class="page3 w-full h-full flex flex-col justify-center px-8 pb-8 relative z-10">
                <div class="px-8">
                  <img class="w-full" src="@/assets/images/intro-person3.webp" alt="">
                </div>
                <p class="text-justify mt-8 text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus illum mollitia in pariatur. Fugiat eius reprehenderit officiis expedita tempora accusantium ratione eos ad qui, amet facere voluptas magnam corporis?
                </p>
                <router-link
                  to="/login" 
                  @click="updateIntroStatus"
                  class="w-full mt-10 py-3 text-center text-xl tracking-widest bg-white active:bg-gray-100 rounded-3xl">
                    <span style="font-family:QuicksandSemiBold;background: linear-gradient(to right, #BFD765, #537629);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                      LOGIN
                    </span>
                </router-link>
                <div class="mt-3 tracking-widest text-center">
                  <a
                    @click.prevent="showPage2 = !showPage2;showPage3 = !showPage3" 
                    href="" 
                    class="text-gray-100 underline opacity-80">
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
    const removeLogo1 = ref(false);
    const removeLogo2 = ref(false);
    const removeLogo3 = ref(false);

    const playRemoveLogo = () => {
      setTimeout(() => {
        removeLogo1.value = true;
        setTimeout(() => {
          removeLogo2.value = true;
          setTimeout(() => {
            removeLogo3.value = true;
          }, 1000);
        }, 700);
      }, 3000);
    }

    const updateIntroStatus = () => {
      IntroService.saveIntroStatus("finish")
    }

    onIonViewWillEnter(() => {
      playRemoveLogo();
    })

    return {
      showPage1,
      showPage2,
      showPage3,
      removeLogo1,
      removeLogo2,
      removeLogo3,
      playRemoveLogo,
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