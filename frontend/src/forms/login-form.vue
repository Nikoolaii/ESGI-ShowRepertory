<template>
  <div class="flex items-center justify-center ">
    <form class="w-full max-w-xl lg:max-w-screen-xl mt-4" @submit.prevent="handleSubmit">
      <div class="mb-6">
        <input v-model="formData.email" name="email" type="email" placeholder="Email"
               class="w-full h-12 px-6 mb-1 font-medium tracking-wide text-gray-700 transition duration-200 border rounded shadow-md focus:shadow-outline focus:outline-none"/>
        <span v-if="formErrors.email" class="text-red-500">{{ formErrors.email }}</span>
      </div>
      <div class="mb-6">
        <input v-model="formData.password" name="password" type="password" placeholder="Password"
               class="w-full h-12 px-6 mb-1 font-medium tracking-wide text-gray-700 transition duration-200 border rounded shadow-md focus:shadow-outline focus:outline-none"/>
        <span v-if="formErrors.password" class="text-red-500">{{ formErrors.password }}</span>
      </div>
      <span v-if="formErrors.error" class="text-red-500">{{ formErrors.error }}</span>
      <button type="submit"
              class="w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import ApiService from "../services/api-service.ts";
import LocalStorageService from "../services/local-storage-service.ts";

export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      formErrors: {
        email: '',
        password: '',
      }
    };
  },
  methods: {
    async handleSubmit() {
      this.clearErrors();

      if (!this.validateEmail(this.formData.email)) {
        this.formErrors.email = 'Valid email is required.';
      }

      if (!this.formData.password) {
        this.formErrors.password = 'Password is required.';
      }

      if (this.isFormValid()) {
        const result = await ApiService.callApi('auth/login', 'post', this.formData);
        if (await result.error) {
          this.formErrors.error = result.error;
        } else {
          LocalStorageService.setItem('token', result.token);
          LocalStorageService.setItem('user', result.user)
          window.location.href = '/';
        }
      }
    },
    clearErrors() {
      this.formErrors = {
        email: '',
        password: '',
      };
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.[^<>()[\]\\.,;:\s@"]{2,}))$/i;
      return re.test(String(email).toLowerCase());
    },
    isFormValid() {
      return !Object.values(this.formErrors).some(error => error);
    },
  }
}
</script>

<style scoped>

</style>