routerAdd("GET", "/api/auth/cas", (c) => {
  let ticket = c.queryParam("ticket");
  let redirectUrl = c.queryParam("redirectUrl");

  if (
    !ticket || typeof ticket !== 'string' ||
    !redirectUrl || typeof redirectUrl !== 'string'
  ){
    return c.json(400, {
      status: "error", 
      message: "Requête invalide"
    });    
  }

  const CAS_PROXY_URL = "https://cas.serveur-bde.eirb.fr/?token=";
  const serviceUrl = `${CAS_PROXY_URL}${redirectUrl}`;

  let res = $http.send({
    url: `https://cas.bordeaux-inp.fr/serviceValidate?service=${encodeURIComponent(
      serviceUrl
    )}&ticket=${ticket}&format=json`,
    method: "GET",
  });

  let response = res.json;
  if (!("authenticationSuccess" in response.serviceResponse)) {
    return c.json(401, {
      status: "error", 
      message: "Ticket CAS invalide", 
      response,
    });
  }

  const data = response.serviceResponse.authenticationSuccess;
  const username = data.user;

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentSchoolYear = currentMonth >= 8 ? currentYear : currentYear - 1;

  const group = data.attributes.diplome[0].slice(0, -1);
  const level = data.attributes.diplome[0].slice(-1);

  const yearDiff = currentSchoolYear - parseInt(data.attributes.supannEtuAnneeInscription[0]);
  const yearNumber = yearDiff + parseInt(level);

  data.attributes.diplome = [ group + yearNumber ];

  const DEROGATIONS = {
    pvautrindip: "IIEMM4",
    gbemenebata: "IIEMM4", 
    mcathelin001: "IIEMM4",
    polli: "IIEMM4",
    mbouchez001: "IIEMM4",
    lflament001: "IIEMM4",
    ifrancois001: "IIEEL4", 
    jvoisin004: "IIEEL4", 
    meiraudo: "IIEEL4", 
    narebiere: "IIEEL4", 
    osajid: "IIEEL4",
    thbesson: "IIEEL4", 
    jxu002: "IIEIN4", 
    atunney: "IIEIN4", 
    warzeqi002: "IIEIN4", 
    strailine: "IIEIN4", 

    // bgrolleau001: "IAERS3",
    // bgrolleau001: "IIEIN4"
  }

  if (username in DEROGATIONS) {
    data.attributes.diplome = [DEROGATIONS[username]];
  }

  const AUTHORIZED_DIPLOMAS = [
    "IIEIN3", "IIEIN4", "IIEIN5",  // Infos 
    "IIETE3", "IIETE4", "IIETE5",  // Telecom
    "IIEMM3", "IIEMM4", "IIEMM5",  // MMK
    "IIEEL3", "IIEEL4", "IIEEL5",  // Elec
    "IAERI3", "IAERI4", "IAERI5",  // R&I
    "IAESE3", "IAESE4", "IAESE5"   // SEE
  ] 

  if (!AUTHORIZED_DIPLOMAS.includes(data.attributes.diplome.join(""))) {
    return c.json(403, {
      status: "error", 
      message: "Vous n'êtes pas autorisé à vous connecter, seuls les 1A, 2A et 3A ont accès à cette application"
    })
  }

  const BUREAU_BDE = [
    // "ameunier010", "jmaulard", "jrami001", "kvaude", 
    // "lpoitau", "osajid", "smachat"    
  ]

  const BUREAU_BAE = [
    // "feck", "bgrolleau001", "mpetitdemang", 
    // "rcastellobra", "anevelesbats", "ndubuisson"
  ]

  const BDE = [
    // "acarle001", "agoncalvesp", "anevelesbats", "abaillif", "alelong003", 
    // "felmeady", "fmonange", "gbemenebata", "jvernet", "mfrancois008", 
    // "mlapalu", "prajot", "strailine", "tschnetz", "warzeqi002", 
    // "waarab", "Lbenzino", "pmocquery"
  ]

  const BAR = [
    // "lkelekemalh", "rkuhn", "mpereiraped", "mrhazza001", "ndelaere", "atunney", 
    // "mcathelin001 ", "meiraudo", "mbouchez001", "thbesson", "mgenetet",
    // "pvautrindip", "xpommies", "vmenaut", "cpalluat", "mgretener", "negloff", 
    // "rdauny", "llunet001", "alacaud", "rferrat"
  ]

  const BDA = [
    // "narebiere", "tmonseran", "groger001", "lcouteret", "gconte008", 
    // "echampagne", "lderamat", "tmenier", "gmaraninchi", "flacroix002", 
    // "mdudot001", "craynaud009", "avendrely", "znurkhanova", "dyan", 
    // "ddelpy", "thorrut", "alevalade", "mpetitdemang", "jvoisin004", 
    // "fbabin001", "wye001", "psboucher001", "lescot001", "ndacremont", 
    // "movaere"  
  ]

  const BDS = [
    // "gancey", "lobertet", "thbesson", "vcamon", "mcheron001", "ccossec", 
    // "pdelesquend", "cdubeuf001", "cdugitgros", "negloff", "amfoucher", 
    // "ifrancois001", "pjgauthey003", "alacaud", "llunet001", "tmartin016", 
    // "tmenier", "lmezailles", "polli", "vpanou003", "mapelletier", "mrhazza001", 
    // "julienrichard2", "oslangloi001", "atrandafire", "rzoudji", 
  ]

  // WARNING: Les heures sont au format UTC donc heure reel = heure + 2
  const SHOTGUN_WAVES = {
    "2025-09-05 09:00:00": ["nforest001", "thomrenard"], 
    "2025-09-15 14:50:00": BUREAU_BDE, 
    "2025-09-15 15:00:00": BDE, 
    "2025-09-15 15:30:00": BAR, 
    "2025-09-15 15:45:00": BUREAU_BAE, 
    "2025-09-15 16:00:00": [...BDA, ...BDS],
  }  

  const SHOTGUNW_DATE_FOR_OTHERS = "2025-09-15 17:00:00";

  var shotgunDate = SHOTGUNW_DATE_FOR_OTHERS;
  for (const [date, usernames] of Object.entries(SHOTGUN_WAVES)) {
    if (usernames.includes(username)) {
      shotgunDate = date;
      break;
    }
  }

  const generatePassword = () => {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  const users = arrayOf(new Record());
  $app.dao()
    .recordQuery("users")
    .where($dbx.exp("username = {:username}", {username}))
    .all(users);

  var user = null;
  if (users.length > 0) {
    // User already exist so update it
    user = users[0];
  } else {
    // Create a new user
    const userCollection = $app.dao().findCollectionByNameOrId("users");
    user = new Record(userCollection);
    user.set("username", username);
  }
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
    password, 
    diplome: data.attributes.diplome[0],
  });
})

