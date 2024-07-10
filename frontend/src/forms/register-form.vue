<template>
  <div class="flex items-center justify-center ">
    <form class="w-full max-w-xl lg:max-w-screen-xl mt-4" @submit.prevent="handleSubmit">
      <div class="mb-6">
        <input v-model="formData.name" name="name" type="text" placeholder="Username"
               class="w-full h-12 px-6 mb-1 font-medium tracking-wide text-gray-700 transition duration-200 border rounded shadow-md focus:shadow-outline focus:outline-none"/>
        <span v-if="formErrors.name" class="text-red-500">{{ formErrors.name }}</span>
      </div>
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
      <div class="mb-6">
        <input v-model="formData.confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password"
               class="w-full h-12 px-6 mb-1 font-medium tracking-wide text-gray-700 transition duration-200 border rounded shadow-md focus:shadow-outline focus:outline-none"/>
        <span v-if="formErrors.confirmPassword" class="text-red-500">{{ formErrors.confirmPassword }}</span>
      </div>
      <span v-if="formErrors.error" class="text-red-500">{{ formErrors.error }}</span>
      <button type="submit"
              class="w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
        Register
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
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      formErrors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      this.clearErrors();

      if (!this.formData.name) {
        this.formErrors.name = 'Username is required.';
      }

      if (!this.validateEmail(this.formData.email)) {
        this.formErrors.email = 'Valid email is required.';
      }

      if (!this.formData.password) {
        this.formErrors.password = 'Password is required.';
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.formErrors.confirmPassword = 'Passwords do not match.';
      }

      if (this.isFormValid()) {
        const result = await ApiService.callApi('auth', 'post', this.formData);
        if (await result.error) {
          this.formErrors.error = result.error;
        } else {
          LocalStorageService.setItem('token', result.token);
          LocalStorageService.setItem('user', result.user)
          this.$router.push('/');
        }
      }
    },
    clearErrors() {
      this.formErrors = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
