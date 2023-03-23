<script setup lang="ts">

const props = defineProps<{
    url: string
    text: string
}>();

</script>

<template>
    <p class="text-sm mt-2">Data from
        <Link :url="props.url" :text="props.text" />.
    </p>
</template>