<template>
    <ion-page>
        <ion-content>
            <h1
              class="font-black text-center uppercase mt-12"
              style="background: linear-gradient(to right, #BFD765, #81A257);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                register
            </h1>

            <Form
              v-slot="{ errors }"
              :validation-schema="registerSchema"
              class="w-full mt-12 px-4 tracking-widest pb-8"
              @submit.prevent="doRegister($event.target)">
                <!-- nama lengkap -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500"
                      :class="{'border-red-500':errors.nama_lengkap}">
                        <Field
                          type="text" name="nama_lengkap" placeholder="Nama lengkap" autocomplete="off" 
                          class="block p-4 w-full text-lg appearance-none focus:outline-none transition-all bg-white text-lime-500" />
                        <label 
                        for="nama_lengkap" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Nama lengkap
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.nama_lengkap }}
                    </small>
                </div>
                <!-- username -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.username}">
                        <Field
                          type="text" name="username" placeholder="Username" autocomplete="off" 
                          class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                          for="username" 
                          class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Username
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.username }}
                    </small>
                </div>
                <!-- email -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.email}">
                        <Field
                          type="email" name="email" placeholder="Email" autocomplete="off" 
                          class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                          for="email" 
                          class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Email
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.email }}
                    </small>
                </div>
                <!-- password -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.password}">
                        <Field
                        type="password" name="password" placeholder="Password" autocomplete="off" 
                        class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                        for="password" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Password
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.password }}
                    </small>
                </div>
                <!-- no.telp -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.notelp}">
                        <Field
                        type="text" name="notelp" placeholder="No. Telepon" autocomplete="off" 
                        class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                        for="notelp" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            No. Telepon
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.notelp }}
                    </small>
                </div>
                <!-- tanggal lahir -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.tgl_lahir}">
                        <Field
                        type="date" name="tgl_lahir" placeholder=" " autocomplete="off" v-model="tglLahir"
                        class="block p-4 w-full text-lg text-gray-400 appearance-none focus:outline-none bg-white"
                        :class="{'text-lime-500':isTglLahirEmpty}" />
                        <label 
                        for="tgl_lahir" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0">
                            Tanggal lahir
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.tgl_lahir }}
                    </small>
                </div>
                <!-- kelamin -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.kelamin}">
                        <Field
                        id="kelamin" v-model="kelamin" placeholder=" " as="select" name="kelamin"
                        class="block p-4 w-full text-lg text-gray-400 appearance-none focus:outline-none bg-white"
                        :class="{'text-lime-500':isKelaminEmpty}">
                            <option value="">-- pilih jenis kelamin --</option>
                            <option value="laki-laki">laki-laki</option>
                            <option value="perempuan">perempuan</option>
                        </Field>
                        <label 
                        for="kelamin" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 transform scale-75 -translate-y-4 z-0 ml-3 px-1.5 py-0 bg-white text-gray-600">
                            kelamin
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.kelamin }}
                    </small>
                </div>
                <!-- RT & RW -->
                <div class="flex mt-10">
                    <div class="relative w-1/2">
                        <div
                          class="w-full outline relative rounded border-2 focus-within:border-lime-500 mr-1.5"
                          :class="{'border-red-500':errors.rt}">
                            <Field
                            type="text" name="rt" placeholder="Rt" autocomplete="off" 
                            class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                            <label 
                            for="rt" 
                            class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                                Rt
                            </label>
                        </div>
                        <small class="absolute mt-1 tracking-wide text-red-500">
                            {{ errors.rt }}
                        </small>
                    </div>
                    <div class="relative w-1/2">
                        <div
                          class="w-full outline relative rounded border-2 focus-within:border-lime-500 ml-1.5"
                          :class="{'border-red-500':errors.rw}">
                            <Field
                            type="text" name="rw" placeholder="Rw" autocomplete="off" 
                            class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                            <label 
                            for="rw" 
                            class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                                Rw
                            </label>
                        </div>
                        <small class="absolute mt-1 tracking-wide text-red-500">
                            {{ errors.rw }}
                        </small>
                    </div>
                </div>
                <!-- alamat -->
                <div class="relative">
                    <div
                      class="outline relative rounded border-2 focus-within:border-lime-500 mt-10"
                      :class="{'border-red-500':errors.alamat}">
                        <Field
                        type="text" name="alamat" placeholder="Alamat" autocomplete="off" 
                        class="block p-4 w-full text-lg appearance-none focus:outline-none bg-white text-lime-500" />
                        <label 
                        for="alamat" 
                        class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 -z-1">
                            Alamat
                        </label>
                    </div>
                    <small class="absolute mt-1 tracking-wide text-red-500">
                        {{ errors.alamat }}
                    </small>
                </div>
                <!-- kodepos -->
                <div
                class="outline relative rounded border-2 focus-within:border-lime-500 mt-10">
                    <input
                      type="text" name="kodepos" placeholder="pilih kodepos dibawah" autocomplete="off" 
                      class="block p-4 w-full text-lg focus:outline-none bg-white text-lime-500" disabled/>
                    <!-- <label 
                      for="kodepos" 
                      class="absolute top-0 text-lg text-gray-400 bg-transparent p-4 duration-300 origin-0 transform scale-75 -translate-y-4 z-0 ml-3 px-1.5 py-0 bg-white text-gray-600">
                        kodepos
                    </label> -->
                </div>

                <button class="w-full bg-lime-500 active:bg-lime-600 text-white mt-10 py-3 rounded">
                    DAFTAR
                </button>
                <center class="mt-8 pb-4 tracking-wide">
                    <p class="text-md">sudah memiliki akun?</p>
                    <router-link class="text-xs" to="/login">login sekarang</router-link>
                </center>
            </Form>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage,IonContent }        from '@ionic/vue';
