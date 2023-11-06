import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          "To get started, edit <1>src/App.js</1> and save to reload.":
            "To get started, edit <1>src/App.js</1> and save to reload.",
          "first name": "first name",
          welcome: "Hello <br/> <strong>World</strong>"
        }
      },
      hi: {
        translations: {
          "To get started, edit <1>src/App.js</1> and save to reload.":
            "Starte in dem du, <1>src/App.js</1> editierst und speicherst.",
          "first name": "पहला नाम",
           "Partner Dashboard":"साथी नियंत्रण-पट्ट",
           "Choice on Business":'व्यवसाय पर विकल्प',
           "Customer Dashboard":"ग्राहक नियंत्रण-पट्ट ",
           "Investor Dashboard":"निवेशक  नियंत्रण-पट्ट",
           "Request for solution":" समाधान हेतु अनुरोध"   ,
           "You may also change later":"आप बाद में बदल भी सकते हैं",
           "Select Country":"देश चुनें ",
           "Category":"वर्ग",
           "Store":"भंडार",
           "Move":"कदम",
           "Prepare":"तैयार", 
           "Next":"अगला",
           "General":"सामान्य",
           "Location":"स्थान",
           "Country":"देश",
           "Country*":"देश*",
           "City":"शहर",
           "City*":"शहर*",
           "Product Type":"उत्पाद का प्रकार",
           "Temperature":"तापमान",
           "Unit":"इकाई",
           "Certification":"प्रमाणीकरण",
           "Date Of Storage":"भण्डारण की तिथि",
           "Storage Duration":"भंडारण अवधि",
           "Request for Search":"खोज के लिए अनुरोध",
           "Origin Location":"मूल स्थान",
          
           "From*":"कहा से*",
           "GPS":"GPS",
           "PIN Code":"पिन कोड",
           "Destination Location*":"गंतव्य स्थान*",
           "To*":"कहा तक*",
           "Load Quantity*":"भार मात्रा*",
           "Broad Category*":"विस्तृत श्रेणी*",
           "Dispatch Date":"भेजने की तारीख",
           "Arrival Date":"पहुँचने की तारीख",
           "Product Type*":"उत्पाद का प्रकार",
           "Comment":"टिप्पणी",

           

           //Prepare 
            "Product Category":"उत्पाद श्रेणी",
            "Broad Category":"विस्तृत श्रेणी",
            "Service Category":"सेवा श्रेणी",
            "State*":"राज्य*",
            "Throughput":"प्रवाह",
            "Avg. Case Size":"औसत नाप",
            "Estimated Docks":"अनुमानित गोदियाँ",
            "Estimated Dispatches":"अनुमानित प्रेषण",
          
            "Date of Start":"प्रारंभ की तिथि",
            "Contract Name":" अनुबंध का नाम",
            "Contract Type":"अनुबंध का प्रकार",
          
          
            "General Query":"सामान्य प्रश्न",
            "Send Query":"प्रश्न भेजें",
            "Enter your query":"अपना प्रश्न दर्ज करें",
            "Ticket List":"टिकट सूची",
            "General Ticket List":"सामान्य टिकट सूची",
            "":"",
          
          
              
        }
      }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
