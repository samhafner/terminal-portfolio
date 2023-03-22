<script setup lang="ts">
import { Command } from '../../interfaces';

const props = defineProps<{
    commands: Command[];
}>();

</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-[150px_1fr] ">
        <template v-for="(command, index) in props.commands.sort((a, b) => a.cmd.localeCompare(b.cmd))" :key="index">
            <p class="text-sky-400">{{ command.cmd }}</p>
            <p>- {{ command.desc }}</p>
        </template>
    </div>
    <div class="hidden sm:grid sm:grid-cols-[150px_1fr] text-sm mt-2">
        <p>Up/Down Arrow</p>
        <p>=> Browse command history</p>
        <p>Tab</p>
        <p>=> Autocompletes the command</p>
    </div>
</template>

<style scoped></style>
