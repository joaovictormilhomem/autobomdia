const messages = [
  "Bom dia, meu amor! Que hoje você seja guiada pela intuição, pois você sempre diz que a sua é muito boa.",
  "Bom dia, meu amor! Espero que seu dia seja alegre como você sempre me deixa!",
  "Que este novo dia te traga oportunidades incríveis e momentos felizes. Bom dia!",
  "Bom dia, amor! Lembre-se de tomar um café bem gostoso(igual você) para começar o dia com o pé direito.",
  "Que este amanhecer seja o prelúdio de um dia cheio de boas surpresas, como foi você pra mim, uma boa surpresa. Bom dia, minha querida!",
  "Bom dia, minha princesa! Espero que seu dia seja tão lindo quanto você(acho difícil ele conseguir ser tão lindo assim).",
  "Bom dia, meu bem! Que cada desafio que surgir hoje seja uma oportunidade de crescimento.",
  "Que seu dia seja tão iluminado quanto seu sorriso. Bom dia, minha luz!",
  "Bom dia, meu amor! Não esqueça de se cuidar e aproveitar cada momento deste novo dia.",
  "Bom dia, meu anjo! Espero que o dia te surpreenda com momentos de alegria e realização.",
  "Que hoje você encontre motivos para sorrir em cada pequeno detalhe, e eu sei que você consegue! :). Bom dia, coisa linda!",
  "Bom dia, meu amor! Que cada passo que você der hoje te aproxime um pouco mais dos seus objetivos, e se sincronizar comigo, nós andaremos iguais!",
  "Que este dia seja leve e cheio das boas energias das forças do bem(Curupira, Iemanjá...). Bom dia, minha paixão!",
  "Bom dia, minha namorada. Hoje é o dia que marca mais um mês do nosso compromisso, obrigado por tudo, estar contigo tem sido a melhor escolha que fiz na vida. Eu amo muito você!",
  "Bom dia, minha querida! Que hoje você encontre felicidade até nos pequenos gestos.",
  "Que este amanhecer traga toda a paz e tranquilidade que você merece. Bom dia, meu bem!",
  "Bom dia, amor! Lembre-se sempre de valorizar os momentos simples e preciosos da vida.",
  "Que este novo dia te presenteie com novas oportunidades e experiências incríveis. Bom dia, minha princesa!",
  "Bom dia, meu amor! Que hoje seja mais um dia para cultivar nossas melhores lembranças juntos.",
  "Que este dia seja tão colorido e vibrante quanto o amor que sinto por você, e quanto a decoração da casa que você quer ter. Bom dia, amor!",
  "Bom dia, minha vida! Que cada desafio que surgir seja uma oportunidade para mostrar sua força e determinação, pois sei que você tem muita!.",
  "Que este amanhecer seja apenas o começo de um dia cheio de realizações. Bom dia, pra mais linda!",
  "Bom dia, meu anjo! Espero que seu dia seja tão incrível quanto você é para mim.",
  "Que hoje seja mais um dia para celebrar a vida e a felicidade de estarmos juntos. Bom dia, meu amor!",
  "Bom dia, minha estrela! Que seu brilho ilumine cada passo do seu caminho hoje.",
  "Que este novo dia seja regado de momentos especiais. Bom dia, meu bem!",
  "Não se esqueça do quanto você é especial e capaz. Bom dia, minha fonte de inspiração!",
  "Bom dia, amor! Que cada novo desafio seja uma oportunidade para crescer e aprender.",
  "Que este dia seja uma tela em branco onde você possa pintar suas melhores memórias. Bom dia, minha querida!",
  "Bom dia, meu amor! Lembre-se sempre de que estou aqui para te apoiar, sempre!.",
  "Que este amanhecer renove suas esperanças e te inspire a conquistar seus sonhos. Bom dia <3!",
]

function getTodayMessage() {
  const todayDate = new Date();
  const dayInMonth = todayDate.getDate();
  return messages[dayInMonth - 1];
}

export { getTodayMessage };