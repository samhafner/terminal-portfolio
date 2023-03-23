<script setup lang="ts">
import { JokeSingle, JokeTwoPart } from '../../interfaces';
import { useTerminalStore } from '../../stores/terminal.store';

const terminalStore = useTerminalStore()
terminalStore.componentIsProcessing = true
const isLoading = ref(true)
const joke = ref("")
const jokeSetup = ref("")
const jokeDelivery = ref("")
const errorMessage = ref("")

fetchQuote()

function fetchQuote() {
    fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit")
        .then(response => response.json())
        .then((data: JokeSingle | JokeTwoPart) => {
            if (data.error) {
                errorMessage.value = "Error fetching joke";
            } else if (data.type === "single") {
                joke.value = data.joke;
            } else {
                jokeSetup.value = data.setup;
                jokeDelivery.value = data.delivery;
            }
        })
        .catch(() => {
            errorMessage.value = "Error fetching joke";
        })
        .finally(() => {
            isLoading.value = false;
            terminalStore.componentIsProcessing = false
        });
}

</script>

<template>
    <div >
        <div v-if="isLoading">
            <LoadingDisplay text="Fetching joke..." />
        </div>
        <p v-else-if="errorMessage" class="text-red-700">
            {{ errorMessage }}
        </p>
        <div v-else>
            <p v-if="joke">{{ joke }}</p>
            <div v-else>
                <p>{{ jokeSetup }}</p>
                <p>{{ jokeDelivery }}</p>
            </div>
            <Source url="https://v2.jokeapi.dev/" text="JokeAPI" />
        </div>
    </div>
</template>

<style scoped></style>
