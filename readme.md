# PayTech SDK 🚀  
Un SDK simple pour intégrer **PayTech** dans vos applications **Next.js / Node.js**.

## 📦 Installation  
Ajoutez le package à votre projet :

```sh
npm install paytech-sdk




🔧 Configuration

Dans votre fichier .env, vous devez ajouter ces informations:

PAYTECH_API_KEY=Votre_API_KEY
PAYTECH_API_SECRET=Votre_API_SECRET




🚀 Utilisation
1️⃣ Créer une instance du SDK

Dans votre projet Next.js / Node.js, importez et configurez le SDK :

import { PayTech } from "paytech-sdk";

const paytech = new PayTech({
    apiKey: process.env.PAYTECH_API_KEY!,
    apiSecret: process.env.PAYTECH_API_SECRET!,
});





2️⃣ Créer un paiement

Utilisez la méthode createPayment() pour générer un lien de paiement :



const paymentData = {
    item_name: "Iphone 7",
    item_price: "560000",
    ref_command: "HBZZYZVUZZZV",
    ipn_url: "https://domaine.com/ipn",
    success_url: "https://domaine.com/success",
    cancel_url: "https://domaine.com/cancel",
};

paytech.createPayment(paymentData)
    .then(response => {
        console.log("Lien de paiement :", response.redirect_url);
    })
    .catch(error => console.error("Erreur paiement :", error));
