import { db } from "@/lib/db";
import { resend, RESEND_FROM, SITE_URL } from "@/lib/resend";

export async function notifyNewPost(post: { title: string; slug: string; excerpt?: string }) {
  const postUrl = `${SITE_URL}/posts/${post.slug}`;

  type SubRow = { email: string; unsubscribe_token: string };

  const subs = (await db`
    SELECT email, unsubscribe_token
    FROM subscribers
    WHERE confirmed_at IS NOT NULL
      AND unsubscribed_at IS NULL
    ORDER BY id DESC
  `) as SubRow[];

  for (const s of subs) {
    const unsubUrl = `${SITE_URL}/api/subscribe/unsubscribe?token=${s.unsubscribe_token}`;

    await resend.emails.send({
      from: RESEND_FROM,
      to: s.email,
      subject: `New post: ${post.title}`,
      html: `
        <div style="font-family:system-ui">
          <h2>${post.title}</h2>
          ${post.excerpt ? `<p>${post.excerpt}</p>` : ""}
          <p><a href="${postUrl}">Read the post</a></p>
          <hr />
          <p style="font-size:12px"><a href="${unsubUrl}">Unsubscribe</a></p>
        </div>
      `,
    });
  }
}