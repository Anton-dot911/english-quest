exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    var body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return { statusCode: 400, body: "Invalid JSON" };
    }

    var parent_name = body.parent_name || "";
    var child_name = body.child_name || "";
    var email = body.email || "";

    if (!email || !parent_name || !child_name) {
        return { statusCode: 400, body: "Missing required fields" };
    }

    console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);
    console.log("SENDER_EMAIL:", process.env.SENDER_EMAIL);
    console.log("Sending to:", email);

    var baseUrl = "https://english-quest-kids.netlify.app";

    var lessonBtn = "display:inline-block;background:#F5A623;color:#7C2D12;text-decoration:none;padding:9px 16px;border-radius:50px;font-size:13px;font-weight:900;";
    var numBox = "width:38px;height:38px;background:#4A90E8;border-radius:10px;text-align:center;line-height:38px;color:#fff;font-weight:900;font-size:16px;";

    function lessonRow(num, title, subtitle, url) {
        return "<table width='100%' cellpadding='0' cellspacing='0' style='background:#EBF4FF;border-radius:16px;margin-bottom:12px;'>" +
            "<tr><td style='padding:16px;'><table width='100%' cellpadding='0' cellspacing='0'><tr>" +
            "<td style='width:44px;vertical-align:middle;'><div style='" + numBox + "'>" + num + "</div></td>" +
            "<td style='padding-left:12px;vertical-align:middle;'>" +
            "<div style='font-size:15px;font-weight:800;color:#1a1a2e;'>" + title + "</div>" +
            "<div style='font-size:12px;color:#888;margin-top:2px;'>" + subtitle + "</div>" +
            "</td>" +
            "<td style='text-align:right;vertical-align:middle;'>" +
            "<a href='" + url + "' style='" + lessonBtn + "'>Відкрити</a>" +
            "</td>" +
            "</tr></table></td></tr></table>";
    }

    var html = "<!DOCTYPE html><html lang='uk'><head><meta charset='UTF-8'>" +
        "<meta name='viewport' content='width=device-width,initial-scale=1'></head>" +
        "<body style='margin:0;padding:0;background:#5BC8F5;font-family:Arial,sans-serif;'>" +
        "<table width='100%' cellpadding='0' cellspacing='0' style='background:#5BC8F5;padding:30px 16px;'>" +
        "<tr><td align='center'>" +
        "<table width='100%' style='max-width:520px;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.15);'>" +
        "<tr><td style='background:#4A90E8;padding:30px 28px;text-align:center;'>" +
        "<div style='font-size:46px;margin-bottom:8px;'>&#128640;</div>" +
        "<div style='font-size:26px;font-weight:900;color:#fff;letter-spacing:-0.5px;'>English Quest</div>" +
        "<div style='font-size:14px;color:rgba(255,255,255,0.9);margin-top:4px;'>Інтерактивна англійська для дітей</div>" +
        "</td></tr>" +
        "<tr><td style='padding:26px 28px 16px;'>" +
        "<div style='font-size:20px;font-weight:900;color:#1a1a2e;margin-bottom:10px;'>Вітаємо, " + parent_name + "! 🎉</div>" +
        "<p style='font-size:15px;color:#555;line-height:1.7;margin:0;'>" +
        "<strong>" + child_name + "</strong> отримує доступ до 3 безкоштовних уроків. Натисніть щоб розпочати!" +
        "</p>" +
        "</td></tr>" +
        "<tr><td style='padding:0 28px 8px;'>" +
        lessonRow("1", "Урок 1 — Привітання", "Hello · My name is · How are you?", baseUrl + "/lesson1_maksym.html") +
        lessonRow("2", "Урок 2 — Числа та вік", "One to ten · How old are you?", baseUrl + "/lesson2_maksym.html") +
        lessonRow("3", "Урок 3 — Кольори та форми", "Red · Blue · Circle · Square", baseUrl + "/lesson3_maksym.html") +
        "</td></tr>" +
        "<tr><td style='padding:0 28px 20px;'>" +
        "<div style='background:#FEF3C7;border:2px solid #FCD34D;border-radius:14px;padding:14px 16px;font-size:14px;color:#92400E;font-weight:700;line-height:1.6;'>" +
        "💡 Порада: виконуйте уроки разом з " + child_name + " — кожен урок займає 10–20 хвилин." +
        "</div></td></tr>" +
        "<tr><td style='padding:0 28px 28px;text-align:center;'>" +
        "<a href='" + baseUrl + "/english_quest_landing.html'" +
        " style='display:inline-block;background:#4A90E8;color:#fff;text-decoration:none;padding:14px 28px;border-radius:50px;font-size:15px;font-weight:900;'>Дізнатися про повний курс (24 уроки) →</a>" +
        "</td></tr>" +
        "<tr><td style='background:#F5F7FF;padding:16px 28px;text-align:center;border-top:2px solid #E8F0FB;'>" +
        "<div style='font-size:12px;color:#AAB4C8;'>English Quest · " +
        "<a href='" + baseUrl + "' style='color:#4A90E8;text-decoration:none;'>english-quest-kids.netlify.app</a></div>" +
        "</td></tr>" +
        "</table></td></tr></table></body></html>";

    try {
        var payload = {
            sender: {
                name: "English Quest",
                email: process.env.SENDER_EMAIL
            },
            to: [{ email: email, name: parent_name }],
            subject: parent_name + ", ваші 3 безкоштовні уроки готові!",
            htmlContent: html
        };

        console.log("Sending to Brevo, recipient:", email, "sender:", process.env.SENDER_EMAIL);

        var response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY
            },
            body: JSON.stringify(payload)
        });

        var responseText = await response.text();
        console.log("Brevo status:", response.status);
        console.log("Brevo response:", responseText);

        if (!response.ok) {
            return {
                statusCode: 500,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Brevo error", status: response.status, details: responseText })
            };
        }

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ success: true })
        };
    } catch (err) {
        console.error("Function error:", err.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
