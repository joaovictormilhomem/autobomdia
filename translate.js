import translate from "translate";

translate.engine = "google";
translate.key = process.env.TRANSLATE_API_KEY;

async function translateMessage(message) {
  const text = await translate(message, "pt");
  return text;
}

export { translateMessage };