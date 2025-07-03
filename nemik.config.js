

export default async function (nemik) {
  nemik
    .warn(`Processing…`)
    .gdoc('gdoc-rb', '1u79M9wpetGQKQodk_HIUR9f1ImqbJa76KaEGERZAe2A', { save: 'eurosky.json' })
    .gdoc2html()
    .transform(async ({ document: doc }, { el, linkStyle, detabbify, mainify, clean, removeGDocIdentifiers }) => {
      linkStyle('sky.css');
      removeGDocIdentifiers();
      detabbify();
      clean();
      // hero
      const hero = el('div', { class: 'hero' }, [doc.querySelector('header')]);
      while (true) {
        if (/^h/.test(doc.body.firstChild?.localName) || !doc.body.firstChild) break;
        hero.append(doc.body.firstChild);
      }
      doc.body.prepend(hero);
      mainify('.hero');
    })
    .saveHTML({ to: 'index.html', pretty: true })
  ;
}
