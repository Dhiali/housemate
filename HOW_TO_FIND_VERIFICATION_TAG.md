# How to Find Your Google Search Console Verification Tag

## 🔍 If You Already Verified Your Domain

### Method 1: Through Google Search Console Settings

1. **Go to Google Search Console**: https://search.google.com/search-console
2. **Select your property** (housemate.website)
3. **Click the Settings gear icon** (⚙️) in the left sidebar
4. **Click "Ownership verification"**
5. **Find the "HTML tag" method** in the list
6. **Copy the content attribute value** from the meta tag

The tag will look like this:
```html
<meta name="google-site-verification" content="ABC123DEF456GHI789..." />
```

You need to copy just the content part: `ABC123DEF456GHI789...`

### Method 2: Re-verify to See the Tag

1. **Go to Google Search Console**: https://search.google.com/search-console
2. **Click "Add a property"** (even though it's already verified)
3. **Enter your domain**: `housemate.website`
4. **Choose "HTML tag" verification method**
5. **Copy the verification code** from the meta tag shown
6. **Cancel the process** (since you're already verified)

### Method 3: Check Your Current HTML File

Let me check if you already have a verification tag in your HTML:

```html
<!-- Look for this line in your index.html: -->
<meta name="google-site-verification" content="YOUR_CODE_HERE" />
```

## 🎯 What to Do Next

1. **Find your verification code** using one of the methods above
2. **Replace the placeholder** in your `frontend/index.html` file:
   
   **Current placeholder:**
   ```html
   <meta name="google-site-verification" content="REPLACE_WITH_YOUR_VERIFICATION_CODE" />
   ```
   
   **Replace with your actual code:**
   ```html
   <meta name="google-site-verification" content="ABC123DEF456GHI789..." />
   ```

3. **Keep the verification tag** even after verification for ongoing validation

## 📝 Alternative: Check Your DNS Records

If you used DNS verification instead of HTML tag:

1. **Go to your domain registrar** (where you bought housemate.website)
2. **Check DNS records** for a TXT record
3. **Look for a record** starting with `google-site-verification=`
4. **Copy the value** after the equals sign

## ⚠️ Important Notes

- **Don't remove the verification tag** after verification - Google checks it periodically
- **The tag doesn't affect site performance** - it's just a small meta tag
- **Multiple verification methods** can coexist (HTML tag + DNS)
- **Verification is per subdomain** - www.housemate.website vs housemate.website may need separate verification

## 🔄 If You Can't Find It

If you can't locate your verification tag:

1. **Use DNS verification instead** (permanent and doesn't require HTML changes)
2. **Re-verify using HTML tag method** to get a fresh verification code
3. **Contact your domain provider** if you used DNS method and need the record

---

**Next Step**: Once you have your verification code, update the placeholder in your `index.html` file!