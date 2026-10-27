export interface SendOtpEmailParams {
  to: string;
  code: string;
  companyName?: string;
}

export class MailService {
  /**
   * Dispara o código OTP numérico por e-mail
   */
  static async sendOtpEmail({
    to,
    code,
    companyName = "Review14",
  }: SendOtpEmailParams): Promise<{ success: boolean; messageId?: string }> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM || "Review14 <nao-responda@review14.com>";

    // Se a chave do Resend estiver presente, faz o envio real
    if (apiKey && apiKey.startsWith("re_")) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
            subject: `Seu código de acesso para avaliar no ${companyName}: ${code}`,
            html: `
              <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; rounded: 16px;">
                <h2 style="color: #111827; margin-bottom: 8px;">Código de Verificação</h2>
                <p style="color: #4b5563; font-size: 14px;">Utilize o código abaixo para autenticar sua avaliação no <strong>${companyName}</strong>:</p>
                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 12px; text-align: center; margin: 24px 0;">
                  <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #2563eb;">${code}</span>
                </div>
                <p style="color: #9ca3af; font-size: 12px;">Este código é válido por 15 minutos. Se você não solicitou, por favor desconsidere este e-mail.</p>
              </div>
            `,
          }),
        });

        const data = await response.json();
        return { success: response.ok, messageId: data.id };
      } catch (err) {
        console.error("❌ Erro ao enviar e-mail via Resend:", err);
      }
    }

    // Modo Desenvolvimento / Fallback quando sem chave configurada
    console.log(`\n==================================================`);
    console.log(`📧 [EMAIL OTP SIMULADO]`);
    console.log(`Para: ${to}`);
    console.log(`Estabelecimento: ${companyName}`);
    console.log(`Código OTP: ${code}`);
    console.log(`Validade: 15 minutos`);
    console.log(`==================================================\n`);

    return { success: true, messageId: "dev-simulated-id" };
  }
}
