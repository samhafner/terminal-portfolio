<script setup lang="ts">
import { JokeSingle, JokeTwoPart } from '../../interfaces';
import { useTerminalStore } from '../../stores/terminal.store';

const props = defineProps<{
    args: string[];
}>();

const terminalStore = useTerminalStore()
terminalStore.componentIsProcessing = true
const isLoading = ref(true)
const joke = ref("")
const jokeSetup = ref("")
const jokeDelivery = ref("")
const errorMessage = ref("")
const showUnsafeJoke = ref(false)

function validateArgs() {
    if (props.args.length > 1) {
        errorMessage.value = "Too many arguments";
        return false;
    } if (props.args[0] !== "-unsafe") {
        errorMessage.value = "Invalid argument";
        return false;
    }
    return true;
}

if (validateArgs()) {
    if (props.args[0] === "-unsafe") {
        showUnsafeJoke.value = true;
    }
    fetchJoke()
} else {
    isLoading.value = false;
    terminalStore.componentIsProcessing = false
}

function fetchJoke() {
    fetch(`https://v2.jokeapi.dev/joke/Programming?${showUnsafeJoke ? '' : 'blacklistFlags=nsfw,religious,political,racist,sexist,explicit'}`)
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
