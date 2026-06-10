import nodemailer from 'nodemailer';
import type { Attachment } from 'nodemailer/lib/mailer';
import { siteConfig, contactInfo, licenseInfo } from '@/config/site';

const EMAIL_ENABLED = process.env.ENABLE_EMAIL === 'true';
const FROM = process.env.EMAIL_FROM ?? `Specialist Group <no-reply@${siteConfig.domain}>`;
const ADMIN = process.env.ADMIN_EMAIL ?? contactInfo.email;

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!EMAIL_ENABLED) return null;
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return transporter;
}

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
}

async function sendMail({ to, subject, html, replyTo, attachments }: SendArgs): Promise<boolean> {
  const tx = getTransporter();
  if (!tx) {
    // Email disabled (no SMTP configured). Log so the workflow is observable
    // in development without failing the request.
    console.info(`[mail] (disabled) → ${to} · ${subject}`);
    return false;
  }
  try {
    await tx.sendMail({ from: FROM, to, subject, html, replyTo, attachments });
    return true;
  } catch (error) {
    console.error('[mail] send failed:', error);
    return false;
  }
}

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${title}</title></head>
<body style="margin:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;color:#0b2545;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 16px rgba(8,28,55,.08);">
        <tr><td style="background:#0b2545;padding:22px 28px;">
          <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:.5px;">SPECIALIST <span style="color:#34b886;">GROUP</span></span>
          <div style="color:rgba(255,255,255,.6);font-size:11px;letter-spacing:2px;margin-top:4px;">LICENSED WORKFORCE · UZBEKISTAN</div>
        </td></tr>
        <tr><td style="padding:28px;">${bodyHtml}</td></tr>
        <tr><td style="background:#f8fafc;padding:18px 28px;border-top:1px solid #e2e8f0;color:#5b6776;font-size:12px;line-height:1.6;">
          ${siteConfig.legalName} · License No. ${licenseInfo.licenseNumber}<br>
          ${contactInfo.address.line1}, ${contactInfo.address.city}, ${contactInfo.address.country}<br>
          <a href="mailto:${contactInfo.email}" style="color:#0e7a57;">${contactInfo.email}</a> · ${contactInfo.phone}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;color:#5b6776;font-size:13px;width:160px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#0b2545;font-size:14px;font-weight:600;">${value || '—'}</td>
  </tr>`;
}

const esc = (s: string) =>
  String(s ?? '').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]!);

export interface EmployerRequestEmailData {
  trackingNumber: string;
  companyName: string;
  contactPerson: string;
  country: string;
  email: string;
  phone: string;
  industry: string;
  workersCount: number;
  requiredSkills: string;
  deploymentDate?: string | null;
  additionalNotes?: string | null;
}

export async function notifyNewEmployerRequest(
  data: EmployerRequestEmailData,
  attachment?: Attachment,
): Promise<boolean> {
  const body = `
    <h1 style="margin:0 0 6px;font-size:20px;">New workforce request</h1>
    <p style="margin:0 0 18px;color:#5b6776;font-size:14px;">Tracking number <strong style="color:#0b2545;">${esc(data.trackingNumber)}</strong></p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Company', esc(data.companyName))}
      ${row('Contact person', esc(data.contactPerson))}
      ${row('Country', esc(data.country))}
      ${row('Email', esc(data.email))}
      ${row('Phone', esc(data.phone))}
      ${row('Industry', esc(data.industry))}
      ${row('Workers needed', String(data.workersCount))}
      ${row('Deployment date', esc(data.deploymentDate ?? ''))}
      ${row('Required skills', esc(data.requiredSkills))}
      ${row('Notes', esc(data.additionalNotes ?? ''))}
      ${attachment ? row('Attachment', esc(String(attachment.filename ?? 'file'))) : ''}
    </table>`;
  return sendMail({
    to: ADMIN,
    subject: `New workforce request · ${data.trackingNumber} · ${data.companyName}`,
    html: layout('New workforce request', body),
    replyTo: data.email,
    attachments: attachment ? [attachment] : undefined,
  });
}

export async function confirmEmployerRequest(data: EmployerRequestEmailData): Promise<boolean> {
  const body = `
    <h1 style="margin:0 0 12px;font-size:20px;">Thank you, ${esc(data.contactPerson)}</h1>
    <p style="margin:0 0 16px;color:#334155;font-size:14px;line-height:1.7;">
      We have received your workforce request and our recruitment specialists will respond within one business day.
      Please keep your tracking number for reference.
    </p>
    <div style="background:#f0fdf9;border:1px solid #a7f3d0;border-radius:10px;padding:16px;text-align:center;margin:0 0 18px;">
      <div style="color:#5b6776;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Your tracking number</div>
      <div style="color:#0b2545;font-size:24px;font-weight:800;letter-spacing:1px;margin-top:4px;">${esc(data.trackingNumber)}</div>
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Industry', esc(data.industry))}
      ${row('Workers needed', String(data.workersCount))}
    </table>`;
  return sendMail({
    to: data.email,
    subject: `We received your request · ${data.trackingNumber}`,
    html: layout('Request received', body),
  });
}

export async function notifyNewContact(data: {
  name: string;
  email: string;
  company?: string;
  country?: string;
  subject?: string;
  message: string;
}): Promise<boolean> {
  const body = `
    <h1 style="margin:0 0 14px;font-size:20px;">New contact message</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Name', esc(data.name))}
      ${row('Email', esc(data.email))}
      ${row('Company', esc(data.company ?? ''))}
      ${row('Country', esc(data.country ?? ''))}
      ${row('Subject', esc(data.subject ?? ''))}
    </table>
    <p style="margin:16px 0 6px;color:#5b6776;font-size:13px;">Message</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;color:#0b2545;font-size:14px;line-height:1.7;white-space:pre-wrap;">${esc(data.message)}</div>`;
  return sendMail({
    to: ADMIN,
    subject: `New contact message · ${data.name}`,
    html: layout('New contact message', body),
    replyTo: data.email,
  });
}
