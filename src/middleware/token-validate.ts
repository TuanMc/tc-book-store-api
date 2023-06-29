import { Request, Response } from 'express';
import Error from "../models/error";
import request from 'request';

const tokenValidate = () =>
    async (req: Request, res: Response, next: any) => {
        if (req.headers.authorization) {
            next();

            // Disable now because keycloak have an open issue relate to access token: https://github.com/keycloak/keycloak/issues/16844
            // configure the request to your keycloak server
            // const url = `${process.env.KEYCLOAK_DOMAIN}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`;
            // const url = `http://127.0.0.1:8080/realms/book-store/protocol/openid-connect/userinfo`;
            // const options = {
            //     method: 'GET',
            //     url,
            //     headers: {
            //         // add the token you received to the userinfo request, sent to keycloak
            //         Authorization: req.headers.authorization,
            //     },
            // };
            // console.log('request', options)

            // request(options, (error, response, body) => {
            //     if (error) throw new Error(error);
            //     console.log(error)
            //     // if the request status isn't "OK", the token is invalid
            //     if (response.statusCode !== 200) {
            //         res.status(401).send(new Error("Unauthorized"));
            //     }
            //     // the token is valid pass request onto your next function
            //     else {
            //         next();
            //     }
            // });
        } else {
            // there is no token, don't process request further
            res.status(401).send(new Error("Unauthorized"));
        }
    }
export default tokenValidate;