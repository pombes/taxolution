# Contact Form Setup Instructions

🎉 **READY TO UPLOAD!** Alle configuratie is al gedaan - upload en het werkt direct!

---

## ✅ Wat is er geïmplementeerd

Je website heeft nu een volledig werkend contact formulier systeem met:

- ✅ **Hosting Email integratie** - Emails worden verzonden via hosting email account
- ✅ **3 formulieren** - Contact page + Footer forms (index & pricing)
- ✅ **Spam bescherming** - Honeypot techniek (onzichtbaar voor gebruikers)
- ✅ **Loading states** - "Sending..." feedback tijdens verzenden
- ✅ **Success/Error messages** - Gebruiksvriendelijke feedback
- ✅ **Form validatie** - Client-side en server-side controles
- ✅ **Moderne UX** - Geen page refresh, smooth animaties
- ✅ **Autocomplete support** - Browser autofill werkt correct
- ✅ **Clean URLs** - URLs zonder .html extensie (bijv. /contact in plaats van /contact.html)

---

## 📦 Bestanden die je moet uploaden naar hosting

Upload deze bestanden naar je hosting via cPanel File Manager of FTP:

```
sidraweb/
├── form-handler.php          ⬅️ HOOFDBESTAND (geen configuratie nodig!)
├── .htaccess                 ⬅️ BELANGRIJK! Clean URLs configuratie
├── js/
│   └── form-handler.js       ⬅️ Formulier handler
├── index.html                ⬅️ BIJGEWERKT
├── pricing.html              ⬅️ BIJGEWERKT
├── contact.html              ⬅️ BIJGEWERKT
└── css/, assets/ (alle andere folders)
```

---

## 🚀 Installatie Stappen (SUPER SIMPEL!)

### Stap 1: Email account aanmaken (als nog niet gedaan)

✅ **BELANGRIJK**: Het email account `info@dubaitaxolution.com` moet bestaan in cPanel!

**Via cPanel:**
1. Log in op **cPanel**
2. Ga naar **Email Accounts**
3. Maak aan: `info@dubaitaxolution.com` (als het nog niet bestaat)
4. Kies een sterk wachtwoord
5. Klik **"Create Account"**

**Test:** Log in op webmail om te verifiëren dat het werkt.

### Stap 2: Upload bestanden

✅ **GOED NIEUWS**: Geen API keys of extra configuratie nodig!

**Via cPanel File Manager:**
1. Log in op **cPanel**
2. Ga naar **File Manager**
3. Navigeer naar je website folder (meestal `public_html/`)
4. Upload alle bestanden:
   - `form-handler.php` → root folder
   - `.htaccess` → root folder (BELANGRIJK voor clean URLs!)
   - `form-handler.js` → `js/` folder
   - Vervang `index.html`, `pricing.html`, `contact.html`
   - Upload alle andere folders (css, assets, js)

**OF via FTP (FileZilla):**
1. Connect met hosting FTP
2. Drag & drop de hele `sidraweb/` folder
3. Overschrijf bestaande bestanden

### Stap 3: Controleer bestandsrechten

1. Klik rechts op `form-handler.php`
2. Kies **"Change Permissions"**
3. Zet op **644** (rw-r--r--)

**BELANGRIJK**: Check ook `.htaccess` bestand:
1. Klik rechts op `.htaccess`
2. Kies **"Change Permissions"**
3. Zet op **644** (rw-r--r--)
4. Zorg dat `.htaccess` in de root folder staat (zelfde folder als index.html)

### Stap 4: Test clean URLs ✅

**BELANGRIJK**: Test of clean URLs werken:

1. Test deze URLs (zonder .html):
   - `jouwwebsite.com/contact` (moet werken)
   - `jouwwebsite.com/pricing` (moet werken)
   - `jouwwebsite.com/` (homepage moet werken)

2. Als deze URLs **niet werken**:
   - Check of `.htaccess` in de root folder staat
   - Check of Apache mod_rewrite enabled is (meestal automatisch op cPanel)
   - Check bestandsrechten van `.htaccess` (moet 644 zijn)

### Stap 5: Test het formulier ✅

1. Ga naar je live website
2. Vul het contact formulier in
3. Klik op **"Send Message"**
4. Je zou moeten zien:
   - Button wordt **"Sending..."**
   - Groen succesbericht: **"Thank you! We will get back to you within 24 hours."**
5. Check je email: **info@dubaitaxolution.com**

---

## 🔗 Clean URLs - Wat moet de klant doen?

### Wat zijn Clean URLs?

Je website gebruikt **clean URLs** - dit betekent dat URLs werken zonder `.html` extensie:
- ✅ `jouwwebsite.com/contact` (werkt)
- ✅ `jouwwebsite.com/pricing` (werkt)
- ❌ `jouwwebsite.com/contact.html` (wordt automatisch doorgestuurd naar /contact)

### Wat moet de klant doen?

**GOED NIEUWS**: Het gaat **AUTOMATISCH** als je het `.htaccess` bestand upload!

**Stappen:**
1. **Upload `.htaccess` bestand** naar de root folder (zelfde folder als `index.html`)
2. **Check bestandsrechten**: Zet op **644** (rw-r--r--)
3. **Test**: Probeer `jouwwebsite.com/contact` (zonder .html) - moet werken!

**Dat is alles!** Geen extra configuratie nodig. Het `.htaccess` bestand zorgt automatisch voor:
- URLs zonder .html werken
- URLs met .html worden doorgestuurd naar clean URLs
- Betere SEO (Google houdt van clean URLs)

### Als het niet werkt:

1. Check of `.htaccess` in de root folder staat
2. Check bestandsrechten (moet 644 zijn)
3. Check of Apache mod_rewrite enabled is (meestal automatisch op cPanel)
4. Contact hosting support als het nog steeds niet werkt

