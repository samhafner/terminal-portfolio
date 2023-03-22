<script setup lang="ts">
import cliSpinners from 'cli-spinners';

const props = defineProps<{
    text?: string;
}>();

const spinnerFrames = cliSpinners.dots.frames;
const interval = cliSpinners.dots.interval;
const divEl = ref("");
let i = 0

onMounted(async () => {
    while (true) {
        if (i >= spinnerFrames.length - 1) {
            i = 0
        }
        divEl.value = spinnerFrames[i]
        i++
        await new Promise(resolve => setTimeout(resolve, interval));
    }
})

</script>

<template>
    <div >
        {{ divEl }} <span>{{ props.text || "Loading..."}}</span>
    </div>
</template>