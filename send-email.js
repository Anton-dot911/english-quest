// Netlify Function — send welcome email via Brevo
// Розміщення: netlify/functions/send-email.js

exports.handler = async (event) => {
  // Only POST allowed
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

  const baseUrl = 'https://english-quest-kids.netlify.app';

  // ── Beautiful HTML email ──────────────────────────────────
  const htmlContent = `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ваші уроки English Quest</title>
</head>
<body style="margin:0;padding:0;background:#5BC8F5;font-family:'Helvetica Neue',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#5BC8F5;padding:30px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.15);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(160deg,#5B9EF7 0%,#4A90E8 60%,#3A7FD4 100%);padding:32px 28px;text-align:center;">
            <div style="font-size:52px;margin-bottom:8px;">🚀</div>
            <div style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;text-shadow:0 2px 8px rgba(0,0,0,0.15);">English Quest</div>
            <div style="font-size:15px;color:rgba(255,255,255,0.88);font-weight:700;margin-top:4px;">Інтерактивна англійська для дітей</div>
          </td>
        </tr>

        <!-- GREETING -->
        <tr>
          <td style="padding:28px 28px 0;">
            <div style="font-size:22px;font-weight:900;color:#1a1a2e;margin-bottom:10px;">
              Вітаємо, ${parent_name}! 🎉
            </div>
            <p style="font-size:16px;color:#444;line-height:1.7;margin:0 0 20px;">
              Дякуємо за реєстрацію! <strong>${child_name}</strong> отримує доступ до 3 безкоштовних інтерактивних уроків англійської. Натисніть кнопку щоб розпочати кожен урок.
            </p>
          </td>
        </tr>

        <!-- LESSONS -->
        <tr>
          <td style="padding:0 28px;">

            <!-- Lesson 1 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#EBF4FF;border-radius:16px;margin-bottom:12px;overflow:hidden;">
              <tr>
                <td style="padding:16px 18px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:44px;vertical-align:middle;">
                        <div style="width:40px;height:40px;background:linear-gradient(145deg,#5B9EF7,#4A90E8);border-radius:12px;text-align:center;line-height:40px;font-size:20px;font-weight:900;color:#fff;box-shadow:0 3px 0 #1A4FAA;">1</div>
                      </td>
                      <td style="padding-left:14px;vertical-align:middle;">
                        <div style="font-size:16px;font-weight:800;color:#1a1a2e;">👋 Привітання</div>
                        <div style="font-size:13px;color:#888;margin-top:2px;">Hello · My name is · How are you?</div>
                      </td>
                      <td style="text-align:right;vertical-align:middle;">
                        <a href="${baseUrl}/lesson1_maksym.html"
                           style="display:inline-block;background:linear-gradient(160deg,#FBBF24,#F5A623);color:#7C2D12;text-decoration:none;padding:10px 18px;border-radius:50px;font-size:14px;font-weight:900;white-space:nowrap;box-shadow:0 3px 0 #B07800;">
                          ▶ Відкрити
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Lesson 2 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#EBF4FF;border-radius:16px;margin-bottom:12px;overflow:hidden;">
              <tr>
                <td style="padding:16px 18px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:44px;vertical-align:middle;">
                        <div style="width:40px;height:40px;background:linear-gradient(145deg,#5B9EF7,#4A90E8);border-radius:12px;text-align:center;line-height:40px;font-size:20px;font-weight:900;color:#fff;box-shadow:0 3px 0 #1A4FAA;">2</div>
                      </td>
                      <td style="padding-left:14px;vertical-align:middle;">
                        <div style="font-size:16px;font-weight:800;color:#1a1a2e;">🔢 Числа та вік</div>
                        <div style="font-size:13px;color:#888;margin-top:2px;">One to ten · How old are you?</div>
                      </td>
                      <td style="text-align:right;vertical-align:middle;">
                        <a href="${baseUrl}/lesson2_maksym.html"
                           style="display:inline-block;background:linear-gradient(160deg,#FBBF24,#F5A623);color:#7C2D12;text-decoration:none;padding:10px 18px;border-radius:50px;font-size:14px;font-weight:900;white-space:nowrap;box-shadow:0 3px 0 #B07800;">
                          ▶ Відкрити
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Lesson 3 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#EBF4FF;border-radius:16px;margin-bottom:24px;overflow:hidden;">
              <tr>
                <td style="padding:16px 18px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:44px;vertical-align:middle;">
                        <div style="width:40px;height:40px;background:linear-gradient(145deg,#5B9EF7,#4A90E8);border-radius:12px;text-align:center;line-height:40px;font-size:20px;font-weight:900;color:#fff;box-shadow:0 3px 0 #1A4FAA;">3</div>
                      </td>
                      <td style="padding-left:14px;vertical-align:middle;">
                        <div style="font-size:16px;font-weight:800;color:#1a1a2e;">🎨 Кольори та форми</div>
                        <div style="font-size:13px;color:#888;margin-top:2px;">Red · Blue · Circle · Square</div>
                      </td>
                      <td style="text-align:right;vertical-align:middle;">
                        <a href="${baseUrl}/lesson3_maksym.html"
                           style="display:inline-block;background:linear-gradient(160deg,#FBBF24,#F5A623);color:#7C2D12;text-decoration:none;padding:10px 18px;border-radius:50px;font-size:14px;font-weight:900;white-space:nowrap;box-shadow:0 3px 0 #B07800;">
                          ▶ Відкрити
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- TIP -->
        <tr>
          <td style="padding:0 28px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEF3C7;border-radius:14px;border:2px solid #FCD34D;">
              <tr>
                <td style="padding:14px 16px;font-size:14px;color:#92400E;font-weight:700;line-height:1.6;">
                  💡 <strong>Порада:</strong> Виконуйте уроки разом з ${child_name} — так набагато цікавіше! Кожен урок займає 10–20 хвилин.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- UPSELL -->
        <tr>
          <td style="padding:0 28px 28px;text-align:center;">
            <div style="font-size:16px;color:#555;font-weight:700;margin-bottom:14px;line-height:1.6;">
              Сподобалось? Отримайте всі <strong style="color:#4A90E8;">24 уроки</strong> за один раз!
            </div>
            <a href="${baseUrl}/english_quest_landing.html"
               style="display:inline-block;background:linear-gradient(145deg,#5B9EF7,#4A90E8);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:16px;font-weight:900;box-shadow:0 5px 0 #1A4FAA,0 8px 20px rgba(74,144,232,0.3);">
              🚀 Дізнатися про повний курс →
            </a>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#F5F7FF;padding:18px 28px;text-align:center;border-top:2px solid #E8F0FB;">
            <div style="font-size:13px;color:#AAB4C8;line-height:1.6;">
              Ви отримали цей лист тому що зареєструвались на<br>
              <a href="${baseUrl}" style="color:#4A90E8;text-decoration:none;font-weight:700;">english-quest-kids.netlify.app</a>
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;

  // ── Call Brevo API ────────────────────────────────────────
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'English Quest',
          email: process.env.SENDER_EMAIL || 'noreply@english-quest-kids.netlify.app'
        },
        to: [{ email, name: parent_name }],
        subject: `🎁 ${parent_name}, ваші 3 безкоштовні уроки готові!`,
        htmlContent
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Brevo error:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email sending failed', details: err })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
