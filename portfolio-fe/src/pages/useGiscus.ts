import { useEffect } from 'react';

export function useGiscus() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "Zako563/Portfolio");
    script.setAttribute("data-repo-id", "R_kgDONtJChA");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDONtJChM4Cmqbg");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;


    const giscusContainer = document.getElementById('giscus');
    if (giscusContainer) {
      giscusContainer.innerHTML = ''; // Prevent duplicate scripts
      giscusContainer.appendChild(script);
    }
  }, []);
}
