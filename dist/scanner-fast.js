/* Fast guard around the local scanner: never leave an iPad waiting forever. */
(() => {
  const button = document.querySelector('#analyzeBtn');
  if (!button) return;
  const original = button.onclick;
  const timeout = (ms) => new Promise(resolve => setTimeout(() => resolve({ unknown:true, reason:'OCR trop lent; correction manuelle proposée' }), ms));
  const manualSearch = () => new Promise(resolve => { const box=document.querySelector('#manualAssist'),input=document.querySelector('#manualQuery'),go=document.querySelector('#manualSearch'); box.hidden=false; input.value=''; input.focus(); go.onclick=()=>{box.hidden=true;resolve(input.value.trim())}; });
  button.onclick = async () => {
    const files = [...(document.querySelector('#photoInput')?.files || [])];
    if (!files.length) return original?.();
    const results = [];
    for (const source of files) {
      const pieces = await window.splitImage(source);
      for (const file of pieces) {
        const result = await Promise.race([window.identify(file), timeout(15000)]);
        let card = result;
        let alternatives = [];
        if (result.unknown && !result.inconsistent) {
          const answer = await manualSearch();
          if (answer) {
            for (const lang of ['en','fr','de','es']) {
              try {
                const brief = await window.tcgdexSearch(answer, lang);
                const candidates = brief.filter(x => x.image).slice(0, 6);
                for (const candidate of candidates) alternatives.push(window.cardFromTCG(await window.tcgdexDetail(candidate.id, lang), lang));
                if (alternatives.length) break;
              } catch (e) {}
            }
          }
        }
        results.push(...(alternatives.length ? alternatives : [card]));
      }
    }
    window.showResultList(results);
  };
})();
