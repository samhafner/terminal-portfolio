<script setup lang="ts">

const props = defineProps<{
  args : string[],
}>();


</script>

<template>
    <div>
      <p>{{ props.args.join(" ") }}</p>
    </div>
</template>

<style scoped></style>
