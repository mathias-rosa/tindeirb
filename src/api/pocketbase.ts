import PocketBase from "pocketbase";
import { ref } from "vue";


const pb = new PocketBase("http://127.0.0.1:8090/");

const user = ref(pb.authStore.model);

pb.authStore.onChange(() => {
    user.value = pb.authStore.model;
});

const login = async (email: string, password: string) => {
    await pb.collection("users").authWithPassword(email, password);
    if (pb.authStore.isValid) {
        console.log("Signed in");
    }
};

const logout = () => {
    pb.authStore.clear();
};

const isAuthenticated = () => {
    return pb.authStore.isValid;
};

export { pb, user, login, logout, isAuthenticated };