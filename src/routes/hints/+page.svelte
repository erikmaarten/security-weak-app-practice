<svelte:head><title>Hints – Notes Review Lab</title></svelte:head>

<h1>Hints</h1>
<p>
	Four things in this app are deliberately wrong. Open the hints one at a time — try each
	challenge yourself first. All data is fictional.
</p>

<h2>What to look for</h2>

<h3>A. Reading a note</h3>
<details><summary>Hint 1</summary>Look at the address of an open note. Which part identifies it?</details>
<details><summary>Hint 2</summary>In Network, find the request that loads the note. The page is protected, but what about the request behind it?</details>
<details><summary>Hint 3</summary>Signed in as Alice, request note <code>102</code>. Whose note comes back? What should the server compare?</details>

<h3>B. Changing a note</h3>
<details><summary>Hint 1</summary>Save Alice's note with Network open and find the <code>PUT</code> request.</details>
<details><summary>Hint 2</summary>Send the same kind of request to a different note ID (terminal recipe below). Use fictional text.</details>
<details><summary>Hint 3</summary>Is "can read" the same check as "can change"? Check Bob's note afterwards, then reset.</details>

<h3>C. The admin area</h3>
<details><summary>Hint 1</summary>Is there an Admin link for Alice? Does that mean the data behind it is protected?</details>
<details><summary>Hint 2</summary>Find the request the admin page makes and send it as Alice.</details>
<details><summary>Hint 3</summary>"Signed in" and "is an administrator" are different questions. Which one does the server ask?</details>

<h3>D. The fake key</h3>
<details><summary>Hint 1</summary>Open the note page and use the AI summary feature, then look at what the browser downloaded.</details>
<details><summary>Hint 2</summary>Search Sources or the Network responses for <code>FAKE_SECRET_KEY</code>.</details>
<details><summary>Hint 3</summary>Does the browser really need the key, or could the server do the work?</details>

<h2>Sending requests from a terminal</h2>
<p>
	Use <code>curl</code>. Replace the address if your instructor gave you a different one. The app
	remembers you with a cookie, so we save it in a "cookie jar" file.
</p>

<h3>1. Sign in and save the cookie</h3>
<pre>curl -i -c cookies.txt \
  -H 'Origin: http://127.0.0.1:5173' \
  -d 'email=alice@example.test&amp;password=alice123' \
  http://127.0.0.1:5173/login</pre>
<p>
	Expect <code>HTTP/1.1 303</code> and a <code>set-cookie: session=…</code> header. A
	<code>403</code> usually means the <code>Origin</code> header is missing or wrong.
</p>

<h3>2. Read a note</h3>
<pre>curl -b cookies.txt http://127.0.0.1:5173/api/notes/101</pre>
<p>Change the number to try another note. Add <code>-i</code> to see the status code.</p>

<h3>3. Update a note</h3>
<pre>curl -i -b cookies.txt -X PUT \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://127.0.0.1:5173' \
  -d '{"{"}"title":"Test title","body":"Fictional test text"}' \
  http://127.0.0.1:5173/api/notes/101</pre>
<p>Both <code>title</code> and <code>body</code> are required.</p>

<h3>4. Request the admin user list</h3>
<pre>curl -i -b cookies.txt http://127.0.0.1:5173/api/admin/users</pre>

<h3>5. Switch accounts</h3>
<p>Use a different cookie file per account so you can compare:</p>
<pre>curl -i -c bob.txt -H 'Origin: http://127.0.0.1:5173' \
  -d 'email=bob@example.test&amp;password=bob123' http://127.0.0.1:5173/login
curl -b bob.txt http://127.0.0.1:5173/api/notes/102</pre>
<p>Admin: <code>admin@example.test</code> / <code>admin123</code>.</p>

<h3>6. Reset the practice data</h3>
<pre>curl -X POST -H 'Origin: http://127.0.0.1:5173' http://127.0.0.1:5173/api/reset</pre>

<h3>7. Search served code for the fake key</h3>
<p>Find the JavaScript files in the Network tab, then:</p>
<pre>curl -s &lt;URL-of-a-script-file&gt; | grep FAKE_SECRET_KEY</pre>

<h3>Reading the results</h3>
<ul>
	<li><code>200</code> — it worked. <code>401</code> — not signed in. <code>403</code> — signed in but not allowed. <code>404</code> — not found.</li>
	<li>If a request returns data you shouldn't see, or changes something you shouldn't be able to change, that's a finding. Write down who you were signed in as.</li>
</ul>

<style>
	pre {
		background: #1e1e1e;
		color: #eee;
		padding: 0.75rem;
		overflow-x: auto;
		border-radius: 4px;
	}
	details {
		margin: 0.25rem 0;
		padding: 0.4rem 0.6rem;
		background: white;
		border: 1px solid #ddd;
	}
	summary {
		cursor: pointer;
		font-weight: 600;
	}
</style>
