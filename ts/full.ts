import {api, operation, param, requestBody} from '@loopback/rest';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by OIDC Core.
 *
 * The OpenID Connect Core 1.0 defines the core OpenID Connect functionality:
 authentication built on top of OAuth 2.0 and the use of Claims to
 communicate information about the End-User. It also describes the security
 and privacy considerations for using OpenID Connect.

 */
@api({
    components: {
        securitySchemes: {
            BasicAuth: {
                type: 'http',
                scheme: 'basic',
            },
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            openIdConnect: {
                type: 'apiKey',
                in: 'header',
                name: 'backplane-authorization',
            },
        },
    },
    paths: {},
})
export class OidcCoreController {
    constructor() {}

    /**
     * JWKS endpoint containing the public keys used by OpenID Connect Relying
     Party to verify any JWT issued by the authorization server.
     *
     * @returns A JSON object that represents a set of JWKs
     */
    @operation('get', '/release2/oidc/jwks', {
        tags: [
            'OIDC Core',
        ],
        summary: 'Get JSON Web Key Set',
        description: 'JWKS endpoint containing the public keys used by OpenID Connect Relying Party to verify any JWT issued by the authorization server.',
        responses: {
            '200': {
                description: 'A JSON object that represents a set of JWKs',
                content: {
                    'application/json': {
                        schema: {
                            title: 'JWKSet',
                            type: 'object',
                            properties: {
                                keys: {
                                    type: 'array',
                                    description: "The value of the 'keys' parameter is an array of JWK values",
                                    items: {
                                        title: 'JWK',
                                        type: 'object',
                                        properties: {
                                            kty: {
                                                type: 'string',
                                                description: "The 'kty' (key type) parameter identifies the cryptographic algorithm family used with the key, such as 'RSA' or 'EC'",
                                            },
                                            use: {
                                                type: 'string',
                                                description: "The 'use' (public key use) parameter identifies the intended use of the public key",
                                            },
                                            key_ops: {
                                                type: 'string',
                                                description: "The 'key_ops' (key operations) parameter identifies the operation(s) for which the key is intended to be used",
                                            },
                                            alg: {
                                                type: 'string',
                                                description: "The 'alg' (algorithm) parameter identifies the algorithm intended for use with the key",
                                            },
                                            kid: {
                                                type: 'string',
                                                description: "The 'kid' (key ID) parameter is used to match a specific key",
                                            },
                                            x5u: {
                                                type: 'string',
                                                description: "The 'x5u' (X.509 URL) parameter is a URI [RFC3986] that refers to a resource for an X.509 public key certificate or certificate chain [RFC5280]",
                                            },
                                            x5c: {
                                                type: 'string',
                                                description: "The 'x5c' (X.509 certificate chain) parameter contains a chain of one or more PKIX certificates [RFC5280]",
                                            },
                                            x5t: {
                                                type: 'string',
                                                description: "The 'x5t' (X.509 certificate SHA-1 thumbprint) parameter is a base64url-encoded SHA-1 thumbprint (a.k.a. digest) of the DER encoding of an X.509 certificate [RFC5280]",
                                            },
                                            'x5t#S256': {
                                                type: 'string',
                                                description: "The 'x5t#S256' (X.509 certificate SHA-256 thumbprint) parameter is a base64url-encoded SHA-256 thumbprint (a.k.a. digest) of the DER encoding of an X.509 certificate [RFC5280]",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        operationId: 'getRelease2OidcJwks',
    })
    async getRelease2OidcJwks(): Promise<{
        keys?: {
            kty?: string;
            use?: string;
            key_ops?: string;
            alg?: string;
            kid?: string;
            x5u?: string;
            x5c?: string;
            x5t?: string;
            'x5t#S256'?: string;
        }[];
    }> {
        throw new Error('Not implemented');
    }

    /**
     *
     *
     * @param scope REQUIRED. A space-separated list of identity claims to request
     from the end-user.

     OpenID Connect requests MUST contain the `openid` scope value.

     If the openid scope value is not present, the behavior is entirely
     unspecified.

     Other scope values MAY be present. Scope values used that are not understood
     by an implementation SHOULD be ignored.

     * @param response_type REQUIRED. OAuth 2.0 Response Type value that determines
     the authorization processing flow to be used, including what parameters are
     returned from the endpoints used. When using the Authorization Code Flow,
     this value is code.
     * @param client_id OAuth 2.0 Client Identifier valid at the Authorization
     Server.
     * @param redirect_uri REQUIRED. Redirection URI to which the response will be
     sent. This URI MUST exactly match one of the Redirection URI values for the
     Client pre-registered at the OpenID Provider, with the matching performed as
     described in Section 6.2.1 of [RFC3986] (Simple String Comparison). When
     using this flow, the Redirection URI SHOULD use the https scheme; however,
     it MAY use the http scheme, provided that the Client Type is confidential,
     as defined in Section 2.1 of OAuth 2.0, and provided the OP allows the use
     of http Redirection URIs in this case. The Redirection URI MAY use an
     alternate scheme, such as one that is intended to identify a callback into a
     native application
     * @param state RECOMMENDED. Opaque value used to maintain state between the
     request and the callback. Typically, Cross-Site Request Forgery (CSRF, XSRF)
     mitigation is done by cryptographically binding the value of this parameter
     with a browser cookie.
     * @param code_challenge A code challenge derived from the code verifier by
     using one of the following transformations described in the
     code_challenge_method.

     REQUIRED if using ACG with PKCE extension

     It is RECOMMENDED that the output of a suitable random number generator be
     used to create a 32-octet sequence. The octet sequence is then
     base64url-encoded to produce a 43-octet URL safe string to use as the code
     verifier.

     Example code (node.js):
     ```javascript
     const base64url = require('base64url')
     const crypto = require('crypto')
     const codeVerifierBuf = crypto.randomBytes(32)
     const codeVerifier = base64url.encode(codeVerifierBuf)
     console.log(codeVerifier)
     const hash = crypto.createHash('sha256')
     .update(codeVerifier)
     .digest();
     const codeChallenge = base64url.encode(hash)
     console.log(codeChallenge)
     ```

     * @param code_challenge_method REQUIRED if using ACG+PKCE
     - 'plain' code_challenge = code_verifier
     - 'S256' code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))

     * @param response_mode OPTIONAL. Informs the Authorization Server of the
     mechanism to be used for returning parameters from the Authorization
     Endpoint. This use of this parameter is NOT RECOMMENDED when the Response
     Mode that would be requested is the default mode specified for the Response
     Type.
     * @param nonce OPTIONAL. String value used to associate a Client session with
     an ID Token, and to mitigate replay attacks. The value is passed through
     unmodified from the Authentication Request to the ID Token. Sufficient
     entropy MUST be present in the `nonce` values used to prevent attackers from
     guessing values. For implementation notes, see Section 15.5.2.
     * @param display OPTIONAL. ASCII string value that specifies how the
     Authorization Server displays the authentication and consent user interface
     pages to the End-User. The defined values are:
     - `page` The Authorization Server SHOULD display the authentication and
     consent UI consistent with a full User Agent page view. If the display
     parameter is not specified, this is the default display mode.
     - `popup` The Authorization Server SHOULD display the authentication and
     consent UI consistent with a popup User Agent window. The popup User Agent
     window should be of an appropriate size for a login-focused dialog and
     should not obscure the entire window that it is popping up over.
     - `touch` The Authorization Server SHOULD display the authentication and
     consent UI consistent with a device that leverages a touch interface.
     - `wap` The Authorization Server SHOULD display the authentication and
     consent UI consistent with a 'feature phone' type display.

     The Authorization Server MAY also attempt to detect the capabilities of the
     User Agent and present an appropriate display.

     * @param prompt OPTIONAL. Space delimited, case sensitive list of ASCII string
     values that specifies whether the Authorization Server prompts the End-User
     for reauthentication and consent. The defined values are:
     - `none` The Authorization Server MUST NOT display any authentication or
     consent user interface pages. An error is returned if an End-User is not
     already authenticated or the Client does not have pre-configured consent for
     the requested Claims or does not fulfill other conditions for processing the
     request. The error code will typically be `login_required`,
     `interaction_required`, or another code defined in Section 3.1.2.6. This can
     be used as a method to check for existing authentication and/or consent.
     - `login` The Authorization Server SHOULD prompt the End-User for
     reauthentication. If it cannot reauthenticate the End-User, it MUST return
     an error, typically `login_required`.
     - `consent` The Authorization Server SHOULD prompt the End-User for consent
     before returning information to the Client. If it cannot obtain consent, it
     MUST return an error, typically `consent_required`.
     - `select_account` The Authorization Server SHOULD prompt the End-User to
     select a user account. This enables an End-User who has multiple accounts at
     the Authorization Server to select amongst the multiple accounts that they
     might have current sessions for. If it cannot obtain an account selection
     choice made by the End-User, it MUST return an error, typically
     `account_selection_required`.

     The `prompt` parameter can be used by the Client to make sure that the
     End-User is still present for the current session or to bring attention to
     the request. If this parameter contains `none` with any other value, an
     error is returned.

     * @param max_age OPTIONAL. Maximum Authentication Age. Specifies the allowable
     elapsed time in seconds since the last time the End-User was actively
     authenticated by the OP. If the elapsed time is greater than this value, the
     OP MUST attempt to actively re-authenticate the End-User. (The `max_age`
     request parameter corresponds to the OpenID 2.0 PAPE [OpenID.PAPE]
     `max_auth_age` request parameter.) When `max_age` is used, the ID Token
     returned MUST include an `auth_time` Claim Value.
     * @param ui_locales OPTIONAL. End-User's preferred languages and scripts for
     the user interface, represented as a space-separated list of BCP47 [RFC5646]
     language tag values, ordered by preference. For instance, the value 'fr-CA
     fr en' represents a preference for French as spoken in Canada, then French
     (without a region designation), followed by English (without a region
     designation). An error SHOULD NOT result if some or all of the requested
     locales are not supported by the OpenID Provider.
     * @param id_token_hint OPTIONAL. ID Token previously issued by the
     Authorization Server being passed as a hint about the End-User's current or
     past authenticated session with the Client. If the End-User identified by
     the ID Token is logged in or is logged in by the request, then the
     Authorization Server returns a positive response; otherwise, it SHOULD
     return an error, such as `login_required`. When possible, an `id_token_hint`
     SHOULD be present when `prompt=none` is used and an `invalid_request` error
     MAY be returned if it is not; however, the server SHOULD respond
     successfully when possible, even if it is not present. The Authorization
     Server need not be listed as an audience of the ID Token when it is used as
     an `id_token_hint` value.

     If the ID Token received by the RP from the OP is encrypted, to use it as an
     `id_token_hint`, the Client MUST decrypt the signed ID Token contained
     within the encrypted ID Token. The Client MAY re-encrypt the signed ID token
     to the Authentication Server using a key that enables the server to decrypt
     the ID Token, and use the re-encrypted ID token as the `id_token_hint`
     value.

     * @param login_hint OPTIONAL. Hint to the Authorization Server about the login
     identifier the End-User might use to log in (if necessary). This hint can be
     used by an RP if it first asks the End-User for their e-mail address (or
     other identifier) and then wants to pass that value as a hint to the
     discovered authorization service. It is RECOMMENDED that the hint value
     match the value used for discovery. This value MAY also be a phone number in
     the format specified for the `phone_number` Claim. The use of this parameter
     is left to the OP's discretion.
     * @param acr_values OPTIONAL. Requested Authentication Context Class Reference
     values. Space-separated string that specifies the `acr` values that the
     Authorization Server is being requested to use for processing this
     Authentication Request, with the values appearing in order of preference.
     The Authentication Context Class satisfied by the authentication performed
     is returned as the `acr` Claim Value, as specified in Section 2. The `acr`
     Claim is requested as a Voluntary Claim by this parameter.
     */
    @operation('get', '/release2/oidc/auth', {
        summary: 'request authorization code',
        operationId: 'authorizationCode',
        tags: [
            'OIDC Core',
        ],
        parameters: [
            {
                name: 'scope',
                in: 'query',
                description: 'REQUIRED. A space-separated list of identity claims to request from the end-user.\n\nOpenID Connect requests MUST contain the `openid` scope value.\n\nIf the openid scope value is not present, the behavior is entirely unspecified.\n\nOther scope values MAY be present. Scope values used that are not understood by an implementation SHOULD be ignored.\n',
                required: true,
                schema: {
                    type: 'string',
                },
                example: 'openid',
            },
            {
                name: 'response_type',
                in: 'query',
                description: 'REQUIRED. OAuth 2.0 Response Type value that determines the authorization processing flow to be used, including what parameters are returned from the endpoints used. When using the Authorization Code Flow, this value is code.',
                required: true,
                schema: {
                    type: 'string',
                    enum: [
                        'code',
                    ],
                },
            },
            {
                name: 'client_id',
                in: 'query',
                description: 'OAuth 2.0 Client Identifier valid at the Authorization Server.',
                required: true,
                schema: {
                    type: 'string',
                },
                example: 'oidcRpAcg_SpaNativeApps',
            },
            {
                name: 'redirect_uri',
                in: 'query',
                description: 'REQUIRED. Redirection URI to which the response will be sent. This URI MUST exactly match one of the Redirection URI values for the Client pre-registered at the OpenID Provider, with the matching performed as described in Section 6.2.1 of [RFC3986] (Simple String Comparison). When using this flow, the Redirection URI SHOULD use the https scheme; however, it MAY use the http scheme, provided that the Client Type is confidential, as defined in Section 2.1 of OAuth 2.0, and provided the OP allows the use of http Redirection URIs in this case. The Redirection URI MAY use an alternate scheme, such as one that is intended to identify a callback into a native application',
                required: true,
                schema: {
                    type: 'string',
                    format: 'uri',
                    example: 'http://localhost:3001/oidc/cb',
                },
            },
            {
                name: 'state',
                in: 'query',
                description: 'RECOMMENDED. Opaque value used to maintain state between the request and the callback. Typically, Cross-Site Request Forgery (CSRF, XSRF) mitigation is done by cryptographically binding the value of this parameter with a browser cookie.',
                required: false,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'code_challenge',
                in: 'query',
                description: "A code challenge derived from the code verifier by using one of the following transformations described in the code_challenge_method.\n\nREQUIRED if using ACG with PKCE extension\n\nIt is RECOMMENDED that the output of a suitable random number generator be used to create a 32-octet sequence. The octet sequence is then base64url-encoded to produce a 43-octet URL safe string to use as the code verifier.\n\nExample code (node.js):\n```javascript\nconst base64url = require('base64url')\nconst crypto = require('crypto')\nconst codeVerifierBuf = crypto.randomBytes(32)\nconst codeVerifier = base64url.encode(codeVerifierBuf)\nconsole.log(codeVerifier)\nconst hash = crypto.createHash('sha256')\n            .update(codeVerifier)\n            .digest();\nconst codeChallenge = base64url.encode(hash)\nconsole.log(codeChallenge)\n```\n",
                required: false,
                schema: {
                    maxLength: 128,
                    minLength: 43,
                    pattern: '^[A-Za-z0-9\\-._~]{43,128}$',
                    type: 'string',
                },
                example: 'FL_DFs6V30KSJAIq7h_LsAttGYAplaYGdFUkGeN54EE',
            },
            {
                name: 'code_challenge_method',
                in: 'query',
                description: "REQUIRED if using ACG+PKCE\n- 'plain' code_challenge = code_verifier\n- 'S256' code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))\n",
                required: false,
                schema: {
                    type: 'string',
                    default: 'S256',
                    enum: [
                        'S256',
                        'plain',
                    ],
                },
            },
            {
                name: 'response_mode',
                in: 'query',
                description: 'OPTIONAL. Informs the Authorization Server of the mechanism to be used for returning parameters from the Authorization Endpoint. This use of this parameter is NOT RECOMMENDED when the Response Mode that would be requested is the default mode specified for the Response Type.',
                required: false,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'nonce',
                in: 'query',
                description: 'OPTIONAL. String value used to associate a Client session with an ID Token, and to mitigate replay attacks. The value is passed through unmodified from the Authentication Request to the ID Token. Sufficient entropy MUST be present in the `nonce` values used to prevent attackers from guessing values. For implementation notes, see Section 15.5.2.',
                required: false,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'display',
                in: 'query',
                description: "OPTIONAL. ASCII string value that specifies how the Authorization Server displays the authentication and consent user interface pages to the End-User. The defined values are:\n- `page` The Authorization Server SHOULD display the authentication and consent UI consistent with a full User Agent page view. If the display parameter is not specified, this is the default display mode.\n- `popup` The Authorization Server SHOULD display the authentication and consent UI consistent with a popup User Agent window. The popup User Agent window should be of an appropriate size for a login-focused dialog and should not obscure the entire window that it is popping up over.\n- `touch` The Authorization Server SHOULD display the authentication and consent UI consistent with a device that leverages a touch interface.\n- `wap` The Authorization Server SHOULD display the authentication and consent UI consistent with a 'feature phone' type display.\n\nThe Authorization Server MAY also attempt to detect the capabilities of the User Agent and present an appropriate display.\n",
                required: false,
                schema: {
                    type: 'string',
                    default: 'page',
                    enum: [
                        'page',
                        'popup',
                        'touch',
                        'wap',
                    ],
                },
            },
            {
                name: 'prompt',
                in: 'query',
                description: 'OPTIONAL. Space delimited, case sensitive list of ASCII string values that specifies whether the Authorization Server prompts the End-User for reauthentication and consent. The defined values are:\n- `none` The Authorization Server MUST NOT display any authentication or consent user interface pages. An error is returned if an End-User is not already authenticated or the Client does not have pre-configured consent for the requested Claims or does not fulfill other conditions for processing the request. The error code will typically be `login_required`, `interaction_required`, or another code defined in Section 3.1.2.6. This can be used as a method to check for existing authentication and/or consent.\n- `login` The Authorization Server SHOULD prompt the End-User for reauthentication. If it cannot reauthenticate the End-User, it MUST return an error, typically `login_required`.\n- `consent` The Authorization Server SHOULD prompt the End-User for consent before returning information to the Client. If it cannot obtain consent, it MUST return an error, typically `consent_required`.\n- `select_account` The Authorization Server SHOULD prompt the End-User to select a user account. This enables an End-User who has multiple accounts at the Authorization Server to select amongst the multiple accounts that they might have current sessions for. If it cannot obtain an account selection choice made by the End-User, it MUST return an error, typically `account_selection_required`.\n\nThe `prompt` parameter can be used by the Client to make sure that the End-User is still present for the current session or to bring attention to the request. If this parameter contains `none` with any other value, an error is returned.\n',
                required: false,
                schema: {
                    type: 'string',
                    enum: [
                        'none',
                        'login',
                        'consent',
                        'select_account',
                    ],
                },
            },
            {
                name: 'max_age',
                in: 'query',
                description: 'OPTIONAL. Maximum Authentication Age. Specifies the allowable elapsed time in seconds since the last time the End-User was actively authenticated by the OP. If the elapsed time is greater than this value, the OP MUST attempt to actively re-authenticate the End-User. (The `max_age` request parameter corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] `max_auth_age` request parameter.) When `max_age` is used, the ID Token returned MUST include an `auth_time` Claim Value.',
                required: false,
                schema: {
                    type: 'number',
                },
            },
            {
                name: 'ui_locales',
                in: 'query',
                description: "OPTIONAL. End-User's preferred languages and scripts for the user interface, represented as a space-separated list of BCP47 [RFC5646] language tag values, ordered by preference. For instance, the value 'fr-CA fr en' represents a preference for French as spoken in Canada, then French (without a region designation), followed by English (without a region designation). An error SHOULD NOT result if some or all of the requested locales are not supported by the OpenID Provider.",
                required: false,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'id_token_hint',
                in: 'query',
                description: "OPTIONAL. ID Token previously issued by the Authorization Server being passed as a hint about the End-User's current or past authenticated session with the Client. If the End-User identified by the ID Token is logged in or is logged in by the request, then the Authorization Server returns a positive response; otherwise, it SHOULD return an error, such as `login_required`. When possible, an `id_token_hint` SHOULD be present when `prompt=none` is used and an `invalid_request` error MAY be returned if it is not; however, the server SHOULD respond successfully when possible, even if it is not present. The Authorization Server need not be listed as an audience of the ID Token when it is used as an `id_token_hint` value.\n\nIf the ID Token received by the RP from the OP is encrypted, to use it as an `id_token_hint`, the Client MUST decrypt the signed ID Token contained within the encrypted ID Token. The Client MAY re-encrypt the signed ID token to the Authentication Server using a key that enables the server to decrypt the ID Token, and use the re-encrypted ID token as the `id_token_hint` value.\n",
                required: false,
                schema: {
                    pattern: '^(([A-Za-z0-9\\-_])+\\.)([A-Za-z0-9\\-_]+)(\\.([A-Za-z0-9\\-_]+))?$',
                    type: 'string',
                },
            },
            {
                name: 'login_hint',
                in: 'query',
                description: "OPTIONAL. Hint to the Authorization Server about the login identifier the End-User might use to log in (if necessary). This hint can be used by an RP if it first asks the End-User for their e-mail address (or other identifier) and then wants to pass that value as a hint to the discovered authorization service. It is RECOMMENDED that the hint value match the value used for discovery. This value MAY also be a phone number in the format specified for the `phone_number` Claim. The use of this parameter is left to the OP's discretion.",
                required: false,
                schema: {
                    type: 'string',
                },
            },
            {
                name: 'acr_values',
                in: 'query',
                description: 'OPTIONAL. Requested Authentication Context Class Reference values. Space-separated string that specifies the `acr` values that the Authorization Server is being requested to use for processing this Authentication Request, with the values appearing in order of preference. The Authentication Context Class satisfied by the authentication performed is returned as the `acr` Claim Value, as specified in Section 2. The `acr` Claim is requested as a Voluntary Claim by this parameter.',
                required: false,
                schema: {
                    type: 'string',
                },
            },
        ],
        responses: {
            '302': {
                description: 'Redirect the user to perform the authentication or redirect to callback_uri with code or error',
                headers: {
                    Location: {
                        description: 'either an AuthenticationRedirect or an AuthorizationResponseRedirect or an AuthorizationErrorRedirect (look at the schemas for more details)',
                        schema: {
                            type: 'string',
                            format: 'uri',
                        },
                        example: 'https://client.example.com/cb?code=SplxlOBeZQQYbYS6WxSbIA&state=xyz',
                    },
                },
            },
        },
    })
    async authorizationCode(@param({
        name: 'scope',
        in: 'query',
        description: 'REQUIRED. A space-separated list of identity claims to request from the end-user.\n\nOpenID Connect requests MUST contain the `openid` scope value.\n\nIf the openid scope value is not present, the behavior is entirely unspecified.\n\nOther scope values MAY be present. Scope values used that are not understood by an implementation SHOULD be ignored.\n',
        required: true,
        schema: {
            type: 'string',
        },
        example: 'openid',
    }) scope: string, @param({
        name: 'response_type',
        in: 'query',
        description: 'REQUIRED. OAuth 2.0 Response Type value that determines the authorization processing flow to be used, including what parameters are returned from the endpoints used. When using the Authorization Code Flow, this value is code.',
        required: true,
        schema: {
            type: 'string',
            enum: [
                'code',
            ],
        },
    }) response_type: 'code', @param({
        name: 'client_id',
        in: 'query',
        description: 'OAuth 2.0 Client Identifier valid at the Authorization Server.',
        required: true,
        schema: {
            type: 'string',
        },
        example: 'oidcRpAcg_SpaNativeApps',
    }) client_id: string, @param({
        name: 'redirect_uri',
        in: 'query',
        description: 'REQUIRED. Redirection URI to which the response will be sent. This URI MUST exactly match one of the Redirection URI values for the Client pre-registered at the OpenID Provider, with the matching performed as described in Section 6.2.1 of [RFC3986] (Simple String Comparison). When using this flow, the Redirection URI SHOULD use the https scheme; however, it MAY use the http scheme, provided that the Client Type is confidential, as defined in Section 2.1 of OAuth 2.0, and provided the OP allows the use of http Redirection URIs in this case. The Redirection URI MAY use an alternate scheme, such as one that is intended to identify a callback into a native application',
        required: true,
        schema: {
            type: 'string',
            format: 'uri',
            example: 'http://localhost:3001/oidc/cb',
        },
    }) redirect_uri: string, @param({
        name: 'state',
        in: 'query',
        description: 'RECOMMENDED. Opaque value used to maintain state between the request and the callback. Typically, Cross-Site Request Forgery (CSRF, XSRF) mitigation is done by cryptographically binding the value of this parameter with a browser cookie.',
        required: false,
        schema: {
            type: 'string',
        },
    }) state: string | undefined, @param({
        name: 'code_challenge',
        in: 'query',
        description: "A code challenge derived from the code verifier by using one of the following transformations described in the code_challenge_method.\n\nREQUIRED if using ACG with PKCE extension\n\nIt is RECOMMENDED that the output of a suitable random number generator be used to create a 32-octet sequence. The octet sequence is then base64url-encoded to produce a 43-octet URL safe string to use as the code verifier.\n\nExample code (node.js):\n```javascript\nconst base64url = require('base64url')\nconst crypto = require('crypto')\nconst codeVerifierBuf = crypto.randomBytes(32)\nconst codeVerifier = base64url.encode(codeVerifierBuf)\nconsole.log(codeVerifier)\nconst hash = crypto.createHash('sha256')\n            .update(codeVerifier)\n            .digest();\nconst codeChallenge = base64url.encode(hash)\nconsole.log(codeChallenge)\n```\n",
        required: false,
        schema: {
            maxLength: 128,
            minLength: 43,
            pattern: '^[A-Za-z0-9\\-._~]{43,128}$',
            type: 'string',
        },
        example: 'FL_DFs6V30KSJAIq7h_LsAttGYAplaYGdFUkGeN54EE',
    }) code_challenge: string | undefined, @param({
        name: 'code_challenge_method',
        in: 'query',
        description: "REQUIRED if using ACG+PKCE\n- 'plain' code_challenge = code_verifier\n- 'S256' code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))\n",
        required: false,
        schema: {
            type: 'string',
            default: 'S256',
            enum: [
                'S256',
                'plain',
            ],
        },
    }) code_challenge_method: 'S256' | 'plain' | undefined, @param({
        name: 'response_mode',
        in: 'query',
        description: 'OPTIONAL. Informs the Authorization Server of the mechanism to be used for returning parameters from the Authorization Endpoint. This use of this parameter is NOT RECOMMENDED when the Response Mode that would be requested is the default mode specified for the Response Type.',
        required: false,
        schema: {
            type: 'string',
        },
    }) response_mode: string | undefined, @param({
        name: 'nonce',
        in: 'query',
        description: 'OPTIONAL. String value used to associate a Client session with an ID Token, and to mitigate replay attacks. The value is passed through unmodified from the Authentication Request to the ID Token. Sufficient entropy MUST be present in the `nonce` values used to prevent attackers from guessing values. For implementation notes, see Section 15.5.2.',
        required: false,
        schema: {
            type: 'string',
        },
    }) nonce: string | undefined, @param({
        name: 'display',
        in: 'query',
        description: "OPTIONAL. ASCII string value that specifies how the Authorization Server displays the authentication and consent user interface pages to the End-User. The defined values are:\n- `page` The Authorization Server SHOULD display the authentication and consent UI consistent with a full User Agent page view. If the display parameter is not specified, this is the default display mode.\n- `popup` The Authorization Server SHOULD display the authentication and consent UI consistent with a popup User Agent window. The popup User Agent window should be of an appropriate size for a login-focused dialog and should not obscure the entire window that it is popping up over.\n- `touch` The Authorization Server SHOULD display the authentication and consent UI consistent with a device that leverages a touch interface.\n- `wap` The Authorization Server SHOULD display the authentication and consent UI consistent with a 'feature phone' type display.\n\nThe Authorization Server MAY also attempt to detect the capabilities of the User Agent and present an appropriate display.\n",
        required: false,
        schema: {
            type: 'string',
            default: 'page',
            enum: [
                'page',
                'popup',
                'touch',
                'wap',
            ],
        },
    }) display: 'page' | 'popup' | 'touch' | 'wap' | undefined, @param({
        name: 'prompt',
        in: 'query',
        description: 'OPTIONAL. Space delimited, case sensitive list of ASCII string values that specifies whether the Authorization Server prompts the End-User for reauthentication and consent. The defined values are:\n- `none` The Authorization Server MUST NOT display any authentication or consent user interface pages. An error is returned if an End-User is not already authenticated or the Client does not have pre-configured consent for the requested Claims or does not fulfill other conditions for processing the request. The error code will typically be `login_required`, `interaction_required`, or another code defined in Section 3.1.2.6. This can be used as a method to check for existing authentication and/or consent.\n- `login` The Authorization Server SHOULD prompt the End-User for reauthentication. If it cannot reauthenticate the End-User, it MUST return an error, typically `login_required`.\n- `consent` The Authorization Server SHOULD prompt the End-User for consent before returning information to the Client. If it cannot obtain consent, it MUST return an error, typically `consent_required`.\n- `select_account` The Authorization Server SHOULD prompt the End-User to select a user account. This enables an End-User who has multiple accounts at the Authorization Server to select amongst the multiple accounts that they might have current sessions for. If it cannot obtain an account selection choice made by the End-User, it MUST return an error, typically `account_selection_required`.\n\nThe `prompt` parameter can be used by the Client to make sure that the End-User is still present for the current session or to bring attention to the request. If this parameter contains `none` with any other value, an error is returned.\n',
        required: false,
        schema: {
            type: 'string',
            enum: [
                'none',
                'login',
                'consent',
                'select_account',
            ],
        },
    }) prompt: 'none' | 'login' | 'consent' | 'select_account' | undefined, @param({
        name: 'max_age',
        in: 'query',
        description: 'OPTIONAL. Maximum Authentication Age. Specifies the allowable elapsed time in seconds since the last time the End-User was actively authenticated by the OP. If the elapsed time is greater than this value, the OP MUST attempt to actively re-authenticate the End-User. (The `max_age` request parameter corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] `max_auth_age` request parameter.) When `max_age` is used, the ID Token returned MUST include an `auth_time` Claim Value.',
        required: false,
        schema: {
            type: 'number',
        },
    }) max_age: number | undefined, @param({
        name: 'ui_locales',
        in: 'query',
        description: "OPTIONAL. End-User's preferred languages and scripts for the user interface, represented as a space-separated list of BCP47 [RFC5646] language tag values, ordered by preference. For instance, the value 'fr-CA fr en' represents a preference for French as spoken in Canada, then French (without a region designation), followed by English (without a region designation). An error SHOULD NOT result if some or all of the requested locales are not supported by the OpenID Provider.",
        required: false,
        schema: {
            type: 'string',
        },
    }) ui_locales: string | undefined, @param({
        name: 'id_token_hint',
        in: 'query',
        description: "OPTIONAL. ID Token previously issued by the Authorization Server being passed as a hint about the End-User's current or past authenticated session with the Client. If the End-User identified by the ID Token is logged in or is logged in by the request, then the Authorization Server returns a positive response; otherwise, it SHOULD return an error, such as `login_required`. When possible, an `id_token_hint` SHOULD be present when `prompt=none` is used and an `invalid_request` error MAY be returned if it is not; however, the server SHOULD respond successfully when possible, even if it is not present. The Authorization Server need not be listed as an audience of the ID Token when it is used as an `id_token_hint` value.\n\nIf the ID Token received by the RP from the OP is encrypted, to use it as an `id_token_hint`, the Client MUST decrypt the signed ID Token contained within the encrypted ID Token. The Client MAY re-encrypt the signed ID token to the Authentication Server using a key that enables the server to decrypt the ID Token, and use the re-encrypted ID token as the `id_token_hint` value.\n",
        required: false,
        schema: {
            pattern: '^(([A-Za-z0-9\\-_])+\\.)([A-Za-z0-9\\-_]+)(\\.([A-Za-z0-9\\-_]+))?$',
            type: 'string',
        },
    }) id_token_hint: string | undefined, @param({
        name: 'login_hint',
        in: 'query',
        description: "OPTIONAL. Hint to the Authorization Server about the login identifier the End-User might use to log in (if necessary). This hint can be used by an RP if it first asks the End-User for their e-mail address (or other identifier) and then wants to pass that value as a hint to the discovered authorization service. It is RECOMMENDED that the hint value match the value used for discovery. This value MAY also be a phone number in the format specified for the `phone_number` Claim. The use of this parameter is left to the OP's discretion.",
        required: false,
        schema: {
            type: 'string',
        },
    }) login_hint: string | undefined, @param({
        name: 'acr_values',
        in: 'query',
        description: 'OPTIONAL. Requested Authentication Context Class Reference values. Space-separated string that specifies the `acr` values that the Authorization Server is being requested to use for processing this Authentication Request, with the values appearing in order of preference. The Authentication Context Class satisfied by the authentication performed is returned as the `acr` Claim Value, as specified in Section 2. The `acr` Claim is requested as a Voluntary Claim by this parameter.',
        required: false,
        schema: {
            type: 'string',
        },
    }) acr_values: string | undefined): Promise<unknown> {
        throw new Error('Not implemented');
    }

    /**
     * The token endpoint is used by the native app or spa to obtain an access
     token and an id token by presenting its authorization grant (and code
     verifier if PKCE) or a refresh token. If not using PKCE authentication is
     REQUIRED.
     *
     * @param backplaneAuthorization
     * @param backplaneToken
     * @param _requestBody The authorization grant and the code verifier
     * @returns the access token and id token
     */
    @operation('post', '/release2/oidc/token', {
        tags: [
            'OIDC Core',
        ],
        summary: 'request access token and id token with authorization code or refresh token',
        description: 'The token endpoint is used by the native app or spa to obtain an access token and an id token by presenting its authorization grant (and code verifier if PKCE) or a refresh token. If not using PKCE authentication is REQUIRED.',
        operationId: 'accessToken',
        requestBody: {
            description: 'The authorization grant and the code verifier',
            content: {
                'application/x-www-form-urlencoded': {
                    schema: {
                        title: 'AccessTokenRequest',
                        type: 'object',
                        properties: {
                            grant_type: {
                                type: 'string',
                                description: 'Allowed values are:\n- `authorization_code` when requesting access and id tokens with an authorization code.\n- `refresh_token` when requesting access tokens with a refresh token.\n',
                                example: 'authorization_code',
                                enum: [
                                    'authorization_code',
                                    'refresh_token',
                                ],
                            },
                            code: {
                                pattern: '^[A-Za-z0-9\\-._~]{43,128}$',
                                type: 'string',
                                description: 'The authorization code received from the authorization server.\n\nREQUIRED if `grant_type` is `authorization_code`; IGNORED otherwise.\n',
                                example: 'FL_DFs6V30KSJAIq7h_LsAttGYAplaYGdFUkGeN54EE',
                            },
                            redirect_uri: {
                                type: 'string',
                                description: 'REQUIRED, if the `redirect_uri` parameter was included in the authorization request and their values MUST be identical.',
                                format: 'uri',
                                example: 'http://localhost:3001/oidc/cb',
                            },
                            client_id: {
                                type: 'string',
                                description: 'the registered client id.\n\nREQUIRED, if the client is not authenticating with the authorization server (e.g. when using PKCE)\n',
                                example: 'oidcRpAcg_SpaNativeApps',
                            },
                            code_verifier: {
                                maxLength: 128,
                                minLength: 43,
                                pattern: '^[A-Za-z0-9\\-._~]{43,128}$',
                                type: 'string',
                                description: "high-entropy cryptographic random STRING using the unreserved characters [A-Z] / [a-z] / [0-9] / '-' / '.' / '_' / '~' from Section 2.3 of [RFC3986], with a minimum length of 43 characters and a maximum length of 128 characters.\n\nREQUIRED if using the PCKE extension.\n",
                                example: 'EbWPr9dknKvBDg8r8zRroG82bFZaSqSWeCKjvj_AI1w',
                            },
                            refresh_token: {
                                type: 'string',
                                description: 'The refresh token issued to the client.\n\nREQUIRED if `grant_type` is `refresh_token`; IGNORED otherwise.\n',
                            },
                            scope: {
                                type: 'string',
                                description: 'OPTIONAL if `grant_type` is `refresh_token`; IGNORED otherwise.\n\nThe scope of the access request.  The requested scope MUST NOT include any scope not originally granted by the resource owner, and if omitted is treated as equal to the scope originally granted by the resource owner.\n',
                            },
                        },
                        required: [
                            'grant_type',
                        ],
                        example: 'POST /token HTTP/1.1\n\nHost: server.example.com\n\nContent-Type: application/x-www-form-urlencoded\n\nAuthorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW\n\ngrant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb\n',
                    },
                },
            },
            required: true,
        },
        responses: {
            '200': {
                description: 'the access token and id token',
                headers: {
                    'Cache-Control': {
                        description: 'no-store',
                        style: 'simple',
                        explode: false,
                        schema: {
                            type: 'string',
                            enum: [
                                'no-store',
                            ],
                        },
                    },
                    Pragma: {
                        description: 'no-cache',
                        style: 'simple',
                        explode: false,
                        schema: {
                            type: 'string',
                            enum: [
                                'no-cache',
                            ],
                        },
                    },
                },
                content: {
                    'application/json': {
                        schema: {
                            title: 'AccessTokenSuccessfulResponse',
                            type: 'object',
                            properties: {
                                access_token: {
                                    type: 'string',
                                    description: 'The access token issued by the authorization server',
                                },
                                token_type: {
                                    type: 'string',
                                    description: 'The type of the token issued. Value is case insensitive. The access token type provides the client with the information required to successfully utilize the access token to make a protected resource request (along with type-specific attributes).  The client MUST NOT use an access token if it does not understand the token type.\n\nThe OAuth 2.0 token_type response parameter value MUST be Bearer, as specified in OAuth 2.0 Bearer Token Usage [RFC6750], unless another Token Type has been negotiated with the Client. Servers SHOULD support the Bearer Token Type; use of other Token Types is outside the scope of this specification.\n',
                                    example: 'bearer',
                                },
                                expires_in: {
                                    minimum: 1,
                                    type: 'integer',
                                    description: "The lifetime in seconds of the access token.  For example, the value '3600' denotes that the access token will expire in one hour from the time the response was generated. If omitted, the authorization server SHOULD provide the expiration time via other means or document the default value.",
                                    example: 60,
                                },
                                refresh_token: {
                                    type: 'string',
                                    description: 'The refresh token, which can be used to obtain new access tokens using the same authorization grant',
                                },
                                scope: {
                                    type: 'string',
                                    description: 'The scope of the access token. OPTIONAL, if identical to the scope requested by the client; otherwise, REQUIRED.',
                                },
                                id_token: {
                                    type: 'string',
                                    description: 'ID Token value associated with the authenticated session. The ID Token is represented as a JSON Web Token (JWT)',
                                    format: '^(([A-Za-z0-9\\-_])+\\.)([A-Za-z0-9\\-_]+)(\\.([A-Za-z0-9\\-_]+))?$',
                                },
                            },
                            required: [
                                'access_token',
                                'id_token',
                                'token_type',
                            ],
                        },
                    },
                },
            },
            '400': {
                description: 'missing or invalid mandatory parameters',
                content: {
                    'application/json': {
                        schema: {
                            title: 'AccessTokenErrorResponse',
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    description: "A single ASCII [USASCII] error code from the following:\n- `invalid_request` The request is missing a required parameter, includes an unsupported parameter value (other than grant type), repeats a parameter, includes multiple credentials, utilizes more than one mechanism for authenticating the client, or is otherwise malformed.\n- `invalid_client` Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method).  The authorization server MAY return an HTTP 401 (Unauthorized) status code to indicate which HTTP authentication schemes are supported.  If the client attempted to authenticate via the 'Authorization' request header field, the authorization server MUST respond with an HTTP 401 (Unauthorized) status code and include the 'WWW-Authenticate' response header field matching the authentication scheme used by the client.\n- `invalid_grant` The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.\n- `unauthorized_client` The authenticated client is not authorized to use this authorization grant type.\n- `unsupported_grant_type` The authorization grant type is not supported by the authorization server.\n- `invalid_scope` The requested scope is invalid, unknown, malformed, or exceeds the scope granted by the resource owner.\n",
                                    enum: [
                                        'invalid_request',
                                        'invalid_client',
                                        'invalid_grant',
                                        'unauthorized_client',
                                        'unsupported_grant_type',
                                        'invalid_scope',
                                    ],
                                },
                                error_description: {
                                    type: 'string',
                                    description: 'Human-readable ASCII [USASCII] text providing additional information, used to assist the client developer in understanding the error that occurred.',
                                },
                                error_uri: {
                                    type: 'string',
                                    description: 'A URI identifying a human-readable web page with information about the error, used to provide the client developer with additional information about the error.',
                                    format: 'uri',
                                },
                            },
                            required: [
                                'error',
                            ],
                        },
                    },
                },
            },
            '401': {
                description: 'client authentication failed',
                headers: {
                    'WWW-Authenticate': {
                        description: "If the client attempted to authenticate via the 'Authorization' request header field, the authorization server MUST respond with an HTTP 401 (Unauthorized) status code and include the 'WWW-Authenticate' response header field matching the authentication scheme used by the client.",
                        style: 'simple',
                        explode: false,
                        schema: {
                            type: 'string',
                        },
                        example: 'basic',
                    },
                },
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/paths/~1release2~1oidc~1token/post/responses/400/content/application~1json/schema',
                        },
                    },
                },
            },
        },
        security: [
            {
                BasicAuth: [],
            },
            {
                openIdConnect: [],
            },
        ],
        parameters: [
            {
                name: 'backplane-authorization',
                in: 'header',
                required: true,
            },
            {
                name: 'backplane-token',
                in: 'header',
                required: true,
            },
        ],
    })
    async accessToken(@param({
        name: 'backplane-authorization',
        in: 'header',
        required: true,
    }) backplaneAuthorization: string, @param({
        name: 'backplane-token',
        in: 'header',
        required: true,
    }) backplaneToken: string, @requestBody({
        description: 'The authorization grant and the code verifier',
        content: {
            'application/x-www-form-urlencoded': {
                schema: {
                    title: 'AccessTokenRequest',
                    type: 'object',
                    properties: {
                        grant_type: {
                            type: 'string',
                            description: 'Allowed values are:\n- `authorization_code` when requesting access and id tokens with an authorization code.\n- `refresh_token` when requesting access tokens with a refresh token.\n',
                            example: 'authorization_code',
                            enum: [
                                'authorization_code',
                                'refresh_token',
                            ],
                        },
                        code: {
                            pattern: '^[A-Za-z0-9\\-._~]{43,128}$',
                            type: 'string',
                            description: 'The authorization code received from the authorization server.\n\nREQUIRED if `grant_type` is `authorization_code`; IGNORED otherwise.\n',
                            example: 'FL_DFs6V30KSJAIq7h_LsAttGYAplaYGdFUkGeN54EE',
                        },
                        redirect_uri: {
                            type: 'string',
                            description: 'REQUIRED, if the `redirect_uri` parameter was included in the authorization request and their values MUST be identical.',
                            format: 'uri',
                            example: 'http://localhost:3001/oidc/cb',
                        },
                        client_id: {
                            type: 'string',
                            description: 'the registered client id.\n\nREQUIRED, if the client is not authenticating with the authorization server (e.g. when using PKCE)\n',
                            example: 'oidcRpAcg_SpaNativeApps',
                        },
                        code_verifier: {
                            maxLength: 128,
                            minLength: 43,
                            pattern: '^[A-Za-z0-9\\-._~]{43,128}$',
                            type: 'string',
                            description: "high-entropy cryptographic random STRING using the unreserved characters [A-Z] / [a-z] / [0-9] / '-' / '.' / '_' / '~' from Section 2.3 of [RFC3986], with a minimum length of 43 characters and a maximum length of 128 characters.\n\nREQUIRED if using the PCKE extension.\n",
                            example: 'EbWPr9dknKvBDg8r8zRroG82bFZaSqSWeCKjvj_AI1w',
                        },
                        refresh_token: {
                            type: 'string',
                            description: 'The refresh token issued to the client.\n\nREQUIRED if `grant_type` is `refresh_token`; IGNORED otherwise.\n',
                        },
                        scope: {
                            type: 'string',
                            description: 'OPTIONAL if `grant_type` is `refresh_token`; IGNORED otherwise.\n\nThe scope of the access request.  The requested scope MUST NOT include any scope not originally granted by the resource owner, and if omitted is treated as equal to the scope originally granted by the resource owner.\n',
                        },
                    },
                    required: [
                        'grant_type',
                    ],
                    example: 'POST /token HTTP/1.1\n\nHost: server.example.com\n\nContent-Type: application/x-www-form-urlencoded\n\nAuthorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW\n\ngrant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA&redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb\n',
                },
            },
        },
        required: true,
    }) _requestBody: {
        grant_type: 'authorization_code' | 'refresh_token';
        code?: string;
        redirect_uri?: string;
        client_id?: string;
        code_verifier?: string;
        refresh_token?: string;
        scope?: string;
    }): Promise<{
        access_token: string;
        token_type: string;
        expires_in?: number;
        refresh_token?: string;
        scope?: string;
        id_token: string;
    }> {
        throw new Error('Not implemented');
    }

}

