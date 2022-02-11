<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- <div class="min-h-full w-full bg-white">
      </div> -->

      <div
        class="fixed z-20 top-0 right-0 flex flex-col justify-center items-center justify-center transition-all duration-1000"
        :class="{'bg-white':removeLogo2==false,'bg-transparent':removeLogo2==true,'w-full h-full':removeLogo3==false,'w-12 xs:w-20 h-auto':removeLogo3==true,}">
          <img
            class="transition-all duration-1000"
            :class="{'w-3/4 relative top-auto right-auto animate-pulse':removeLogo1==false,' w-12 xs:w-20 absolute top-2 right-2':removeLogo1==true}" 
            src="@/assets/images/banksampah-logo.png" alt="">
      </div>

      <swiper
        class="w-full h-full" 
        :modules="modules"
        navigation
        :slides-per-view="1">
          <!-- page 1 -->
          <swiper-slide class="h-full relative">
            <div 
              class="page1 h-full flex flex-col justify-center relative z-10">
                <img class="w-full" src="@/assets/images/intro-person1.png" alt="">
                <p class="text-justify px-8 py-8 text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus illum mollitia in pariatur. Fugiat eius reprehenderit officiis expedita tempora accusantium ratione eos ad qui, amet facere voluptas magnam corporis?
                </p>

                <!-- <button @click="swiper.slideNext()">next</button> -->
            </div>
            <div class="absolute z-0 bottom-0 left-0 right-0 h-1/2 bg-greenbsbl-old">
            </div>
          </swiper-slide>

          <!-- page 2 -->
          <swiper-slide class="h-full relative">
            <div 
              class="page2 h-full flex flex-col justify-center relative z-10">
                <img class="w-full" src="@/assets/images/intro-person2.png" alt="">
                <p class="text-justify px-8 py-8 text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus illum mollitia in pariatur. Fugiat eius reprehenderit officiis expedita tempora accusantium ratione eos ad qui, amet facere voluptas magnam corporis?
                </p>
            </div>
            <div class="absolute z-0 bottom-0 left-0 right-0 h-1/2 bg-greenbsbl-old">
            </div>
          </swiper-slide>

          <!-- page 3 -->
          <swiper-slide class="h-full relative">
            <div 
              class="page3 h-full flex flex-col justify-center px-8 pb-8 relative z-10">
                <div class="px-8">
                  <img class="w-full" src="@/assets/images/intro-person3.png" alt="">
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
            </div>
            <div class="absolute z-0 bottom-0 left-0 right-0 h-1/2 bg-greenbsbl-old">
            </div>
          </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,IonContent,onIonViewWillEnter } from '@ionic/vue';
import { defineComponent } from 'vue'
import { ref,reactive }    from "vue";
import { useRouter }       from 'vue-router';
import { IntroService }    from '@/services/token.service';

import { Navigation } from 'swiper';
import {Swiper,SwiperSlide} from 'swiper/vue';
import '../../node_modules/swiper/swiper.min.css';
import '../../node_modules/swiper/components/navigation/navigation.min.css';

export default defineComponent({
  components: { 
    IonPage,
    IonContent,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter();

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
        }, 900);
      }, 3000);
    }

    const updateIntroStatus = () => {
      IntroService.saveIntroStatus("finish")
    }

    onIonViewWillEnter(() => {
      playRemoveLogo();
    })

    return {
      removeLogo1,
      removeLogo2,
      removeLogo3,
      playRemoveLogo,
      updateIntroStatus,
      modules: [Navigation],
    };
  },
})
</script>

<style scoped>
  ion-content{
    --background: white !important;
  }

  .page1{
    background: url('../assets/images/intro-wave-1.jpg') no-repeat center center fixed; 
    background-size: 100% auto;
  }

  .page2{
    background: url('../assets/images/intro-wave-2.jpg') no-repeat center center fixed; 
    background-size: 100% auto;
  }

  .page3{
    background: url('../assets/images/intro-wave-3.jpg') no-repeat center center fixed; 
    background-size: 100% auto;
  }
</style>