<script setup lang="ts">

export interface Props {
  user?: string
}

const props = withDefaults(defineProps<Props>(), {
  user: 'guest',
})

</script>

<template>
    <div class="select-none">
        <span class="text-indigo-500"><span class="text-orange-500">{{ props.user }}</span>@samsportfolio:~$</span>
    </div>

</template>

<style scoped>

</style>
