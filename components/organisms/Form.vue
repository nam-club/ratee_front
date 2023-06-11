<template>
    <form @submit.prevent="submit" style="margin:5%">
        <v-text-field 
            label="Name"></v-text-field>

        <v-text-field 
            label="Phone Number"></v-text-field>

        <v-text-field  label="E-mail"></v-text-field>

        <v-select 
            label="Select"></v-select>

        <v-checkbox  label="Option"
            type="checkbox"></v-checkbox>

        <v-btn class="me-4" type="submit">
            submit
        </v-btn>

        <v-btn>
            clear
        </v-btn>
    </form>
</template>