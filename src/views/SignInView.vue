<script setup lang="ts">
import { ref } from "vue";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";

import BaseButton from "@/components/base/BaseButton.vue";
import BaseContainer from "@/components/base/BaseContainer.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseForm from "@/components/base/BaseForm.vue";
import BaseInput from "@/components/base/BaseInput.vue";

const rules = [
  (value: string) => {
    if (value) return true;

    return "Field can't be empty.";
  },
];
const emailRules = [
  (value: string) => {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      return true;

    return "E-mail must be valid.";
  },
];

const passwordRules = [
  (value: string) => {
    if (value.length > 7) return true;

    return "Password length should be not less than 8 symbols";
  },
  (value: string) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])/;
    if (passwordRegex.test(value)) return true;
    return "Password should have 1 or more digit, special character and upper case letter";
  },
];

const user = useCurrentUser();
const auth = useFirebaseAuth();

const provider = new GoogleAuthProvider();

console.log("user", user.value);

const newUser = ref({
  email: "",
  password: "",
});

const valid = ref(false);

async function createUser() {
  console.log("here");

  if (auth && valid.value) {
    createUserWithEmailAndPassword(
      auth,
      newUser.value.email,
      newUser.value.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", error);
        console.log("errorMessage", errorMessage);
      });
  }
}

function signIn() {
  if (auth && valid) {
    signInWithEmailAndPassword(
      auth,
      newUser.value.email,
      newUser.value.password
    ).then((userCredential) => {
      const user = userCredential;
      console.log(user);
    });
  }
}

function googleSignIn() {
  if (auth) {
    signInWithPopup(auth, provider);
  }
}
</script>

<template>
  <BaseContainer>
    <h1 class="mb-4">Sign In</h1>
    <pre>{{ valid + "" }}</pre>
    <p v-if="user">Hello {{ user }}</p>
    <BaseCard>
      <template v-slot:default>
        <BaseForm v-if="!user" v-model="valid" @submit.prevent>
          <BaseInput
            v-model="newUser.email"
            type="email"
            label="Email"
            required
            :rules="[...rules, ...emailRules]"
            placeholder="eleanorshellstrop@thegoodplace.com"
          />
          <BaseInput
            v-model="newUser.password"
            label="Password"
            type="password"
            :rules="[...rules, ...passwordRules]"
            required
          />
          <BaseButton
            variant="tonal"
            color="success"
            @click="signIn"
          >
            Sign In
          </BaseButton>
          <BaseButton
            @click="createUser"
            variant="tonal"
            color="secondary"
            outline
            type="submit"
          >
            Create New User
          </BaseButton>
        </BaseForm>
      </template>
      <template v-slot:actions>
        <BaseButton
          v-if="user"
          @click="auth && signOut(auth)"
          variant="tonal"
          color="red"
          outline
        >
          Sign out
        </BaseButton>
        <BaseButton
          v-if="!user"
          @click="googleSignIn"
          variant="tonal"
          color="green"
          outline
        >
          Sign in with Google
        </BaseButton>
      </template>
    </BaseCard>
  </BaseContainer>
</template>

<style></style>
