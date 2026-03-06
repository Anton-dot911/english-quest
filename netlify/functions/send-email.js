exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { parent_name, child_name, email } = body;

  if (!email || !parent_name || !child_name) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  // ── Log env vars (без значень — тільки чи є) ──
  console.log('BREVO_API_KEY exists:', !!process.env.BREVO_API_KEY);
  console.log('SENDER_EMAIL:', process.env.SENDER_EMAIL);
  console.log('Sending to:', email);

  const baseUrl = 'https://english-quest-kids.netlify.app';

  const htmlContent = `<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#5BC8F5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#5BC8F5;padding:30px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.15);">
        <tr>
          <td style="background:linear-gradient(160deg,#5B9EF7,#4A90E8);padding:32px 28px;text-align:center;">
            <div style="font-size:52px;margin-bottom:8px;">🚀</div>
            <div style="font-size:28px;font-weight:900;color:#ffffff;">English Quest</div>
            <div style="font-size:15px;color:rgba(255,255,255,0.88);font-weight:700;margin-top:4px;">Інтерактивна англійська для дітей</div>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 28px 0;">
            <div style="font-size:22px;font-weight:900;color:#1a1a2e;margin-bottom:10px;">Вітаємо, ${parent_name}! 🎉</div>
            <p style="font-size:16px;color:#444;line-height:1.7;margin:0 0 20px;">
              <strong>${child_name}</strong> отримує доступ до 3 безкоштовних уроків. Натисніть кнопку щоб розпочати!
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#EBF4FF;border-radius:16px;margin-bottom:12px;">
              <tr><td style="padding:16px 18px;">
                <table width="100%" cellpadding="0" cellspacing="0"><tr>
                  <td style="width:44px;vertical-align:middle;">
                    <div style="width:40px;height:40px;background:#4A90E8;border-radius:12px;text-align:center;line-height:40px;color:#fff;font-weight:900;font-size:18px;">1</div>
                  </td>
                  <td style="padding-left:14px;vertical-align:middle;">
                    <div style="font-size:16px;font-weight:800;color:#1a1a2e;">👋 Привітання</div>
                    <div style="font-size:13px;color:#888;">Hello · My name is</div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <a href="${baseUrl}/lesson1_maksym.html" style="display:inline-block;background:#F5A623;color:#7C2D12;text-decoration:none;padding:10px 18px;border-radius:50px;font-size:14px;font-weight:900;">▶ Відкрити</a>
                  </td>
                </tr></table>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#EBF4FF;border-radius:16px;margin-bottom:12px;">
              <tr><td style="padding:16px 18px;">
                <table width="100%" cellpadding="0" cellspacing="0"><tr>
                  <td style="width:44px;vertical-align:middle;">
                    <div style="width:40px;height:40px;background:#4A90E8;border-radius:12px;text-align:center;line-height:40px;color:#fff;font-weight:900;font-size:18px;">2</div>
                  </td>
                  <td style="padding-left:14px;vertical-align:middle;">
                    <div style="font-size:16px;font-weight:800;color:#1a1a2e;">🔢 Числа та вік</div>
                    <div style="font-size:13px;color:#888;">One to ten · How old?</div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <a href="${baseUrl}/lesson2_maksym.html" style="display:inline-block;background:#F5A623;color:#7C2D12;text-decoration:none;padding:10px 18px;border-radius:50px;font-size:14px;font-weight:900;">▶ Відкрити</a>
                  </td>
                </tr></table>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#EBF4FF;border-radius:16px;margin-bottom:24px;">
              <tr><td style="padding:16px 18px;">
                <table width="100%" cellpadding="0" cellspacing="0"><tr>
                  <td style="width:44px;vertical-align:middle;">
                    <div style="width:40px;height:40px;background:#4A90E8;border-radius:12px;text-align:center;line-height:40px;color:#fff;font-weight:900;font-size:18px;">3</div>
                  </td>
                  <td style="padding-left:14px;vertical-align:middle;">
                    <div style="font-size:16px;font-weight:800;color:#1a1a2e;">🎨 Кольори та форми</div>
                    <div style="font-size:13px;color:#888;">Red · Blue · Circle</div>
                  </td>
                  <td style="text-align:right;vertical-align:middle;">
                    <a href="${baseUrl}/lesson3_maksym.html" style="display:inline-block;background:#F5A623;color:#7C2D12;text-decoration:none;padding:10px 18px;border-radius:50px;font-size:14px;font-weight:900;">▶ Відкрити</a>
                  </td>
                </tr></table>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 28px;text-align:center;">
            <a href="${baseUrl}/english_quest_landing.html" style="display:inline-block;background:#4A90E8;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:16px;font-weight:900;">🚀 Дізнатися про повний курс →</a>
          </td>
        </tr>
        <tr>
          <td style="background:#F5F7FF;padding:18px 28px;text-align:center;border-top:2px solid #E8F0FB;">
            <div style="font-size:13px;color:#AAB4C8;">English Quest · <a href="${baseUrl}" style="color:#4A90E8;text-decoration:none;">english-quest-kids.netlify.app</a></div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const payload = {
      sender: {
        name: 'English Quest',
        email: process.env.SENDER_EMAIL
      },
      to: [{ email, name: parent_name }],
      subject: `🎁 ${parent_name}, ваші 3 безкоштовні уроки готові!`,
      htmlContent
    };

    console.log('Sending payload to Brevo:', JSON.stringify({ to: payload.to, subject: payload.subject, sender: payload.sender }));

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    console.log('Brevo status:', response.status);
    console.log('Brevo response:', responseText);

    if (!response.ok) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Brevo error', status: response.status, details: responseText })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error('Function error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
