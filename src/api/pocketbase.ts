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



interface GSheetFillot {
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
}

interface Fillot {
    cas: string;
    Nom: string;
    Prenom: string;
    Parrain: string;
    Infos: object;
}


const populate = () => {
    // On récupère la liste des fillots depuis le google sheet
    return fetch("https://script.googleusercontent.com/macros/echo?user_content_key=TSok7CEzomoWwahDDpCQ-pq_o_6Dc27wOF_GedWlrazA59tDXfwqjGjAobmm7v93w9ODB8JQDQsFUAsCr-bqBBkbmmINsBXHm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFncku6-PR29XzFWtJVdDd71UsEj4aSUjstZkO_SZduP5cE1MoakhXOHkQlkIgcJMowZ8WxGkN29WeEpolEWBDZ8FdL2OUjd5g&lib=Ma7Uc9LHVy2FH_zBvrbxv4OKkGZzaX1Ik").then((res) => {
        const gsheetlist = res.json().then((data) => {
            return data.map((fillot: GSheetFillot) => {
                return {
                    cas: fillot["4"],
                    Nom: fillot["1"],
                    Prenom: fillot["2"],
                    Parrain: "",
                    Infos: {
                        ...fillot
                    }
                };
            });
        })
        // On récupère la liste des fillots dans la base de données
        const fillotsInDB = pb.collection("fillots").getFullList().then((fillots) => {
            return fillots.map((fillot) => {
                return fillot.cas;
            });
        });

        // On compare les deux listes et on ajoute les fillots manquants (c'est ce que je veux en tout cas)
    }).then((gsheetlist) => {

        gsheetlist.then((gsheetlist: GSheetFillot[]) => {
            gsheetlist.forEach((fillot: GSheetFillot) => {
                if (!fillotsInDB.includes(fillot.cas)) {
                    pb.collection("fillots").create(fillot);
                }
            });
        });
    }
};


export { pb, user, login, logout, isAuthenticated, populate };