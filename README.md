# 💌 DM Me Webpage

A **modern, sleek webpage** that allows users to send messages directly to a Discord channel via a secure server. Features an optional name input, 4K live video background, and Discord notifications (pings).  

---

## 🚀 Features

- **Modern DM card interface** with smooth fade-in animations  
- **Optional name input** for personalized messages  
- **4K live video background** for a premium look  
- Messages are sent through a **backend server**, keeping your Discord webhook private  
- Automatic **Discord ping** for notifications  
- Fully **responsive** on desktop and mobile  

---

## ⚙️ Installation

1. Clone the repository:  
```bash
git clone https://github.com/yourusername/message-button-page.git
cd message-button-page
```  

2. Install dependencies:  
```bash
npm install
```  

3. Update the backend (`index.js`) with your Discord webhook and user ID:  
```js
const WEBHOOK = 'YOUR_DISCORD_WEBHOOK';
const YOUR_USER_ID = 'YOUR_DISCORD_USER_ID';
```  

4. Start the server:  
```bash
npm start
```  

5. Open `index.html` in your browser, or deploy the project to **Render**.  

---

## 📝 Usage

- Users can optionally enter their **name**. If left blank, messages will appear as from **Anonymous**.  
- Messages are sent to Discord securely via the server, keeping your webhook hidden.  
- You will receive a **ping notification** on Discord whenever someone sends a message.  

---

## 📂 File Structure

```
├─ index.html        # Frontend page with DM card and live background
├─ index.js          # Backend Node.js server handling webhook posts
├─ package.json      # Node.js project configuration
├─ profile.png       # Profile picture displayed on the DM card
├─ background.mp4    # 4K live background video
```

---

## 📦 Dependencies

- [Express](https://www.npmjs.com/package/express) – Node.js web framework  
- [CORS](https://www.npmjs.com/package/cors) – To allow cross-origin requests  
- [node-fetch](https://www.npmjs.com/package/node-fetch) – To send requests to Discord  

---

## ⚠️ Notes

- Ensure your Discord **user ID** is correct and that you are in the same server as the webhook, otherwise pings will show as **Unknown User**.  
- Keep your webhook URL **private** — do not expose it in frontend code.
