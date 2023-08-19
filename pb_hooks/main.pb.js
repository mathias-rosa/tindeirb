/// <reference path="../pb_data/types.d.ts" />
/* eslint-disable no-undef */

routerAdd("GET", "/api/hello/:name", (c) => {
    let name = c.pathParam("name")

    return c.json(200, { "message": "Hello " + name })
})

onModelAfterUpdate((e) => {
    console.log("user updated...", e.model.get("email"))
}, "users")

onAfterBootstrap(() => {
    console.log("App initialized!")
})

$app.rootCmd.addCommand(new Command({
    use: "hello",
    run: (cmd, args) => {
        console.log("Hello world!" + args.join(" "))
    },
}))