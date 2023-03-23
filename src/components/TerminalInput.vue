<script setup lang="ts">
import { useTerminalStore } from '../stores/terminal.store';

//#region PROPS AND EMITS
const emit = defineEmits<{
    (e: 'command-enter'): void;
    (e: 'command-up'): void;
    (e: 'command-down'): void;
    (e: 'command-tab', value: string): void;
    (e: 'update:modelValue', value: string): void;
}>();

const props = defineProps<{
    modelValue: string
}>()
//#endregion
// ====================================================================================================
//#region COMPONENT V-MODEL
const command = useVModel(props, 'modelValue', emit)
//#endregion
// ====================================================================================================
//#region KEY INPUT HANDLING
function keyHandler(e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
        emit('command-up');
    } else if (e.key === "ArrowDown") {
        emit('command-down');
    }
}
const terminalInput = ref<HTMLInputElement | null>(null);
useEventListener(document, 'keydown', (e) => {
    if (e.key === 'Tab' && document.activeElement?.id == terminalInput.value?.id) {
        e.preventDefault();
        emit('command-tab', command.value);
    }
})
//#endregion
// ====================================================================================================
//#region FOCUS INPUT
// Focus on every click on the page if there is not a component processing
const terminalStore = useTerminalStore()
useEventListener(document, 'click', (e) => {
    if (!terminalStore.componentIsProcessing) {
        terminalInput.value?.focus();
    }
})

// Focus on the input when this input is shown again after a component has finished processing
watch(() => terminalStore.componentIsProcessing, () => {
    if (!terminalStore.componentIsProcessing) {
        // Wait for 500ms before focusing on the input so that the input line is scrolled into view
        // A timeout (of at least 0ms)  is necessary otherwise the autofocus will not work
        // 500ms works for now
        setTimeout(() => {
            terminalInput.value?.focus();
        }, 500)
    }
})
//#endregion

</script>

<template>
    <div>
        <form @submit.prevent="emit('command-enter')">
            <div class="flex gap-2">
                <span class="sm:hidden">> </span>
                <input v-model="command" id="terminal-input" ref="terminalInput" type="text"
                    class="w-full outline-none bg-inherit text-inherit caret-indigo-600 " @keyup="keyHandler" autofocus
                    autocomplete="off" autocapitalize="off" spellcheck="false">
            </div>
            <label for="terminal-input" class="sr-only">Terminal Command Input</label>
        </form>
    </div>
</template>

<style scoped></style>
