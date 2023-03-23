<script setup lang="ts">
import { useTerminalStore } from '../../stores/terminal.store';

const terminalStore = useTerminalStore()
terminalStore.componentIsProcessing = true
const isLoading = ref(true)
const joke = ref("")
const jokeSetup = ref("")
const jokeDelivery = ref("")
const errorMessage = ref("")

interface JokeCommon {
  error: boolean;
  category: string;
  type: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}
interface JokeSingle extends JokeCommon {
  type: "single";
  joke: string;
}
interface JokeTwoPart extends JokeCommon {
  type: "twopart";
  setup: string;
  delivery: string;
}


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
    <div>
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
        </div>
    </div>
</template>

<style scoped></style>
