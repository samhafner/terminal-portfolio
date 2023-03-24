<script setup lang="ts">
import { Command } from './interfaces';
import { scrollToBottom } from './utils/functions';
import { useTerminalStore } from './stores/terminal.store';


const availableCommands: Command[] = [
  { cmd: "about", args: false, desc: "About me" },
  { cmd: "echo", args: true, desc: "Print out anything" },
  { cmd: "history", args: false, desc: "View command history" },
  { cmd: "projects", args: false, desc: "View projects that I've coded" },
  { cmd: "welcome", args: false, desc: "Display welcome banner" },
  { cmd: "help", args: false, desc: "List available commands"},
  { cmd: "whoami", args: false, desc: "Who are you?"},
  { cmd: "secret", args: false, desc: "Super secret command" },
  { cmd: "clear", args: false, desc: "Clear the terminal" },
  { cmd: "weather", args: false, desc: "Display weather based on location", wait: true },
  { cmd: "quote", args: false, desc: "Display some words of wisdom", wait: true },
  { cmd: "joke", args: false, desc: "Display a programming joke", wait: true },
  { cmd: "sudo", args: true, desc: "", hidden: true },
  { cmd: "shit", args: false, desc: "", hidden: true },
]

const terminalStore = useTerminalStore()

whenever(() => !terminalStore.componentIsProcessing, () => {
    scrollToBottom()
})

// =================================================================================================
//#region COMMAND INPUT
const commandInput = ref("");

function handleCommandInput() {
  if (!commandInput.value) {
    return
  }

  commandHistory.value.push(commandInput.value);

  if (commandInput.value === "clear") {
    // Clear the output history, but not the command history
    clearOutputHistory()
  } else {
    // Since the clear command has no output we don't want to push it to the output history
    addToOutputHistory(commandInput.value)
  }

  scrollToBottom() // Scroll to bottom when new output is added
  commandInput.value = ""
}
//#endregion
// =================================================================================================
//#region COMMAND HISTORY
const commandHistory = ref<string[]>([]);
provide("commandHistory", commandHistory);
const pointer = ref(0);

// Browse command history
watch(commandHistory, () => {
  pointer.value = commandHistory.value.length; // Set pointer to the length so that when you press up, it will go to the last command (index: length -1)
}, { deep: true });

function browseHistory(direction: "up" | "down") {
  if (commandHistory.value.length === 0) {
    return;
  }

  if (direction === "up") {
    pointer.value -= 1
    if (pointer.value < 0) {
      pointer.value = 0
    }
  } else if (direction === "down") {
    pointer.value += 1;
    if (pointer.value > commandHistory.value.length - 1) {
      pointer.value = commandHistory.value.length - 1;
    }
  }

  commandInput.value = commandHistory.value[pointer.value];
}
//#endregion
// =================================================================================================
//#region OUTPUT HISTORY
const outputHistory = ref<string[]>([]);
outputHistory.value.push("welcome"); // Display welcome banner on load

function clearOutputHistory() {
  outputHistory.value = [];
}

function addToOutputHistory(command: string) {
  outputHistory.value.push(command);
}
//#endregion
// =================================================================================================
//#region AUTO SUGGESTIONS
const commandPart = ref("");
const showAutoSuggestions = ref(false);
let filteredCommands: Command[]

function handleAutosuggestion(command: string) {
  if (!command) {
    return
  }
  filteredCommands = availableCommands.filter(c => c.cmd.startsWith(command) && c.cmd !== command && command.length > 0 && !c.hidden)
  if (filteredCommands.length === 1) {
    commandInput.value = filteredCommands[0].cmd
    showAutoSuggestions.value = false
  } else if (filteredCommands.length > 1) {
    showAutoSuggestions.value = true
    commandPart.value = command
  } else {
    showAutoSuggestions.value = false
  }
  scrollToBottom() // Scroll to bottom when the auto suggestions are displayed
}

function resetAutoSuggestions() {
  showAutoSuggestions.value = false;
  commandPart.value = "";
  filteredCommands = [];
}
//#endregion

</script>

<template>
  <header class="bg-zinc-700 sticky top-0 text-xl py-1 flex gap-4 justify-center">
    <i class="bi bi-terminal"></i>
    <h1>Sam's Terminal Portfolio</h1>
  </header>
  <main class="p-4">
    <div>
      <OutputHistory v-for="(command, index) in outputHistory" :command="command" :available-commands="availableCommands"
        :key="index" />
    </div>
    <div v-show="!terminalStore.componentIsProcessing" class="flex flex-col sm:flex-row gap-x-2">
      <LinePrefix />
      <TerminalInput class="flex-1" @command-enter="handleCommandInput(); resetAutoSuggestions()" v-model="commandInput"
        @command-up="browseHistory('up')" @command-down="browseHistory('down')" @command-tab="handleAutosuggestion" />
    </div>
    <AutoSuggestions v-if="showAutoSuggestions" :commands="availableCommands" :command-part="commandPart" />
  </main>
</template>

<style scoped></style>
