<script setup lang="ts">
import { useTerminalStore } from '../../stores/terminal.store';

const terminalStore = useTerminalStore()
terminalStore.componentIsProcessing = true
const isLoading = ref(true)
const quote = ref("")
const author = ref("")
const errorMessage = ref("")

interface Quote {
    q: string; // quote
    a: string; // author
    h: string; // html code
}

fetchQuote()

function fetchQuote() {
    fetch("https://zenquotes.io/api/random")
        .then(response => response.json())
        .then((data: Quote) => {
            quote.value = data.q;
            author.value = data.a;
        })
        .catch(() => {
            errorMessage.value = "Error fetching quote";
        })
        .finally(() => {
            isLoading.value = false;
            terminalStore.componentIsProcessing = false
        });
}

</script>

<template>
    <div>
        <div v-if="isLoading">
            <p>Loading...</p>
        </div>
        <p v-else-if="errorMessage" class="text-red-700">
            {{ errorMessage }}
        </p>
        <div v-else>
            <p>{{ quote }}</p>
            <p>- {{ author }}</p>
        </div>
    </div>
</template>

<style scoped></style>
