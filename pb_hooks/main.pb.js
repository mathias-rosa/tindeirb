/// <reference path="../pb_data/types.d.ts" />
/* eslint-disable no-undef */

routerAdd("GET", "/api/hello/:name", (c) => {
    let name = c.pathParam("name");

    return c.json(200, { message: "Hello " + name });
});

onModelAfterUpdate((e) => {
    console.log("user updated...", e.model.get("email"));
}, "users");

onAfterBootstrap(() => {
    console.log("App initialized!");
});

$app.rootCmd.addCommand(
    new Command({
        use: "hello",
        run: (cmd, args) => {
            console.log("Hello world!" + args.join(" "));
        },
    })
);

$app.rootCmd.addCommand(
    new Command({
        use: "populate",
        run: (cmd, args) => {
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

            console.log(cmd, args);

            const Fillots = $app.dao().findCollectionByNameOrId("Fillots");

            data.forEach((row) => {
                const fillot = new Record(Fillots);
                fillot.set("cas", row["4"]);
                fillot.set("Nom", row["1"]);
                fillot.set("Prenom", row["2"]);
                fillot.set("Infos", {
                    ...row,
                });
                $app.dao().saveRecord(fillot);
            });
        },
    })
);
