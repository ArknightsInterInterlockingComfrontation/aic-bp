<template>
  <a-config-provider :theme="antdvTheme" :locale="zhCN">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
</template>

<script setup lang="tsx">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import type { StyleProviderProps } from "ant-design-vue";
import { useStyleProvider,theme } from "ant-design-vue";
import type { ThemeConfig } from "ant-design-vue/es/config-provider/context";



const antdvTheme: ThemeConfig = {
  token: {
    colorPrimary: "#faad14",
  },
  algorithm:theme.darkAlgorithm
};
const hashPriority = reactive<StyleProviderProps>({
  hashPriority: "high",
});
useStyleProvider(hashPriority);

useHead({
  title: '联锁对抗 - BP'
})

</script>
