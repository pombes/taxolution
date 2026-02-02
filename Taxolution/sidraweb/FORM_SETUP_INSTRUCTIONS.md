# Contact Form Setup Instructions

## ✅ Wat is er geïmplementeerd

Je website heeft nu een volledig werkend contact formulier systeem met:

- ✅ **Brevo API integratie** - Emails worden verzonden via Brevo
- ✅ **3 formulieren** - Contact page + Footer forms (index & pricing)
- ✅ **Spam bescherming** - Honeypot techniek (onzichtbaar voor gebruikers)
- ✅ **Loading states** - "Sending..." feedback tijdens verzenden
- ✅ **Success/Error messages** - Gebruiksvriendelijke feedback
- ✅ **Form validatie** - Client-side en server-side controles
- ✅ **Moderne UX** - Geen page refresh, smooth animaties

---

## 📦 Bestanden die je moet uploaden naar Tasjeel

Upload deze bestanden naar je hosting via cPanel File Manager of FTP:

```
sidraweb/
├── form-handler.php          ⬅️ HOOFDBESTAND (upload naar root)
├── js/
│   └── form-handler.js       ⬅️ NIEUW (upload naar js folder)
├── index.html                ⬅️ BIJGEWERKT
├── pricing.html              ⬅️ BIJGEWERKT
└── contact.html              ⬅️ BIJGEWERKT
```

---

## 🚀 Installatie Stappen

### Stap 1: Upload bestanden

1. Log in op **cPanel** (Tasjeel hosting)
2. Ga naar **File Manager**
3. Navigeer naar je website folder (meestal `public_html/`)
4. Upload:
   - `form-handler.php` → root folder
   - `form-handler.js` → `js/` folder
   - Vervang bestaande `index.html`, `pricing.html`, `contact.html`

### Stap 2: Configureer API Key

⚠️ **BELANGRIJK**: De API key staat NIET in git om veiligheidsredenen!

1. Open `form-handler.php` in cPanel File Manager
2. Klik **"Edit"**
3. Zoek regel 26: `define('BREVO_API_KEY', 'YOUR_BREVO_API_KEY_HERE');`
4. Vervang met de Brevo API key (zie `API_KEY_CONFIG.txt` lokaal bestand)
5. Klik **"Save Changes"**

**BELANGRIJK**: De API key staat in `API_KEY_CONFIG.txt` (niet in git om veiligheidsredenen)

### Stap 3: Controleer bestandsrechten

1. Klik rechts op `form-handler.php`
2. Kies **"Change Permissions"**
3. Zet op **644** (rw-r--r--)

### Stap 4: Test het formulier

1. Ga naar je live website
2. Vul het contact formulier in
3. Klik op **"Send Message"**
4. Je zou moeten zien:
   - Button wordt **"Sending..."**
   - Groen succesbericht: **"Thank you! We'll contact you within 24 hours."**
5. Check je email: **info@dubaitaxolution.com**

---

## 🔧 Configuratie (optioneel aanpassen)

### Email instellingen wijzigen

Open `form-handler.php` en pas aan (regel 18-21):

```php
define('BREVO_API_KEY', 'jouw-api-key-hier');
define('RECIPIENT_EMAIL', 'info@dubaitaxolution.com');  // Waar emails naartoe gaan
define('SENDER_EMAIL', 'info@dubaitaxolution.com');     // Afzender (moet verified zijn in Brevo)
define('SENDER_NAME', 'Dubai Taxolution Website');
```

### Success/Error berichten wijzigen

Open `js/form-handler.js` en zoek regel 49-50 voor custom berichten.

---

## 🐛 Troubleshooting

### ❌ Formulier werkt niet

**Probleem**: Niets gebeurt bij submit

**Oplossing**:
1. Open browser Console (F12 → Console tab)
2. Kijk naar errors
3. Check of `form-handler.js` correct is geladen

### ❌ "Network error" bericht

**Probleem**: Kan form-handler.php niet bereiken

**Oplossing**:
1. Check of `form-handler.php` in de juiste folder staat
2. Test direct: `jouwwebsite.com/form-handler.php`
3. Zou geen 404 error moeten geven

### ❌ Email komt niet aan

**Probleem**: Formulier werkt maar geen email ontvangen

**Oplossing**:
1. Check **spam folder**
2. Verifieer email in Brevo account:
   - Log in op https://app.brevo.com
   - Ga naar **Senders & IP** → Verify `info@dubaitaxolution.com`
3. Check Brevo logs:
   - Dashboard → **Statistics** → **Email**

### ❌ "500 Internal Server Error"

**Probleem**: PHP error

**Oplossing**:
1. Check PHP versie (moet 7.4+ zijn, jij hebt 8.4 ✅)
2. Check error logs in cPanel:
   - **Metrics** → **Errors**
3. Zet tijdelijk debug mode aan in `form-handler.php`:
   ```php
   ini_set('display_errors', 1);  // Regel 3
   ```

---

## 🔒 Beveiliging

### API Key Beveiliging

✅ **Veilig**: API key staat in PHP (server-side), niet zichtbaar voor gebruikers

⚠️ **Extra beveiliging (optioneel)**:
Verplaats API key naar `.env` bestand (vraag aan Sidra als je dit wilt).

### Spam Bescherming

Het formulier heeft een **honeypot** veld:
- Onzichtbaar voor echte gebruikers
- Bots vullen het in → worden geblokt
- Geen reCAPTCHA nodig (betere UX)

---

## 📊 Monitoring

### Brevo Dashboard

Check verzonden emails:
1. https://app.brevo.com
2. **Campaigns** → **Email**
3. Zie alle verstuurde formulier emails

### Statistieken

Zie hoeveel emails zijn verzonden en open rate (als tracking enabled is).

---

## 💡 Tips

1. **Test eerst op een test subdomain** voordat je live gaat
2. **Backup je bestanden** voordat je upload
3. **Check spam folder** bij eerste test
4. **Verify sender email** in Brevo voor beste deliverability
5. **Monitor eerste week** om te zien of alles goed werkt

---

## ✉️ Test Email

Bij succesvol verzenden krijg je een email met:
- Mooie HTML opmaak
- Alle formulier velden netjes geformatteerd
- Dubai Taxolution branding
- Reply-to naar klant email

---

## 🆘 Support

Als je problemen hebt:
1. Check deze instructies nogmaals
2. Kijk in browser Console (F12) voor errors
3. Check cPanel error logs
4. Contact Sidra voor hulp

---

## 📝 Checklist

- [ ] `form-handler.php` geüpload
- [ ] `form-handler.js` geüpload
- [ ] Formulier getest op alle 3 pagina's
- [ ] Test email ontvangen
- [ ] Spam folder gecontroleerd
- [ ] Success/error messages werken
- [ ] Loading state werkt ("Sending...")

---

## 🎉 Klaar!

Je formulieren zijn nu volledig werkend en professioneel geïntegreerd met Brevo API!

**Email ontvanger**: info@dubaitaxolution.com  
**API Provider**: Brevo (Sendinblue)  
**Spam bescherming**: Honeypot ✅  
**Hosting**: Tasjeel (PHP 8.4) ✅
