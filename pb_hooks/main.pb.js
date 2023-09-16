/// <reference path="../pb_data/types.d.ts" />
/* eslint-disable no-undef */

routerAdd("GET", "/api/hello/:name", (c) => {
    let name = c.pathParam("name");

    return c.json(200, { message: "Hello " + name });
});

routerAdd("GET", "/api/parrain/shotgun/:id", (c) => {
    let id = c.pathParam("id");

    const fillot = new Record();
    $app.dao()
        .recordQuery("Fillots")
        .where($dbx.exp("id = {:id}", { id }))
        .first(fillot);

    // Do whatever you want with the fillot
});

routerAdd("GET", "/api/parrain/auth/cas", (c) => {
    let ticket = c.queryParam("ticket");
    let redirectUrl = c.queryParam("redirectUrl");

    if (
        !ticket ||
        typeof ticket !== "string" ||
        !redirectUrl ||
        typeof redirectUrl !== "string"
    ) {
        return c.json(400, { message: "Invalid request" });
    }

    const CAS_PROXY_URL = "https://tcoutan.zzz.bordeaux-inp.fr/casAuth/?url=";

    const serviceUrl = `${CAS_PROXY_URL}${redirectUrl}`;

    // Exchange ticket for user info
    let res = $http.send({
        url: `https://cas.bordeaux-inp.fr/serviceValidate?service=${encodeURIComponent(
            serviceUrl
        )}&ticket=${ticket}&format=json`,
        method: "GET",
    });

    /**
     * @type {import("./types.d.ts").BdxInpCasResponse}
     */
    let response = res.json;

    if (!("authenticationSuccess" in response.serviceResponse)) {
        return c.json(401, { message: "Invalid ticket" });
    }

    const data = response.serviceResponse.authenticationSuccess;
    const username = data.user;

    // Check that user is authorized
    const authorizedDiplomas = [
        "IIEIN4",
        "IIETE4",
        "IIEMM4",
        "IIEEL4",
        "IAERS4",
        "IAEEE4",
        "IIEIN5",
    ];
    if (!authorizedDiplomas.includes(data.attributes.diplome.join(""))) {
        return c.json(403, { message: "Unauthorized" });
    }

    const SHOTGUN_WAVES = {
        "2023-09-16 17:00:00": ["mrosa001"],
        "2023-09-15 13:00:00": ["aboin"],
    };
    const SHOTGUNW_DATE_FOR_OTHERS = "2023-09-18 14:00:00";

    let shotgunDate = SHOTGUNW_DATE_FOR_OTHERS;
    for (const [date, usernames] of Object.entries(SHOTGUN_WAVES)) {
        if (usernames.includes(username)) {
            shotgunDate = date;
            break;
        }
    }

    function generatePassword() {
        const length = 10;
        const charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    // Check if user exists
    const users = arrayOf(new Record());
    $app.dao()
        .recordQuery("users")
        .where($dbx.exp("username = {:username}", { username }))
        .all(users);
    if (users.length > 0) {
        // User exists, generate a temporary password
        const user = users[0];
        const password = generatePassword();
        user.setPassword(password);
        user.set("email", `${username}@bordeaux-inp.fr`);
        user.set("firstName", data.attributes.prenom.join(" "));
        user.set("lastName", data.attributes.nom.join(" "));
        user.set("diploma", data.attributes.diplome.join(" "));
        user.set("shotgunDate", shotgunDate);
        $app.dao().saveRecord(user);

        return c.json(200, { username, password });
    } else {
        // Create user
        const userCollection = $app.dao().findCollectionByNameOrId("users");
        const user = new Record(userCollection);
        const password = generatePassword();
        user.set("username", username);
        user.set("email", `${username}@bordeaux-inp.fr`);
        user.set("firstName", data.attributes.prenom.join(" "));
        user.set("lastName", data.attributes.nom.join(" "));
        user.set("diploma", data.attributes.diplome.join(" "));
        user.set("shotgunDate", shotgunDate);
        user.setPassword(password);
        $app.dao().saveRecord(user);

        return c.json(200, { username, password });
    }
});

onModelAfterUpdate((e) => {
    console.log("user updated...", e.model.get("email"));
}, "users");

onAfterBootstrap(() => {
    console.log("App initialized!");
});

$app.rootCmd.addCommand(
    new Command({
        use: "populate",
        // eslint-disable-next-line no-unused-vars
        run: (cmd, args) => {
            const convertFiliere = (filiere) => {
                switch (filiere) {
                    case "Informabite":
                        return "IIEIN";
                    case "Telecon":
                        return "IIETE";
                    case "Matmécouilles":
                        return "IIEMM";
                    case "Electrocon":
                        return "IIEEL";
                    case "Zanimo et informatique":
                        return "IAERS";
                    case "Système des zanimo embarqué":
                        return "IAEEE";
                    default:
                        return filiere;
                }
            };

            function toTitleCase(str) {
                return str.replace(/\w\S*/g, function (txt) {
                    return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                    );
                });
            }

            function beautifyName(str) {
                return str
                    .trim()
                    .split(" ")
                    .map((s) => toTitleCase(s))
                    .join(" ")
                    .split("-")
                    .map((s) => toTitleCase(s))
                    .join("-");
            }

            const GSHEET_URL =
                "https://script.google.com/macros/s/AKfycbzuZUFGXMXKONUCzQ70Kh1WvrgX9R2N-VManeB-PPKGwJq_iY57Ein1gQooSF4GnW1F/exec";

            console.log("Pulling data from google sheet...");

            const res = $http.send({
                url: GSHEET_URL,
                method: "GET",
            });

            /**
             * @type {Array<{
             * "0": string;
             * "1": string;
             * "2": string;
             * "3": string;
             * "4": string;
             * "5": string;
             * "6": string;
             * "7": string;
             * "8": string;
             * "9": string;
             * "10": string;
             * "11": string;
             * "12": string;
             * "13": string;
             * "14": string;
             * "15": string;
             * "16": string;
             * "17": string;
             * "18": string;
             * "19": string;
             * "20": string;
             * "21": string;
             * "22": string;
             * "23": string;
             * "24": string;
             * "25": string;
             * "26": string;
             * "27": string;
             * "28": string;
             * "29": string;
             * "30": string;
             * "31": string;
             * "32": string;
             * "33": string;
             * }>}
             */
            const data = res.json;

            const Fillots = $app.dao().findCollectionByNameOrId("Fillots");

            data.forEach((row) => {
                const fillot = new Record(Fillots);
                let casId = "unknown";
                // CAS id must be a string and made of only lowercase letters and numbers
                if (typeof row["4"] === "string") {
                    const cleanedCasId = row["4"].toLowerCase().trim();
                    if (/^[a-z0-9]+$/.test(cleanedCasId)) {
                        casId = cleanedCasId;
                    } else {
                        console.log("casId is not valid", row["4"]);
                    }
                } else {
                    console.log("casId is not valid", row["4"]);
                }
                fillot.set("cas", casId);
                fillot.set("nom", beautifyName(row["1"]));
                fillot.set("prenom", beautifyName(row["2"]));
                fillot.set("filiere", convertFiliere(row["5"]));
                fillot.set("infos", {
                    ...row,
                });
                $app.dao().saveRecord(fillot);
            });
        },
    })
);

$app.rootCmd.addCommand(
    new Command({
        use: "clean",
        // eslint-disable-next-line no-unused-vars
        run: (cmd, args) => {
            const fillots = arrayOf(new Record());
            $app.dao().recordQuery("Fillots").all(fillots);

            fillots.forEach((fillot) => {
                $app.dao().deleteRecord(fillot);
            });
        },
    })
);
