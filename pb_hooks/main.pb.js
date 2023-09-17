/// <reference path="../pb_data/types.d.ts" />

/* eslint-disable no-undef */

routerAdd("GET", "/api/parrain/auth/cas", (c) => {
    let ticket = c.queryParam("ticket");
    let redirectUrl = c.queryParam("redirectUrl");

    const BDA = [
        "aalbarran",
        "acharlier002",
        "acoutureau",
        "adedecker",
        "ahauswald",
        "aosetek",
        "aroussely",
        "avanlancker",
        "bhuet",
        "capel",
        "cdomas",
        "clmaitre002",
        "cpiette",
        "electakone",
        "emalletdech",
        "eodounlami",
        "eskubler006",
        "fcoutant",
        "ighanem015",
        "jduchiron",
        "jdunoyer",
        "mabeauvais",
        "maparicio001",
        "mmkadem",
        "mweiss003",
        "rgamain",
        "soyhanto",
        "vrieffel001",
        "zrihani019",
    ];

    const bureauBDE = [
        "adurand015",
        "hracape",
        "lazouz",
        "rgodin002",
        "tbley001",
        "tchatelain",
    ];

    const BDE = [
        "aallardin",
        "bdupouy004",
        "btabardel",
        "ebardat",
        "eskubler006",
        "gperrouelle",
        "lelice",
        "lmoreau005",
        "lponsin",
        "lvichet",
        "madelahay",
        "mchallut",
        "mdesboisren",
        "metienne009",
        "mliateni",
        "nbossi",
        "nlebrun002",
        "oclafitte",
        "pgallas",
        "rdarragon",
        "tclaudel",
        "tcoutan",
        "thumbertcla",
        "tkamil",
        "tmorel003",
        "vmonti",
        "ykouassi003",
    ];

    const BDS = [
        "abenhnini",
        "aclaudon001",
        "adedecker",
        "aelouazzani",
        "aespinosa002",
        "aldelaveau",
        "amuller005",
        "bfourcade003",
        "bglacial",
        "chalonso",
        "cmorellini",
        "egerard003",
        "electakone",
        "fcoutant",
        "froyonchale",
        "hbastien",
        "jtcandele",
        "lkrumm",
        "lperier001",
        "lperrin011",
        "mantoine002",
        "mdanel001",
        "mhamoura019",
        "mlgendre",
        "mmonello",
        "ndeprelle",
        "odulhoste",
        "tcharpentie",
        "wyengue",
        "ysol",
    ];

    const BAR = [];

    if (
        !ticket ||
        typeof ticket !== "string" ||
        !redirectUrl ||
        typeof redirectUrl !== "string"
    ) {
        return c.json(400, {
            status: "error",
            message: "Requête invalide",
        });
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
        return c.json(401, {
            status: "error",
            message: "Ticket CAS invalide"
        });
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
        // Les 3A sont autorisés à s'inscrire mais ils ne peuvent pas parrainer
        "IIEIN5",
        "IIETE5",
        "IIEMM5",
        "IIEEL5",
        "IAERS5",
        "IAEEE5",
    ];

    // Les dérogations sont des cas particuliers (redoublants)
    // On indique en clé le nom d'utilisateur et en valeur le diplôme qu'on leur accorde bien que ce ne soit pas celui retourné par le CAS
    const DEROGATIONS = {
        "jpierrel001": "IIEIM4",
    }

    if (username in DEROGATIONS) {
        data.attributes.diplome = [DEROGATIONS[username]];
    }

    if (!authorizedDiplomas.includes(data.attributes.diplome.join(""))) {
        return c.json(403, {
            status: "error",
            message: "Vous n'êtes pas autorisé à vous connecter, seul les 2A et 3A ont accès à cette application"
        });
    }

    // Les horraires sont en UTC (il faut donc ajouter 2h pour avoir l'heure française)
    const SHOTGUN_WAVES = {
        "2023-09-17 18:43:00": ["mrosa001"],
        "2023-09-19 10:40:00": bureauBDE,
        "2023-09-19 11:00:00": BDE,
        "2023-09-19 11:30:00": BAR,
        "2023-09-19 16:00:00": [...BDA, ...BDS],
    };
    const SHOTGUNW_DATE_FOR_OTHERS = "2023-09-20 10:50:00";

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

        return c.json(200, {
            status: "success",
            username,
            password
        });
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

        return c.json(200, {
            status: "success",
            username,
            password
        });
    }
});

onModelAfterUpdate((e) => {
    console.log("user updated...", e.model.get("email"));
}, "users");

onRecordBeforeUpdateRequest((e) => {
    if (e.record.get("parrain") !== "") {
        const fillot = $app.dao().findRecordById("Fillots", e.record.get("id"));

        const MAX_FILLOTS = parseInt(
            $app
                .dao()
                .findFirstRecordByData("config", "key", "MAX_FILLOTS")
                .get("value")
        );

        // get parrain record

        const parrain = $app
            .dao()
            .findRecordById("users", e.record.get("parrain"));

        // check if fillot has already a parrain

        if (fillot.get("parrain") !== "") {
            e.cancel();
        }

        // count number of fillots of parrain

        const fillots = arrayOf(new Record());

        $app.dao().recordQuery("Fillots").all(fillots);

        // C'est pas opti, je sais mais j'arrive pas à filtrer et je sais faire du JS
        // donc ça sera comme ça 😅
        const parrainNbFillots = fillots.reduce((acc, fillot) => {
            if (fillot.get("parrain") === parrain.get("id")) {
                acc++;
            }
            return acc;
        }, 0);

        // check if parrain has already MAX_FILLOTS fillots

        if (parrainNbFillots >= MAX_FILLOTS) {
            console.log("Vous avez déjà trop de fillots");
            e.cancel();
        }

        //  @request.auth.shotgunDate <= @now

        // check if shotgun date is passed

        const shotgunDate = new Date(
            parrain.get("shotgunDate").toString().replace(" ", "T")
        );

        if (shotgunDate.getTime() >= Date.now()) {
            console.log("La date de shotgun n'est pas encore passée");

            e.cancel();
        }

        // check if fillot is in the same "filiere" as parrain

        const parrainFiliere = parrain.get("diploma").substring(0, 5);
        const parrainYear = parrain.get("diploma").substring(5, 6);

        if (parrainFiliere !== fillot.get("filiere")) {
            console.log("T'es pas dans la même filière");
            e.cancel();
        }

        if (parrainYear !== "4") {
            console.log("Seuls les 2A peuvent parrainer");
            e.cancel();
        }
    }
}, "Fillots");

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

            const fillots = arrayOf(new Record());
            $app.dao().recordQuery("Fillots").all(fillots);

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

                if (
                    fillots.some(
                        (fillot) =>
                            fillot.get("nom") === beautifyName(row["1"]) &&
                            fillot.get("prenom") === beautifyName(row["2"])
                    )
                ) {
                    console.log("fillot already exists", row["4"]);
                    return;
                }

                fillot.set("cas", casId);
                fillot.set("nom", beautifyName(row["1"]));
                fillot.set("prenom", beautifyName(row["2"]));
                fillot.set("filiere", convertFiliere(row["5"]));
                fillot.set("infos", {
                    ...row.map((v) => {
                        v.toString().trim();
                    })
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
