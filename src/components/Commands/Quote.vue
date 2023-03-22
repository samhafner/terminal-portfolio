<script setup lang="ts">
import { useTerminalStore } from '../../stores/terminal.store';

const terminalStore = useTerminalStore()
terminalStore.componentIsProcessing = true
const isLoading = ref(true)
const quote = ref("")
const author = ref("")
const errorMessage = ref("")

interface Quote {
    _id: string;
    content: string;
    author: string;
    tags: string[];
    authorSlug: string;
    length: number;
    dateAdded: string;
    dateModified: string;
}

fetchQuote()

function fetchQuote() {
    fetch("https://api.quotable.io/quotes/random?tags=inspirational")
        .then(response => response.json())
        .then((data: Quote[]) => {
            quote.value = data[0].content;
            author.value = data[0].author;
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
            <p>« {{ quote }} »</p>
            <p class="text-sm">- {{ author }}</p>
        </div>
    </div>
</template>

<style scoped></style>
