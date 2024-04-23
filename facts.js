import { translateMessage } from './translate.js';

const factsApiUrl = 'https://api.api-ninjas.com/v1/facts';

async function getTranslatedFact() {
	try {
		const response = await fetch(factsApiUrl, {
			headers: { 'X-Api-Key': process.env.FACTS_API_KEY }
		})
		if (response.status !== 200)
			return 'Sem curiosidade hoje :(';
		const facts = await response.json();
		const fact = facts[0].fact;
		const translatedFact = await translateMessage(fact);
		return translatedFact;
	} catch (error) {
		console.log(error)
		return ""
	}
}

export { getTranslatedFact };