routerAdd("GET", "/api/fillots", (c) => {
  let diploma = c.queryParam("diploma");
  if (!diploma || typeof diploma !== 'string') {
    return c.json(400, {
      status: "error", 
      message: "Requête invalide"
    });
  }

  const fillots = arrayOf(new Record());
  const fillotDiploma = diploma.slice(0, -1) + "3";

  $app.dao()
    .recordQuery("users")
    .where($dbx.exp("diploma = {:fillotDiploma}", {fillotDiploma}))
    .all(fillots);

  const fillotResponse = fillots.map(fillot => ({
    id: fillot.get("id"), 
    firstName: fillot.get("firstName"),
    lastName: fillot.get("lastName"),
    diploma: fillot.get("diploma"),
    parrain: fillot.get("parrain"), 
    infos: fillot.get("infos"),
  }));

  return c.json(200, {
    status: "success", 
    fillots: fillotResponse
  });
});

routerAdd("GET", "/api/nbFillots", (c) => {
  let id = c.queryParam("id");
  if (!id | typeof id !== 'string') {
    return c.json(400, {
      status: "error", 
      message: "Requête invalide"
    });
  }

  const fillots = arrayOf(new Record());
  $app.dao()
    .recordQuery("users") 
    .where($dbx.exp("parrain = {:id}", {id}))
    .all(fillots);

  return c.json(200, {
    status: "success", 
    nbfillots: fillots.length
  })
 
})

cronAdd("hello", "*/1 * * * *", () => {
    const config = arrayOf(new Record());
    $app.dao()
      .recordQuery("config")
      .where($dbx.exp("key = {:key}", { key: "TIME" })) 
      .all(config);

    if (config.length > 0) {
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset() * 60000; 
      const localISOTime = new Date(now - timezoneOffset).toISOString().slice(0, 19); 

      config[0].set("value", localISOTime);

      $app.dao().saveRecord(config[0]);

      console.log("La clé 'TIME' a été mise à jour avec l'heure locale actuelle:", localISOTime);
    } else {
      console.log("La clé 'TIME' n'a pas été trouvée dans la table config.");
    }
});

routerAdd("POST", "/api/adoptFillot", (c) => {
  const body = JSON.parse(readerToString(c.request().body));
  const idParrain = body.idParrain;
  const idFillot = body.idFillot;

  if (!idParrain || typeof idParrain !== 'string' || !idFillot || typeof idFillot !== 'string') {
    return c.json(400, {
      status: "error",
      message: "Requête invalide"
    });
  }

  const fillot = $app.dao().findRecordById("users", idFillot);
  const parrain = $app.dao().findRecordById("users", idParrain);

  if (!fillot || !parrain) {
    return c.json(404, {
      status: "error",
      message: "Fillot ou Parrain introuvable"
    });
  }

  if (fillot.get("parrain") !== "") {
    return c.json(400, {
      status: "error",
      message: "Ce fillot a déjà un parrain."
    });
  }

  const MAX_FILLOTS = parseInt($app.dao().findFirstRecordByData("config", "key", "MAX_FILLOTS").get("value"));

  const fillots = arrayOf(new Record());
  $app.dao().recordQuery("users").where($dbx.exp("parrain = {:idParrain}", { idParrain })).all(fillots);

  if (fillots.length >= MAX_FILLOTS) {
    return c.json(400, {
      status: "error",
      message: "Ce parrain a déjà trop de fillots."
    });
  }
  
  const now = new Date($app.dao().findFirstRecordByData("config", "key", "TIME").get("value")).toISOString();;
  const shotgunDate = new Date(parrain.get("shotgunDate").toString().replace(" ", "T")).toISOString();
  
  if (shotgunDate > now) {
    return c.json(400, {
      status: "error",
      message: "La date de shotgun n'est pas encore passée."
    })
  }

  const parrainFiliere = parrain.get("diploma").substring(0, 5);
  const fillotFiliere = fillot.get("diploma").substring(0, 5);

   if (parrainFiliere !== fillotFiliere) {
     return c.json(400, {
      status: "error",
      message: "Le parrain et le fillot ne sont pas dans la même filière."
    });
  }

  const parrainYear = parrain.get("diploma").substring(5, 6);
  if (parrainYear !== "4") {
    return c.json(400, {
      status: "error",
      message: "Seuls les 2A peuvent parrainer."
    });
  }

  fillot.set("parrain", idParrain);
  $app.dao().saveRecord(fillot);
  
  return c.json(200, {
    status: "success",
    message: `Le fillot ${fillot.get("firstname")} ${fillot.get("lastname")} a été adopté par ${parrain.get("firstname")} ${parrain.get("lastname")}.`
  });
});
