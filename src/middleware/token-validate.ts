import { Request, Response } from 'express';
import Error from "../models/error";
import request from 'request';
import { Keycloak } from "keycloak-backend";
import fs from "fs";

const keycloak = new Keycloak({
    realm: process.env.KEYCLOAK_REALM as string || "book-store",
    keycloak_base_url: process.env.KEYCLOAK_DOMAIN as string || "http://0.0.0.0:8080",
    client_id: process.env.KEYCLOAK_CLIENT_ID as string || "book-store-web",
    username: "admin",
    password: "admin",
    is_legacy_endpoint: false
})

const tokenValidate = () =>
    async (req: Request, res: Response, next: any) => {
        if (req.headers.authorization) {
            const accessToken = req.headers.authorization.split(" ")[1].trim();
            try {
                console.log(accessToken);
                // const token = await keycloak.jwt.verify(accessToken, { proxy: undefined });
                // const certs = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxcRl6xuTV3Vdtc/BRkxPjvgFvnLTRmnhF2I57JndxvaHsSfLT1U8n6jUmdUZ58nXdqS9uSVpfUwvju/zrtIiaYdubXScAw/T9rWdORDik51ZNLt2CCJyHTKdOY8BEl025BpQSmWpVvMIm3hNoRboLfTyTG00ru7wNbu93pzN7bbe+qKrx+cKg1n90H1eq6ShwNauQVBcO1aswHIlMSdvihPBrpF6Zc9IR638EPDIB3HdrdIBfZjle76Z+20/Ue3gOUU6sYr/5PEx+DGWxqlV8FpcE+CCAmMYSBbAXvjmHaqcJCyOHJsOgWw7g04B3Ojzcr4gEXApAhVpdkBox+b9GQIDAQAB";
                // const cert = await fetch("http://127.0.0.1:8080/realms/book-store/protocol/openid-connect/certs").then(res => res.json()).then(data => data.keys[0]);
                // console.log(cert);
                // const token = await keycloak.jwt.verify(accessToken, cert);
                const token = await keycloak.jwt.verify("eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJqYXh1bGI4d0t4NGtMT2IxYVZrUFVjVjBSdkFaNzhwNVQwRWx0cEo1a19zIn0.eyJleHAiOjE2ODg1NDU0NjAsImlhdCI6MTY4ODU0NTE2MCwiYXV0aF90aW1lIjoxNjg4NTQ1MTU4LCJqdGkiOiI0ZTM3M2UyMy04ZTYxLTQ4MmYtYmJlZC1kYTU4MDBlNzRlYmYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2Jvb2stc3RvcmUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMjBjZDVlOTktOTNmMy00NTM3LWJkY2UtMDdhZjE5OTMzNDExIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYm9vay1zdG9yZS13ZWIiLCJub25jZSI6ImUxZGExZjg0LWJmOTQtNGRjYy1hNjlhLWIwZDBiNTc1YzM3NiIsInNlc3Npb25fc3RhdGUiOiI0ZTYxZDc4My03MDI3LTRjNTYtODU2ZC1mZWJjOWI5ODhmMjMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWJvb2stc3RvcmUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI0ZTYxZDc4My03MDI3LTRjNTYtODU2ZC1mZWJjOWI5ODhmMjMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJ1c2VyMSB1c2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidXNlcjEiLCJnaXZlbl9uYW1lIjoidXNlcjEiLCJmYW1pbHlfbmFtZSI6InVzZXIifQ.g1YpIECgeRJrI9fAQep-5w1fVsTkRKZ_FpbAVMVCjbXY10ONc5aPSx_cevuydV4XfBpCOZjzv1pJ7xamCcdoamCI86uzCC2sqSXXijAMt6SQd_OhsrO8CvWCU0mzoftv4jgRI30rk5dOJi49vawl9aUVWToHx5Aqq9bS7tKxBTD_76tTDwurB9cTCGBOku7yzelBz5262iFBYUB-oD9Pqhu4UzLhBmxY15GrKUvlM3p35B3dgAdMwfin-AOsQT2OSnCHA4u3EME4x_COPfArgEpfJScO5uuBH1_SZTWCygP_wVvDS8PQo0T6RGAm3R_y23Em6fIRuvzZVPjAzCENNw");
                console.log(token);
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