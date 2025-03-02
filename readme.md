# PayTech SDK 🚀  
Un SDK simple pour intégrer **PayTech** dans vos applications **Next.js / Node.js**.

## 📦 Installation  
Ajoutez le package à votre projet :

```sh
npm i paytech-node-ts-sdk



🔧 Configuration

Dans votre fichier .env, vous devez ajouter ces informations:

PAYTECH_API_KEY=Votre_API_KEY
PAYTECH_API_SECRET=Votre_API_SECRET

Ces clés sont fournies par PayTech lorsque vous vous inscrivez.

Valeur de env
Le paramètre env définit l'environnement dans lequel vous souhaitez opérer :

test : Utilisé pour les tests en local.
prod : Utilisé pour la production. (Contactez l'équipe de PayTech pour activer votre compte en production.)


🚀 Utilisation
1️⃣ Créer une instance du SDK

Dans votre projet Next.js / Node.js, importez et configurez le SDK :

import { PayTech } from "paytech-node-ts-sdk";

const paytech = new PayTech(
  {
    apiKey: process.env.PAYTECH_API_KEY!,
    apiSecret: process.env.PAYTECH_API_SECRET!,
  },
  "test" // ou "prod" selon votre besoin
);
Note : Vous devez créer un fichier .env à la racine de votre projet et y inclure les informations apiKey, apiSecret et env.
Pour récupérer votre apiKey et apiSecret, inscrivez-vous sur la plateforme PayTech.


2️⃣ Créer un paiement

Utilisez la méthode createPayment() pour générer un lien de paiement :

const paymentData = {
  item_name: "Iphone 7",
  item_price: "560000",  // prix de l'élément en devise
  ref_command: "HBZZYZVUZZZV", // référence unique pour la commande
  ipn_url: "https://domaine.com/ipn", // URL pour recevoir les notifications de paiement
  success_url: "https://domaine.com/success", // URL de redirection en cas de succès
  cancel_url: "https://domaine.com/cancel", // URL de redirection en cas d'annulation
};

const paymentData = {
  item_name: "Iphone 7",
  item_price: "560000",  // prix de l'élément en devise
  ref_command: "HBZZYZVUZZZV", // référence unique pour la commande
  ipn_url: "https://domaine.com/ipn", // URL pour recevoir les notifications de paiement
  success_url: "https://domaine.com/success", // URL de redirection en cas de succès
  cancel_url: "https://domaine.com/cancel", // URL de redirection en cas d'annulation
};

paytech.createPayment(paymentData)
  .then(response => {
    console.log("Lien de paiement :", response.redirect_url);  // URL pour rediriger l'utilisateur vers la page de paiement
  })
  .catch(error => console.error("Erreur paiement :", error));


Explication des paramètres :
item_name : Le nom de l'article ou du produit à payer.
item_price : Le prix de l'article (en format string).
ref_command : Une référence unique pour identifier la commande.
ipn_url : L'URL où PayTech enverra des notifications IPN (Instant Payment Notification) lors de l'évolution du paiement.
success_url : L'URL où l'utilisateur sera redirigé en cas de paiement réussi.
cancel_url : L'URL où l'utilisateur sera redirigé en cas d'annulation du paiement.


Note : Assurez-vous que votre serveur est configuré pour accepter des requêtes POST vers l'URL ipn_url pour la gestion des notifications de paiement.