---

## 🔧 Configuratie (optioneel aanpassen)

### Email instellingen (optioneel aanpassen)

✅ **Standaard instellingen zijn AL correct ingevuld:**

```php
define('RECIPIENT_EMAIL', 'info@dubaitaxolution.com');  // Waar emails naartoe gaan
define('SENDER_EMAIL', 'info@dubaitaxolution.com');     // Afzender
define('SENDER_NAME', 'Dubai Taxolution Website');
```

**Alleen aanpassen als je iets wilt wijzigen!**

### Success/Error berichten wijzigen

Open `js/form-handler.js` en zoek naar de success/error messages.

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

### ❌ Clean URLs werken niet

**Probleem**: URLs zonder .html geven 404 error

**Oplossing**:
1. Check of `.htaccess` in de root folder staat (zelfde folder als index.html)
2. Check bestandsrechten van `.htaccess` (moet 644 zijn)
3. Check of Apache mod_rewrite enabled is:
   - cPanel → **Select PHP Version** → **Extensions** → Zorg dat mod_rewrite enabled is
4. Test of `.htaccess` wordt gelezen:
   - Maak een test: `jouwwebsite.com/test` (zou moeten werken als test.html bestaat)
5. Als het nog steeds niet werkt, contact hosting support

### ❌ Email komt niet aan

**Probleem**: Formulier werkt maar geen email ontvangen

**Oplossing**:
1. Check **spam folder**
2. Verifieer dat email account `info@dubaitaxolution.com` bestaat in cPanel
3. Test email account: log in op webmail en check of het werkt
4. Check cPanel error logs:
   - **Metrics** → **Errors**
5. Check PHP mail() functie:
   - cPanel → **Select PHP Version** → Zorg dat mail() enabled is

### ❌ "500 Internal Server Error"

**Probleem**: PHP error

**Oplossing**:
1. Check PHP versie (moet 7.4+ zijn, jij hebt 8.4 ✅)
2. Check error logs in cPanel:
   - **Metrics** → **Errors**
3. Zet tijdelijk debug mode aan in `form-handler.php`:
   ```php
   ini_set('display_errors', 1);  // Regel 4
   ```

---

## 🔒 Beveiliging

### Spam Bescherming

Het formulier heeft een **honeypot** veld:
- Onzichtbaar voor echte gebruikers
- Bots vullen het in → worden geblokt
- Geen reCAPTCHA nodig (betere UX)

### Email Beveiliging

✅ **Veilig**: Email wordt verzonden via hosting mail server (server-side)
✅ **SPF Records**: Meestal al correct ingesteld door hosting provider

---

## 📊 Monitoring

### Email Monitoring

Check verzonden emails:
1. Log in op cPanel
2. Ga naar **Email Accounts**
3. Klik op **"Check Email"** of **"Webmail"**
4. Log in met `info@dubaitaxolution.com`
5. Check inbox voor nieuwe formulier submissions

### Statistieken

Helaas geen automatische tracking zoals bij Brevo, maar je kunt:
- Handmatig emails tellen in inbox
- Check spam folder regelmatig
- Monitor error logs in cPanel

---

## 💡 Tips

1. **Test eerst op een test subdomain** voordat je live gaat
2. **Backup je bestanden** voordat je upload
3. **Check spam folder** bij eerste test
4. **Verify email account** werkt voordat je live gaat
5. **Monitor eerste week** om te zien of alles goed werkt
6. **Check regelmatig spam folder** - sommige emails kunnen daar terechtkomen

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
4. Verify email account bestaat en werkt
5. Contact developer voor hulp

---

## 📝 Checklist

✅ **Email Account**: Moet bestaan in cPanel!
- [ ] Email account `info@dubaitaxolution.com` aangemaakt in cPanel
- [ ] Email account getest (webmail login werkt)
- [ ] Alle bestanden geüpload naar hosting
- [ ] `form-handler.php` → root folder
- [ ] `.htaccess` → root folder (BELANGRIJK!)
- [ ] `form-handler.js` → js/ folder  
- [ ] HTML bestanden vervangen
- [ ] Bestandsrechten gecontroleerd (644 voor .htaccess en form-handler.php)
- [ ] Clean URLs getest (/contact, /pricing werken zonder .html)
- [ ] Formulier getest op alle 3 pagina's
- [ ] Test email ontvangen op info@dubaitaxolution.com
- [ ] Spam folder gecontroleerd
- [ ] Success/error messages werken
- [ ] Loading state werkt ("Sending...")

---

## 🎉 Klaar voor gebruik!

✅ **VOLLEDIG GECONFIGUREERD** - Upload en het werkt direct!

**Configuratie:**
- **Email ontvanger**: info@dubaitaxolution.com  
- **Email provider**: Hosting email (cPanel) - GEEN API KEY NODIG ✅
- **Spam bescherming**: Honeypot actief ✅  
- **Hosting**: cPanel (PHP 8.4) ✅
- **Formulieren**: 3 werkende forms (contact + 2 footer forms) ✅
- **Autocomplete**: Browser autofill support ✅
- **Clean URLs**: URLs zonder .html extensie ✅

---

## 🔄 Verschil met Brevo

**Voordelen hosting email:**
- ✅ Geen externe service nodig
- ✅ Geen API keys
- ✅ Geen maandelijkse kosten/limieten
- ✅ Werkt direct na upload
- ✅ Geen DKIM/DMARC configuratie nodig

**Nadelen:**
- ⚠️ Minder betrouwbaar dan Brevo (kan in spam terechtkomen)
- ⚠️ Geen delivery tracking
- ⚠️ Minder controle over email deliverability

---

**Laatste update**: Switched from Brevo API to hosting email (PHP mail function) + Clean URLs setup
