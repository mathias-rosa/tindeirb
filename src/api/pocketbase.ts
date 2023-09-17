import PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";
import { ref } from "vue";


const pb = new PocketBase(import.meta.env.VITE_API_URL);

const user = ref(pb.authStore.model);

pb.authStore.onChange(() => {
    user.value = pb.authStore.model;
});


const login = async (email: string, password: string) => {
    await pb.collection("users").authWithPassword(email, password);
    if (pb.authStore.isValid) {
        console.log("Signed in !");
    }
};

const logout = () => {
    pb.authStore.clear();
};

const isAuthenticated = () => {
    return pb.authStore.isValid;
};

interface Fillot extends RecordModel {
    prenom: string;
    nom: string;
    infos: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
        "12": string;
        "13": string;
        "14": string;
        "15": string;
        "16": string;
        "17": string;
        "18": string;
        "19": string;
        "20": string;
        "21": string;
        "22": string;
        "23": string;
        "24": string;
        "25": string;
        "26": string;
        "27": string;
        "28": string;
        "29": string;
        "30": string;
        "31": string;
        "32": string;
        "33": string;
    };
    filiere: string;
    parrain: string;
}

export { pb, user, login, logout, isAuthenticated };
export type { Fillot };