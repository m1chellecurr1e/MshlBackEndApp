import fs from 'fs'
import jose from 'node-jose'
import { randomUUID } from "crypto"
import axios from 'axios'

const clientId = "98ef83f1-954f-4d30-9516-231aa35499a2"
const tokenEndpoint = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token"



const createJWT = async (payload) => {
    const ks = fs.readFileSync('keys.json');
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    const key = keyStore.get({use:'sig'})
    return jose.JWS.createSign({compact: true, fields: {"typ": "jwt"}},key)
      .update(JSON.stringify(payload))
      .final()
  }

const generateExpiry = (minutes) => {
    return Math.round((new Date().getTime() + minutes * 60 * 1000) / 1000)
}

const makeTokenRequest = async () => {
    const jwt = await createJWT({
      "iss": clientId,
      "sub": clientId,
      "aud": tokenEndpoint,
      "jti": randomUUID(),
      "exp": generateExpiry(4),
    })
    const formParams = new URLSearchParams()
    formParams.set('grant_type', 'client_credentials')
    formParams.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer')
    formParams.set('client_assertion', jwt)
    console.log(formParams)
    //const tokenResponse = await axios.post(tokenEndpoint, formParams, {
      //headers: {
        //'Content-Type': 'application/x-www-form-urlencoded',
      //}})
    //return tokenResponse.data
    
  }
console.log (await makeTokenRequest())







