import { Request, Response } from 'express';
import Error from "../models/error";
// import { Keycloak } from "keycloak-backend";

// const keycloak = new Keycloak({
//     realm: process.env.KEYCLOAK_REALM as string || "book-store",
//     keycloak_base_url: process.env.KEYCLOAK_DOMAIN as string,
//     client_id: process.env.KEYCLOAK_CLIENT_ID as string || "book-store-web",
//     username: "admin",
//     password: "admin",
//     is_legacy_endpoint: false
// });

// console.log("keycloak domain", process.env.KEYCLOAK_DOMAIN);

const tokenValidate = () =>
    async (req: Request, res: Response, next: any) => {
        if (req.headers.authorization) {
            const accessToken = req.headers.authorization.split(" ")[1].trim();
            const baseUrl = process.env.KEYCLOAK_DOMAIN as string;
            const realm = process.env.KEYCLOAK_REALM as string;
            // const url = `${baseUrl}/realms/${realm}/protocol/openid-connect/userinfo`;
            const url = `http://localhost:8080/realms/${realm}/protocol/openid-connect/userinfo`;
            console.log('url', url);
            try {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", req.headers.authorization);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                };
                await fetch(url, requestOptions)
                    .then(res => res.text())
                next();
            }
            catch (err: any) {
                console.log(err);
                res.status(400).send(new Error(err.message));
            }
        } else {
            // there is no token, don't process request further
            res.status(401).send(new Error("Unauthorized"));
        }
    }
export default tokenValidate;