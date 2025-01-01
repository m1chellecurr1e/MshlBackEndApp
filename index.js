// console.log()
import fs from 'fs';
import jose from 'node-jose';
import { randomUUID } from "crypto"
import axios from 'axios'

const clientId = "98ef83f1-954f-4d30-9516-231aa35499a2"
const tokenEndpoint = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token"
const fhirbaseURL = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
const groupID = "e3iabhmS8rsueyz7vaimuiaSmfGvi.QwjVXJANlPOgR83"

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
	});
	console.log({jwt})
	const formParams = new URLSearchParams();
	formParams.set('grant_type', 'client_credentials');
	formParams.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
	formParams.set('client_assertion', jwt);
	console.log({formParams})
	const tokenResponse = await axios.post(tokenEndpoint, formParams, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}})
	return tokenResponse.data
}

// const KickOffBulkDataExport = async (accessToken) => {
// 	const bulkKickOffResponse = await axios.get(`${fhirbaseURL}/Group/${groupID}/$export`, {
// 		params: {
// 			_type: 'patient,observation',
// 			_typeFilter: 'Observation?category=laboratory',
// 		},
// 		headers: {
// 			Accept: 'application/fhir+json',
// 			Authorization: `Bearer ${accessToken}`,
// 			Prefer: 'respond-async'
// 		}
// 	}) 
// 	return bulkKickOffResponse.headers.get('Content-Location')
// }

// const pollAndWaitForExport = async (url, accessToken, secsToWait) => {
// 	try {
// 		const response = await axios.get(url, {
// 			headers: {
// 				Authorization: `Bearer ${accessToken}`,
// 			}
// 		})
// 		const progress = response.headers.get('X-Progress')
// 		const status = response.status
// 		const data = response.data
// 		console.log({url, status, progress, data})
// 		if (response.status == 200) {
// 			return response.data
// 		}
// 	} catch (e) {
// 		console.log("Error trying to get bulk request", e);	
// 	}
// 	console.log(`waiting ${secsToWait} secs`)
// 	await new Promise(resolve => setTimeout(resolve, secsToWait * 1000))
// 	return await pollAndWaitForExport(url, accessToken, secsToWait)
// }

// const processBulkResponse = async (bundleResponse, accessToken) => {
// 	const promises = bundleResponse.output?.map(async (output) => {
// 		const url = output.url
// 		const response = await axios.get(url, {
// 			headers: {
// 				Authorization: `Bearer ${accessToken}`,
// 			}
// 		})	
// 		return {url, data: response.data, type: output.type}		
// 	})
// 	return Promise.all(promises)
// }

const tokenResponse = await makeTokenRequest()
const accessToken = tokenResponse.access_token


// const contentLocation = await KickOffBulkDataExport(accessToken)
// const bulkDataResponse = await pollAndWaitForExport(contentLocation, accessToken, 5)
// const bulkData = await pollAndWaitForExport(contentLocation)
// console.log(bulkDataResponse)

// const getWaitTime = () => {
//     // Logic to determine wait time
//     return 5000; // Example: return 5000 milliseconds (5 seconds)
// };

// const waitTime = getWaitTime();

// if (typeof waitTime === 'number') {
//     console.log(`Waiting for ${waitTime} milliseconds...`);
//     setTimeout(() => {
//         console.log('Done waiting!');
//     }, waitTime);
// } else {
//     console.error('Error: waitTime is not a valid number.');
// }







