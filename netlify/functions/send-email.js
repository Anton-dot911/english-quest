exports.handler = async (event) => {
if (event.httpMethod !== “POST”) {
return { statusCode: 405, body: “Method Not Allowed” };
}

var body;
try {
body = JSON.parse(event.body);
} catch (e) {
return { statusCode: 400, body: “Invalid JSON” };
}

var parent_name = body.parent_name || “”;
var child_name = body.child_name || “”;
var email = body.email || “”;
var plan = body.plan || “free”;

if (!email || !parent_name || !child_name) {
return { statusCode: 400, body: “Missing required fields” };
}

console.log(“Plan:”, plan);
console.log(“Sending to:”, email);
console.log(“BREVO_API_KEY exists:”, !!process.env.BREVO_API_KEY);

var baseUrl = “https://english-quest-kids.netlify.app”;
var enc = encodeURIComponent(child_name);

function lessonRow(n, title, sub) {
var url = baseUrl + “/lesson” + n + “_maksym.html?name=” + enc;
return (
“<table width=‘100%’ cellpadding=‘0’ cellspacing=‘0’” +
“ style=‘background:#EBF4FF;border-radius:16px;margin-bottom:10px;’>” +
“<tr><td style='padding:14px;'>” +
“<table width='100%' cellpadding='0' cellspacing='0'><tr>” +
“<td style='width:40px;vertical-align:middle;'>” +
“<div style='width:36px;height:36px;background:#4A90E8;border-radius:10px;" +
"text-align:center;line-height:36px;color:#fff;font-weight:900;font-size:13px;'>” +
n + “</div></td>” +
“<td style='padding-left:10px;vertical-align:middle;'>” +
“<div style='font-size:14px;font-weight:800;color:#1a1a2e;'>” + title + “</div>” +
“<div style='font-size:11px;color:#888;'>” + sub + “</div></td>” +
“<td style='text-align:right;vertical-align:middle;'>” +
“<a href='" + url + "' style='display:inline-block;background:#F5A623;" +
"color:#7C2D12;text-decoration:none;padding:8px 14px;border-radius:50px;" +
"font-size:12px;font-weight:900;'>Відкрити</a>” +
“</td></tr></table></td></tr></table>”
);
}

function wrapEmail(headerSub, bodyContent) {
return (
“<!DOCTYPE html><html lang='uk'><head><meta charset='UTF-8'>” +
“<meta name='viewport' content='width=device-width,initial-scale=1'></head>” +
“<body style='margin:0;padding:0;background:#C8D8E4;font-family:Nunito,Arial,sans-serif;'>” +
“<table width='100%' cellpadding='0' cellspacing='0' style='background:#C8D8E4;padding:30px 16px;'>” +
“<tr><td align='center'>” +
“<table width='100%' style='max-width:520px;background:#DCE8F2;border-radius:24px;" +
"overflow:hidden;box-shadow:-8px -8px 24px rgba(255,255,255,0.9),8px 8px 24px rgba(140,162,180,0.9);'>” +
“<tr><td style='background:linear-gradient(145deg,#6BAEF8,#3A7FD4);padding:28px;text-align:center;'>” +
“<div style='font-size:40px;margin-bottom:8px;'>🚀</div>” +
“<div style='font-size:24px;font-weight:900;color:#fff;'>English Quest</div>” +
“<div style='font-size:13px;color:rgba(255,255,255,0.85);margin-top:4px;'>” + headerSub + “</div>” +
“</td></tr>” +
bodyContent +
“<tr><td style='background:#B4C8D6;padding:14px 28px;text-align:center;" +
"border-top:2px solid rgba(140,162,180,0.4);'>” +
“<div style='font-size:12px;color:#5A7080;'>English Quest · “ +
“<a href='" + baseUrl + "' style='color:#4A90E8;text-decoration:none;'>” +
“english-quest-kids.netlify.app</a></div>” +
“</td></tr>” +
“</table></td></tr></table></body></html>”
);
}

// — FULL PLAN: 24 lessons —
if (plan === “full”) {
var allLessons = [
[“1”,  “Урок 1 - Привітання”,           “Hello · My name is · How are you?”],
[“2”,  “Урок 2 - Числа та вік”,          “One to ten · How old are you?”],
[“3”,  “Урок 3 - Кольори та форми”,      “Red · Blue · Circle · Square”],
[“4”,  “Урок 4 - Тварини”,               “Cat · Dog · Bird · Fish”],
[“5”,  “Урок 5 - Їжа та напої”,          “Apple · Milk · Bread · Water”],
[“6”,  “Урок 6 - Родина”,                “Mother · Father · Sister · Brother”],
[“7”,  “Урок 7 - Тіло людини”,           “Head · Hands · Eyes · Nose”],
[“8”,  “Урок 8 - Одяг”,                  “Shirt · Shoes · Hat · Dress”],
[“9”,  “Урок 9 - Транспорт”,             “Car · Bus · Train · Plane”],
[“10”, “Урок 10 - Дім та кімнати”,       “Kitchen · Bedroom · Door · Window”],
[“11”, “Урок 11 - Природа”,              “Sun · Rain · Tree · Flower”],
[“12”, “Урок 12 - Час та дні тижня”,    “Monday · Today · Morning · Night”],
[“13”, “Урок 13 - Почуття”,              “Happy · Sad · Tired · Hungry”],
[“14”, “Урок 14 - Спорт та хобі”,        “Football · Swimming · Art · Music”],
[“15”, “Урок 15 - Школа”,                “Book · Pencil · Teacher · Class”],
[“16”, “Урок 16 - Місто та місця”,       “Park · Shop · Hospital · Street”],
[“17”, “Урок 17 - Кольори (розширені)”,  “Pink · Orange · Grey · Brown”],
[“18”, “Урок 18 - Числа 11-20”,          “Eleven · Twelve · Twenty”],
[“19”, “Урок 19 - Дієслова дій”,         “Run · Jump · Eat · Sleep”],
[“20”, “Урок 20 - Питання”,              “What · Where · When · Why”],
[“21”, “Урок 21 - Прикметники”,          “Big · Small · Fast · Slow”],
[“22”, “Урок 22 - Пори року”,            “Spring · Summer · Autumn · Winter”],
[“23”, “Урок 23 - Свята”,                “Birthday · Christmas · Easter”],
[“24”, “Урок 24 - Повторення”,           “Review · A1 Level complete!”]
];

```
var rowsHtml = "";
for (var i = 0; i < allLessons.length; i++) {
  rowsHtml += lessonRow(allLessons[i][0], allLessons[i][1], allLessons[i][2]);
}

var bodyFull = (
  "<tr><td style='padding:24px 28px 12px;'>" +
  "<div style='font-size:19px;font-weight:900;color:#2A3A4A;margin-bottom:8px;'>" +
  "Вітаємо, " + parent_name + "! &#127881;</div>" +
  "<p style='font-size:14px;color:#5A7080;line-height:1.7;margin:0;'>" +
  "Ви придбали повний курс для <strong>" + child_name + "</strong>. " +
  "Всі 24 уроки нижче  відкривайте будь-який!" +
  "</p></td></tr>" +
  "<tr><td style='padding:8px 28px 16px;'>" + rowsHtml + "</td></tr>"
);

var htmlFull = wrapEmail("Повний курс  24 уроки для " + child_name, bodyFull);

try {
  var resFull = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { name: "English Quest", email: process.env.SENDER_EMAIL },
      to: [{ email: email, name: parent_name }],
      subject: child_name + "  повний курс English Quest (24 уроки)!",
      htmlContent: htmlFull
    })
  });
  var fullText = await resFull.text();
  console.log("Full email status:", resFull.status, fullText);
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ success: true, plan: "full" })
  };
} catch (err) {
  console.error("Full plan error:", err.message);
  return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
}
```

}

// — FREE PLAN: 3 lessons —
var bodyFree = (
“<tr><td style='padding:24px 28px 16px;'>” +
“<div style='font-size:20px;font-weight:900;color:#2A3A4A;margin-bottom:10px;'>” +
“Вітаємо, “ + parent_name + “! 🎉</div>” +
“<p style='font-size:15px;color:#5A7080;line-height:1.7;margin:0;'>” +
“<strong>” + child_name + “</strong> отримує 3 безкоштовні уроки. Натисніть щоб розпочати!” +
“</p></td></tr>” +
“<tr><td style='padding:0 28px 8px;'>” +
lessonRow(“1”, “Урок 1 - Привітання”,      “Hello · My name is · How are you?”) +
lessonRow(“2”, “Урок 2 - Числа та вік”,     “One to ten · How old are you?”) +
lessonRow(“3”, “Урок 3 - Кольори та форми”, “Red · Blue · Circle · Square”) +
“</td></tr>” +
“<tr><td style='padding:0 28px 16px;'>” +
“<div style='background:#FEF3C7;border:2px solid #FCD34D;border-radius:14px;" +
"padding:14px 16px;font-size:14px;color:#92400E;font-weight:700;line-height:1.6;'>” +
“💡 Порада: виконуйте уроки разом з “ + child_name +
“  кожен урок займає 10-20 хвилин.” +
“</div></td></tr>” +
“<tr><td style='padding:0 28px 24px;text-align:center;'>” +
“<a href='" + baseUrl + "' style='display:inline-block;" +
"background:linear-gradient(145deg,#5BAAF8,#2A6AD8);" +
"color:#fff;text-decoration:none;padding:14px 28px;border-radius:50px;" +
"font-size:15px;font-weight:900;'>Переглянути повний курс (24 уроки) →</a>” +
“</td></tr>”
);

var htmlFree = wrapEmail(“3 безкоштовні уроки для “ + child_name, bodyFree);

try {
var resFree = await fetch(“https://api.brevo.com/v3/smtp/email”, {
method: “POST”,
headers: {
“Accept”: “application/json”,
“Content-Type”: “application/json”,
“api-key”: process.env.BREVO_API_KEY
},
body: JSON.stringify({
sender: { name: “English Quest”, email: process.env.SENDER_EMAIL },
to: [{ email: email, name: parent_name }],
subject: parent_name + “, ваші 3 безкоштовні уроки готові!”,
htmlContent: htmlFree
})
});
var freeText = await resFree.text();
console.log(“Free email status:”, resFree.status, freeText);
return {
statusCode: 200,
headers: { “Access-Control-Allow-Origin”: “*” },
body: JSON.stringify({ success: true, plan: “free” })
};
} catch (err) {
console.error(“Free plan error:”, err.message);
return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
}
};
