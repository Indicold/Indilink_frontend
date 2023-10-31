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

          //Partner 


          "Are You Facility Manager":"क्या आप सुविधा प्रबंधक हैं",
          "Facility Manager*":"सुविधा प्रबंधक*",
          "Contact Number*":"संपर्क संख्या",
          "Address*":"पता",
          "Total Tonnage(MT)*":"कुल टन भार*",
          "Type Of Store*":"स्टोर का प्रकार*",
          "Type of Cold Storage*":"कोल्ड स्टोरेज का प्रकार*",
          "Ante Room - Area (Square feet)*":"पूर्व कक्ष - क्षेत्रफल (वर्ग फुट)*",
          "Total number of docks*":"गोदी की कुल संख्या",
          "Total office space(Square feet)*":"कुल कार्यालय स्थान (वर्ग फुट)",
          "Type of docks*":"गोदी का प्रकार",
          "Processing Area(Square feet)*":"प्रसंस्करण क्षेत्र(वर्ग फुट)",
          "Parking Area(Square feet)*":"पार्किंग क्षेत्र(वर्ग फुट)",
          "Type of Refrigeration*":"प्रशीतन का प्रकार",
          "Year of Installation*":"स्थापना का वर्ष",
          "Internet":"इंटरनेट",
          "Wifi":"वाईफ़ाई",
          "CCTV":"सीसीटीवी",
          "Driver Area for Food and Resting":"भोजन एवं विश्राम हेतु चालक क्षेत्र",
          "Weighbridge*":"तुलाचौकी",
          "Road condition from main road*":"मुख्य सड़क से सड़क की स्थिति",
          "Photo Of Assets*":"संपत्ति का फोटो",
          "3D Photo*":"3डी फोटो",
          "Chambers":"कक्ष",
          "Currently there are no chambers.":"फिलहाल कोई कक्ष नहीं है",
          "Add details":"विवरण जोड़ें",
          "CA Equipments":"सीए उपकरण",
          "Currently there are no CA Equipments.":"वर्तमान में कोई सीए उपकरण नहीं हैं।",
          "Compressors":"कंप्रेसर",
          "Currently there are no Compressors.":"वर्तमान में कोई कंप्रेसर नहीं हैं.",
          "ACU":"ACU",
          "Currently there are no ACUs.":"वर्तमान में कोई एसीयू नहीं हैं",
          "Condenser":"कंडेनसर",
          "Currently there are no Condenser.":"फिलहाल कोई कंडेनसर नहीं है.",
          "Annual Maintenance Contract":"वार्षिक रखरखाव अनुबंध",
          "Currently there are no AMCs.":"वार्षिक रखरखाव अनुबंध",
          "IOT Devices":"आईओटी उपकरण",
          "Currently there are no IOT Devices.":"वर्तमान में कोई IOT डिवाइस नहीं हैं",
          "IT Devices":"आईटी उपकरण",
          "Generator":"उत्पादन",
          "Currently there are no generators.":"वर्तमान में कोई जनरेटर नहीं हैं",
          "MHE":"एमएचई",
          "Currently there are no MHEs.":"वर्तमान में कोई एमएचई नहीं हैं",
          "Solar Inverters":"सोलर इनवर्टर",
          "Currently there are no solar inverters.":"वर्तमान में कोई सोलर इनवर्टर नहीं हैं",
          "Prev":"पिछला",
          "Currently there are no IT Devices.":"वर्तमान में कोई आईटी उपकरण नहीं हैं।"

            
          
          
              
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
