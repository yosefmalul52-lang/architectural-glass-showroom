import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
  contactFormSchema,
  getProjectScopeLabel,
  type ContactFormData,
} from "@/lib/contact-form-schema";
import { escapeHtml } from "@/lib/escape-html";

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): { limited: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now >= existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { limited: false };
  }

  if (existing.count >= RATE_MAX_REQUESTS) {
    return {
      limited: true,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { limited: false };
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP credentials are missing");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function getMailFrom(): string {
  return process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "noreply@tzameret-glass.co.il";
}

function renderLeadHtml(data: ContactFormData): string {
  const fullName = escapeHtml(data.fullName);
  const phone = escapeHtml(data.phone);
  const email = escapeHtml(data.email);
  const projectType = escapeHtml(data.projectType);
  const projectScope = escapeHtml(getProjectScopeLabel(data.projectScope));
  const notes = data.notes ? escapeHtml(data.notes).replace(/\n/g, "<br/>") : "ללא הערות";
  const showroomInterest = data.showroomInterest
    ? escapeHtml(data.showroomInterest)
    : "לא נבחר";

  return `
  <div dir="rtl" style="font-family: Assistant, Rubik, Arial, sans-serif; background:#f5ede3; padding:24px; color:#1a1a1a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #c8b49b;">
      <tr>
        <td style="padding:24px 28px; border-bottom:1px solid #e8dcc9;">
          <h2 style="margin:0; font-size:24px; font-weight:700;">ליד חדש התקבל באתר צמרת הזכוכית</h2>
          <p style="margin:8px 0 0; color:#5f5f5f; font-size:14px;">התקבלה פנייה חדשה מטופס יצירת הקשר.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.7;">
            <tr><td style="padding:6px 0; width:140px; color:#7a6b59;">שם מלא</td><td style="padding:6px 0; font-weight:600;">${fullName}</td></tr>
            <tr><td style="padding:6px 0; color:#7a6b59;">טלפון</td><td style="padding:6px 0; font-weight:600;">${phone}</td></tr>
            <tr><td style="padding:6px 0; color:#7a6b59;">אימייל</td><td style="padding:6px 0; font-weight:600;">${email}</td></tr>
            <tr><td style="padding:6px 0; color:#7a6b59;">סוג פרויקט</td><td style="padding:6px 0; font-weight:600;">${projectType}</td></tr>
            <tr><td style="padding:6px 0; color:#7a6b59;">היקף פרויקט</td><td style="padding:6px 0; font-weight:600;">${projectScope}</td></tr>
            <tr><td style="padding:6px 0; color:#7a6b59;">עניין מהגלריה</td><td style="padding:6px 0; font-weight:600;">${showroomInterest}</td></tr>
            <tr><td style="padding:12px 0 6px; color:#7a6b59; vertical-align:top;">הערות</td><td style="padding:12px 0 6px; font-weight:500;">${notes}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

function renderAutoReplyHtml(data: ContactFormData): string {
  const fullName = escapeHtml(data.fullName);
  const projectType = escapeHtml(data.projectType);
  const phone = escapeHtml(data.phone);

  return `
  <div dir="rtl" style="font-family: Assistant, Rubik, Arial, sans-serif; background:#f5ede3; padding:24px; color:#1a1a1a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #c8b49b;">
      <tr>
        <td style="padding:24px 28px; border-bottom:1px solid #e8dcc9;">
          <h2 style="margin:0; font-size:24px; font-weight:700;">תודה על הפנייה, ${fullName}</h2>
          <p style="margin:10px 0 0; color:#5f5f5f; font-size:15px;">
            קיבלנו את פנייתך בנושא ${projectType} ונחזור אליך תוך 24 שעות עם המשך תיאום.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 28px;">
          <p style="margin:0; font-size:15px; line-height:1.8;">
            בצמרת הזכוכית אנו מלווים כל פרויקט משלב התכנון ועד הביצוע ברמת גימור פרימיום.
          </p>
          <p style="margin:16px 0 0; font-size:15px; line-height:1.8;">
            נציג מטעמנו יחזור למספר שהשארת: <strong dir="ltr">${phone}</strong>.
          </p>
          <p style="margin:12px 0 0; font-size:15px; line-height:1.8;">
            לשאלות דחופות ניתן להשיב למייל זה או ליצור קשר טלפוני ישיר.
          </p>
          <p style="margin:24px 0 0; color:#7a6b59; font-size:14px;">
            צמרת הזכוכית · זכוכית אדריכלית — תכנון, הנדסה וביצוע
          </p>
        </td>
      </tr>
    </table>
  </div>`;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = isRateLimited(ip);
  if (rate.limited) {
    return NextResponse.json(
      { error: "בוצעו יותר מדי ניסיונות. נסו שוב בעוד כמה דקות." },
      {
        status: 429,
        headers: rate.retryAfterSec
          ? { "Retry-After": String(rate.retryAfterSec) }
          : undefined,
      }
    );
  }

  let parsed: ContactFormData;
  try {
    const body = await request.json();
    parsed = contactFormSchema.parse(body);
  } catch {
    return NextResponse.json(
      { error: "פרטי הטופס אינם תקינים. בדקו את השדות ונסו שוב." },
      { status: 400 }
    );
  }

  const leadToEmail = process.env.LEAD_TO_EMAIL ?? "tzamerethazchuchit@gmail.com";

  try {
    const transporter = getTransporter();
    const from = getMailFrom();

    const leadMailPromise = transporter.sendMail({
      from,
      to: leadToEmail,
      replyTo: parsed.email,
      subject: `פנייה חדשה מהאתר — ${parsed.fullName}`,
      html: renderLeadHtml(parsed),
    });

    const autoReplyPromise = transporter
      .sendMail({
        from,
        to: parsed.email,
        subject: "הפנייה שלך התקבלה — צמרת הזכוכית",
        html: renderAutoReplyHtml(parsed),
      })
      .catch((error) => {
        console.error("[contact:auto-reply] failed", error);
        return null;
      });

    await Promise.all([leadMailPromise, autoReplyPromise]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] failed", error);
    return NextResponse.json(
      { error: "לא הצלחנו לשלוח את הפנייה כעת. נסו שוב בעוד רגע." },
      { status: 500 }
    );
  }
}
