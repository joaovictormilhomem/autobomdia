import { translateMessage } from './translate.js';

const factsApiUrl = 'https://api.api-ninjas.com/v1/facts?limit=1';

async function getTranslatedFact() {
	const response = await fetch(factsApiUrl, {
		headers: { 'X-Api-Key': process.env.FACTS_API_KEY }
	})
	if (response.status !== 200)
		return 'Sem curiosidade hoje :(';
	const facts = await response.json();
	const fact = facts[0].fact;
	const translatedFact = await translateMessage(fact);
	return translatedFact;
}

export { getTranslatedFact };