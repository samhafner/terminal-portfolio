<script setup lang="ts">

const props = defineProps<{
    url: string;
    text: string;
}>();

</script>

<template>
    <a :href="props.url" target="_blank" ref="noopener noreferrer" class="text-orange-500 underline underline-offset-4 decoration-2 decoration-dashed decoration-orange-500 hover:decoration-solid">{{ props.text }}</a>
</template>