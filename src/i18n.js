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
          'Status':"स्थिति",
          'Save':'बचाना',
          'Licence No':'लाइसेंस संख्या',
          "Valid Till":"तक मान्य",
           "Partner Dashboard":"साथी नियंत्रण-पट्ट",
           "Partner":"साथी",
           "Bussiness Type":"व्यापार के प्रकार",
           "Type":"प्रकार", 
           "Choice on Business":'व्यवसाय पर विकल्प',
           "Customer Dashboard":"ग्राहक नियंत्रण-पट्ट ",
           "Customer":"ग्राहक",
           "Investor":"निवेशक",
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
           "Unit*":"इकाई*",
           "Certification":"प्रमाणीकरण",
           "Date Of Storage":"भण्डारण की तिथि",
           "Storage Duration":"भंडारण अवधि",
           "Request for Search":"खोज के लिए अनुरोध",
           "Origin Location":"मूल स्थान",
           "Storage Duration*":"भंडारण अवधि*",
          
           "From*":"कहा से*",
           "GPS":"GPS",
           "PIN Code":"पिन कोड",
           "Destination Location*":"गंतव्य स्थान*",
           "To*":"कहा तक*",
           "Load Quantity*":"भार मात्रा*",
           "Broad Category*":"विस्तृत श्रेणी*",
           "Dispatch Date":"भेजने की तारीख",
           "Arrival Date":"पहुँचने की तारीख",
           "Product Type*":"उत्पाद का प्रकार*",
           "Comment":"टिप्पणी",
           'Active':'क्रियात्मक',
           'Passive':'निष्क्रिय',
           'Area Of Land':'भूमि का क्षेत्रफल',
           'Cold Storage Name':'कोल्ड स्टोरेज का नाम',


           

           //Prepare 
            "Product Category*":"उत्पाद श्रेणी*",
            "Broad Category":"विस्तृत श्रेणी",
            "Service Category*":"सेवा श्रेणी*",
            "State*":"राज्य*",
            "Throughput*":"प्रवाह*",
            "Avg. Case Size*":"औसत नाप*",
            "Estimated Docks":"अनुमानित गोदियाँ",
            "Estimated Dispatches":"अनुमानित प्रेषण",
            "Estimated Docks*":"अनुमानित गोदियाँ*",
            "Estimated Dispatches*":"अनुमानित प्रेषण*",
          
            "Date of Start":"प्रारंभ की तिथि",
            "Contract Name":" अनुबंध का नाम",
            "Contract Type":"अनुबंध का प्रकार",
            "Temperature*":"तापमान*",
          
          
            "General Query*":"सामान्य प्रश्न*",
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
          "Currently there are no IT Devices.":"वर्तमान में कोई आईटी उपकरण नहीं हैं।",
          'Asset Specifications':"संपत्ति विशिष्टताएँ",
          "Compliance Details":"अनुपालन विवरण",
          "Ammount Of Investment":"निवेश की राशि",
            
          
          
              
        }
      },
      nep:{
        translations:{
          'Save':'बचत गर्नुहोस्',
          'Status':"स्थिति",
          'Not Approved':'अनुमती नहीं',
          'Approved':'अनुमती है',
          'Licence No':'इजाजतपत्र नं',
          "Valid Till":"सम्म मान्य",
          'Cold Storage Name':'कोल्ड स्टोरेज नाम',
          'Area Of Land':'जमिनको क्षेत्रफल',
          'Active':'क्रियाशील',
          'Passive':'निष्क्रिय',
          "To get started, edit <1>src/App.js</1> and save to reload.":
          "Starte in dem du, <1>src/App.js</1> editierst und speicherst.",
          "first name": "पहिलो नाम",
          "Bussiness Type":"व्यापार प्रकार",
          "Ammount Of Investment":"लगानीको रकम",
          "Partner":"साझेदार",
          "Type":"प्रकार", 
          "Partner Dashboard":"साझेदार ड्यासबोर्ड",
          "Choice on Business":'व्यवसाय मा छनोट',
          "Customer Dashboard":"ग्राहक ड्यासबोर्ड ",
          "Customer":"ग्राहक",
          "Investor Dashboard":"लगानीकर्ता ड्यासबोर्ड",
          "Investor":"लगानीकर्ता",
          "Request for solution":"समाधानको लागि अनुरोध",
          "You may also change later":"तपाईं पछि परिवर्तन पनि गर्न सक्नुहुन्छ",
          "Select Country":"देश चयन गर्नुहोस् ",
          "Category":"श्रेणी",
          "Store":"पसल",
          "Move":"चल्नु",
          "Prepare":"तयार हुनु", 
          "Next":"अर्को",
          "General":"साधारण",
          "Location":"स्थान",
          "Country":"देश",
          "Country*":"देश*",
          "City":"शहर",
          "City*":"शहर*",
          "Product Type":"उत्पादन प्रकार",
          "Temperature":"तापक्रम",
          "Unit":"एकाइ",
          "Certification":"प्रमाणीकरण",
          "Date Of Storage":"भण्डारण मिति ",
          "Storage Duration":"भण्डारण अवधि",
          "Request for Search":"खोजको लागि अनुरोध",
          "Origin Location":"उत्पत्ति स्थान",
         
          "From*":"बाट*",
          "GPS":"GPS",
          "PIN Code":"पिन कोड",
          "Destination Location*":"गन्तव्य स्थान*",
          "To*":"को*",
          "Load Quantity*":"बोभ्क मात्रा*",
          "Broad Category*":"फराकिलो श्रेणी*",
          "Dispatch Date":"पठाउने मिति",
          "Arrival Date":"आगमन मिति",
          "Product Type*":"उत्पादन प्रकार",
          "Comment":"टिप्पणी गर्नुहोस्",

          

          //Prepare 
           "Product Category":"उत्पादन कोटि",
           "Broad Category":"व्यापक श्रेणी",
           "Service Category":"सेवा कोटि",
           "State*":"राज्य*",
           "Throughput":"थ्रुपुट",
           "Avg. Case Size":"औसत। केस साइज",
           "Estimated Docks":"अनुमानित डक्स",
           "Estimated Dispatches":"अनुमानित प्रेषण",
         
           "Date of Start":"सुरु भएको मिति",
           "Contract Name":" अनुबंध नाम",
           "Contract Type":"सम्झौता प्रकार",
         
         
           "General Query":"सामान्य प्रश्न",
           "Send Query":"क्वेरी पठाउनुहोस्",
           "Enter your query":"आफ्नो क्वेरी प्रविष्ट गर्नुहोस्",
           "Ticket List":"टिकट सूची",
           "General Ticket List":"सामान्य टिकट सूची",

         //Partner 


         "Are You Facility Manager":"तपाईं सुविधा प्रबन्धक हुनुहुन्छ",
         "Facility Manager*":"सुविधा प्रबन्धक*",
         "Contact Number*":"सम्पर्क नम्बर",
         "Address*":"ठेगाना",
         "Total Tonnage(MT)*":"कुल टनेज*",
         "Type Of Store*":"स्टोर को प्रकार*",
         "Type of Cold Storage*":"कोल्ड स्टोरेज को प्रकार*",
         "Ante Room - Area (Square feet)*":"पूर्व कोठा - क्षेत्र (वर्ग फिट)*",
         "Total number of docks*":"डकहरूको कुल संख्या",
         "Total office space(Square feet)*":"कुल अफिस स्पेस (वर्ग फिट)",
         "Type of docks*":"डकहरूको प्रकार",
         "Processing Area(Square feet)*":"प्रशोधन क्षेत्र (वर्ग फिट)",
         "Parking Area(Square feet)*":"पार्किङ क्षेत्र (वर्ग फिट)",
         "Type of Refrigeration*":"प्रशीतन को प्रकार",
         "Year of Installation*":"स्थापना को वर्ष",
         "Internet":"इन्टरनेट",
         "Wifi":"वाईफ़ाई",
         "CCTV":"सीसीटीवी",
         "Driver Area for Food and Resting":"खाना र आरामको लागि चालक क्षेत्र",
         "Weighbridge*":"तौल पुल",
         "Road condition from main road*":"मुख्य सडकबाट सडकको अवस्था",
         "Photo Of Assets*":"सम्पत्तिको फोटो",
         "3D Photo*":"थ्रीडी फोटो",
         "Chambers":"चेम्बरहरू",
         "Currently there are no chambers.":"हाल त्यहाँ कुनै चेम्बरहरू छैनन्",
         "Add details":"विवरणहरू थप्नुहोस्",
         "CA Equipments":"CA उपकरणहरू",
         "Currently there are no CA Equipments.":"हाल त्यहाँ कुनै CA उपकरणहरू छैनन्।",
         "Compressors":"कम्प्रेसरहरू",
         "Currently there are no Compressors.":"हाल कुनै कम्प्रेसरहरू छैनन्.",
         "ACU":"ACU",
         "Currently there are no ACUs.":"हाल त्यहाँ ACU हरू छैनन्",
         "Condenser":"कन्डेनसर",
         "Currently there are no Condenser.":"हाल कुनै कन्डेनसर छैन.",
         "Annual Maintenance Contract":"वार्षिक मर्मत सम्भार सम्झौता",
         "Currently there are no AMCs.":"हाल त्यहाँ AMC हरू छैनन्।",
         "IOT Devices":"IOT यन्त्रहरू",
         "Currently there are no IOT Devices.":"हाल त्यहाँ कुनै IOT यन्त्रहरू छैनन्।",
         "IT Devices":"आईटी उपकरणहरू",
         "Generator":"जेनेरेटर",
         "Currently there are no generators.":"हाल त्यहाँ जेनेरेटरहरू छैनन्",
         "MHE":"एमएचई",
         "Currently there are no MHEs.":"हाल त्यहाँ कुनै MHEs छैनन्",
         "Solar Inverters":"सौर्य इन्भर्टरहरू",
         "Currently there are no solar inverters.":"हाल सोलार इन्भर्टरहरू छैनन्",
         "Prev":"अघिल्लो",
         "Currently there are no IT Devices.":"हाल कुनै आईटी उपकरणहरू छैनन्",
         'Asset Specifications':"सम्पत्ति विवरणहरू",
         "Compliance Details":"अनुपालन विवरणहरू",




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