import { computed, defineComponent } from 'vue'
import { Field, Form }               from "vee-validate";
import * as Yup                      from 'yup';
import { ref }                       from "vue";

export default defineComponent({
    components: {
        IonPage,
        IonContent,
        Field,
        Form,
    },
    setup(){
        const tglLahir = ref("");
        const kelamin  = ref("");

        const isTglLahirEmpty = computed(() => {
            return tglLahir.value !== "";
        });

        const isKelaminEmpty = computed(() => {
            return kelamin.value !== "";
        });

        // -- form validation rules --
        const registerSchema = Yup.object().shape({
            nama_lengkap: Yup.string()
                .required(' ')
                .max(40, 'maksimal 40 karakter'),
            username: Yup.string()
                .required(' ')
                .min(8, 'minimal 8 karakter')
                .max(20, 'maksimal 20 karakter'),
            email: Yup.string()
                .required(' ')
                .email('email tidak valid'),
            password: Yup.string()
                .required(' ')
                .min(8, 'minimal 8 karakter')
                .max(20, 'maksimal 20 karakter'),
            notelp: Yup.string()
                .required(' ')
                .max(14, 'maksimal 14 character')
                .matches(/^\d+$/, 'hanya boleh angka'),
            tgl_lahir: Yup.string()
                .required(' '),
            kelamin: Yup.string()
                .required(' '),
            rt: Yup.string()
                .required(' ')
                .max(2, 'maksimal 2 character')
                .min(2, 'minimal 2 character')
                .matches(/^\d+$/, 'hanya boleh angka'),
            rw: Yup.string()
                .required(' ')
                .max(2, 'maksimal 2 character')
                .min(2, 'minimal 2 character')
                .matches(/^\d+$/, 'hanya boleh angka'),
            alamat: Yup.string()
                .required(' ')
                .max(255, 'maksimal 255 karakter'),
        });

        const doRegister = (event) => {
            console.log(event);
        }

        return{
            tglLahir,
            kelamin,
            isTglLahirEmpty,
            isKelaminEmpty,
            registerSchema,
            doRegister
        }
    }
})
</script>

<style scoped>
    
</style>