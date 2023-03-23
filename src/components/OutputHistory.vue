<script setup lang="ts">
import { Command } from '../interfaces';
import { search } from 'fast-fuzzy';

///#region Props and emits
const props = defineProps<{
    command: string;
    availableCommands: Command[];
}>();

//#endregion
// =================================================================================================
//#region Commands
const commandName = ref("");
const commandArgs = ref<string[]>([]);
processCommand(props.command);

function processCommand(cmd: string) {
    const x = cmd.trim().split(" ");
    commandName.value = x[0];
    commandArgs.value = x.slice(1);
}

const commandHistory = inject("commandHistory", []) as string[];

const similarCommands = search(
    props.command,
    props.availableCommands,
    { keySelector: (obj) => obj.cmd },
).map(x => `'${x.cmd}'`);
//#endregion

</script>

<template>
    <div v-once class="mb-2">
        <div class="flex flex-col sm:flex-row gap-x-2">
            <LinePrefix />
            <div class="flex gap-2">
                <span class="sm:hidden">> </span>
                <p>{{ command }}</p>
            </div>
        </div>
        <template v-if="props.availableCommands.find(x => x.cmd === commandName)">
            <WhoAmI v-if="commandName === 'whoami'" />
            <About v-else-if="commandName === 'about'" />
            <Projects v-else-if="commandName === 'projects'" />
            <Welcome v-else-if="commandName === 'welcome'" />
            <Help v-else-if="commandName === 'help'" :commands="props.availableCommands" />
            <Secret v-else-if="commandName === 'secret'" />
            <About v-else-if="commandName === 'about'" />
            <Echo v-else-if="commandName === 'echo'" :args="commandArgs" />
            <CommandHistory v-else-if="commandName === 'history'" :command-history="commandHistory" />
            <Weather v-else-if="commandName === 'weather'" />
            <Quote v-else-if="commandName === 'quote'" />
            <Joke v-else-if="commandName === 'joke'" />
            <Sudo v-else-if="commandName === 'sudo'" />
        </template>
        <template v-else>
            <p>Command not found. <span v-if="similarCommands.length > 0">Did you mean: {{ similarCommands.join(" or ")
            }}?</span> <span v-if="command.includes(`'`)">You shouldn't write the quote characters.</span></p>
            <HelpMessage />
        </template>
    </div>
</template>

<style scoped></style>
