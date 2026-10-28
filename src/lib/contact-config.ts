/**
 * Envio de mensagens via Resend (https://resend.com). Configure no servidor:
 *   RESEND_API_KEY      chave secreta (nunca use o prefixo NEXT_PUBLIC_)
 *   CONTACT_TO_EMAIL    e-mail que recebe as mensagens
 *   CONTACT_FROM_EMAIL  remetente de um domínio verificado no Resend (opcional)
 * Sem as duas primeiras, o formulário fica desabilitado no site.
 */
export function getContactConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return null;
  return {
    apiKey,
    to,
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfólio <onboarding@resend.dev>",
  };
}

export const isContactEnabled = () => getContactConfig() !== null;
