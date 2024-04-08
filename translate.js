import translate from "translate";

translate.engine = "google";
translate.key = process.env.TRANSLATE_API_KEY;

async function translateMessage(message) {
  try {
    const text = await translate(message, "pt");
    return text;
  } catch (error) {
    console.log(error)
    return ""
  }
}

export { translateMessage };