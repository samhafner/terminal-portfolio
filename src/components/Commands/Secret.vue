<script setup lang="ts">
import { useTerminalStore } from '../../stores/terminal.store';

const terminalStore = useTerminalStore()
const correctPassword = "supersecret"
const inputDisabled = ref(false)
const passwordInputEl = ref<HTMLInputElement>()
const revealSecret = ref(false)
const errorMessage = ref("")

const password = ref("")
terminalStore.componentIsProcessing = true

onMounted(() => {
    passwordInputEl.value!.focus()
})

function checkPassword() {
    if (password.value === correctPassword) {
        terminalStore.componentIsProcessing = false
        revealSecret.value = true
    } else {
        errorMessage.value = "Incorrect password"
    }

    password.value = password.value.replaceAll(/./g, "*")
    inputDisabled.value = true
    terminalStore.componentIsProcessing = false
}

console.log(
    "%cCongratulations. You found the password!",
    "color: #04ff00; font-weight: bold; font-size: 16px;"
);
console.log("The secret password is: " + correctPassword)

</script>

<template>
    <div>
        <p>"Curious minds may find hidden treasures beyond the surface. Take a closer look at the details, and you may be
            surprised by what you find."</p>
        <form @submit.prevent="checkPassword">
            <div class="flex gap-2">
                <p>Password: </p>
                <div class="relative flex-1">
                    <input v-model="password" :disabled="inputDisabled" id="password-input" ref="passwordInputEl"
                        type="text" class="w-full outline-none bg-inherit caret-indigo-600 text-transparent select-none"
                        autofocus autocomplete="off" autocapitalize="off" spellcheck="false">
                    <p class="absolute left-0 top-0 -z-10">
                        {{ password.replaceAll(/./g, "*") }}
                    </p>
                </div>
            </div>
            <label for="password-input" class="sr-only">Password Input</label>
        </form>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <div v-if="revealSecret">
            <p>Congratulations! Here is your reward:</p>
            <pre class="text-[0.5rem] sm:text-base">
                    (                           )
              ) )( (                           ( ) )( (
           ( ( ( )  ) )                     ( (   (  ) )(
          ) )     ,,\\\                     ///,,       ) (
       (  ((    (\\\\//                     \\////)      )
        ) )    (-(__//                       \\__)-)     (
       (((   ((-(__||                         ||__)-))    ) )
      ) )   ((-(-(_||           ```\__        ||_)-)-))   ((
      ((   ((-(-(/(/\\        ''; 9.- `      //\)\)-)-))    )
       )   (-(-(/(/(/\\      '';;;;-\~      //\)\)\)-)-)   (   )
    (  (   ((-(-(/(/(/\======,:;:;:;:,======/\)\)\)-)-))   )
        )  '(((-(/(/(/(//////:%%%%%%%:\\\\\\)\)\)\)-)))`  ( (
       ((   '((-(/(/(/('uuuu:WWWWWWWWW:uuuu`)\)\)\)-))`    )
         ))  '((-(/(/(/('|||:wwwwwwwww:|||')\)\)\)-))`    ((
      (   ((   '((((/(/('uuu:WWWWWWWWW:uuu`)\)\))))`     ))
            ))   '':::UUUUUU:wwwwwwwww:UUUUUU:::``     ((   )
              ((      '''''''\uuuuuuuu/``````         ))
               ))            `JJJJJJJJJ`           ((
                 ((            LLLLLLLLLLL         ))
                   ))         ///|||||||\\\       ((
                     ))      (/(/(/(^)\)\)\)       ((
                      ((                           ))
                        ((                       ((
                          ( )( ))( ( ( ) )( ) (()

            </pre>

        </div>

    </div>
</template>

<style scoped></style>
