<script setup lang="ts">
import { ref, computed } from "vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import CafeCard from "@/components/CafeCard.vue";
import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
import BaseContainer from "@/components/base/BaseContainer.vue";
import BaseForm from "@/components/base/BaseForm.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { onMounted } from "vue";
import { useCollection, useCurrentUser, useFirestore } from "vuefire";
import { collection, deleteDoc, doc } from "firebase/firestore";
import EditCafeModal from "@/components/EditCafeModal.vue";
import { ICafe } from "@/types";

const db = useFirestore();
const cafes = useCollection(collection(db, "cafes"));
const user = useCurrentUser();

const editMode = ref(false);
const editCafe = ref<null | ICafe>(null);

const filterParams = ref({
  text: "",
  favorite: false,
  myCafes: false,
});

const filteredCafes = computed(() => {
  return cafes.value.filter((cafe) => {
    return (
      cafe.name.toLowerCase().includes(filterParams.value.text.toLowerCase()) &&
      (filterParams.value.favorite ? cafe.favorite : true) &&
      (filterParams.value.myCafes ? cafe.author === user.value?.uid : true)
    );
  });
});

console.log("filtered", filteredCafes);

const onEditCafe = (cafe: ICafe) => {
  editCafe.value = { ...cafe, id: cafe.id };
  editMode.value = true;

  // setDoc(doc(db, "cafes", cafe.name), cafe);
};

const onDeleteCafe = (cafe: ICafe) => {
  if (cafe.id) {
    deleteDoc(doc(db, "cafes", cafe.id));
  }
};

onMounted(() => {
  // console.log("here");
  // cafeCollection.value.forEach((cafe) => {
  //   setDoc(doc(db, "cafes", cafe.name), cafe);
  // });
});
</script>

<template>
  <SidebarLayout>
    <template v-slot:sidebar>
      <BaseContainer>
        <h2 class="mb-4">Filter</h2>
        <BaseForm>
          <BaseInput v-model="filterParams.text" label="Name" />
          <BaseCheckbox v-model="filterParams.favorite" label="Favorited" />
          <BaseCheckbox v-model="filterParams.myCafes" label="My cafes" />
        </BaseForm>
      </BaseContainer>
    </template>

    <template v-slot:main>
      <BaseContainer>
        <h2 class="mb-4">Content</h2>
        <CafeCard
          v-for="cafe in filteredCafes"
          v-bind="cafe"
          :docId="cafe.id"
          :key="cafe.id"
          @edit-cafe="onEditCafe(cafe as ICafe)"
          @delete-cafe="onDeleteCafe(cafe as ICafe)"
        >
        </CafeCard>
        <EditCafeModal
          :newCafe="editCafe"
          :isOpen="editMode"
          @toggle:modal="editMode = !editMode"
        />
      </BaseContainer>
    </template>
  </SidebarLayout>
</template>

<style></style>
