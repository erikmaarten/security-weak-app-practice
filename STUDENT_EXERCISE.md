# Exercise 3 (optional): Security review of a notes app

Work in pairs. Find security issues in the **Notes Review Lab**. The exercise is complete when you can
explain what you found, why it matters, and how you would test a fix. Implementing fixes is an extension.

Everything here is fictional and local. **Do not paste real keys or credentials anywhere.**

## For each issue, explain
1. What you did.
2. What happened.
3. Why that could be a problem.
4. Where the check or change should be made.
5. How you would test the fix.

## Getting started
1. Start the app (your instructor will tell you the address, normally http://127.0.0.1:5173).
2. Sign in as **Alice**: `alice@example.test` / `alice123`. Other accounts: `bob@example.test` / `bob123`, `admin@example.test` / `admin123`.
3. Open Alice's note and explore normally.
4. Open browser developer tools → **Network** tab, then reload so requests appear.
5. Work through the challenges. Compare observations with your partner. Use **Reset practice data** when done.

## Challenge A: Whose note can you open?
Alice can open `/notes/101`. What happens if you change the number in the address to `102`?
- Does the app show a different person's note?
- What should the server check before returning a note?
- Would hiding Bob's note from Alice's list be enough?

*Hint 1:* Which part of the address identifies the note?
*Hint 2:* In Network, find the request that retrieves the note. Compare the requested ID with the signed-in user.

## Challenge B: Whose note can you change?
- Identify the request sent when Alice saves her own note.
- What would happen if the same kind of request referred to note `102`?
- What should the server check before saving?

*Hint 1:* Save a small change while Network is open. Look for a `PUT` request.
*Hint 2:* Use "Edit and Resend" (if your browser has it) or ask for the request template. Change **only** the note ID and use fictional text.
*Check:* Sign in as Bob and inspect his note. Reset afterwards.

## Challenge C: Is the admin page protected?
Signed in as Alice:
- Is there an Admin link in Alice's interface?
- What happens if Alice requests the admin endpoint directly?
- How is being signed in different from being an administrator?

*Hint 1:* The endpoint is `/api/admin/users`; try it in the address bar.
*Hint 2:* Sign in as admin, inspect the request the admin page makes, then compare as Alice.

## Challenge D: Can you find the fake key?
The app has an AI-related feature. Is a private-looking key included in what is sent to the browser?

*Hint 1:* Use Sources search or inspect Network responses. Search for `FAKE_SECRET_KEY`.
*Hint 2:* Does the browser need the key itself, or could it ask the server to do the work?

## Report format
> “As Alice, we did **[action]**. The app returned or changed **[result]**. The server should check **[permission]**. We would verify the fix by **[test]**.”
