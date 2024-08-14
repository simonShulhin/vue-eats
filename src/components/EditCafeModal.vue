<script setup lang="ts">
import BaseCard from "./base/BaseCard.vue";
import { useFirestore } from "vuefire";
import { ICafe } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { onMounted } from "vue";
import { onUnmounted } from "vue";

const db = useFirestore();

const props = defineProps<{
  newCafe: ICafe | null;
  isOpen: boolean;
}>();

const editCafe = () => {
  if (props.newCafe && props.newCafe.id) {
    const { id, ...updatedCafe } = props.newCafe;
    updateDoc(doc(db, "cafes", id), updatedCafe);
  }
};

onUnmounted(() => console.log("unmounted"));

onMounted(() => {
  console.log(props.newCafe);
});
</script>

<template>
  <v-dialog
    max-width="500"
    :model-value="isOpen"
    @update:model-value="$emit('toggle:modal')"
  >
    <BaseCard v-if="newCafe">
      <BaseForm>
        <BaseInput
          v-model="newCafe.name"
          label="Name"
          required
          placeholder="Cafe with a Vue"
        />
        <BaseInput
          v-model="newCafe.rating"
          label="Rating"
          type="number"
          min="0"
          max="5"
          step="0.5"
          required
        />
        <BaseInput v-model="newCafe.location" label="Location" required />
        <BaseInput
          v-model.number="newCafe.price"
          label="Price"
          type="number"
          min="1"
          max="4"
          required
        />
        <BaseCheckbox v-model="newCafe.favorite" label="Favorite" />
      </BaseForm>
      <template v-slot:actions>
        <BaseButton
          variant="tonal"
          color="success"
          @click="
            $emit('toggle:modal');
            editCafe();
          "
        >
          Edit Cafe
        </BaseButton>
        <BaseButton
          variant="tonal"
          color="error"
          outline
          @click="$emit('toggle:modal')"
        >
          Cancel
        </BaseButton>
      </template>
    </BaseCard>
  </v-dialog>
</template>
