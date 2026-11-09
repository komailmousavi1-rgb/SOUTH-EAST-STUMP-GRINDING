# South East Stump Grinding

A static site with a business homepage at `/` and a dedicated Google and Meta Ads landing page at `/quote/`. Use the deployed site's `/quote/` URL as the destination for both campaigns. Standard UTM values are included in quote submissions when present. There are no advertising pixels or ad account connections in the source.

## Deploy and enable enquiries

1. Import this GitHub repository in Netlify. The checked-in `netlify.toml` publishes the `public` folder with no build command.
2. In the Netlify site's **Forms** tab, enable form detection, then redeploy. Confirm `stump-quote` appears under active forms.
3. In **Forms → Submission notifications**, add an email notification for `stump-quote` to **komailmousavi4@gmail.com**.
4. From the live `/quote/` page, submit a labelled test enquiry. Confirm the thank-you page, the entry under verified submissions in Netlify, and the notification in Gmail before directing paid traffic to the site.

The form sends directly from the page and uses Netlify Forms for processing. No client email app or customer account is required. On a local static preview the pages render, but the form cannot accept submissions. GitHub is the source repository. Use Netlify to serve the site and handle enquiries.

- [Netlify form detection and submission setup](https://docs.netlify.com/manage/forms/setup/)
- [Netlify email notifications](https://docs.netlify.com/manage/forms/notifications/)
