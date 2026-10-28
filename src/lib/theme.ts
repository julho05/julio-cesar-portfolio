export const themeStorageKey = "theme";

/**
 * Executado no <head> antes da pintura: aplica o tema salvo pelo visitante.
 * Sem preferência salva, mantém o tema escuro (padrão do site).
 */
export const themeInitScript = `try{var t=localStorage.getItem("${themeStorageKey}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
