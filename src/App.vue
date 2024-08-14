<script setup lang="ts">
import { useCollection, useFirestore } from "vuefire";
import { cafesRefs } from "./firebase";
import { collection, getDocs, query } from "firebase/firestore";

const db = useFirestore();

const cafes = useCollection(collection(db, "cafes"));

// const querySnapshot = await getDocs(cafes);

// cafes.forEach((doc) => {
//   console.log(doc.data());
// });

console.log("cafes", cafes);
</script>

<template>
  <v-app>
    <nav class="d-flex justify-center ga-3 pa-3">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/new-cafe">New Cafe</RouterLink>
      <RouterLink to="/sign-in">Sign in</RouterLink>
    </nav>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
