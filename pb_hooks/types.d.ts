interface BdxInpCasFailureResponse {
    serviceResponse: {
        authenticationFailure: {
            code: "INVALID_TICKET" | string;
            description: string;
        };
    };
}

/**
 * Mapping beetween LDAP entry attributes (key) and Principal's (value) :
 *
 * - username : uid
 * - nom_complet : displayName
 * - profil : eduPersonPrimaryAffiliation
 * - ecole : supannEntiteAffectationPrincipale
 * - courriel : mail
 * - mail : mail
 * - nom : sn
 * - prenom : givenName
 * - diplome : supannEtuEtape
 * - etu_id : supannEtuId
 */

interface BdxInpCasSuccessResponse {
    serviceResponse: {
        authenticationSuccess: {
            user: string;
            attributes: {
                profil: ("student" | "staff" | "faculty" | string)[];
                ecole: (BdxInpSchoolId | string)[];
                courriel: string[];
                nom: string[];
                prenom: string[];
                diplome?: string[];
            };
        };
    };
}

export type BdxInpCasResponse =
    | BdxInpCasFailureResponse
    | BdxInpCasSuccessResponse;
