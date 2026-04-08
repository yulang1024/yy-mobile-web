<template>
  <div>
    我的状态 {{ myStatus }}
  </div>

  <div>
    <div>在线设备</div>
    <div></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const myStatus = ref('在线');
</script>