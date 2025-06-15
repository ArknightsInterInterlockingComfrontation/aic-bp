<template>
  <div
    class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <p class="text-3xl font-semibold text-indigo-600">
        {{ props.error?.statusCode }}
      </p>
      <h1
        class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
      >
        <!-- Page not found -->
        {{ errorMessage }}
      </h1>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
          @click="backToHome"
          class="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >回到首页
        </a>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const errorMessage = computed(() => {
  if(props.error?.statusCode == 404){
    return "Page not found"
  }
  else{
    return props.error?.message
  }
});


const backToHome = () => clearError({ redirect: "/" });
</script>
