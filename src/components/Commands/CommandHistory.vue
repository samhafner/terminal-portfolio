<script setup lang="ts">

const props = defineProps<{
    commandHistory: string[];
}>();

</script>

<template>
    <div v-once>
        <p v-for="(command, index) in props.commandHistory" :key="index">{{ command }}</p>      
    </div>
</template>

<style scoped></style>
