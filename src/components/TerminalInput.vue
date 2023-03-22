<script setup lang="ts">

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
//#region FOCUS INPUT ON CLICK
useEventListener(document, 'click', (e) => {
    terminalInput.value?.focus();
})
//#endregion

</script>

<template>
    <div>
        <form @submit.prevent="emit('command-enter')">
            <div class="flex gap-2">
                <span class="sm:hidden">> </span>
                <input v-model="command" id="terminal-input" ref="terminalInput" type="text" class="w-full outline-none bg-inherit text-inherit caret-indigo-600 "
                    @keyup="keyHandler" autofocus>
            </div>
            <label for="terminal-input" class="sr-only">Terminal Command Input</label>
        </form>
    </div>
</template>

<style scoped></style>
