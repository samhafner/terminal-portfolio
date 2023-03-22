<script setup lang="ts">
import { Command } from '../interfaces';

const props = defineProps<{
    commandPart: string;
    commands: Command[];
}>();

</script>

<template>
    <div v-if="props.commandPart.length > 0">
        <template v-for="(command, index) in props.commands.filter(c => c.cmd.startsWith(props.commandPart))"
            :key="index">
            <p class="mr-2 inline">{{ command.cmd }}</p>
        </template>
    </div>
</template>

<style scoped></style>
