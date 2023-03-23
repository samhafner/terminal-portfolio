<script setup lang="ts">

interface Project {
    name: string;
    tech: string[];
    year: string;
    description: string;
    url?: {
        code?: string;
        live?: string;
    };
}

// holds the projects, newest ones are added at the end
const projects: Project[] = [
    {
        name: "Portfolio",
        year: "2022",
        tech: ["JavaScript", "Tailwind"],
        description: "My personal portfolio website",
        url: {
            code: "https://github.com/samhafner/challenge1-personal-website-new",
            live: "https://samhafner.github.io/challenge1-personal-website-new/src/"
        }
    },
    {
        name: "Sumi Drawing Competetion",
        year: "2022",
        tech: ["Vite", "JavaScript", "Tailwind"],
        description: "A website for a children's drawing competetion.  People can upload their drawings, vote for their favorite ones, and view other drawings in a gallery.",
    },
    {
        name: "Desk booking system",
        year: "2023",
        tech: ["Vue", "Vite", "TypeScript", "Tailwind"],
        description: "A website where registered users can book desks in offices.  Users can filter desks according to criteria such as equipment, book desks permanently or temporarily, and view all their bookings and make comments; admins can also manage bookings, create offices and edit desks.",
    },
    {
        name: "Portfolio (terminal-themed)",
        year: "2023",
        tech: ["Vue", "Vite", "TypeScript", "Tailwind"],
        description: "My personal portfolio website, but with a terminal-themed interface",
        url: {
            code: "https://github.com/samhafner/terminal-portfolio",
        }
    },

]


</script>

<template>
    <div>
        <p>Here a some of my coding projects:</p>
        <div v-for="project in projects.reverse()" class="mt-3">
            <p class="font-bold">{{ project.name }} ({{ project.year }})</p>
            <p class="text-gray-500 text-sm">{{ project.tech.join(", ") }}</p>
            <p>{{ project.description }}</p>
            <div v-if="project.url" class="flex gap-2">
                Links:
                <div class="space-x-4">
                    <span v-if="project.url.live"><Link :url="project.url.live" text="Live version" /></span>
                    <span v-if="project.url.code"><Link :url="project.url.code" text="Code" /></span>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped></style>
